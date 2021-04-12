import * as React from "react";
import SandwichDetails from "./sandwich-details";
import data from "./data.json";

export default function CreateOrderForm(props) {
  const [sandwichName, setSandwichName] = React.useState("");
  const [orderItems, setOrderItems] = React.useState(new Map());
  const [orderUpdate, setOrderUpdate] = React.useState(false);
  const [orderPrice, setOrderPrice] = React.useState(0);
  const [cartInventory, setCartInventory] = React.useState({
    ...props.inventory
  });
  const [availablity, setAvailablity] = React.useState(false);
  const [cart, setCart] = React.useState("");
  const [enableOrder, setEnableOrder] = React.useState(false);

  const selectSandwich = (event) => {
    setSandwichName(event.target.value);
  };

  const submitOrder = () => {
    props.onSubmit({
      sandwiches: orderItems,
      price: orderPrice,
      cartInventory: cartInventory
    });
  };

  const cancelOrder = () => {
    setCartInventory(props.inventory);
    props.reset(false);
  };

  const updateCartInventory = (sandwich) => {
    Object.entries(sandwich.ingredients).map((entry) => {
      if (entry[0] in cartInventory) {
        cartInventory[entry[0]] = cartInventory[entry[0]] - entry[1];
      }
    });
    setCartInventory(cartInventory);
  };

  const addToOrder = () => {
    if (!sandwichName) {
      alert("Choose a sandwich");
    }
    const sandwich = data.menu.filter(
      (sandwich) => sandwich.name === sandwichName
    )[0];
    setOrderPrice(orderPrice + sandwich.price);
    updateCartInventory(sandwich);

    if (!orderItems.has(sandwichName)) {
      orderItems.set(sandwichName, 1);
    } else {
      const qty = orderItems.get(sandwichName) + 1;
      orderItems.set(sandwichName, qty);
    }
    setOrderItems(orderItems);
    setOrderUpdate(true);
    setEnableOrder(true);
  };

  const checkCartInventory = (sandwich) => {
    return new Promise((resolve, reject) => {
      Object.entries(sandwich.ingredients).map((entry) => {
        if (entry[0] in cartInventory) {
          if (cartInventory[entry[0]] < entry[1]) {
            reject();
          }
        }
      });
      resolve();
    });
  };

  React.useEffect(() => {
    if (!sandwichName) {
      setAvailablity(true);
    }
    const sandwich = data.menu.filter(
      (sandwich) => sandwich.name === sandwichName
    )[0];
    checkCartInventory(sandwich)
      .then(() => {
        setAvailablity(false);
      })
      .catch(() => {
        setAvailablity(true);
      });
  }, [sandwichName, checkCartInventory]);

  React.useEffect(() => {
    setOrderUpdate(false);
    let snames = "";
    orderItems.forEach((value, key) => {
      snames += value + " x " + key + ", ";
    });
    setCart(snames.substr(0, snames.length - 2));
  }, [orderUpdate, orderItems]);

  return (
    <div role="alert">
      <h2>Sandwiches</h2>
      <form>
        <div>
          <label htmlFor="sandwiches">Choose a Sandwich:</label>
        </div>
        {data.menu.map((menuItem, index) => (
          <div id="radioBtnDiv" key={index}>
            <input
              type="radio"
              id={menuItem.name}
              name="sandwich"
              value={menuItem.name}
              onClick={selectSandwich}
            />
            <label htmlFor={menuItem.name}>{menuItem.name}</label>
          </div>
        ))}
        <div>
          <SandwichDetails sandwichName={sandwichName} />
        </div>
        <br />
        <div>
          <input
            type="button"
            className="button"
            value="Add to order"
            onClick={addToOrder}
            disabled={availablity}
            title={sandwichName ? "Add to order" : "Select sandwich to enable"}
          />
        </div>
        <br />
        <div id="orderDetailsDiv">
          <p>Cost: ${orderPrice}</p>
          <p>{cart}</p>
        </div>
        <br />
        <div>
          <input
            className="button"
            disabled={!enableOrder}
            type="button"
            value="Place Order"
            onClick={submitOrder}
            title={enableOrder ? "Place order" : "Add a sandwich to enable"}
          />
          <input
            type="button"
            className="button"
            value="Cancel Order"
            onClick={cancelOrder}
            title="Cancel order or close form"
          />
        </div>
      </form>
    </div>
  );
}
