import app from "../../firebase";
import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux'
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import { Drawer, CssBaseline, AppBar, Toolbar, Badge, List, Button, Divider, IconButton, ListItem, ListItemText, } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useStyles } from './styles'
import { Link } from 'react-router-dom';
import { SearchBar } from './searchBar/SearchBar';
import { useSelector } from "react-redux";
import axios from "axios";
import { searchProductSuccess } from '../../store/product/product.actions';
import { getQuantity } from '../../store/cart/cart.actions';

export default function PersistentDrawerLeft() {

    const  cart = useSelector(state => state.cart.cartItems)
    const  cartQuantity = useSelector(state => state.cart.cartQuantity)

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
  
    useEffect(() => {
        dispatch(getQuantity())
      }, [])
    


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const refreshSearch=()=>{
        axios.get(`http://localhost:3001/products/`).then(result => {
            dispatch(searchProductSuccess(result.data))
        })
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Button onClick={()=>{refreshSearch()}} variant="h6" color='inherit' to="/" component={Link}>
                        FastFoodBest!
                    </Button>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <SearchBar />
                    </div>
                    <Button
                        onClick={() => app.auth().signOut()
                            .then(res => console.log("deslogueado", res))

                        }
                        color="inherit"


                    >logout</Button>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton to="/cart" component={Link}
                            aria-label="" color="inherit">

                            <Badge badgeContent={cartQuantity} color="secondary">
                                <ShoppingCartIcon fontSize="large" />
                            </Badge>

                        </IconButton>
                    </div>
                    <div className={classes.sectionDesktop}>
                        <IconButton color="inherit"
                            to="/login" component={Link}
                        >
                            <Badge color="secondary">
                                <AccountCircleIcon fontSize="large" />
                            </Badge>
                        </IconButton>
                        
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List >
                    <ListItem button to="/adminProduct" component={Link}>
                        <ListItemText className={classes.barOptions} primary="Administrar Productos" />
                    </ListItem>
                    <ListItem button to="/CreateProduct" component={Link}>
                        <ListItemText className={classes.barOptions} primary="Crear Productos" />
                    </ListItem>
                    <ListItem button to="/adminCategories" component={Link}>
                        <ListItemText className={classes.barOptions} primary="Administrar Categorias" />
                    </ListItem>
                    <ListItem button to="/creaCategories" component={Link}>
                        <ListItemText className={classes.barOptions} primary="Crear Categorias" />
                    </ListItem>
                    <ListItem button to="/PageCheckoutOrders" component={Link}>
                        <ListItemText className={classes.barOptions} primary="Ver Ordenes" />
                    </ListItem>
                </List>
                <Divider />

            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />

            </main>
        </div>
    );
}