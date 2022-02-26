import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//components
import Navbar from './components/NavBar/Navbar.js';
import Home from './components/Home/Home.js';
import Auth from './components/Auth/Auth.js';
import PostDetail from './components/PostDetails/PostDetails'

const App = () => {

    const user = JSON.parse(localStorage.getItem('profile'));
    //console.log(user);
    return (
        <Router>
            <Container maxWidth="xl">
                {/* Navbar */}
                <Navbar />
                <Routes>       
                    {/* Home */}                    
                    <Route path='/' element={<Navigate replace to='/posts' /> } />
                    <Route path='/auth' element={!user ? <Auth />: <Navigate to="/posts"/>} />
                    <Route path='/posts' element={<Home />} />
                    <Route path='/posts/search' element={<Home />} />
                    <Route path='/posts/:id' element={<PostDetail />} />                    
                    
                </Routes>
            </Container>
        </Router>

    )

}

export default App;