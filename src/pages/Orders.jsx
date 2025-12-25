import axios from "axios";
import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/user_orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setOrders(res.data.orders))
      .catch(console.log);
  }, []);

  const statusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (orders.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">No orders found</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Order History</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-xl shadow-sm border hover:shadow-md transition"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <div>
              <p className="text-sm text-gray-500">Order #{order.id}</p>
              <p className="text-sm text-gray-400">{order.created_at}</p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyle(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>

          {/* Body */}
          <div className="px-6 py-4 space-y-4">
            {/* Product */}
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Product</p>
                <p className="font-semibold">{order.products[0]?.name}</p>
              </div>
              <p className="font-semibold text-gray-700">
                ${order.products[0]?.price}
              </p>
            </div>

            {/* Address */}
            <div>
              <p className="text-sm text-gray-500">Shipping Address</p>
              <p className="text-gray-700">{order.address}</p>
            </div>

            {/* Notes */}
            {order.notes && (
              <div>
                <p className="text-sm text-gray-500">Notes</p>
                <p className="text-gray-700">{order.notes}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center bg-gray-50 px-6 py-4 border-t">
            <span className="text-gray-600 font-medium">Total</span>
            <span className="text-xl font-bold text-indigo-600">
              ${order.total_amount}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
