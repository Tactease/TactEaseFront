import Calendar from "../../components/Schedule/Schedule.jsx";
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import Button from "../../components/Button/Button.jsx";
import { CalenderLayout } from './CalenderPage.style.js';
import {Link} from 'react-router-dom';
const CalenderPage = () => {
    return (
        <CalenderLayout>
            <PageTitle title="Weekly Mission Schedule"/>
            <Calendar/>
            <Link to="/addMissions">
            <Button width={150} text={'Add Missions'}></Button>
            </Link>
        </CalenderLayout>
    )
}

export default CalenderPage
