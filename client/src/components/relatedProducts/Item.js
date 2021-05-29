import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, IconButton, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom"
import { addToCart } from '../../store/cart/cart.actions';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useDispatch } from "react-redux"
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export default function ImgMediaCard({ product }) {
    const history = useHistory()
    const classes = useStyles();
    const dispatch = useDispatch()

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
                    </CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        ${product.price}
                        <IconButton onClick={() => dispatch(addToCart(product))}
                            color="primary" aria-label="add to shopping cart">
                            <AddShoppingCartIcon fontSize="large" className={classes.buy} />
                        </IconButton>
                    </Typography>

                </CardContent>
        </Card>
    );
}

