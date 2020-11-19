import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getSinglePost} from "../../store/actions/postsActions";
import SinglePostItem from "../../components/SinglePostItem/SinglePostItem";
import Container from "@material-ui/core/Container";

const SinglePost = props => {
    const {post} = useSelector(state => state.posts);
    const dispatch = useDispatch();
    const id = props.match.params.id;

    useEffect(() => {
        dispatch(getSinglePost(id));
    }, [dispatch, id]);

    return (
        <>
            {post && <Container maxWidth="lg">
                <SinglePostItem
                    userName={post.author.name}
                    title={post.title}
                    datetime={post.datetime}
                    description={post.description}
                    image={post.image}
                />
            </Container>}
        </>
    );
};

export default SinglePost;