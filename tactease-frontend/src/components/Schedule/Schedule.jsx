import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    Toolbar,
    MonthView,
    WeekView,
    ViewSwitcher,
    Appointments,
    AppointmentTooltip,
    AppointmentForm,
    DragDropProvider,
    EditRecurrenceMenu,
    AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import LocationOn from '@mui/icons-material/LocationOn';
import Notes from '@mui/icons-material/Notes';
import Close from '@mui/icons-material/Close';
import CalendarToday from '@mui/icons-material/CalendarToday';
import Create from '@mui/icons-material/Create';

import { missions } from '../../../demo-data/missions';

const PREFIX = 'Scheduler';
const classes = {
    content: `${PREFIX}-content`,
    header: `${PREFIX}-header`,
    closeButton: `${PREFIX}-closeButton`,
    buttonGroup: `${PREFIX}-buttonGroup`,
    button: `${PREFIX}-button`,
    picker: `${PREFIX}-picker`,
    wrapper: `${PREFIX}-wrapper`,
    icon: `${PREFIX}-icon`,
    textField: `${PREFIX}-textField`,
    addButton: `${PREFIX}-addButton`,
};

const StyledDiv = styled('div')(({ theme }) => ({
    [`& .${classes.icon}`]: {
        margin: theme.spacing(2, 0),
        marginRight: theme.spacing(2),
    },
    [`& .${classes.header}`]: {
        overflow: 'hidden',
        paddingTop: theme.spacing(0.5),
    },
    [`& .${classes.textField}`]: {
        width: '100%',
    },
    [`& .${classes.content}`]: {
        padding: theme.spacing(2),
        paddingTop: 0,
    },
    [`& .${classes.closeButton}`]: {
        float: 'right',
    },
    [`& .${classes.picker}`]: {
        marginRight: theme.spacing(2),
        '&:last-child': {
            marginRight: 0,
        },
        width: '50%',
    },
    [`& .${classes.wrapper}`]: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(1, 0),
    },
    [`& .${classes.buttonGroup}`]: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 2),
    },
    [`& .${classes.button}`]: {
        marginLeft: theme.spacing(2),
    },
}));
const StyledFab = styled(Fab)(({ theme }) => ({
    [`&.${classes.addButton}`]: {
        position: 'absolute',
        bottom: theme.spacing(3),
        right: theme.spacing(4),
    },
}));

class SchedulerFormContainerBasic extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            schedulerChanges: {},
        };

        this.getSchedulerData = () => {
            const { missionData } = this.props;
            return missionData;
        };
        this.getSchedulerChanges = () => {
            const { missionChanges } = this.state;
            return missionChanges;
        };

        this.changeMission = this.changeMission.bind(this);
        this.commitMission = this.commitMission.bind(this);
    }

    changeMission({ field, changes }) {
        const nextChanges = {
            ...this.getSchedulerChanges(),
            [field]: changes,
        };
        this.setState({
            schedulerChanges: nextChanges,
        });
    }

    commitMission(type) {
        const { commitChanges } = this.props;
        const mission = {
            ...this.getSchedulerData(),
            ...this.getSchedulerChanges(),
        };
        if (type === 'deleted') {
            commitChanges({ [type]: mission._id });
        } else if (type === 'changed') {
            commitChanges({ [type]: { [mission._id]: mission } });
        } else {
            commitChanges({ [type]: mission });
        }
        this.setState({
            schedulerChanges: {},
        });
    }

    render() {
        const {
            visible,
            visibleChange,
            missionData,
            cancelMission,
            target,
            onHide,
        } = this.props;
        const { schedulerChanges } = this.state;

        const displayMissionData = {
            ...missionData,
            ...schedulerChanges,
        };

        const isNewMission = missionData.id === undefined;
        const applyChanges = isNewMission
            ? () => this.commitMission('added')
            : () => this.commitMission('changed');

        const textEditorProps = field => ({
            variant: 'outlined',
            onChange: ({ target: change }) => this.changeMission({
                field: [field], changes: change.value,
            }),
            value: displayMissionData[field] || '',
            label: field[0].toUpperCase() + field.slice(1),
            className: classes.textField,
        });
        const pickerEditorProps = field => ({
            // keyboard: true,
            value: displayMissionData[field],
            onChange: date => this.changeMission({
                field: [field], changes: date ? date.toDate() : new Date(displayMissionData[field]),
            }),
            ampm: false,
            inputFormat: 'DD/MM/YYYY HH:mm',
            onError: () => null,
        });

        const startDatePickerProps = pickerEditorProps('startDate');
        const endDatePickerProps = pickerEditorProps('endDate');
        const cancelChanges = () => {
            this.setState({
                schedulerChanges: {},
            });
            visibleChange();
            cancelMission();
        };
        
