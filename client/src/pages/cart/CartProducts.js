import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Button, CardMedia } from '@material-ui/core/';
import AppBar from "../../components/appBar/AppBar";
import defaultImg from "../../components/Product/productCard/ProductCard";
import { addToCart, removeFromCart, getTotal, restToCart } from '../../store/cart/cart.actions';
import { useStyles } from './styleCart';
import { AuthContext } from '../../components/AuthContext';
import { getUsersByEmail } from '../../store/user/user.action';
import IconButton from '@material-ui/core/IconButton';
import RemoveShoppingCartOutlinedIcon from '@material-ui/icons/RemoveShoppingCartOutlined';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Swal from 'sweetalert2';

export default function Cart() {

  const classes = useStyles();
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart.cartItems)
  const total = useSelector(state => state.cart.total)
  const cartQuantity = useSelector(state => state.cart.cartQuantity)

  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    dispatch(getTotal())
  }, [dispatch])

  const handlerClick = () => {

    try {
      dispatch(getUsersByEmail(currentUser.email))
        }  catch (error) {
      Swal.fire({icon: 'error', title: 'Oops...', text: 'Something went wrong!',})
    }
  }
  return (
    <div className={classes.container}>
      <AppBar />
      {cart && cart.length > 0 ? (
        cart.map(product => {
          return <Card
            className={classes.root}
          >
            <Grid xs={1} />
            <Grid xs={2} >
              <CardMedia component="img" alt="Food" image={product.img === "no tiene" ? defaultImg : product.img} title="Contemplative Reptile" className={classes.photo}
              />
            </Grid>
            <Grid xs={4} className={classes.details}>
              <CardContent
                className={classes.content}>
                <Typography component="h4" variant="h4" >
                  {product.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {product.description}
                </Typography>
              </CardContent>
            </Grid>
            <Grid className={classes.input} xs={2}>
              <Typography component="h3" variant="h6">
              </Typography>
              <IconButton onClick={() => dispatch(addToCart(product))}
                color="primary" aria-label="add to shopping cart">
                <AddShoppingCartIcon fontSize="large" />
              </IconButton>
              <Typography display="inline" component="h3" variant="h4">
                {product.count}
              </Typography>
              <IconButton onClick={() => dispatch(restToCart(product))}
                color="primary" aria-label="asdf">
                < RemoveShoppingCartOutlinedIcon fontSize="large" />
              </IconButton>
              <Typography component="h3" variant="h6">
                ({product.stock} disponibles)
              </Typography>
              <Button
                color="primary"
                onClick={() => dispatch(removeFromCart(product))}
              >remove from cart</Button>
            </Grid>
            <Grid xs={2}
              style={{ marginTop: 16 }}>
              <Typography component="h4" variant="h4">
                ${product.price}              </Typography>
            </Grid>
          </Card>
        })
      ) : ("")
      }
      {cart && cart.length > 0 ? (
        <Card className={classes.root}
        >
          <Grid xs={7} className={classes.photo} />
          <Grid xs={2}>
            <Typography component="h5" variant="h5" >
              Subtotal
          </Typography>
            <Typography component="h4" variant="h4" style={{ marginTop: 16 }}
            >
              Total
          </Typography>
          </Grid>
          <Grid xs={2}
          >
            <Typography component="h5" variant="h5"
            >
              ${total}
            </Typography>
            <Typography component="h4" variant="h4"
              style={{ marginTop: 16 }}
            >
              ${total}
            </Typography>
            <Button onClick={handlerClick} style={{ marginTop: 16 }} color="primary" variant="contained" to="/PageCheckout" component={Link}
            >Checkout</Button>
          </Grid>
        </Card>
      ) : (<Typography component="h3" variant="h3" >
        No hay productos en el carrito
      </Typography>)}
    </div>
  );
}
