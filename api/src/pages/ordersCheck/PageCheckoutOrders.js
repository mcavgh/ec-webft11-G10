import React from 'react';
import AppBar from '../../components/appBar/AppBar'
// import OrderView from '../../components/admin/OrderView'
// import Orders from '../../components/admin/Orders';
// import Dashboard from '../../components/admin/Dashboard';
// import Deposits from '../../components/admin/Deposits';
// import Chart from '../../components/admin/Chart';
import Dashboard from '../../components/admin/Dashboard';
// import { mainListItems } from '../../components/admin/listItems';
// import ViewOrder from "../../components/admin/ViewOrder"
// import Cardorder from '../../components/admin/Cardorder';


function PageCheckoutOrders(props) {
    return (
        <div>
            <AppBar/>
            {/* <OrderView/> */}
            {/* <Orders/> */}
            {/* < Deposits/> */}
            {/* <Chart/> */}
            {/* <mainListItems/> */}
            <Dashboard/>
            {/* <ViewOrder/> */}
            {/* <Cardorder/> */}

        </div>
    );
}

export default PageCheckoutOrders;