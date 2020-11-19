import React from 'react';
import {makeStyles, TextField, Button} from "@material-ui/core";
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    root: {
        width: 300,
        margin: '0 auto'
    },
    input: {
        marginBottom: theme.spacing(3)
    },
    signInBtn: {
        display: 'block',
        margin: '0 auto'
    }
}));

const Form = ({username, password, name, changed, submitted, getFieldError, register}) => {
    const classes = useStyles();
    return (
        <form
            className={classes.root}
            autoComplete="off"
            onSubmit={submitted}
        >
            <TextField
                id='username'
                label="Логин"
                name="username"
                value={username}
                type="text"
                error={register && !!getFieldError('username')}
                helperText={register && getFieldError('username')}
                onChange={changed}
                className={classes.input}
                fullWidth
            />
            {register &&
                <TextField
                    fullWidth
                    id='name'
                    label="Имя"
                    name="name"
                    error={!!getFieldError('name')}
                    helperText={getFieldError('name')}
                    value={name}
                    type="name"
                    onChange={changed}
                    className={classes.input}
                />
            }
            <TextField
                fullWidth
                id='password'
                label="Пароль"
                name="password"
                error={register && !!getFieldError('password')}
                helperText={register && getFieldError('password')}
                value={password}
                type="password"
                onChange={changed}
                className={classes.input}
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.signInBtn}
            >
                Sign in
            </Button>
        </form>
    );
};

Form.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    changed: PropTypes.func.isRequired,
    submitted: PropTypes.func.isRequired,
    getFieldError: PropTypes.func,
    register: PropTypes.bool.isRequired
};

export default Form;