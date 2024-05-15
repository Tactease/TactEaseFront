import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {FormConstainer} from "./AddMissionsForm.style";
import Button from "../Button/Button";
import { format } from 'date-fns';
import moment from 'moment';
import "./AddMissionsForm.css";
import {
    GridContainer,
    GridMissionType,
    GridStartDate,
    GridEndDate,
    GridParticipants } from "../../Pages/AddMissions/AddMissions.style.js";
import EventIcon from '@mui/icons-material/Event';
import IconButton from '@mui/material/IconButton';

const missionTypes = [
    {
        value: 'GUARD',
        label: 'Guard',
    },
    {
        value: 'PATROL_BY_CAR',
        label: 'Patrol',
    },
    {
        value: 'MISSION',
        label: 'Mission',
    },
    {
        value: 'WATCH',
        label: 'Watch',
    },
];

const AddMissionsForm = (props) => {
    const { setMissions, setShowForm, editMission } = props;
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const [missionData, setMissionData] = useState( editMission || {classId:user.depClass.classId, soldiersOnMission:[]} );
    const [currentDate, setCurrentDate] = useState(format(new Date(), 'yyyy-MM-ddTHH:mm'));
    const [errors, setErrors] = useState({});
    const [isTabletOrSmaller, setIsTabletOrSmaller] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsTabletOrSmaller(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setCurrentDate(format(new Date(), 'yyyy-MM-ddTHH:mm'));
    }, []);

    const validateForm = () => {
        let formErrors = {};
        if(!missionData.startDate) {
            formErrors.startDate = "Start date is required";
        } else if (moment(missionData.startDate, 'DD/MM/YYYY HH:mm').isBefore(moment())) {
            formErrors.startDate = "Start date cannot be in the past";
        }

        if(!missionData.endDate) {
            formErrors.endDate = "End date is required";
        } else if (moment(missionData.endDate, 'DD/MM/YYYY HH:mm').isBefore(moment())) {
            formErrors.endDate = "End date cannot be in the past";
        } else {
            const startDate = moment(missionData.startDate, 'DD/MM/YYYY HH:mm').startOf('minute');
            const endDate = moment(missionData.endDate, 'DD/MM/YYYY HH:mm').startOf('minute');
            if (endDate.diff(startDate, 'minutes') < 30) {
                formErrors.endDate = "End date should be at least 30 minutes after the start date";
            }
        }

        if(missionData.soldierCount < 0) {
            formErrors.soldierCount = "Soldier count is invalid";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    }


    const handleForm = (e) => {
        const {name, value} = e.target;
        let formattedValue = value;

        if (name === 'startDate' || name === 'endDate') {
            const date = new Date(value);
            formattedValue = format(date, 'dd/MM/yyyy HH:mm');
        }

        setMissionData(prevState => ({...prevState, [name]: formattedValue}));
    }


    const addMission = () => {
        if(!validateForm()) {
            return;
        }
        if (editMission) { // Add this block
            setMissions(prevState => prevState.map((mission, index) => index === editIndex ? missionData : mission));
        } else {
            setMissions(prevState => [...prevState, missionData]);
        }
        setShowForm(false);
    }

    return(
            <FormConstainer>
                    <GridContainer>
                    <GridMissionType>
                <TextField
                    required
                    id="missionType"
                    name="missionType"
                    select
                    variant="standard"
                    onChange={(e) => handleForm(e)}
                >
                    {missionTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                    </GridMissionType>
                    <GridStartDate>
                <TextField
                    required
                    id="startDate"
                    name="startDate"
                    variant="standard"
                    type="datetime-local"
                    className="datetime-input"
                    error={!!errors.startDate}
                    helperText={errors.startDate}
                    min={currentDate}
                    onChange={(e) => handleForm(e)}
                    // InputProps={isTabletOrSmaller ? {
                    //     disableUnderline: true,
                    //     endAdornment: (
                    //         <IconButton>
                    //             <EventIcon />
                    //         </IconButton>
                    //     ),
                    // } : {}}
                />
                    </GridStartDate>
                    <GridEndDate>
                <TextField
                    required
                    id="endDate"
                    name="endDate"
                    variant="standard"
                    type="datetime-local"
                    className="datetime-input"
                    error={!!errors.endDate}
                    helperText={errors.endDate}
                    min={currentDate}
                    onChange={(e) => handleForm(e)}
                />
                    </GridEndDate>
                    <GridParticipants>
                <TextField
                    required
                    id="soldierCount"
                    name="soldierCount"
                    variant="standard"
                    error={!!errors.soldierCount}
                    helperText={errors.soldierCount}
                    type="number"
                    onChange={(e) => handleForm(e)}
                />
                    </GridParticipants>
                    </GridContainer>
                <Button width={85} text={'Add'} onClick={addMission} disabled={
                    !missionData.missionType || !missionData.startDate || !missionData.endDate || !missionData.soldierCount
                }></Button>
            </FormConstainer>
    )
}

export default AddMissionsForm;
