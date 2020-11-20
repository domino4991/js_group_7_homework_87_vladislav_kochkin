import React from 'react';
import {
    Grid,
    Card,
    makeStyles,
    CardMedia,
    CardContent,
    Button,
    CardHeader,
    Avatar,
    Badge
} from "@material-ui/core";
import PropTypes from 'prop-types';
import {apiUrl} from "../../constants";
import {NavLink} from "react-router-dom";
import Moment from "react-moment";
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
        position: 'relative'
    },
    item: {
        marginBottom: theme.spacing(3)
    },
    img: {
        height: 'auto',
        maxWidth: 345
    },
    avatar: {
        margin: "0 auto",
        marginBottom: theme.spacing(4),
        backgroundColor: 'transparent',
        width: 70,
        height: 70
    },
    textSvg: {
        color: "#000",
        fontSize: '50px'
    },
    titleLink: {
        display: 'block',
        margin: '0 auto',
        textAlign: 'center',
        boxShadow: '0 0 1px 1px #000'
    },
    badgeBox: {
        position: 'absolute',
        top: '35px',
        right: '20px'
    }
}));

const PostsItem = ({title, image, userName, datetime, id, countComment}) => {
    const classes = useStyles();
    const path = apiUrl + '/uploads/' + image;

    return (
        <Grid item xs={4} className={classes.item}>
            <Card className={classes.root}>
                <div className={classes.badgeBox}>
                    <Badge
                        badgeContent={countComment}
                        color="primary"
                        className={classes.badge}
                        showZero
                    >
                        <CommentIcon />
                    </Badge>
                </div>
                <CardHeader
                    title={userName}
                    subheader={
                        <Moment format="DD.MM.YYYY HH.mm">{datetime}</Moment>
                    }
                />
                {image ? <CardMedia
                    component="img"
                    alt={title}
                    height="140"
                    image={path}
                    title={title}
                    className={classes.img}
                /> : <Avatar variant="rounded" className={classes.avatar}>
                    <QuestionAnswerIcon className={classes.textSvg} />
                </Avatar>}
                <CardContent>
                    <Button
                        component={NavLink}
                        to={`/post/${id}`}
                        color="inherit"
                        className={classes.titleLink}
                    >{title}</Button>
                </CardContent>
            </Card>
        </Grid>
    );
};

PostsItem.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    userName: PropTypes.string.isRequired,
    datetime: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    countComment: PropTypes.number.isRequired
};

export default PostsItem;