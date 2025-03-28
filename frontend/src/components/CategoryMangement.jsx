import React, { useEffect, useState } from "react";
import axios from "../axios";
import { motion } from "framer-motion";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.post("/admin/categories", { action: "list" });
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/admin/categories", { action: "create", name, description });
      setCategories([...categories, res.data]);
      setName("");
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.post("/admin/categories", { action: "delete", categoryId });
      setCategories(categories.filter((cat) => cat._id !== categoryId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h3 className="text-2xl font-semibold mb-4">Category Management</h3>
      <form onSubmit={handleCreate} className="card mb-6 flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="btn btn-primary"
        >
          Add Category
        </motion.button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full card">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <motion.tr key={cat._id} whileHover={{ backgroundColor: "#f1f5f9" }} className="border-b">
                <td className="py-2 px-4">{cat.name}</td>
                <td className="py-2 px-4">{cat.description}</td>
                <td className="py-2 px-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(cat._id)}
                    className="btn bg-red-500 text-white px-3 py-1 hover:bg-red-600"
                  >
                    Delete
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default CategoryManagement;