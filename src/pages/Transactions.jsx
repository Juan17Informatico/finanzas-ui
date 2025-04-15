import { useEffect, useState } from "react";
import API from "../services/api";

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        description: "",
        amount: "",
        category_id: "",
    });

    useEffect(() => {
        fetchTransactions();
        fetchCategories();
    }, []);

    const fetchTransactions = async () => {
        const res = await API.get("/transactions");
        setTransactions(res.data);
    };

    const fetchCategories = async () => {
        const res = await API.get("/categories");
        setCategories(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post("/transactions", form);
        setForm({ description: "", amount: "", category_id: "" });
        fetchTransactions();
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Transacciones</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-6">
                <input
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Descripción"
                    className="border px-3 py-2 rounded"
                />
                <input
                    type="number"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    placeholder="Cantidad"
                    className="border px-3 py-2 rounded"
                />
                <select
                    value={form.category_id}
                    onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                    className="border px-3 py-2 rounded"
                >
                    <option value="">Categoría</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <button className="bg-green-500 text-white px-4 rounded">Agregar</button>
            </form>

            <ul className="space-y-2">
                {transactions.map((t) => (
                    <li key={t.id} className="bg-gray-100 p-2 rounded shadow">
                        <strong>{t.description}</strong> - ${t.amount} (
                        {t.category?.name || "Sin categoría"})
                    </li>
                ))}
            </ul>
        </div>
    );
}
