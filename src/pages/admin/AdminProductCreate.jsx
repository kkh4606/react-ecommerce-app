import { useEffect, useState } from "react";
import axios from "axios";
import Errors from "../../componments/Errors";
import { Navigate, useNavigate } from "react-router";
export default function AdminCreateProduct() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category_id: "",
    description: "",
  });

  const [error, setErrors] = useState(null);

  let navigate = useNavigate();

  // fetch categories
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/categories")
      .then((res) => setCategories(res.data.categories))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let res = await axios.post("http://localhost:9000/api/products", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.errors) {
        setErrors(res.data.errors);
      } else {
        navigate("/admin/products");
      }
    } catch (err) {
      setErrors({ ...error, name: err });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Create Product</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            // required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <Errors error={error} name={"name"} />

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            // required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>
        <Errors error={error} name={"price"} />

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            // required
            className="w-full border rounded px-3 py-2 bg-white"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <Errors error={error} name={"category"} />

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>
        <Errors error={error} name={"description"} />

        {/* Submit */}
        <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
          Create Product
        </button>
      </form>
    </div>
  );
}
