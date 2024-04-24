import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import {LoginContainer, LoginForm} from './Login.styled';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

const Login = () => {
    return (
        <LoginContainer>
            <PageTitle title="Login"/>
            <LoginForm>
                <FormControl>
                <TextField id="standard-basic" label="Personal Number" variant="standard"/>
                </FormControl>
                <TextField id="standard-basic" label="Standard" variant="standard"/>
            </LoginForm>
        </LoginContainer>
    );
}
export default Login;
