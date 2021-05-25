import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {useDispatch, useSelector} from "react-redux"

export default function AddressForm() {
  const dispatch = useDispatch()

  const [firstName, setFirstName]=React.useState('')
  const [lastName, setLastName]=React.useState('')
  const [address, setAddress]=React.useState('')
  const [number, setNumber]=React.useState('')
  const [state, setState]=React.useState('')
  const [zip, setZip]=React.useState('')
  const [country, setCountry]=React.useState('')

  const handleChangeName = event => {
    setFirstName(event.target.value);
  };
  const handleChangeLastName = event => {
    setLastName(event.target.value)
  }
  const handleChangeAddress = event => {
    setAddress(event.target.value)
  }
  const handleChangeNumber = event => {
    setNumber(event.target.value)
  }
  const handleChangeState = event => {
    setState(event.target.value)
  }
  const handleChangeZip = event => {
    setZip(event.target.value)
  }
  const handleChangeCountry = event => {
    setCountry(event.target.value)
  }
  useEffect(()=>{
    console.log('firstName',firstName)
    console.log('lastName',lastName)
    console.log('address',address)
    console.log('number',number)
    console.log('state',state)
    console.log('zip',zip)
    console.log('country',country)
  },[country])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Detalles de envio
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField required onChange={handleChangeName} id="firstName" name="firstName" label="Nombre" fullWidth autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required onChange={handleChangeLastName} id="lastName" name="lastName" label="Apellido" fullWidth autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField required onChange={handleChangeAddress} id="address1" name="address1" label="Domicilio" fullWidth autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required onChange={handleChangeNumber} id="number" name="number" label="Numeración" fullWidth autoComplete="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField onChange={handleChangeState} id="state" name="state" label="Provincia" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required onChange={handleChangeZip} id="zip" name="zip" label="Codigo Postal" fullWidth autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required onChange={handleChangeCountry} id="country"  name="country" label="Ciudad" fullWidth autoComplete="shipping country"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}