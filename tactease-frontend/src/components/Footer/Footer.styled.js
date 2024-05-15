import styled from "styled-components";
import { muiStyled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const FooterContainer = styled.footer`
    width: 100%;
    display: none;
    
    @media (max-width: 768px) {
        display: flex;
        position: relative;
        flex-flow: row;
        align-items: center;
        justify-content: space-around;
    }
`;

const ColorButton = muiStyled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
        backgroundColor: purple[700],
    },
}));
