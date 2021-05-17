import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import { Grid, Typography, Divider, Button, Box } from '@material-ui/core/';
import { useStyles } from './styles'
import AppBar from '../appBar/AppBar'
import defaultImg from './default.png'
import { getOneProduct } from '../../store/product/product.actions';
import { addToCart } from '../../store/cart/cart.actions';

export default function Product() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams()
    const product = useSelector(state => state.productReducer?.oneProduct)
    
    useEffect( () => {
        dispatch(getOneProduct(id))
    },[dispatch,id])
    const oneProduct = useSelector(state => state.productReducer.oneProduct)
    const { img, name, description, price, stock } = oneProduct

    return (
        <>
            <AppBar />
            { name && name.length === 0 ? <h1>Cargando...</h1> :
            <Grid container spacing={1} className={classes.container} >
                <Grid item xs={12} sm={6}>
                    <img src={!img ? defaultImg:img } alt='Food' className={classes.media} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container direction='column' className={classes.info}>
                        <Box mt={2}>
                            <Typography variant='h4'>{name}</Typography>
                            <Divider />
                            <Typography variant='subtitle1'>{description}</Typography>
                            <Typography variant='h5'>${price}</Typography>
                            <Typography variant='h6'>{stock}</Typography>
                        </Box>
                        <Button
                            variant='contained'
                            color='primary'
                            className={classes.button}
                            onClick={() => dispatch(addToCart(product))}
                            >Agregar al Carrito!</Button>
                    </Grid>
                </Grid>
            </Grid>
            }
        </>
    );
}