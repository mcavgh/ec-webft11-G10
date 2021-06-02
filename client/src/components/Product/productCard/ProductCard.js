import React from 'react';
import { useHistory } from 'react-router';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import { useStyles } from './styles'
import defaultImg from './default.png'
import { useDispatch } from "react-redux";
import { addToCart, addToWishList } from '../../../store/cart/cart.actions';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';



export default function ProductCard({ stock, id, img, name, description, price,discount }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch()
  const product = { stock, id, img, name, description, price,discount }
console.log(discount)

  return (
      <Grid className={classes.root}>
        <CardActionArea onClick={() => history.push(`/product/${id}`)} className={classes.action}>
          <CardMedia
            component="img"
            alt="Food"
            height="140"
            image={img === "no tiene" ? defaultImg : img}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {!name ? 'Some food' : name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {!description ? 'Food is great to eat, it makes you healthy! Sometimes...' : description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Typography variant='h5'>
            ${price}
            <IconButton onClick={() => dispatch(addToCart(product))}
              color="primary" aria-label="add to shopping cart">
              <AddShoppingCartIcon fontSize="large" className={classes.buy} />
            </IconButton>
            <IconButton onClick={() => dispatch(addToWishList(product))}
              color="primary" aria-label="add to shopping cart">
              <FavoriteBorderIcon fontSize="large" className={classes.buy} />
            </IconButton>
          </Typography>
        </CardActions>
      </Grid>
  );
}