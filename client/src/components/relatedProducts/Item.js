import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom"
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export default function ImgMediaCard({ product }) {
    const history = useHistory()
    const classes = useStyles();

    return (

        <Card className={classes.root}>
            <CardActionArea
                onClick={(e) => history.push("/product/" + product.id)}
            >
                <CardMedia
                    component="img"
                    alt=""
                    height="200"

                    image={product.img}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        ${product.price}
                    </Typography>
                   
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

