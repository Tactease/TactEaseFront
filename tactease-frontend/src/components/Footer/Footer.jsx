import {FooterContainer} from "./Footer.styled.js";
import { grey } from "@mui/material/colors";

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
            <Stack direction="row" spacing={1}>
                <IconButton aria-label="delete">
                    <QuestionAnswerIcon />
                </IconButton>
                <IconButton aria-label="delete" disabled color="requests">
                    <HomeIcon />
                </IconButton>
                <IconButton color="primary" aria-label="logout">
                    <Logout />
                </IconButton>
            </Stack>
        </FooterContainer>
    )
}

export default Footer;
