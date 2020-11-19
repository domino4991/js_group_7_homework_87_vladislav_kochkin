import React from 'react';
import {
    Grid,
    Card,
    makeStyles,
    CardMedia,
    CardContent,
    Button,
    CardHeader
} from "@material-ui/core";
import PropTypes from 'prop-types';
import {apiUrl} from "../../constants";
import {NavLink} from "react-router-dom";
import Moment from "react-moment";

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
    },
    item: {
        marginBottom: theme.spacing(3)
    },
    img: {
        height: 'auto',
        maxWidth: 345
    }
}));

const PostsItem = ({title, image, userName, datetime, id}) => {
    const classes = useStyles();
    const path = apiUrl + '/uploads/' + image;

    return (
        <Grid item xs={4} className={classes.item}>
            <Card className={classes.root}>
                <CardHeader
                    title={userName}
                    subheader={
                        <Moment format="DD.MM.YYYY HH.mm">{datetime}</Moment>
                    }
                />
                <CardMedia
                    component="img"
                    alt={title}
                    height="140"
                    image={path}
                    title={title}
                    className={classes.img}
                />
                <CardContent>
                    <Button
                        component={NavLink}
                        to={`/post/${id}`}
                        color="inherit"
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
    id: PropTypes.string.isRequired
};

export default PostsItem;