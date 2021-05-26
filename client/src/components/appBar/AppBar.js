import app from '../../firebase';
import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import axios from 'axios';
import { useTheme } from '@material-ui/core/styles';
import {
    Menu,
    Avatar,
    MenuItem,
    Drawer,
    CssBaseline,
    AppBar,
    Toolbar,
    Badge,
    List,
    Button,
    Divider,
    IconButton,
    ListItem,
    ListItemText,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useStyles } from './styles';
import { Link, useHistory } from 'react-router-dom';
import { SearchBar } from './searchBar/SearchBar';
import { useSelector } from 'react-redux';
import { searchProductSuccess } from '../../store/product/product.actions';
import { getQuantity } from '../../store/cart/cart.actions';
import { AuthContext } from '../AuthContext';
import { getUsersByEmailId } from '../../store/user/user.action';
export default function PersistentDrawerLeft() {
    const history = useHistory();
    const cartQuantity = useSelector(state => state.cart.cartQuantity);
    const user = useSelector(state => state.userReducer.userId);

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        dispatch(getQuantity());
        currentUser?.email && dispatch(getUsersByEmailId(currentUser.email));
    }, [dispatch]);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    // const history=useHistory()
    //USER BUTTON
    // const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dropdown = Boolean(anchorEl);

    const refreshSearch = () => {
        axios.get(`/products/`).then(result => {
            dispatch(searchProductSuccess(result.data));
        });
    };
    // const handleChange = event => {
    //     setAuth(event.target.checked);
    // };
    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
        if (!currentUser) {
            history.push('/login');
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position='fixed'
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >

                <Toolbar>
                    {user?.access === 'Admin' && (
                        <IconButton
                            color='inherit'
                            aria-label='open drawer'
                            onClick={handleDrawerOpen}
                            edge='start'
                            className={clsx(
                                classes.menuButton,
                                open && classes.hide
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Button
                        onClick={refreshSearch}
                        variant='h6'
                        color='inherit'
                        to='/'
                        component={Link}
                    >
                        eatx
                    </Button>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <SearchBar />
                    </div>
                    <div className={classes.grow} />
                    <div>
                        <IconButton
                            to='/cart'
                            component={Link}
                            aria-label=''
                            color='inherit'
                        >
                            <Badge
                                badgeContent={cartQuantity}
                                color='secondary'
                            >
                                <ShoppingCartIcon fontSize='large' />
                            </Badge>
                        </IconButton>
                    </div>
                    <div>
                        <IconButton
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleMenu}
                            color='inherit'
                        >
                            {currentUser ? (
                                <Avatar
                                    alt='Usuario'
                                    src={currentUser.photoURL}
                                />
                            ) : (
                                <AccountCircleIcon fontSize='large' />
                            )}
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={dropdown}
                            onClose={handleClose}
                        >
                            <div>
                                <MenuItem onClick={handleClose}>
                                    Perfil
                                </MenuItem>
                                <MenuItem
                                    onClick={() =>
                                        app
                                            .auth()
                                            .signOut()
                                            .then(
                                                res =>
                                                    dispatch({
                                                        type: 'DELETE_USER',
                                                    }),
                                                handleClose()
                                            )
                                    }
                                >
                                    Cerrar sesión
                                </MenuItem>
                            </div>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant='persistent'
                anchor='left'
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button to='/adminProduct' component={Link}>
                        <ListItemText
                            className={classes.barOptions}
                            primary='Administrar productos'
                        />
                    </ListItem>
                    <ListItem button to='/CreateProduct' component={Link}>
                        <ListItemText
                            className={classes.barOptions}
                            primary='Crear productos'
                        />
                    </ListItem>
                    <ListItem button to='/adminCategories' component={Link}>
                        <ListItemText
                            className={classes.barOptions}
                            primary='Administrar categorías'
                        />
                    </ListItem>
                    <ListItem button to='/creaCategories' component={Link}>
                        <ListItemText
                            className={classes.barOptions}
                            primary='Crear categorías'
                        />
                    </ListItem>
                    <ListItem button to='/PageCheckoutOrders' component={Link}>
                        <ListItemText
                            className={classes.barOptions}
                            primary='Ver órdenes'
                        />
                    </ListItem>
                    <ListItem button to='/FormAdmin' component={Link}>
                        <ListItemText
                            className={classes.barOptions}
                            primary='Administrar roles'
                        />
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
