import {
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS
} from "../actionTypes";
import {axiosApi} from "../../axiosApi";
import {push} from 'connected-react-router';
import {toast} from "react-toastify";

const loginUserSuccess = data => ({type: LOGIN_USER_SUCCESS, data});
const loginUserError = error => ({type: LOGIN_USER_ERROR, error});
const registerUserSuccess = () => ({type: REGISTER_USER_SUCCESS});
const registerUserError = error => ({type: REGISTER_USER_ERROR, error});

export const registerUser = userData => {
    return async dispatch => {
        try {
            const response = await axiosApi.post('/users', userData);
            dispatch(registerUserSuccess());
            toast.success(response.data.message + '. Вы будете перенаправлены на страницу входа.');
            setTimeout(() => {
                dispatch(push('/login'));
            }, 5000);
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(registerUserError(e.response.data));
            } else {
                dispatch(registerUserError(e.message));
            }
        }
    }
};

export const loginUser = userData => {
    return async dispatch => {
        try {
            const response = await axiosApi.post('/users/sessions', userData);
            dispatch(loginUserSuccess(response.data));
            dispatch(push('/'));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(loginUserError(e.response.data.error));
                toast.error(e.response.data.error);
            } else {
                dispatch(loginUserError(e.message));
            }
        }
    };
};

export const logoutUser = () => {
    return async (dispatch, getState) => {
        const token = getState().users.user && getState().users.user.token;
        const headers = {'Authorization': token};
        try {
            await axiosApi.delete('/users/sessions', {headers});
            dispatch({type: LOGOUT_USER});
            dispatch(push('/'));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(loginUserError(e.response.data.error));
            } else {
                dispatch(loginUserError(e.message));
            }
        }
    };
};