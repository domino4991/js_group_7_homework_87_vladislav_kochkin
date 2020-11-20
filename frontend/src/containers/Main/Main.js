import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../store/actions/postsActions";
import {Container, Grid, Typography} from "@material-ui/core";
import PostsItem from "../../components/PostsItem/PostsItem";

const Main = () => {
    const {posts, error} = useSelector(state => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <>
            <Container maxWidth='lg'>
                <Typography gutterBottom align="center" variant="h4" component="h2">
                    Посты
                </Typography>
                {!error ?
                    <Grid container justify="center">
                        {posts && posts.map(item => <PostsItem
                            key={item._id}
                            userName={item.author.name}
                            datetime={item.datetime}
                            id={item._id}
                            title={item.title}
                            image={item.image}
                            countComment={item.countComment}
                        />)}
                    </Grid> : <p style={{textAlign: 'center'}}>{error}</p>
                }
            </Container>
        </>
    );
};

export default Main;