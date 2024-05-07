import React from "react";
import { UserInfoContainer, UserInfomation, InfoContainer } from "./userInfo.style.js";
import userDefault from "../../assets/userDefault.png";

import { Link, useNavigate, useLocation } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import { grey } from "@mui/material/colors";
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';


const UserInfo = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    }

    return (
        isLoginPage ? null : (
            user ? <UserInfoContainer>
                <React.Fragment>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar alt={user.fullName} sx={{ bgcolor: grey[50], width: 45, height: 45 }}
                                    src={userDefault} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClose} fontSize="small" >
                            <ListItemIcon>
                                <QuestionAnswerIcon />
                            </ListItemIcon>
                            <Link to={"/requests"}>
                                Requests
                            </Link>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleLogout} fontSize="small" >
                            <ListItemIcon>
                                <Logout/>
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </React.Fragment>
                <InfoContainer>
                    <UserInfomation>{user.fullName}</UserInfomation>
                    <UserInfomation>{user.pakal}</UserInfomation>
                </InfoContainer>
            </UserInfoContainer> : navigate('/login')
        )
    );
};
export default UserInfo;
