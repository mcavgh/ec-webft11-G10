import React from 'react';
import { useHistory } from 'react-router';
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from '@material-ui/core';
import { useStyles } from './styles';
import defaultImg from './default.png';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/cart/cart.actions';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

export default function ProductCard({
    stock,
    id,
    img,
    name,
    description,
    price,
}) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const product = { stock, id, img, name, description, price };

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={() => history.push(`/product/${id}`)}>
                <CardMedia
                    component='img'
                    alt={name}
                    height='140'
                    image={img === 'no tiene' ? defaultImg : img}
                    title={name}
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                        {!name ? 'Comida' : name}
                    </Typography>
                    <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                    >
                        {!description
                            ? 'La comida es genial para comer, ¡es sana! A veces...'
                            : description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Typography variant='h5'>
                    ${!price ? 150 : price}
                    <IconButton
                        onClick={() => dispatch(addToCart(product))}
                        color='primary'
                        aria-label='add to shopping cart'
                    >
                        <AddShoppingCartIcon fontSize='large' />
                        {product.count}
                    </IconButton>
                </Typography>
            </CardActions>
        </Card>
    );
}
