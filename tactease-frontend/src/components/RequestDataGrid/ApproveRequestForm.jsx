import { ApproveFormContainter } from './RequestDataGrid.styled.js';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import { updateRequest } from '../../API/requests.api.js';

const ApproveRequestForm = ({ soldier, reqId, reloadData, reloadDataGrid}) => {

    const updateRequestStatus = async (status) => {
        console.log(soldier);
        console.log(reqId);
        let i = 0;
        let request = {};
        for (i = 0; i < soldier.requestList.length; i++) {
            if (i === reqId) {
                request = soldier.requestList[i];
                break;
            }
        }
        request.status = status;
        const res = await updateRequest(soldier._id.toString(), reqId, request);
        if (res.status === 200) {
            reloadDataGrid();
            reloadData();
            console.log("Request updated successfully");
        } else {
            console.log("Failed to update request");
        }

    };

    return (
        <ApproveFormContainter>
            <IconButton aria-label="reject" onClick={() => updateRequestStatus("Rejected")}>
                <ClearIcon />
            </IconButton>
            <IconButton aria-label="approve" onClick={() => updateRequestStatus("Approved")}>
                <CheckIcon />
            </IconButton>
        </ApproveFormContainter>
    );
};

export default ApproveRequestForm;
