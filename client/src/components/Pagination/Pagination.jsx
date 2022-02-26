import React, { useEffect } from 'react';
import { getPosts } from '../../redux/actions/postsActions';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import useStyles from './styles.js';
import { Link } from 'react-router-dom';

const Paginate = ({ page }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { numberOfPages } = useSelector((state) => state.postsReducer)


    useEffect(() => {
        //
        if (page) dispatch(getPosts(page))
    }, [page, dispatch])
    return (
        //configuramos el conponente Paginate
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={page || 1}            
            variant="outlined"
            color='primary'
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    );

}

export default Paginate;