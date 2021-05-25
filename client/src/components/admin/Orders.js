import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Title from './Title';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();


  const orders = useSelector((state) => state.orderReducer?.orders);

  return (
    <React.Fragment>
      <Title>Tabla de Ordenes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Dirección</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell align="right">Total compra</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders && orders[0] ?

            (orders.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.user.name} {row.user.surname} </TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.updatedAt}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <Button variant="contained" color="primary" to={`/ViewOrder/${row.id}`} component={Link}>
                  Link
              </Button>
              </TableRow>
            ))
            ) : ("no hay ordenes")
          }
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
