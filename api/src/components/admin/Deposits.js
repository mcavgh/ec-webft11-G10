import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { useSelector, useDispatch } from "react-redux";
import {getAllOrders} from "../../store/order/order.action"



function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});


export default function Deposits({amounts}) {

  const dispatch = useDispatch();

  useEffect(() => {
   
     dispatch(getAllOrders())
    
  }, [dispatch])
   
  const amount = useSelector(state => state.orderReducer?.orders)
  const amount2 = amount.length>0&&amount.filter(e=>e.state!=="cancelada")
  const deposits= amount2.length>0&&amount.reduce( (ac,e)=>ac+e.price,0)


  const event = new Date('Mayo 14, 2021 11:50:00');
  const date = event.toString()

  const classes = useStyles();
  return (
    
    <React.Fragment>
      <Title>Total Ventas</Title>
      <Typography component="p" variant="h4">
      ${deposits}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext} >
        {date}
      </Typography>
    </React.Fragment>
  );
}