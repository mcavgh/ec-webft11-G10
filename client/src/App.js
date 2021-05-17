import React from 'react';
import { Route } from "react-router-dom";
import { AuthProvider } from './components/AuthContext';
import { Home } from './pages/Home';
import PageAddProduct from './pages/adminProduct/PageAddProduct'
import LogIn from './pages/landingPage/LandingPage'
import Product from './components/Product/Product'
import {PageAdminProduct} from './pages/adminProduct/PageAdminProduct';
import PageEditProduct from './pages/adminProduct/PageEditProduct';
import PageAddCategory from './pages/adminCategory/PageAddCategory';
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import PageCheckoutOrders from './pages/ordersCheck/PageCheckoutOrders'
import ViewOrder from './components/admin/ViewOrder'
import CartProducts from './pages/cart/CartProducts'
import {PageAdminCategories} from './pages/adminCategory/PageAdminCategories'
import PageEditCategory from './pages/adminCategory/PageEditCategory'
import Checkout from './pages/checkOut/Checkout'
import dotenv from "dotenv";
import axios from 'axios';
import { AdminUser } from './components/admin/AdminUser';

dotenv.config()
axios.defaults.baseURL=process.env.REACT_APP_API || "http://localhost:3001"

function App() {
  return (
    <React.Fragment>
      <AuthProvider>

        <ThemeProvider theme={theme}>
        <Route exact path='/crearUsuario' component={AdminUser} />

          <Route exact path='/cart' component={CartProducts} />
          <Route exact path='/logIn' component={LogIn} />
          <Route exact path='/' component={Home} />
          <Route path='/editProduct/:id' component={PageEditProduct} />
          <Route path='/adminProduct' component={PageAdminProduct} />
          <Route path='/createProduct' component={PageAddProduct} />
          <Route path='/creaCategories' component={PageAddCategory} />
          <Route path='/adminCategories' component={PageAdminCategories} />
          <Route path='/creaCategories' component={PageAddCategory} />
          <Route path='/editCategory/:id' component={PageEditCategory} />
          <Route path='/PageCheckoutOrders' component={PageCheckoutOrders} />
          <Route path='/ViewOrder/:id' component={ViewOrder} />
          <Route path='/product/:id' component={Product} />
          <Route path='/checkout' component={Checkout} />
        </ThemeProvider>
      </AuthProvider>
    </React.Fragment >
  );
}

export default App;
