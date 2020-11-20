import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import Form from "../../components/UI/Form/Form";
import {loginUser} from "../../store/actions/usersActions";
import {Typography, Avatar, makeStyles} from "@material-ui/core";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const useStyles = makeStyles(theme => ({
    avatar: {
        margin: "0 auto",
        marginBottom: theme.spacing(4),
        backgroundColor: theme.palette.primary.main,
        width: theme.spacing(7),
        height: theme.spacing(7)
    }
}));

const Login = () => {
    const classes = useStyles();
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const dispatch = useDispatch();

    const changeValue = e => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const onSubmitted = e => {
        e.preventDefault();
        dispatch(loginUser({...user}));
    }

    return (
        <>
            <Typography
                variant="h4"
                component="h4"
                gutterBottom
                align="center"
            >
                Вход
            </Typography>
            <Avatar
                className={classes.avatar}
                variant="rounded"
            >
                <LockOpenIcon />
            </Avatar>
            <Form
                password={user.password}
                submitted={e => onSubmitted(e)}
                changed={e => changeValue(e)}
                username={user.username}
                register={false}
                btnLabel="Войти"
            />
            <ToastContainer autoClose={5000}/>
        </>
    );
};

export default Login;