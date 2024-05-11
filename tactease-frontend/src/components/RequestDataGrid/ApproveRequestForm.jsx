import { ApproveFormContainter } from './RequestDataGrid.styled.js';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';

// eslint-disable-next-line react/prop-types
const ApproveRequestForm = (user, req) => {

    return (
        <ApproveFormContainter>
            <IconButton aria-label="reject"> 
                <ClearIcon />
            </IconButton>
            <IconButton aria-label="approve"> 
                <CheckIcon />
            </IconButton>
        </ApproveFormContainter>
    );
};

export default ApproveRequestForm;
