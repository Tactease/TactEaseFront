import React from 'react'
import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import {LoginContainer, LoginForm} from './Login.styled';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from "../../components/Button/Button.jsx";

const Login = () => {
    const [userData, setUserData] = React.useState({userType: 'Donor',});

    const handleForm = (e) => {
        const {id, value} = e.target;
        setUserData(prevState => ({...prevState, [id]: value}));
    }

    const loginFunction = async (e, userData) => {
        e.preventDefault();
    }

    return (
        <LoginContainer>
            <PageTitle title="Login"/>
            <LoginForm>
                <FormControl>
                    <TextField id="standard-basic" label="Personal Number" variant="standard"
                               onChange={(e) => handleForm(e)}/>
                </FormControl>
                <TextField id="standard-basic" label="Password" type="password" variant="standard"
                           onChange={(e) => handleForm(e)}/>
                <Button width={85} text={'Login'} onClick={(e) => loginFunction(e, userData)}></Button>
            </LoginForm>
        </LoginContainer>
    );
}
export default Login;
