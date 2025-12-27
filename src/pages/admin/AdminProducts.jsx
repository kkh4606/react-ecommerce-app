import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { CartContext } from "../../contexts/CartContext";
function AdminProducts() {
  let { products, getProducts } = useContext(CartContext);

  let deleteProducts = async (id) => {
    try {
      let res = await axios.delete("http://localhost:9000/api/products/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, [products]);
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="w-full flex justify-end">
          <Link
            to={"/admin/products/create"}
            className="bg-blue-500 px-4 py-2 rounded-lg text-white"
          >
            create
          </Link>
        </div>
        <div className="p-4 border-1 border-default border-dashed rounded-base">
          <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-gray-100">
                  <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                    PRODUCT ID
                  </th>
                  <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                    IMAGES
                  </th>

                  <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                    NAME
                  </th>
                  <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                    DESCRIPTION
                  </th>
                  <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {products &&
                  products.map((product) => {
                    return (
                      <tr key={product.id}>
                        <td className="py-4 px-6 border-b border-gray-200">
                          {product.id}
                        </td>
                        <td className="py-4 px-6 border-b border-gray-200 truncate">
                          <img
                            src={
                              product.images.length
                                ? product.images[0].url
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtPGKYlBzuIQxQgSo49u28rurrry30Xs5fAA&s"
                            }
                          />
                        </td>
                        <td className="py-4 px-6 border-b border-gray-200 truncate">
                          {product.name}
                        </td>
                        <td className="py-4 px-6 border-b border-gray-200 truncate">
                          {product.description}
                        </td>

                        <td className="py-4 px-6 border-b border-gray-200">
                          <Link
                            to={"/admin/products/edit/" + product.id}
                            className="bg-yellow-700 text-white py-1 px-2 rounded-md text-xs mr-2"
                          >
                            update
                          </Link>
                          <button
                            onClick={() => {
                              deleteProducts(product.id);
                            }}
                            className="bg-red-700 text-white py-1 px-2 rounded-md text-xs"
                          >
                            delete
                          </button>
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

export default AdminProducts;
