import React, {useState} from 'react';
import Form from "../../components/UI/Form/Form";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../store/actions/usersActions";
import {Typography, Avatar, makeStyles} from "@material-ui/core";
import LockIcon from '@material-ui/icons/Lock';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles(theme => ({
    avatar: {
        margin: "0 auto",
        marginBottom: theme.spacing(4),
        backgroundColor: theme.palette.secondary.main,
        width: theme.spacing(7),
        height: theme.spacing(7)
    }
}));

const Register = (props) => {
    const classes = useStyles();
    const {error} = useSelector(state => state.users);
    const [user, setUser] = useState({
        username: '',
        password: '',
        name: ''
    });

    const dispatch = useDispatch();

    const onChangeValue = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmittedForm = e => {
        e.preventDefault();
        dispatch(registerUser({...user}));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return null;
        }
    };

    return (
        <>
            <Typography gutterBottom align="center" variant="h4" component="h4">
                Регистрация
            </Typography>
            <Avatar className={classes.avatar}>
                <LockIcon />
            </Avatar>
            <Form
                password={user.password}
                submitted={e => onSubmittedForm(e)}
                changed={e => onChangeValue(e)}
                username={user.username}
                getFieldError={getFieldError}
                name={user.name}
                path={props.match.url}
                register={true}
                btnLabel="Отправить"
            />
            <ToastContainer autoClose={6000} />
        </>
    );
};

export default Register;