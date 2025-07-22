// import "./catalog.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from '../../components/Product/productCard/ProductCard';
import FilterGeneres from './FilterGeneres';
import { Typography, Paper, Grid, Container, Box, CircularProgress, Divider } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import { searchProductSuccess } from '../../store/product/product.actions';
import CatalogComponent from '../../components/category/CatalogCategory';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Tilt from 'react-vanilla-tilt';

// Definición de estilos usando makeStyles de Material-UI
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
  },
  catalogContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: theme.spacing(2),
  },
  sidebarContainer: {
    padding: theme.spacing(2),
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    height: 'fit-content',
  },
  sidebarTitle: {
    marginBottom: theme.spacing(2),
    fontWeight: 600,
    color: theme.palette.primary.main,
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    paddingBottom: theme.spacing(1),
  },
  productsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  productItem: {
    margin: theme.spacing(1),
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
  noProducts: {
    padding: theme.spacing(4),
    textAlign: 'center',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    color: theme.palette.text.secondary,
  },
  mobileCategories: {
    marginBottom: theme.spacing(2),
  },
}));

const Catalog = () => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');
    const dispatch = useDispatch();
    let products = useSelector(state => state.productReducer.searchResults);
    const loading = useSelector(state => state.productReducer.loading);

    useEffect(() => {
        axios.get(`/products/`).then(result => {
            dispatch(searchProductSuccess(result.data))
        })
    }, [dispatch]);

    return (
        <Container className={classes.root}>
            {!matches && (
                <Box className={classes.mobileCategories}>
                    <CatalogComponent />
                </Box>
            )}
            
            <div className={classes.catalogContainer}>
                {matches && (
                    <Paper className={classes.sidebarContainer}>
                        <Typography variant="h5" component="h2" className={classes.sidebarTitle}>
                            Categorías
                        </Typography>
                        <Divider />
                        <Box mt={2}>
                            <FilterGeneres />
                        </Box>
                    </Paper>
                )}
                
                <Grid container className={classes.productsContainer}>
                    {loading ? (
                        <Box display="flex" justifyContent="center" width="100%" p={4}>
                            <CircularProgress />
                        </Box>
                    ) : products && products.length >= 1 ? (
                        products.map((product, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index} className={classes.productItem}>
                                <Tilt options={{ max: 25, scale: 1.05 }}>
                                    <ProductCard
                                        id={product.id}
                                        name={product.name}
                                        description={product.description}
                                        img={product.img}
                                        price={parseFloat(product.price)}
                                        stock={product.stock}
                                        discount={product.discount}
                                    />
                                </Tilt>
                            </Grid>
                        ))
                    ) : (
                        <Paper className={classes.noProducts}>
                            <Typography variant="h6">No se encontraron productos</Typography>
                            <Typography variant="body2">Intenta con otra categoría o búsqueda</Typography>
                        </Paper>
                    )}
                </Grid>
            </div>
        </Container>
    );
};

export default Catalog;