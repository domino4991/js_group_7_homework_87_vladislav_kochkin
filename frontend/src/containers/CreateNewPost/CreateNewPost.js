import React, {useState} from 'react';
import {CssBaseline, Container, Typography} from '@material-ui/core';
import PostForm from "../../components/UI/PostForm/PostForm";
import {useDispatch, useSelector} from "react-redux";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {postNewPost} from "../../store/actions/postsActions";
import {push} from 'connected-react-router';

const CreateNewPost = () => {
    const {error} = useSelector(state => state.posts);
    const {user} = useSelector(state => state.users);
    const [post, setPost] = useState({
        title: '',
        description: '',
        image: ''
    });
    const [previewImg, setPreviewImg] = useState(null);
    const dispatch = useDispatch();

    if(!user) {
        dispatch(push('/login'));
    }

    const onChangeFields = e => {
        const name = e.target.name;
        const value = e.target.value;
        setPost(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onChangeFile = e => {
        const name = e.target.name;
        const value = e.target.files[0];
        let reader = new FileReader();
        reader.onload = (event => {
            setPreviewImg(event.target.result);
        })
        reader.readAsDataURL(value);
        setPost(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return null;
        }
    };

    const onSubmittedForm = e => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(post).forEach(key => {
            formData.append(key, post[key]);
        });
        dispatch(postNewPost(formData));
    };

    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg">
                <Typography
                    variant="h5"
                    component="h5"
                    align="center"
                    gutterBottom
                >
                    Создать новый пост
                </Typography>
                <PostForm
                    changedFile={e => onChangeFile(e)}
                    title={post.title}
                    description={post.description}
                    changed={e => onChangeFields(e)}
                    getFieldError={getFieldError}
                    preview={previewImg}
                    submitted={e => onSubmittedForm(e)}
                />
            </Container>
            <ToastContainer autoClose={3000} />
        </>
    );
};

export default CreateNewPost;