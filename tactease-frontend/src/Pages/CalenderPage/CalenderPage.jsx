import Calendar from "../../components/Schedule/Schedule.jsx";
import { CalenderHeadline } from "./CalenderPage.style.js";
const CalenderPage = () => {
    return (
        <div>
            <CalenderHeadline>
                Weekly Mission Schedule
            </CalenderHeadline>
        <Calendar/>
        </div>
    )
}

export default CalenderPage
