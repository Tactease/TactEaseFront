import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { FormConstainer, TextFieldContainer } from "./AddMissionsForm.style";
import Button from "../Button/Button";
import { format } from 'date-fns';

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
    const [missionData, setMissionData] = useState( editMission || {classId:40});
    const [currentDate, setCurrentDate] = useState(format(new Date(), 'yyyy-MM-ddTHH:mm'));

    useEffect(() => {
        setCurrentDate(format(new Date(), 'yyyy-MM-ddTHH:mm'));
    }, []);

    const handleForm = (e) => {
        const {name, value} = e.target;
        let formattedValue = value;

        if (name === 'startDate' || name === 'endDate') {
            const date = new Date(value);
            formattedValue = format(date, 'dd/MM/yy HH:mm');
        }

        setMissionData(prevState => ({...prevState, [name]: formattedValue}));
    }

    // const addMission = () => {
    //
    //     setMissions(prevState => [...prevState, missionData]);
    //     setShowForm(false);
    // }

    const addMission = () => {
        if (editMission) { // Add this block
            setMissions(prevState => prevState.map((mission, index) => index === editIndex ? missionData : mission));
        } else {
            setMissions(prevState => [...prevState, missionData]);
        }
        setShowForm(false);
    }

    return(
            <FormConstainer>
                <TextFieldContainer>
                <TextField
                    required
                    id="missionType"
                    name="missionType"
                    select
                    variant="standard"
                    style={{width: '10%'}}
                    onChange={(e) => handleForm(e)}
                >
                    {missionTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    required
                    id="startDate"
                    name="startDate"
                    variant="standard"
                    type="datetime-local"
                    min={currentDate}
                    onChange={(e) => handleForm(e)}
                />
                <TextField
                    required
                    id="endDate"
                    name="endDate"
                    variant="standard"
                    type="datetime-local"
                    min={currentDate}
                    onChange={(e) => handleForm(e)}
                />
                <TextField
                    required
                    id="soldierCount"
                    name="soldierCount"
                    variant="standard"
                    type="number"
                    onChange={(e) => handleForm(e)}
                />
                </TextFieldContainer>
                <Button width={85} text={'Add'} onClick={addMission}></Button>
            </FormConstainer>
    )
}

export default AddMissionsForm;
