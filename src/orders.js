import * as React from "react";

export default function CreateOrderTable(props) {
  const [orderStatusChanged, setOrderStatusChanged] = React.useState(false);
  const { orders } = props;

  const pickupOrder = (index) => {
    orders[index].status = "Picked";
    setOrderStatusChanged(true);
  };

  React.useEffect(() => {
    setOrderStatusChanged(false);
  }, [orderStatusChanged]);

  return (
    <div role="alert">
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>OrderId</th>
            <th>Details</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{order.orderId.substr(0, 8)}</td>
              <td>{order.details}</td>
              <td>{order.price}</td>
              <td>
                {order.status === "Placed" ? (
                  <input
                    id="pickupBtn"
                    type="button"
                    value="Pick Order"
                    onClick={() => pickupOrder(i)}
                  />
                ) : (
                  order.status
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
