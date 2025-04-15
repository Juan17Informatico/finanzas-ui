import { useEffect, useState } from "react";
import API from "../services/api";

export default function Budgets() {
    const [budgets, setBudgets] = useState([]);
    const [amount, setAmount] = useState("");

    useEffect(() => {
        fetchBudgets();
    }, []);

    const fetchBudgets = async () => {
        const res = await API.get("/budgets");
        setBudgets(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post("/budgets", { amount });
        setAmount("");
        fetchBudgets();
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Presupuestos</h2>

            <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Cantidad"
                    className="border px-3 py-2 rounded w-64"
                />
                <button className="bg-blue-500 text-white px-4 rounded">Agregar</button>
            </form>

            <ul className="space-y-2">
                {budgets.map((b) => (
                    <li key={b.id} className="bg-gray-100 p-2 rounded shadow">
                        ${b.amount} - {new Date(b.created_at).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}
