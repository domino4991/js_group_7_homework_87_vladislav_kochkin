import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, Toolbar, Typography, Button, Menu, MenuItem} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../store/actions/usersActions";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(5)
    },
    title: {
        flexGrow: 1,
    },
    link: {
        display: 'inline-block'
    }
}));

const HeaderAppBar = () => {
    const classes = useStyles();
    const {user} = useSelector(state => state.users);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        dispatch(logoutUser());
        setAnchorEl(null);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Button color="inherit" component={NavLink} to="/" className={classes.link}>Forum</Button>
                    </Typography>
                    <Button
                        component={NavLink}
                        to="/"
                        color="inherit"
                    >
                        Home
                    </Button>
                    {!user ?
                        <>
                            <Button
                                component={NavLink}
                                color="inherit"
                                to="/register"
                            >
                                Register
                            </Button>
                            <Button
                                component={NavLink}
                                color="inherit"
                                to="/login"
                            >
                                Login
                            </Button>
                        </>
                        :
                        <>
                            <Button
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                                color="inherit"
                            >
                                {user.name}
                            </Button>
                            <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                            >
                            <MenuItem
                                component={NavLink}
                                to="/add-new-post"
                            >
                                Добавить новый пост
                            </MenuItem>
                            <MenuItem
                                onClick={handleClose}
                            >
                                Выход
                            </MenuItem>
                            </Menu>
                        </>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default HeaderAppBar;