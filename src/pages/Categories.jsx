import { useEffect, useState } from "react";
import API from "../services/api";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const res = await API.get("/v1/categories");
        setCategories(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post("/v1/categories", { name, type });
        setName("");
        setType("");
        fetchCategories();
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Categorías</h2>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-6">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nueva categoría"
                    className="border px-3 py-2 rounded w-full sm:w-64"
                />
                <input
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="Tipo de categoría"
                    className="border px-3 py-2 rounded w-full sm:w-64"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
                >
                    Agregar
                </button>
            </form>

            <ul className="space-y-2">
                {categories.map((cat) => (
                    <li key={cat.id} className="bg-gray-100 p-2 rounded shadow">
                        {cat.name} - {cat.type}
                    </li>
                ))}
            </ul>
        </div>
    );
}
