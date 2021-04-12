import * as React from "react";
import "./styles.css";
import CreateOrderForm from "./order-form";
import CreateOrderTable from "./orders";
import data from "./data.json";

// Generate unique order uuid.
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function App() {
  const [createFlag, setCreateFlag] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const [orderPlaced, setOrderPlaced] = React.useState(false);
  const [inventory, setInventory] = React.useState(data.inventory);

  const submitOrder = (order) => {
    let snames = "";
    order.sandwiches.forEach((value, key) => {
      snames += value + " x " + key + ", ";
    });
    snames = snames.substr(0, snames.length - 2);
    orders.push({
      orderId: uuidv4(),
      details: snames,
      price: order.price,
      status: "Placed"
    });
    setInventory(order.cartInventory);
    setOrders(orders);
    setOrderPlaced(true);
    createOrder();
  };

  React.useEffect(() => {
    setOrderPlaced(false);
  }, [orderPlaced]);

  const createOrder = (val) => setCreateFlag(val);

  return (
    <div role="alert">
      <div id="createOrderDiv">
        <button className="button" onClick={() => createOrder(true)}>
          Sandwich Menu
        </button>
      </div>
      <div id="form">
        {createFlag ? (
          <CreateOrderForm
            inventory={inventory}
            onSubmit={submitOrder}
            reset={createOrder}
          />
        ) : null}
      </div>
      <h2> List of Sandwich orders:</h2>
      <div>
        <CreateOrderTable orders={orders} />
      </div>
    </div>
  );
}
