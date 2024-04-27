import {useState } from 'react'
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import { LoginContainer, LoginForm } from './Login.styled';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import Button from "../../components/Button/Button.jsx";
import { loginSoldier } from '../../API/soldiers.api.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [userData, setUserData] = useState({ userType: 'Donor', });
    const [personalNumberErr, setPersonalNumberErr] = useState(false);
    const [personalNumberMsg, setPersonalNumberMsg] = useState("");
    const [passwordErr, setPasswordErr] = useState(false);
    const [passwordMsg, setPasswordMsg] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const validatePersonalNumber = (value) => {
        if (!value.match("[0-9]+")) {
            setPersonalNumberErr(true);
            setPersonalNumberMsg("Only numbers are allowed.");
        }
        else if (value.length !== 7) {
            setPersonalNumberErr(true);
            setPersonalNumberMsg("Personal number must be 7 digits.");
        }
        else {
            setPersonalNumberErr(false);
            setPersonalNumberMsg("");
        }
    }

    const validatePassword = (value) => {
        if (value.length === 0) {
            setPasswordErr(true);
            setPasswordMsg("No password has been entered.");
        }
        else {
            setPasswordErr(false);
            setPasswordMsg("");
        }
    }

    const handleForm = (e) => {
        const { id, value } = e.target;
        if (id === 'personalNumber') {
            validatePersonalNumber(value);
        }

        if (id === 'password') {
            validatePassword(value);
        }
        setUserData(prevState => ({ ...prevState, [id]: value }));
    }

    const loginFunction = async (e, userData) => {
        e.preventDefault();
        if (Object.keys(userData).length < 2 && !personalNumberErr && !passwordErr) {
            return;
        }

        const LoginInfo = {
            personalNumber: userData.personalNumber,
            password: userData.password,
        }

        try {
            const res = await loginSoldier(LoginInfo);
            console.log(res.data);
            if (res) {
                localStorage.setItem('user', JSON.stringify(res.data));
                setMessage("Logged in Successfully");
                setIsSuccess(true);
                setTimeout(() => { setMessage('') }, 5000);
                navigate('/');
            } else {
                setMessage("Login Failed");
                setIsSuccess(false);
                setTimeout(() => { setMessage('') }, 5000);
            }
        } catch (err) {
            console.log(err);
            setMessage("Wrong Credentials");
            setIsSuccess(false);
            setTimeout(() => { setMessage('') }, 5000);
        }
    }


    return (
        <LoginContainer>
            <PageTitle title="Login" />
            {!isSuccess && message && <Alert severity="error">{message}</Alert>}
            <LoginForm>
                <FormControl>
                    <TextField id="personalNumber" label="Personal Number" variant="standard"
                        onChange={(e) => handleForm(e)} inputProps={{ pattern: "[1-9][0-9]{6}" }}
                        error={personalNumberErr} helperText={personalNumberMsg} />
                </FormControl>
                <TextField id="password" label="Password" type="password" variant="standard"
                    onChange={(e) => handleForm(e)}
                    error={passwordErr} helperText={passwordMsg}
                    autoComplete="current-password" />
                <Button width={85} text={'Login'} onClick={(e) => loginFunction(e, userData)}></Button>
            </LoginForm>
        </LoginContainer>
    );
}
export default Login;
