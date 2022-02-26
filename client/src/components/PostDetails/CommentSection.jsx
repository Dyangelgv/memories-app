import React, { useState, useRef } from 'react';
import { Typography, Button, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../redux/actions/postsActions'
import useStyle from './styles';

const CommentSection = ({ post }) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const classes = useStyle();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const commentsRef = useRef();


    const handleClick = async() => {
        const finalComment = `${user?.result?.name}: ${comment}`
        const newComment = await dispatch(commentPost(finalComment, post._id));
        setComments(newComment);
        setComment('');
        //tomamos un punto de referencia de un scroll y por cada cambio movera el scrol al ultimo elemento
        commentsRef.current.scrollIntoView({behavior: "smooth" });
    }
    return (
        <div>
            <div className={classes.commentsOuterContainer} >
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant='h5'>Comments</Typography>
                    {
                        comments.map((comment, i) => (
                            <Typography variant='subtitle2' gutterBottom key={i}>
                                <strong>{comment.split(':')[0]}</strong>
                                {comment.split(':')[1]}
                            </Typography>
                        ))
                    }
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name && (
                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant="h6">Write a comment</Typography>
                        <TextField
                            fullWidth variant="outlined" rows={4} label="Comment" multiline
                            value={comment} onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleClick}>
                            Comment!
                        </Button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default CommentSection