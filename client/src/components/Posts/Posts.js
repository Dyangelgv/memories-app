import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
//redux
import { useSelector } from 'react-redux';

//components
import Post from './Post/Post'
//Styles
import useStyle from './styles.js';



const Posts = ({ setCurrentId }) => {
    const classes = useStyle();

    //todo: Utilizaremos el englobamiento de seleccion en redux
    //Seleccionamos el reducer del index por medio del estado
    const { posts, isLoading } = useSelector((state) => state.postsReducer);

    if(!posts.length && !isLoading) return "No posts"

    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
                {posts.map((post) =>(
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts