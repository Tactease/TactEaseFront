import { useState } from 'react';
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import {
    GridContainer,
    GridMissionType,
    GridStartDate,
    GridEndDate,
    GridParticipants,
    GridDelete,
    GridForm,
    GridAdd,
    GridMission, ButtonPosition
} from "./AddMissions.style.js";
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
            <GridContainer>
                        <GridMissionType isHeader={true}>Mission Type</GridMissionType>
                        <GridStartDate isHeader={true}>Start Date</GridStartDate>
                        <GridEndDate isHeader={true}>End Date</GridEndDate>
                        <GridParticipants isHeader={true}>Participants</GridParticipants>
                        <GridDelete></GridDelete>
                    {missions.map((mission, index) => (
                        <GridMission key={index}>
                            <GridMissionType>{formatMissionType(mission.missionType)}</GridMissionType>
                            <GridStartDate>{mission.startDate}</GridStartDate>
                            <GridEndDate>{mission.endDate}</GridEndDate>
                            <GridParticipants>{mission.soldierCount}</GridParticipants>
                            <GridDelete>
                                <UtilButton onClick={() => deleteMission(index)}><DeleteRoundedIcon /></UtilButton>
                            </GridDelete>
                        </GridMission>
                    ))}
                    {showForm ? (
                        <GridForm>
                            <AddMissionsForm setShowForm={setShowForm} setMissions={setMissions} />
                        </GridForm>
                    ) : (
                        missions.length < 6 ? (
                            <GridAdd><Button text="+" width={50} onClick={()=> setShowForm(true)}/></GridAdd>
                                ) : null

                    )}
            </GridContainer>
            <ButtonPosition>
            <Button text="Send Missions" width={150} onClick={submitMissions} disabled={missions.length === 0}/>
            </ButtonPosition>
        </MissionsLayout>
    )
}

export default AddMissons
