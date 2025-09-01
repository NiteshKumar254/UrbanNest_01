import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [category, setCategory] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch categories from the backend
  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/category/get-category`
      );
      setCategory(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Handle form submission for adding/updating category
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (categoryName.trim() === "") return;

    try {
      if (editId) {
        // Update category
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/api/category/update-category/${editId}`,
          { name: categoryName }
        );
      } else {
        // Create new category
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/category/create-category`,
          { name: categoryName }
        );
      }

      // Reset form
      setCategoryName("");
      setEditId(null);

      // Refresh list after add/update
      fetchCategory();
    } catch (error) {
      console.error("Error adding/updating category:", error);
    }
  };

  // Handle deleting a category
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/category/delete-category/${id}`
      );
      fetchCategory(); // Refresh categories after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Load categories on component mount
  useEffect(() => {
    fetchCategory();
  }, []);

  // Handle edit button click
  const handleEdit = (id, name) => {
    setEditId(id);
    setCategoryName(name);
  };

  return (
    <div className="flex ml-16 mt-4">
      <Navbar />
      <div className="flex flex-col items-center p-4 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">Create Category</h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 mb-4 w-full max-w-md"
        >
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="border px-2 py-1 w-full max-w-sm bg-white rounded"
            required
          />
          <button
            type="submit"
            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {editId ? "Update" : "Submit"}
          </button>
        </form>

        {/* Category list */}
        <div className="w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          <ul className="border border-gray-300 p-4 rounded">
            {category.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center p-1 border-b last:border-b-0"
              >
                <span className="flex-grow">{item.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item._id, item.name)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
