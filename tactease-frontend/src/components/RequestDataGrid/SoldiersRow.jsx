import React from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RequestDataGrid from "./RequestDataGrid.jsx";
import {RequestsFormContainer, SecondTableHeader} from './RequestDataGrid.styled.js';

const SoldiersRow = ({ soldier }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align="center">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                    {soldier.personalNumber}
                </TableCell>
                <TableCell align="center">{soldier.fullName}</TableCell>
                <TableCell align="center">{soldier.pakal}</TableCell>
                <TableCell align="center">{soldier.requestStatus === true ? "Pending requests" : "No requests to approve"}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <RequestsFormContainer>
                            <SecondTableHeader>{soldier.fullName} Requests </SecondTableHeader>
                            <RequestDataGrid user={soldier}/>
                        </RequestsFormContainer>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );

}

export default SoldiersRow;