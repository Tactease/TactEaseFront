import Calendar from "../../components/Schedule/Schedule.jsx";
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import Button from "../../components/Button/Button.jsx";
import {CalenderLayout} from './CalenderPage.style.js';
import {Link} from 'react-router-dom';

const CalenderPage = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    return (
        <CalenderLayout>
            <PageTitle title="Weekly Mission Schedule"/>
            <Calendar/>
            {user && user.pakal === "COMMANDER" ? (
            <Link to="/addMissions">
                <Button width={150} text={'Add Missions'}></Button>
            </Link>
        ) : null}
        </CalenderLayout>
    )
}

export default CalenderPage
