import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase64 from 'react-file-base64';
//redux
import { useDispatch, useSelector } from 'react-redux';

import { createPost, updatePost } from '../../redux/actions/postsActions';

import {useNavigate} from 'react-router-dom';

//Styles
import useStyle from './styles.js';


//OBTENER EL ID ACTUAL

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    //todo: si existe CurrendId buscalo en el array "posts", sino retorna null
    const post = useSelector((state) => currentId ? state.postsReducer.posts.find((message) => message._id === currentId) : null);
    //console.log(`post: ${post} y ${currentId}`);


    useEffect(() => {
        //todo: Si existe, cargamos el estado del formPost con los valores encontrados
        if (post) setPostData(post);
    }, [post]);


    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }, navigate));
        } else {
            //Difuncimos una copia del estado actual
            //tomamos al usuario guardado en el localStore y enviamos el name
            dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
        }
        clear();
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper} elevation={6} >
            <form
                className={`${classes.root} ${classes.form}`}
                autoComplete='off'
                noValidate
                onSubmit={handleSubmit}
            >
                <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} Memories</Typography>
                <TextField
                    name='title'
                    variant='outlined'
                    label='Title'
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField
                    name='message'
                    variant='outlined'
                    label='Message'
                    fullWidth
                    multiline rows={4}
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField
                    name='tags'
                    variant='outlined'
                    label='Tags'
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}//separamos cada etiqueta por ","
                />
                <div className={classes.fileInput}>
                    <FileBase64
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>
                    Submit
                </Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>
                    Clear
                </Button>
            </form>
        </Paper>
    );
}

export default Form;