import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getSoldierByClassId } from "../../API/soldiers.api.js";
import SoldiersRow from "./SoldiersRow.jsx";
import { TableHeaderCell } from './RequestDataGrid.styled.js';


const SoldierRequests = ({ user }) => {
    const [soldiers, setSoldiers] = useState([]);

    useEffect(() => {
        getSoldierByClassId(user.depClass.classId).then((data) => {
            const result = data.data;
            let soldiersData = [];
            for (let i = 0; i < result.length; i++) {
                let requestStatus = false;
                const requests = result[i].requestList;
                if (requests.length > 0) {
                    for (let j = 0; j < requests.length; j++) {
                        if (requests[j].status === "Pending") {
                            requestStatus = true;   
                        }
                    }
                }

                if (result[i].pakal !== "COMMANDER") {
                    let newSoldier = {
                        _id: result[i]._id,
                        depClass: result[i].depClass,
                        personalNumber: result[i].personalNumber,
                        fullName: result[i].fullName,
                        pakal: result[i].pakal,
                        requestList: result[i].requestList,
                        requestStatus: requestStatus
                    }
                    soldiersData.push(newSoldier);
                }
            }
            setSoldiers(soldiersData);
        });
    }, []);

    return (
        <Table aria-label="collapsible table">
            <TableHead>
                <TableRow>
                    <TableCell style={{ width: '10%' }} />
                    <TableCell style={{ width: '20%' }} align="center">
                        <TableHeaderCell>
                            Personal Number
                        </TableHeaderCell>
                    </TableCell>
                    <TableCell style={{ width: '20%' }} align="center">
                        <TableHeaderCell>
                            Personal Number
                        </TableHeaderCell>
                    </TableCell>
                    <TableCell style={{ width: '20%' }} align="center">
                        <TableHeaderCell>
                            Pakal
                        </TableHeaderCell>
                    </TableCell>
                    <TableCell style={{ width: '30%' }} align="center">
                        <TableHeaderCell>
                            Pending Requests
                        </TableHeaderCell>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {soldiers.map((soldier) => (
                    <SoldiersRow key={soldier._id} soldier={soldier} />
                ))}
            </TableBody>
        </Table>
    )
};

export default SoldierRequests;
