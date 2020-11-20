import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, TextField, Button} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: 400,
        margin: '0 auto 100px'
    },
    commentInput: {
        marginBottom: theme.spacing(4)
    },
    commentSend: {
        margin: '0 0 0 auto',
        display: 'block'
    }
}));

const CommentForm = ({comment, changed, getFieldError, submitted}) => {
    const classes = useStyles();
    return (
        <form
            className={classes.root}
            autoComplete="off"
            onSubmit={submitted}
        >
            <TextField
                id='comment'
                label="Комментарий"
                name="comment"
                value={comment}
                type="text"
                error={!!getFieldError('comment')}
                helperText={getFieldError('comment')}
                onChange={changed}
                fullWidth
                multiline
                rows={3}
                className={classes.commentInput}
            />
            <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.commentSend}
            >
                Отправить
            </Button>
        </form>
    );
};

CommentForm.propTypes = {
    comment: PropTypes.string.isRequired,
    changed: PropTypes.func.isRequired,
    getFieldError: PropTypes.func.isRequired,
    submitted: PropTypes.func.isRequired
};

export default CommentForm;