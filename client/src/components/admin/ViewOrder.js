import React, { useState, useEffect } from "react";
import s from "./ViewOrder.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { getUsersById } from "../../store/user/user.action";
import {
    cleanCart,
    getOrderByUserId,
    putOrderById,
    getOrderById
} from '../../store/order/order.action';
import Swal from "sweetalert2";

export default function ViewOrder() {
  const history=useHistory()
  const { id } = useParams()
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState({
    state: "",
    address: "",
  });
  const user = useSelector((state) => state.userReducer.user)
  const orderUserId = useSelector((state) => state.orderReducer.ordersUser)
  

  useEffect(() => {
    dispatch(getOrderById(id))
    //dispatch(getUsersById(orderUserId.user.id))
  }, [])
  


  const sumTotal = function () {
    let total = 0;
    if (orderUserId.products) {
        total= orderUserId.products.reduce((ac,e)=>ac+parseFloat(e.price),0)
      }
    return "$ " + total;
  };

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSave = function () {
    const data = {
      state: input.state === "" ? orderUserId.state : input.state,
      address: input.address,
    };
    dispatch(putOrderById(parseInt(orderUserId.id), data));
    setEdit(false)
    // history.push(`/ViewOrder/${id}`)

  };

 

  const onClose = function () {
    history.push("/PageCheckoutOrders")
  };

  const onClean = function () {
    dispatch(cleanCart(id));
    // Swal.fire({
    //   position: 'top-end',
    //   icon: 'success',
    //   title: 'la orden se a actualizado!',
    //   showConfirmButton: false,
    //   timer: 1500
    // })
  };

  if (!orderUserId) {
    return (
      <div className={s.viewOrder}>
        <div className={s.content}>
          <h3>Cargando datos...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className={s.viewOrder}>
      <div className={s.content}>
        <h3>Panel de ordenes</h3>
        <div className={[s.info, s.topShadow].join(" ")}>
          <p>
            <span>Email: </span>
            {user && user.email}
          </p>
          <p>
            <span>Rol: </span>
            {user && user.access}
          </p>
        </div>
        <div className={[s.info, s.botShadow].join(" ")}>
          <p>
            <span>ID: </span>
            {orderUserId && orderUserId.id}
          </p>
          <p>
            <span>Estado: </span>
            {edit === true ? (
              <select
                required
                onChange={handleInputChange}
                name="state"
                id="state"
              >
                <option value="">Seleccione el nuevo estado</option>
                <option value="creada">Creada</option>
                <option value="carrito">Carrito</option>
                <option value="procesando">Procesando</option>
                <option value="cancelada">Cancelada</option>
                <option value="completa">Completa</option>
              </select>
            ) : (
              orderUserId.state
            )}
          </p>
          <p>
            <span>Direccion: </span>
            {edit === true ? (
              <input
                onChange={handleInputChange}
                name="address"
                value={input.address}
                type="text"
              />
            ) : (
              orderUserId.address
            )}
          </p>
        </div>
        <table className={s.itemsTable}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Stock</th>
              <th>Precio Unit.</th>
            </tr>
          </thead>
          <tbody>
            { orderUserId.products &&
               orderUserId.products.map(function (product) {
                return (
                  <tr id={product.id}>
                    <td>{product.name}</td>
                    <td>{product.stock}</td>
                    <td>{product.price}</td>
                  </tr>
                );
              })}
            <tr className={s.total}>
              <td></td>
              <td>Total:</td>
              <td>{orderUserId.price}</td>
            </tr>
          </tbody>
        </table>
        <div className={s.actions}>
          <div className={s.editar}>
            <p>Editar</p>
            <label className={s.switch}>
              <input type="checkbox" onChange={() => setEdit(!edit)} />
              <span className={[s.slider, s.round].join(" ")}></span>
            </label>
          </div>
          <div>
            <button
              onClick={() => onSave()}
              className={[s.btn].join(" ")}
              disabled={!edit}
            >
              Guardar Cambios
            </button>
          </div>
          <div>
            {orderUserId.state === "carrito" && orderUserId.products.length > 0 && (
              <button onClick={onClean} className={[s.btn].join(" ")}>
                Vaciar orden
              </button>
            )}
          </div>
          <div>
            <button
              className={[s.btn].join(" ")} onClick={onClose}
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
