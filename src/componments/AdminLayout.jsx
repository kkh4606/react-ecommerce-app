import axios from "axios";
import { useEffect, useState } from "react";

import SideBar from "./SideBar";

export default function AdminLayout() {
  const products = [
    {
      name: "Gray cap for man",
      size: "S, M, L",
      price: "$80.00",
      stock: "428 Item left",
      sold: "150 Sold",
      category: "Cap",
      rating: "4.5",
      reviews: "55 Review",
    },
    {
      name: "Woman Dress",
      size: "S, M, L, XL",
      price: "$80.00",
      stock: "567 Item left",
      sold: "345 Sold",
      category: "Fashion",
      rating: "4.9",
      reviews: "50 Review",
    },
    {
      name: "Olive leather",
      size: "S, M",
      price: "$136.00",
      stock: "247 Item left",
      sold: "79 Sold",
      category: "Hand Bag",
      rating: "4.5",
      reviews: "45 Review",
    },
  ];

  let [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setOrders(res.data.orders));
  }, []);

  useEffect(() => {
    console.log(orders);
  });

  return (
    <>
      <SideBar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-1 border-default border-dashed rounded-base">
          <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-gray-100">
                  <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                    ORDER ID
                  </th>
                  <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                    CUSTOMER
                  </th>
                  <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                    ADDRESS
                  </th>
                  <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                    DATE
                  </th>
                  <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                    TOTAL AMOUNT
                  </th>
                  <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {orders &&
                  orders.map((order, index) => {
                    return (
                      <tr key={index}>
                        <td className="py-4 px-6 border-b border-gray-200">
                          {order.id}
                        </td>
                        <td className="py-4 px-6 border-b border-gray-200 truncate">
                          {order.user.name}
                        </td>
                        <td className="py-4 px-6 border-b border-gray-200 truncate">
                          {order.address}
                        </td>
                        <td className="py-4 px-6 border-b border-gray-200 truncate">
                          {new Date(`${order.created_at}`).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6 border-b border-gray-200">
                          ${order.total_amount}
                        </td>
                        <td className="py-4 px-6 border-b border-gray-200">
                          <span className="bg-yellow-700 text-white py-1 px-2 rounded-full text-xs">
                            pending
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
