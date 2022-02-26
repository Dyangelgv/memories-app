import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Chip } from '@material-ui/core';

import { useLocation, useNavigate } from 'react-router-dom';
//redux
import { getPostsBySearch} from '../../redux/actions/postsActions.js';
import Pagination from '../Pagination/Pagination';
//components
import Posts from '../Posts/Posts.js';
import Form from '../Form/Form.js';
//styles
import useStyle from './styles.js';

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {

    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('')
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const classes = useStyle();
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const searchPost = () => {
        if (search.trim() || tags) {
            //dispatch fetch post
            //todo, en tags = [europa, use] => 'europa,use'
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            //todo:vavegamos a la ruta de la busqueda indicada con los elementos que buscaremos
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate('/')
        }
    }

    const handleKeyPress = e => {
        if (e.keyCode === 13) {
            searchPost()
        }
    }

    //const handleAdd = tag => setTags([...tags, tag]);
    const handleAdd = (e) => {
        if (e.charCode === 13) {
            //console.log(e.target.value);
            setTags([...tags, e.target.value])
            setTag('');
        }
    }

    const handleDelete = tagDelete => {
        setTags((chip) => chip.filter(tag => tag !== tagDelete))
    };

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch'
                    spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        {/* Posts */}
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField
                                name='search'
                                variant='outlined'
                                label='Search Memories'
                                fullWidth
                                onKeyPress={handleKeyPress}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            <TextField name='tag' variant='outlined' label=' Tags' fullWidth value={tag} onChange={e => setTag(e.target.value)} onKeyPressCapture={handleAdd} />
                            <Paper className={classes.chipContainer} >
                                {tags.map((item, i) => (
                                    <Chip key={i} label={item} onDelete={() => handleDelete(item)} />
                                ))}
                            </Paper>
                            <Button onClick={searchPost} color="primary" className={classes.searchButton} variant="contained">Search</Button>
                        </AppBar>
                        {/* Sección del formulario */}
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {/* Pagination */}
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                </Grid>
            </Grid>
        </Container>
        </Grow >
    )
}

export default Home