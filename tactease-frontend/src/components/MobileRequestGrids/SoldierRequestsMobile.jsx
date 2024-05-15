import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getSoldierByClassId } from "../../API/soldiers.api.js";
import SoldiersRow from "./SoldiersRow.jsx";
import { TableHeaderCell } from './RequestDataGrid.styled.js';


const SoldierRequestsMobile = ({ user }) => {
    const [soldiers, setSoldiers] = useState([]);
    const [reloadGrid, setReloadGrid] = useState(true);

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
            setReloadGrid(false);
        });
    }, [reloadGrid]);

    const reloadData = () => {
        setReloadGrid(true);
    };

    return (
            <TableBody>
                {soldiers.map((soldier) => (
                    <SoldiersRow key={soldier._id} user={user} soldier={soldier} reloadData={reloadData} />
                ))}
            </TableBody>

    )
};

export default SoldierRequestsMobile;
