import React, { useEffect } from 'react';
import {
    Button,
    ListItem,
    ListItemText,
    // makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
    DestroyUsuario,
    getUsers,
    postAdmin,
    postUserAccess,
} from '../../store/user/user.action';
import Title from '../admin/Title';
import { Link } from 'react-router-dom';

// const useStyles = makeStyles(theme => ({
//     seeMore: {
//         marginTop: theme.spacing(3),
//     },
// }));

export default function FormAdmin() {
    // const classes = useStyles();

    const users = useSelector(state => state.userReducer?.users);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    function PromoverAdmin(row) {
        console.log(row.id);
        dispatch(postAdmin(row.id));
    }

    function PromoverUser(row) {
        console.log(row.id);
        dispatch(postUserAccess(row.id));
    }

    function BorrarUsuario(row) {
        console.log(row.id);
        dispatch(DestroyUsuario(row.id));
    }

    return (
        <React.Fragment>
            <Title>Usuarios</Title>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Privilegio</TableCell>
                        <TableCell>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users && users[0]
                        ? users.map(row => (
                              <TableRow key={row.id}>
                                  <TableCell>{row.id}</TableCell>
                                  <TableCell>
                                      {row.name} {row.surname}{' '}
                                  </TableCell>
                                  <TableCell>{row.access}</TableCell>
                                  <TableCell>{row.email}</TableCell>
                                  <Button
                                      variant='contained'
                                      color='primary'
                                      onClick={e => PromoverAdmin(row)}
                                  >
                                      Promover a Admin
                                  </Button>
                                  <Button
                                      variant='contained'
                                      onClick={e => PromoverUser(row)}
                                  >
                                      Promover a User
                                  </Button>
                                  <Button
                                      variant='contained'
                                      color='primary'
                                      onClick={e => BorrarUsuario(row)}
                                  >
                                      Borrar usuario
                                  </Button>
                              </TableRow>
                          ))
                        : 'No se encontraron usuarios'}
                </TableBody>
            </Table>
            <ListItem button to='/' component={Link}>
                <ListItemText primary='Volver a Home' />
            </ListItem>
        </React.Fragment>
    );
}
