import React, {useState} from 'react';
import Form from "../../components/UI/Form/Form";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../store/actions/usersActions";

const Register = (props) => {
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
            <Form
                password={user.password}
                submitted={e => onSubmittedForm(e)}
                changed={e => onChangeValue(e)}
                username={user.username}
                getFieldError={getFieldError}
                name={user.name}
                path={props.match.url}
                register={true}
            />
        </>
    );
};

export default Register;