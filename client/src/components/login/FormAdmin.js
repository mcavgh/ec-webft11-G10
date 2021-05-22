import React, {useEffect} from 'react';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { Paper, Grid, Button, CssBaseline, ListItem, ListItemText } from '@material-ui/core';
import { useDispatch } from 'react-redux'
import { postAdmin } from '../../store/user/user.action';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';


const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.description) {
    errors.description = 'Required';
  }
  return errors;
};

export default function FormAdmin() {

  const dispatch = useDispatch()

  const  addPost = (values) => {
    onSubmit(values)
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    )
  }


  const onSubmit = async values => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(300);
    dispatch(postAdmin(values))
    values.name = ''
    values.surname = ''
    values.email = ''
    values.password = ''
    values.access = ''
    
  };

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <h3>Agregar Admin</h3>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        validate={validate}
        render={({ handleSubmit, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="name"
                    component={TextField}
                    type="text"
                    label="name"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="surname"
                    component={TextField}
                    multiline
                    label="surname"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="email"
                    component={TextField}
                    multiline
                    label="email"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="password"
                    component={TextField}
                    multiline
                    label="password"
                  />
                </Grid>
                
                {/* <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="access"
                    component={TextField}
                    multiline
                    label="access"
                  />
                </Grid> */}

                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    onClick={() => addPost(values)}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Agregar
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <Grid item style={{ marginTop: 16 }}>
                     <ListItem button to="/" component={Link}>
                        <ListItemText  primary="Volver a Home" />
                    </ListItem>
                </Grid>
          </form>
        )}
      />
    </div>
  );
}


