import React from 'react';
import {Button, makeStyles, TextField, Grid, Typography, CardMedia} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    root: {
        width: 600,
        margin: '0 auto'
    },
    input: {
        display: 'none'
    },
    inputText: {
        marginBottom: theme.spacing(3)
    },
    imgText: {
        marginRight: theme.spacing(3)
    },
    img: {
        width: "100%",
        height: 'auto',
        maxWidth: 150,
        marginRight: theme.spacing(5)
    },
    imgBox: {
        marginBottom: theme.spacing(3)
    },
    btnSpacing: {
        marginTop: theme.spacing(3)
    },
    btnSend: {
        display: 'block',
        margin: '0 0 0 auto'
    }
}));

const PostForm = ({
    changedFile,
    title,
    description,
    getFieldError,
    changed,
    preview,
    submitted
}) => {
    const classes = useStyles();

    return (
        <form
            className={classes.root}
            autoComplete="off"
            onSubmit={submitted}
        >
            <TextField
                id='title'
                label="Заголовок"
                name="title"
                value={title}
                type="text"
                error={!!getFieldError('title')}
                helperText={getFieldError('title')}
                onChange={changed}
                className={classes.inputText}
                fullWidth
            />
            <TextField
                id='description'
                label="Описание"
                name="description"
                value={description}
                type="text"
                error={!!getFieldError('description')}
                helperText={getFieldError('description')}
                onChange={changed}
                className={classes.inputText}
                multiline
                fullWidth
                rows={8}
            />
            <Grid
                container
                className={classes.imgBox}
            >
                <Typography
                    variant="h6"
                    component="h6"
                    className={classes.imgText}
                >
                    Изображение
                </Typography>
                {preview && <CardMedia
                    component="img"
                    alt={title}
                    height="140"
                    image={preview}
                    title={title}
                    className={classes.img}
                />}
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    name="image"
                    onChange={changedFile}
                    type="file"
                />
                <label htmlFor="contained-button-file">
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        className={preview && classes.btnSpacing}
                    >
                        {preview ? "Выбрать другое изображение" : "Выбрать изображение"}
                    </Button>
                </label>
            </Grid>
            <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.btnSend}
            >
                Создать
            </Button>
        </form>
    );
};

PostForm.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    getFieldError: PropTypes.func.isRequired,
    changedFile: PropTypes.func.isRequired,
    changed: PropTypes.func.isRequired
};

export default PostForm;