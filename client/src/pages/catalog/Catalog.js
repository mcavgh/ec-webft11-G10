import './catalog.css';
import React from 'react';
import { useSelector } from 'react-redux';
import AppBar from '../../components/appBar/AppBar';
import ProductCard from '../../components/Product/productCard/ProductCard';
import FilterGeneres from './FilterGeneres';
import { Typography, Paper, Grid } from '@material-ui/core/';
const Catalog = () => {
    let products = useSelector(state => state.productReducer.searchResults);

    return (
        <>
            <AppBar />
            <div className='catalog--main-row'>
                <Paper className='catalog--main-col-menu-box'>
                    <Typography gutterBottom variant='h5' component='h2'>
                        Categorías
                    </Typography>
                    <FilterGeneres />
                </Paper>
                <div className='catalog--main-col'>
                    {products && products.length >= 1 ? (
                        products.map((product, index) => {
                            return (
                                <Grid item xs={12} sm={4} md={3}>
                                    <ProductCard
                                        key={index}
                                        id={product.id}
                                        name={product.name}
                                        description={product.description}
                                        img={product.img}
                                        price={product.price}
                                        stock={product.stock}
                                    />
                                </Grid>
                            );
                        })
                    ) : (
                        <p>No se encontraron productos</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Catalog;
