import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getSinglePost} from "../../store/actions/postsActions";
import SinglePostItem from "../../components/SinglePostItem/SinglePostItem";
import {Container, Typography} from "@material-ui/core";
import Comments from "../Comments/Comments";

const SinglePost = props => {
    const {post, error} = useSelector(state => state.posts);
    const dispatch = useDispatch();
    const id = props.match.params.id;

    useEffect(() => {
        dispatch(getSinglePost(id));
    }, [dispatch, id]);

    return (
        <>
            {!error ?
                post && <Container maxWidth="lg">
                    <SinglePostItem
                        userName={post.author.name}
                        title={post.title}
                        datetime={post.datetime}
                        description={post.description}
                        image={post.image}
                    />
                    <Typography
                        variant="h6"
                        component="h6"
                        gutterBottom
                        align="center"
                    >
                        Комментарии
                    </Typography>
                    <Comments
                        postId={id}
                    />
                </Container> : <p style={{textAlign: 'center'}}>{error}</p>
            }
        </>
    );
};

export default SinglePost;