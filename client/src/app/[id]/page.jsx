"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UpdateFruit({ params }) {
  const { id } = params;
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    const fetchFruit = async () => {
      try {
        const response = await axios.get(`/api/fruit/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching fruit:", error);
      }
    };

    if (id) fetchFruit();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateFruit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/fruit/${id}`, formData);
      router.push("/");
    } catch (error) {
      console.error("Error updating fruit:", error);
    }
  };

  return (
    <div className="flex justify-center px-4 md:px-[25%] mt-10">
      <form
        onSubmit={updateFruit}
        className="flex flex-col gap-4 p-6 border rounded-md shadow-lg w-full bg-white"
      >
        <h2 className="text-xl font-semibold text-gray-700">Update Fruit</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            step="any"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update Fruit
        </button>
      </form>
    </div>
  );
}
