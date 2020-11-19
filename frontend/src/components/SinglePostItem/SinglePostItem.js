import React from 'react';
import {
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    makeStyles,
    Typography
} from "@material-ui/core";
import Moment from "react-moment";
import {apiUrl} from "../../constants";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center',
    },
    img: {
        height: 'auto',
        maxWidth: 400,
        margin: '0 auto'
    }
}));

const SinglePostItem = ({title, description, image, userName, datetime}) => {
    const classes = useStyles();
    const path = apiUrl + '/uploads/' + image;

    return (
        <Grid container className={classes.root} direction="column" justify="center">
            <Grid item>
                <Typography variant="h4" component="h4" gutterBottom align="center">
                    {title}
                </Typography>
                <CardHeader
                    title={userName}
                    subheader={
                        <Moment format="DD.MM.YYYY HH.mm">{datetime}</Moment>
                    }
                />
                <CardMedia
                    component="img"
                    alt={title}
                    image={path}
                    title={title}
                    className={classes.img}
                />
                <CardContent>
                    <Typography variant="body1" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </Grid>
        </Grid>
    );
};

SinglePostItem.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    userName: PropTypes.string.isRequired,
    datetime: PropTypes.string.isRequired
};

export default SinglePostItem;