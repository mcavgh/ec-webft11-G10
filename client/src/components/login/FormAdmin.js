import React, { useEffect } from 'react';
import { Button, makeStyles, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, postAdmin } from '../../store/user/user.action';
import Swal from 'sweetalert2'
import Title from '../admin/Title';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function FormAdmin () {
  const classes = useStyles();

  const dispatch= useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch]);


  const users = useSelector((state) => state.userReducer?.users);

 function PromoverAdmin(id){
    dispatch(postAdmin(id))
  }

  return (
    <React.Fragment>
      <Title>Tabla de Ordenes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Access</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users[0] ?

            (users.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name} {row.surname} </TableCell>
                <TableCell>{row.access}</TableCell>
                <TableCell>{row.email}</TableCell>
                <Button variant="contained" color="primary" onClick={PromoverAdmin(row.id)}>
                  Promover a Admin
              </Button>
              </TableRow>
            ))
            ) : ("no hay usuarios")
          }
        </TableBody>
      </Table>
    </React.Fragment>
  );
}



