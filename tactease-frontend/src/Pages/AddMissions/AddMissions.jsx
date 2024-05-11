import { useState } from 'react';
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import { TableContainer, TableHeader, TableRow, TableCell, TableHead, TableBody } from "../../components/Schedule/Schedule.style.js";
import Button from "../../components/Button/Button.jsx";
import { MissionsLayout, UtilButton } from "./AddMissions.style.js";
import AddMissionsForm from "../../components/AddMissionsForm/AddMissionsForm.jsx";
import { formatMissionType } from "../../components/Mission/Mission.jsx"
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {createMission} from "../../API/missions.api.js";
import { useNavigate } from 'react-router-dom';

const AddMissons = () => {

const [missions, setMissions] = useState([]);
const [showForm, setShowForm] = useState(false);
const navigate = useNavigate();

const deleteMission = (index) => {
    const newMissions = missions.filter((mission, i) => i !== index);
    setMissions(newMissions);
}

const submitMissions = async () => {
        console.log("missions", missions)
        await createMission(missions)
        .then((res => {
            console.log("new missions created", res);
            navigate('/')}))
        .catch((err) => console.log(err))

    }

    return (
        <MissionsLayout>
            <PageTitle title="Add Missions"/>
            <TableContainer>
                <TableHead>
                    <TableRow>
                        <TableHeader>Mission Type</TableHeader>
                        <TableHeader>Start Date</TableHeader>
                        <TableHeader>End Date</TableHeader>
                        <TableHeader>Participants</TableHeader>
                        <TableHeader></TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {missions.map((mission, index) => (
                        <TableRow key={index}>
                            <TableCell>{formatMissionType(mission.missionType)}</TableCell>
                            <TableCell>{mission.startDate}</TableCell>
                            <TableCell>{mission.endDate}</TableCell>
                            <TableCell>{mission.soldierCount}</TableCell>
                            <TableCell>
                                <UtilButton onClick={() => deleteMission(index)}><DeleteRoundedIcon /></UtilButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    {showForm ? (
                        <TableRow>
                            <AddMissionsForm setShowForm={setShowForm} setMissions={setMissions} />
                        </TableRow>
                    ) : (
                        missions.length < 6 ? (
                            <TableRow><Button text="+" width={50} onClick={()=> setShowForm(true)}/></TableRow>
                                ) : null

                    )}
                </TableBody>
            </TableContainer>
            <Button text="Send Missions" width={150} onClick={submitMissions} disabled={missions.length === 0}/>
        </MissionsLayout>
    )
}

export default AddMissons
