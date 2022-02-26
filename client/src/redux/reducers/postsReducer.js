import { CREATE, FETCH_ALL, FETCH_POST_BY_ID, UPDATE, DELETE, LIKE, COMMENT, FETCH_BY_SEARCH, START_LOADING, END_LOADING } from '../constants/ActionTypes';
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {isLoading: false, posts: []}, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return{
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }
        case FETCH_POST_BY_ID://obtenemos solo un post
            return { ...state, post: action.payload.post };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload.data };

        case CREATE:   //todo: persistent state and saved data         
            return {...state, posts:[...state.posts, action.payload] };

        case UPDATE: //todo: buscamos si existe el post, si se encuntra actualiza sino manda el post normal
        case LIKE: //todo: Se puede unir dos casos si realizan lo mismo
            return {...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)};
        
        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    //cambiar el post que se esta agregando el comentario
                    if(post._id === action.payload._id) return action.payload;
                    //reronar los posts normalmente.
                    return post;
                })
            }
        case DELETE: //todo: Filtramos por el elemento a buscar 
            return {...state, posts: state.posts.filter(post => post._id !== action.payload)}
        default:
            return state;
    }
}