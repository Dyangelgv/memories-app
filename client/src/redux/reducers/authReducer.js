import { AUTH, LOGOUT } from '../constants/ActionTypes';


const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            //console.log(action?.data);
            //todo: creamos una copia en el localStorage, guardando en la cache
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data }
        case LOGOUT: //todo:
            localStorage.clear();
            return { ...state, authData: null}
        default:
            return state;
    }
}

export default authReducer;

