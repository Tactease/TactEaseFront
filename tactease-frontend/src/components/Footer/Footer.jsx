import { FooterContainer } from "./Footer.styled.js";

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import Logout from '@mui/icons-material/Logout';

const Footer = () => {


    return (
        <FooterContainer>
            <IconButton aria-label="delete" size="large">
                <QuestionAnswerIcon />
            </IconButton>
            <IconButton aria-label="delete" size="large" >
                <HomeIcon />
            </IconButton>
            <IconButton aria-label="logout" size="large">
                <Logout />
            </IconButton>
        </FooterContainer>
    )
}

export default Footer;
