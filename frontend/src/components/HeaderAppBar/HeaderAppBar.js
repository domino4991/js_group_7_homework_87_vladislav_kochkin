import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, Toolbar, Typography, Button} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

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
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Button color="inherit" component={NavLink} to="/" className={classes.link}>Forum</Button>
                    </Typography>
                    {!user ?
                        <>
                            <Button
                                component={NavLink}
                                to="/"
                                color="inherit"
                            >
                                Home
                            </Button>
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
                        <Button
                            component={NavLink}
                            to="/add-new-post"
                            color='inherit'
                        >Add new post</Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default HeaderAppBar;