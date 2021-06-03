import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, IconButton,Button, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom"
import { addToCart } from '../../store/cart/cart.actions';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch } from "react-redux"
import { addToWishList, deleteFromWishList } from '../../store/user/user.action';
import { useSelector } from "react-redux";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    cross: {
        color: "red"
    },
    noPadding: {
        padding: '0',

    },
});

export default function ImgMediaCard({ product }) {
    const history = useHistory()
    const classes = useStyles();
    const dispatch = useDispatch()
    const userId = useSelector(state => state.userReducer.userId.id)

    return (

        <Card className={classes.root}>
            {userId && <IconButton className={classes.cross} onClick={() => dispatch(deleteFromWishList(product))}
                color="primary" aria-label="add to shopping cart">
                X
                    </IconButton>}
            <CardActionArea
            >
                <CardMedia
                onClick={(e) => history.push("/product/" + product.id)}
                    component="img"
                    alt=""
                    height="200"

                    image={product.img}
                />
            </CardActionArea>
            <CardContent>
                <div>
                    {product.discount && product.discount > 0 ? <strike>${product.price}</strike> : ""
                    }
                </div>
                <div>
                    <Typography display="inline" gutterBottom variant="h5" component="h2">
                        ${Math.round(product.price - product.price * (product.discount / 100))}&nbsp;
                    </Typography>
                    <Typography component="h4" display="inline" color="primary">

                        &nbsp;{product.discount && product.discount > 0 ? (<span>{product.discount}%OFF</span>) : ("")}
                    </Typography>
                    <IconButton onClick={() => dispatch(addToCart(product))}
                        color="primary" aria-label="add to shopping cart">
                        <AddShoppingCartIcon fontSize="large" className={classes.buy} />
                    </IconButton>
                    {userId && <IconButton className={classes.noPadding} onClick={() => dispatch(addToWishList(product))}
                        color="primary" aria-label="add to shopping cart">
                        <FavoriteBorderIcon fontSize="large" className={classes.buy} />
                    </IconButton>}
                </div>

            </CardContent>
        </Card>
    );
}

