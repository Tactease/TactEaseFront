import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";
import {format} from "date-fns";
import moment from "moment/moment.js";
import Button from "../../components/Button/Button.jsx";
import {RequestForm} from "./NewRequest.style.js";
import {createRequest} from "../../API/requests.api.js";
import {useNavigate} from "react-router-dom";


const requestsTypes = [
    {
        value: 'MEDICAL_REQUEST',
        label: 'Medical Request',
    },
    {
        value: 'PERSONAL_REQUEST',
        label: 'Personal Request',
    },
];

const NewRequest = () => {
    const [currentDate, setCurrentDate] = useState(format(new Date(), 'yyyy-MM-ddTHH:mm'));
    const [errors, setErrors] = useState({});
    const [requestData, setRequestData] = useState({requestType: 'PERSONAL_REQUEST', status: 'Pending'});
    const navigate = useNavigate();
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const userId = user._id.toString();

    const validateForm = () => {
        let formErrors = {};
        if(!requestData.startDate) {
            formErrors.startDate = "Start date is required";
        } else if (moment(requestData.startDate, 'DD/MM/YYYY HH:mm').isBefore(moment())) {
            formErrors.startDate = "Start date cannot be in the past";
        }
        if(!requestData.endDate) {
            formErrors.endDate = "End date is required";
        } else if (moment(requestData.endDate, 'DD/MM/YYYY HH:mm').isBefore(moment())) {
            formErrors.endDate = "End date cannot be in the past";
        } else {
            const startDate = moment(requestData.startDate, 'DD/MM/YYYY HH:mm').startOf('minute');
            const endDate = moment(requestData.endDate, 'DD/MM/YYYY HH:mm').startOf('minute');
            if (endDate.diff(startDate, 'minutes') < 30) {
                formErrors.endDate = "End date should be at least 30 minutes after the start date";
            }
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

        setRequestData(prevState => ({...prevState, [name]: formattedValue}));
    }

    const addRequest = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        await createRequest(userId,requestData)
            .then((res => {
                console.log("new request added", res);
                navigate('/myRequests');}))
            .catch((err) => console.log(err))
    }
    return (
        <div>
            <PageTitle title="New Request"/>
            <RequestForm>
                <TextField
                    required
                    id="requestType"
                    name="requestType"
                    label="Request Type"
                    select
                    variant="standard"
                    style={{width: '10%'}}
                    value={requestData.requestType} // set value prop to state value
                    onChange={(e) => handleForm(e)}
                >
                    {requestsTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    // required
                    id="startDate"
                    name="startDate"
                    label=" "
                    variant="standard"
                    type="datetime-local"
                    error={!!errors.startDate}
                    helperText={errors.startDate}
                    min={currentDate}
                    onChange={(e) => handleForm(e)}
                />
                <TextField
                    // required
                    id="endDate"
                    name="endDate"
                    label=" "
                    // placeholder="dd/MM/yyyy HH:mm"
                    variant="standard"
                    type="datetime-local"
                    error={!!errors.endDate}
                    helperText={errors.endDate}
                    min={currentDate}
                    onChange={(e) => handleForm(e)}
                />
                <TextField
                    id="note"
                    name="note"
                    label="Note"
                    variant="standard"
                    type="text"
                    onChange={(e) => handleForm(e)}
                />
                <Button width={85} text={'Submit'} onClick={(e) => addRequest(e)} disabled={
                    !requestData.requestType || !requestData.startDate || !requestData.endDate || !requestData.note
                }></Button>
            </RequestForm>
        </div>
    );
}

export default NewRequest;
