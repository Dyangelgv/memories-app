import React, { useState } from 'react';
import { Avatar, Typography, Paper, Button, Grid, Container, } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import {useNavigate} from 'react-router-dom';
//components
import Input from './input.js';
import Icon from './Icon.js'

//redux
import { useDispatch } from 'react-redux';
import { signin, signup } from '../../redux/actions/authActions.js'

import useStyle from './styles';

//initialState
const initialState = { firstname: '', lastname: '', email: '', password: '', confirmPassword: '',}

const Auth = () => {

  const classes = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  
  //todo: seteamos el estado con una acción booleana
  const handleShowPassword = () => setShowPassword((prevShowPassoword) => !prevShowPassoword);

  const handleSubmit = e => {
    e.preventDefault();
    if(isSignUp){
      dispatch(signup(formData, navigate));
    }else{
      dispatch(signin(formData, navigate));
    }
  }

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj; //todo: validamos que el objeto puede venir "undefined"
    const token = res?.tokenId;
    try {
      //todo: Enviamos la información del perfil y el token
      dispatch({type: 'AUTH', data: {result, token}});
      navigate('/')
  } catch (err) {
    console.log(err);
  }
}

const googleFailure = async (err) => {
  console.log(err);
  console.log(`Google Sign In unsuccessfully. Try again later`);
}

const switchMode = () => {
  setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  setShowPassword(false);
}

return (
  <Container component={"main"} maxWidth="xs">
    <Paper className={classes.paper} elevation={3}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant='h5'>
        {isSignUp ? "Sign Up" : "Sign In"}
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {isSignUp && (
            <>

              <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half={6} />
              <Input name='lastName' label="Last Name" handleChange={handleChange} half={6} />

            </>
          )}
          <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
          <Input name="password" label="Password" handleChange={handleChange}
            type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
          {/*Confirmar password si se esta registrando */}
          {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
        {/* Implementamos el componente Google */}
        <GoogleLogin
          clientId='301760106364-1505dtep4vj15jvl8sjft7rpova6g5ni.apps.googleusercontent.com'
          render={(renderProps) => (
            <Button
              className={classes.googleButton}
              color="primary"
              fullWidth
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              startIcon={<Icon />}
              variant="contained"
            >
              Google Sign in
            </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin"
        />
        {/* */}
        <Grid container justifyContent='flex-end'>
          <Grid item >
            <Button onClick={switchMode}>
              {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  </Container>
)
}

export default Auth