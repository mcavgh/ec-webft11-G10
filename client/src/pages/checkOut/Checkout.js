import React from 'react';
import { useStyles } from './stylesCheckout';
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
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { orderToMp } from '../../store/order/order.action';

const steps = ['Completa tus datos de envio', 'Controla tu orden'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

export function Checkout() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const cart = useSelector(state => state.cart.cartItems);
    const userId = useSelector(state => state.userReducer.userId.id);
    // const dataUser = useSelector(state => state.userReducer.dataUser);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position='absolute'
                color='default'
                className={classes.appBar}
            >
                <Toolbar>
                    <Typography variant='h6' color='inherit' noWrap>
                        EATX
                    </Typography>
                </Toolbar>
            </AppBar>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component='h1' variant='h4' align='center'>
                        Comprar
                    </Typography>
                    <Stepper
                        activeStep={activeStep}
                        className={classes.stepper}
                    >
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant='h5' gutterBottom>
                                    ¡Gracias por tu compra!
                                </Typography>
                                <Typography variant='subtitle1'>
                                    Tu pedido esta en camino
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button
                                            onClick={handleBack}
                                            className={classes.button}
                                        >
                                            {' '}
                                            Volver
                                        </Button>
                                    )}
                                    {activeStep === steps.length - 1 ? (
                                        <Button
                                            onClick={() =>
                                                dispatch(
                                                    orderToMp(cart, userId)
                                                )
                                            }
                                            variant='contained'
                                            color='primary'
                                            className={classes.button}
                                        >
                                            Terminar compra
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={handleNext}
                                            variant='contained'
                                            color='primary'
                                            className={classes.button}
                                        >
                                            Siguiente
                                        </Button>
                                    )}
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
                <Button to='/' component={Link}>
                    Volver al inicio
                </Button>
            </main>
        </React.Fragment>
    );
}
