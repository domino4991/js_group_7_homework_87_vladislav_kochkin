import React from 'react';
import {makeStyles, Typography, Paper} from "@material-ui/core";
import Moment from "react-moment";

const useStyles = makeStyles(theme => ({
    paperContainer: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2)
    },
    paperHeader: {
        marginBottom: theme.spacing(2)
    },
    authorName: {
        marginRight: theme.spacing(2),
        fontWeight: 'bold'
    }
}));

const CommentItem = ({comment, datetime, author}) => {
    const classes = useStyles();
    return (
        <>
            <Paper
                elevation={3}
                className={classes.paperContainer}
            >
                <Paper elevation={0} className={classes.paperHeader}>
                    <Typography
                        variant="body2"
                        component="span"
                    >
                        <Moment format="DD.MM.YYYY HH:mm">{datetime}</Moment>
                    </Typography>
                </Paper>
                <Paper elevation={0}>
                    <Typography
                        variant="body1"
                        component="p"
                    >
                        <Typography
                            variant="body1"
                            component="span"
                            className={classes.authorName}
                        >
                            {author}:
                        </Typography>
                        {comment}
                    </Typography>
                </Paper>
            </Paper>
        </>
    );
};

export default CommentItem;