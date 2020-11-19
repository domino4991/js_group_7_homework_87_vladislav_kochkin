import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import Form from "../../components/UI/Form/Form";
import {loginUser} from "../../store/actions/usersActions";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
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
            <Form
                password={user.password}
                submitted={e => onSubmitted(e)}
                changed={e => changeValue(e)}
                username={user.username}
                register={false}
            />
            <ToastContainer autoClose={5000}/>
        </>
    );
};

export default Login;