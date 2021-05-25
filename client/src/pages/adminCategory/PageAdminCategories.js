import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import {
    putDeleteCategory,
    getCategory,
} from '../../store/category/category.actions';
import { useHistory } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import AppBar from '../../components/appBar/AppBar';

export function PageAdminCategories() {
    const categories = useSelector(state => state.categoryReducer.category);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getCategory());
    }, []);

    return (
        <div>
            <AppBar />
            <Paper>
                <MaterialTable
                    columns={[
                        { title: 'ID', field: 'id' },
                        { title: 'Nombre', field: 'name' },
                        //{ title: "Description", field: "description" },
                        { title: 'Precio', field: 'price', type: 'numeric' },
                        { title: 'Stock', field: 'stock', type: 'numeric' },
                    ]}
                    data={categories}
                    title='Administrar categorías'
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Editar',
                            onClick: (event, rowData) =>
                                history.push('/editCategory/' + rowData.id),
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Eliminar',
                            onClick: (event, rowData) => {
                                dispatch(putDeleteCategory(rowData.id));
                            },
                        },
                    ]}
                />
            </Paper>
        </div>
    );
}
