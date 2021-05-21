import React from 'react';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { Paper, Grid, Button, CssBaseline } from '@material-ui/core';
import GoogleButton from 'react-google-button'

const onSubmit = async values => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
};

const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    }
    if (!values.lastName) {
        errors.lastName = 'Required';
    }
    if (!values.email) {
        errors.email = 'Required';
    }
    return errors;
};

function LogIn({ faceAuth,auth }) {
    const handleClickFaceAuth=()=>{
        
        faceAuth()
    }
    const handleClickAuth=()=>{
        
        auth()
    }
    return (
        <div style={{ padding: 16, margin: 'auto', maxWidth: 350 }}>
            <CssBaseline />
            <Form
                onSubmit={onSubmit}
                initialValues={{}}
                validate={validate}
                render={({ handleSubmit, submitting, pristine, values, loginCommon, auth }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <Paper style={{ padding: 16 }}>
                            <Grid container style={{ display: "contents" }} spacing={6}>
                                <Grid item xs={6} style={{ maxWidth: "100%", width: "100%" }}  >
                                    <Field
                                        fullWidth
                                        required
                                        name="firstName"
                                        component={TextField}
                                        type="text"
                                        label="Nombre"
                                    />
                                </Grid>
                                <Grid item xs={6} style={{ maxWidth: "100%", width: "100%" }} >
                                    <Field
                                        fullWidth
                                        required
                                        name="lastName"
                                        component={TextField}
                                        type="text"
                                        label="Apellido"
                                    />
                                </Grid>
                                <Grid item xs={6} style={{ maxWidth: "100%", width: "100%" }} >
                                    <Field
                                        name="email"
                                        fullWidth
                                        required
                                        component={TextField}
                                        type="email"
                                        label="Email"
                                    />
                                </Grid>
                                <Grid item
                                    xs={12}
                                    style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
                                 
                            <GoogleButton
                            item
                            xs={12}
                            
                            variant="contained"
                            color="secondary"
                                onClick={handleClickFaceAuth}
                            >Log in</GoogleButton>
                                </Grid>
                                
                            </Grid>
                        </Paper>
                    </form>
                )}
            />
        </div>
    );
}

export default LogIn;
