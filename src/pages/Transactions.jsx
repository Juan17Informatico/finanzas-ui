import { useEffect, useState } from "react";
import API from "../services/api";
import { RefreshCw, Plus, ArrowLeft, Calendar, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [form, setForm] = useState({
        description: "",
        amount: "",
        category_id: "",
        date: new Date().toISOString().split("T")[0],
    });

    useEffect(() => {
        Promise.all([fetchTransactions(), fetchCategories()]);
    }, []);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const res = await API.get("/transactions");
            setTransactions(res.data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await API.get("/categories");
            setCategories(res.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/transactions", form);
            setForm({
                description: "",
                amount: "",
                category_id: "",
                date: new Date().toISOString().split("T")[0],
            });
            fetchTransactions();
        } catch (error) {
            console.error("Error creating transaction:", error);
        }
    };

    const filteredTransactions = transactions.filter((t) =>
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getCategoryColor = (categoryId) => {
        const category = categories.find((c) => c.id === categoryId);
        if (!category) return "bg-gray-100 text-gray-800";

        switch (category.type) {
            case "expense":
                return "bg-red-100 text-red-800";
            case "income":
                return "bg-green-100 text-green-800";
            case "transfer":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
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
                            <RefreshCw className="h-6 w-6 text-amber-600 mr-2" />
                            <h1 className="text-xl font-bold text-gray-900">Transacciones</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Card for New Transaction Form */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Registrar Nueva Transacción
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                    >
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Descripción
                            </label>
                            <input
                                id="description"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                placeholder="Descripción de la transacción"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="amount"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Cantidad
                            </label>
                            <input
                                id="amount"
                                type="number"
                                value={form.amount}
                                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                                placeholder="0.00"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                                required
                                step="0.01"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="category"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Categoría
                            </label>
                            <select
                                id="category"
                                value={form.category_id}
                                onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                                required
                            >
                                <option value="">Seleccionar categoría</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="date"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Fecha
                            </label>
                            <div className="flex">
                                <input
                                    id="date"
                                    type="date"
                                    value={form.date}
                                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                                />
                                <button
                                    type="submit"
                                    className="flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-r-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                                >
                                    <Plus className="h-4 w-4 mr-1" />
                                    Agregar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Transactions List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="sm:flex sm:items-center sm:justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Historial de Transacciones
                        </h2>

                        <div className="mt-3 sm:mt-0 sm:ml-4">
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Buscar transacciones..."
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-pulse h-6 w-6 rounded-full bg-amber-400"></div>
                            <div className="animate-pulse h-6 w-6 rounded-full bg-amber-500 ml-1"></div>
                            <div className="animate-pulse h-6 w-6 rounded-full bg-amber-600 ml-1"></div>
                        </div>
                    ) : filteredTransactions.length > 0 ? (
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Descripción
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Categoría
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Fecha
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                                        >
                                            Monto
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {filteredTransactions.map((transaction) => (
                                        <tr key={transaction.id} className="hover:bg-gray-50">
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                                                {transaction.description}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {transaction.category ? (
                                                    <span
                                                        className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(
                                                            transaction.category.id
                                                        )}`}
                                                    >
                                                        {transaction.category.name}
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                                        Sin categoría
                                                    </span>
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                                                    {new Date(
                                                        transaction.created_at
                                                    ).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-right">
                                                <span
                                                    className={
                                                        parseFloat(transaction.amount) < 0
                                                            ? "text-red-600 font-medium"
                                                            : "text-green-600 font-medium"
                                                    }
                                                >
                                                    {parseFloat(transaction.amount) < 0 ? "-" : "+"}
                                                    $
                                                    {Math.abs(
                                                        parseFloat(transaction.amount)
                                                    ).toFixed(2)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <p>No hay transacciones disponibles</p>
                            <p className="text-sm mt-1">
                                Registra tu primera transacción usando el formulario superior
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
