import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPostComments, postNewComment} from "../../store/actions/commentsActions";
import {CssBaseline, Container, Typography} from "@material-ui/core";
import CommentItem from "../../components/CommentItem/CommentItem";
import CommentForm from "../../components/UI/CommentForm/CommentForm";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Comments = ({postId}) => {
    const {comments, error} = useSelector(state => state.comments);
    const {user} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');

    useEffect(() => {
        dispatch(getPostComments(postId));
    }, [dispatch, postId]);

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return null;
        }
    };

    const onChangeField = e => {
        const value = e.target.value;
        setComment(value);
    };

    const onSubmittedForm = e => {
        e.preventDefault();
        const data = {
            post: postId,
            comment: comment
        };
        dispatch(postNewComment(data));
    };

    return (
        <>
            <CssBaseline />
            <Container maxWidth='lg'>
                {!comments ? <Typography
                    variant="body1"
                    component="p"
                    align="center"
                    gutterBottom
                >
                    {error}
                </Typography>
                    :
                comments.map(item => <CommentItem
                    key={item._id}
                    comment={item.comment}
                    datetime={item.datetime}
                    author={item.user.name}
                />)
                }
                {user &&
                <>
                    <Typography
                        variant="h6"
                        component="h6"
                        align="center"
                        gutterBottom
                    >
                        Оставить комментарий
                    </Typography>
                    <CommentForm
                        getFieldError={getFieldError}
                        comment={comment}
                        submitted={e => onSubmittedForm(e)}
                        changed={e => onChangeField(e)}
                    />
                </>
                }
                <ToastContainer autoClose={3000} />
            </Container>
        </>
    );
};

export default Comments;