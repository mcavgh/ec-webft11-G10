import React, {useEffect, useContext} from 'react';
import {useStyles} from './stylesCheckout'
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from '../../components/checkOut/AddressForm';
import Review from '../../components/checkOut/Review';
import {useDispatch, useSelector} from "react-redux"
import { Link, useHistory } from 'react-router-dom'
import {orderToMp} from '../../store/order/order.action'
import { AuthContext } from '../../components/AuthContext';
import {getUsersByEmailId} from '../../store/user/user.action'

const steps = ['Controla tu orden'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

export function Checkout() {
  const dispatch = useDispatch()
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const cart = useSelector(state => state.cart.cartItems)
  const userId = useSelector(state => state.userReducer.userId.id)  
  const { currentUser } = useContext(AuthContext)

  useEffect(()=>{    
    console.log(userId)
  },[])

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Gracias por tu compra!.
                </Typography>
                <Typography variant="subtitle1">
                  Tu pedido esta en camino!
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button className={classes.button}>
                      Volver
                    </Button>
                  )}
                  <Button onClick={dispatch(orderToMp(cart))} variant="contained" color="primary" className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Terminar Compra' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Button to='/' component={Link}>Volver al inicio</Button>
      </main>
    </React.Fragment>
  );
}