import React from 'react';
import {
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    makeStyles,
    Typography,
    Avatar
} from "@material-ui/core";
import Moment from "react-moment";
import {apiUrl} from "../../constants";
import PropTypes from "prop-types";
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center',
    },
    img: {
        height: 'auto',
        maxWidth: 400,
        margin: '0 auto'
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
                {image ? <CardMedia
                    component="img"
                    alt={title}
                    image={path}
                    title={title}
                    className={classes.img}
                /> : <Avatar className={classes.avatar}>
                    <QuestionAnswerIcon className={classes.textSvg} />
                </Avatar>}
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