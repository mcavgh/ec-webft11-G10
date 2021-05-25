import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import {
    deleteProductById,
    getProducts,
} from '../../store/product/product.actions';
import { useHistory } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import AppBar from '../../components/appBar/AppBar';

export function PageAdminProduct() {
    const products = useSelector(state => state.productReducer.products);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getProducts());
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
                    data={products}
                    title='Administrar productos'
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Editar',
                            onClick: (event, rowData) =>
                                history.push('/editProduct/' + rowData.id),
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Eliminar',
                            onClick: (event, rowData) => {
                                dispatch(deleteProductById(rowData.id));
                            },
                        },
                    ]}
                />
            </Paper>
        </div>
    );
}
