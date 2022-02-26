import * as api from '../../api/'
import { AUTH } from '../constants/ActionTypes';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        //log in the user
        const { data } = await api.signIn(formData);
        //console.log(data);
        dispatch({ type: AUTH, data });

        navigate('/')
    } catch (err) {
        console.log(err);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        //sign up the user
        const { data } = await api.signUp(formData);
        console.log(data);
        dispatch({ type: AUTH, data });

        navigate('/')
    } catch (err) {
        console.log(err);
    }
}