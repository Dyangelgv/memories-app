import * as api from '../../api/'
import { CREATE, FETCH_ALL, FETCH_BY_SEARCH, UPDATE, DELETE, LIKE, COMMENT, START_LOADING, END_LOADING, FETCH_POST_BY_ID } from '../constants/ActionTypes';
//Action Creators
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchPosts(page);
        //console.log(data);
        dispatch({ type: FETCH_ALL, payload: data });

        dispatch({ type: END_LOADING })
    } catch (err) {
        console.log(err.message);
    }
}

export const getPostById = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchPostById(id);
        //console.log("ById: "+data);
        dispatch({ type: FETCH_POST_BY_ID, payload: { post: data } });

        dispatch({ type: END_LOADING })
    } catch (err) {
        console.log(err.message);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        //console.log("BySearch: ", data);

        dispatch({ type: FETCH_BY_SEARCH, payload: { data } });

        dispatch({ type: END_LOADING })
    } catch (err) {
        console.log(err);
    }
}

export const createPost = (post, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);
        navigate(`/posts/${data._id}`);
        dispatch({ type: CREATE, payload: data });

    } catch (err) {
        console.log(err.message);
    }
}

export const updatePost = (id, post, navigate) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        navigate(`/posts/${id}`);

        dispatch({ type: UPDATE, payload: data });
    } catch (err) {
        console.log(err.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (err) {
        console.log(err.message);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)

        dispatch({ type: LIKE, payload: data });
    } catch (err) {
        console.log(err.message);
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id);
        //console.log(data);
        dispatch({type: COMMENT, payload: data});
        return data.comments;
    } catch (err) {
        console.log(err.message);
    }
}