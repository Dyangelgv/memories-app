import React, { useState, useEffect, useCallback } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography, } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import { LOGOUT } from '../../redux/constants/ActionTypes'
//redux 
import { useDispatch } from 'react-redux';
//styles
import useStyle from './styles';

const Navbar = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let locate = useLocation();
    //todo: Cargamos el perfil guardado en el localStorage en nustro estado

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


    const Logout = useCallback(() => {
        dispatch({ type: LOGOUT });

        navigate('/auth');

        setUser(null);
    }, [dispatch, navigate])


    useEffect(() => {
        const token = user?.token;
        //JWT
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) Logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [locate, Logout, user?.token]);
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to={'/'} className={classes.brandContainer}>
                <img src={memoriesText} alt="icon" height="45px" />
                <img className={classes.image} src={memoriesLogo} alt="memories" height="40px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {
                    user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                                {user.result.name.charAt(0)}
                            </Avatar>
                            <Typography className={classes.userName} variant='h6' >{user.result.name}</Typography>
                            <Button variant='contained' color='secondary' className={classes.logout} onClick={Logout}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                    )
                }
            </Toolbar>

        </AppBar>
    )
}





export default Navbar