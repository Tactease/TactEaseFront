import { FooterContainer } from "./Footer.styled.js";

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import Logout from '@mui/icons-material/Logout';
import {Link, useNavigate} from "react-router-dom";

const Footer = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    }

    return (
        <FooterContainer>
            <IconButton aria-label="delete" size="large">
            <Link to="requests">
                <QuestionAnswerIcon />
            </Link>
            </IconButton>
                <IconButton aria-label="delete" size="large" >
            <Link to="/">
                    <HomeIcon />
            </Link>
                </IconButton>
            <IconButton aria-label="logout" size="large" onClick={handleLogout}>
                <Logout />
            </IconButton>
        </FooterContainer>
    )
}

export default Footer;
