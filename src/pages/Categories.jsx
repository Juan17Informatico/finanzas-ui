import { useEffect, useState } from "react";
import API from "../services/api";
import { Folders, Plus, Tag, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await API.get("/v1/categories");
            setCategories(res.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/v1/categories", { name, type });
            setName("");
            setType("");
            fetchCategories();
        } catch (error) {
            console.error("Error creating category:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Navigation */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center">
                        <Link to="/" className="text-gray-500 hover:text-gray-700 mr-4">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div className="flex items-center">
                            <Folders className="h-6 w-6 text-indigo-600 mr-2" />
                            <h1 className="text-xl font-bold text-gray-900">Categorías</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Card for New Category Form */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Agregar Nueva Categoría
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Nombre
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Tag className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ej: Alimentación, Transporte"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <label
                                htmlFor="type"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Tipo
                            </label>
                            <select
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            >
                                <option value="">Selecciona un tipo</option>
                                <option value="expense">Gasto</option>
                                <option value="income">Ingreso</option>
                                <option value="transfer">Transferencia</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button
                                type="submit"
                                className="flex items-center justify-center w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <Plus className="h-4 w-4 mr-1" />
                                Agregar
                            </button>
                        </div>
                    </form>
                </div>

                {/* Categories List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Lista de Categorías</h2>
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {categories.length} categorías
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-pulse h-6 w-6 rounded-full bg-indigo-400"></div>
                            <div className="animate-pulse h-6 w-6 rounded-full bg-indigo-500 ml-1"></div>
                            <div className="animate-pulse h-6 w-6 rounded-full bg-indigo-600 ml-1"></div>
                        </div>
                    ) : categories.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categories.map((cat) => (
                                <div
                                    key={cat.id}
                                    className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium text-gray-900">
                                                {cat.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">{cat.type}</p>
                                        </div>
                                        <span
                                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                cat.type === "expense"
                                                    ? "bg-red-100 text-red-800"
                                                    : cat.type === "income"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-blue-100 text-blue-800"
                                            }`}
                                        >
                                            {cat.type === "expense"
                                                ? "Gasto"
                                                : cat.type === "income"
                                                ? "Ingreso"
                                                : "Transferencia"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <p>No hay categorías disponibles</p>
                            <p className="text-sm mt-1">
                                Agrega tu primera categoría usando el formulario superior
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
