import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GoogleButton from 'react-google-button';
import app from '../../firebase/index.js';

function Copyright() {
    return (
        <Typography variant='body2' color='textSecondary' align='center'>
            {'Copyright © '}
            <Link color='inherit' href='https://ec-webft11-g10.vercel.app/'>
                EATX
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: theme.spacing(7),
        borderRadius: '4px',
    },
    google: {
        minWidth: '100%',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function LogIn({ faceAuth, auth }) {
    const [input, setInput] = useState({
        password: '',
        email: '',
    });

    const forgotPassword = email => {
        app.auth()
            .sendPasswordResetEmail(input.email)
            .then(function () {
                alert('Por favor, revisa tu email...');
            })
            .catch(function (e) {
                console.log(e);
            });
    };
    const handleInputChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };
    const handleClickFaceAuth = () => {
        faceAuth();
    };
    const handleClickAuth = e => {
        e.preventDefault();
        const { email, password } = input;
        auth(email, password);
    };
    const classes = useStyles();

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Iniciar sesión
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={e => handleClickAuth(e)}
                    noValidate
                >
                    <TextField
                        variant='standard'
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        label='Email'
                        name='email'
                        autoComplete='email'
                        autoFocus
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant='standard'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Contraseña'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                        onChange={handleInputChange}
                    />

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        Iniciar sesión
                    </Button>
                    <GoogleButton
                        className={classes.google}
                        onClick={handleClickFaceAuth}
                    >
                        Iniciar sesión
                    </GoogleButton>
                    <Grid container>
                        <Grid item xs>
                            <a
                                href='#'
                                onClick={forgotPassword}
                                variant='body2'
                            >
                                Olvidé la contraseña
                            </a>
                        </Grid>
                        <Grid item>
                            <Typography
                                to='/signup'
                                component={Link}
                                variant='body2'
                            >
                                {'Crear cuenta'}
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
