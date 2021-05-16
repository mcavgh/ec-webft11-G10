import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { Paper, Grid, Button, CssBaseline } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import { putEditCategory } from '../../../store/category/category.actions'
import { getCategory } from '../../../store/category/category.actions'

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

function EditCategory() {
    const dispatch = useDispatch()
    const statusPost = useSelector(state => state.categoryReducer.postState)
    const categories = useSelector(state => state.categoryReducer.category)
    const {id} = useParams()

    const [status, setStatusPost] = useState('')

    const checkCategory = (categories) => {
        if (categories && categories[0]) {
            let categoryList = []
            for (let i in categories) {
                if (categoryList.find(e => e === categories[i].name)) {
                    continue
                } else {
                    categoryList.push(categories[i])
                }
            }
            return categoryList
        }
    }

    let categoryList = checkCategory(categories)

    useEffect(() => {
        dispatch(getCategory())
    }, [dispatch]);

    const onSubmit = async values => {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(300);
        dispatch(putEditCategory(values, id))
        setStatusPost(statusPost)
        values.name=''
        values.description=''
    };

    return (
        <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
            <CssBaseline />
            <h4>Editar categoria</h4>
            <Form
                onSubmit={onSubmit}
                initialValues={{}}
                validate={validate}
                render={({ handleSubmit, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <Paper style={{ padding: 16 }}>
                            <Grid container alignItems="flex-start" spacing={2}>
                                {/* <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        name="categoryId"
                                        component={Select}
                                        label="Selecciona la categoria"
                                        formControlProps={{ fullWidth: true }}
                                    >
                                        {(!categoryList) ?
                                            (<Typography >No se encontraron categorias</Typography>)
                                            :
                                            (categoryList.map(category => {
                                                return (
                                                    <MenuItem value={category.id}>{category.name}</MenuItem>
                                                )
                                            })
                                            )}
                                    </Field>
                                </Grid> */}

                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        required
                                        name="name"
                                        component={TextField}
                                        type="text"
                                        label="Nombre de la categoria"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        name="description"
                                        component={TextField}
                                        multiline
                                        label="Descripción"
                                    />
                                </Grid>

                                <Grid item style={{ marginTop: 16 }}>
                                    <Button variant="contained" color="primary" type="submit" disabled={submitting} >
                                        Editar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </form>
                )}
            />
        </div>
    );
}

export default EditCategory;