import axios from "axios";
import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  let getOrders = async () => {
    try {
      let res = await axios.get("http://localhost:9000/api/user_orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setOrders(res.data.orders);
      console.log(res.data.orders);
    } catch (err) {
      console.log(err);
    }

    return;
  };

  useEffect(() => {
    getOrders();
    console.log(orders);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Orders</h2>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left text-sm text-gray-600">
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">User ID</th>
              <th className="p-3 border">Total</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 1 &&
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 text-sm">
                  <td className="p-3 border">{order.id}</td>
                  <td className="p-3 border">{order.user_id}</td>
                  <td className="p-3 border">${order.total_amount}</td>
                  <td className="p-3 border">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
