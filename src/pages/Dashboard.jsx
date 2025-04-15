import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { CircleUser, LogOut, PieChart, Folders, Wallet, RefreshCw } from "lucide-react";

export default function Dashboard() {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const { logout } = useAuth();

    useEffect(() => {
        setLoading(true);
        API.get("/v1/budgets/reports")
            .then((res) => {
                setReport(res.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <PieChart className="h-8 w-8 text-indigo-600" />
                            <h1 className="ml-2 text-xl font-bold text-gray-900">Mi Presupuesto</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <CircleUser className="h-8 w-8 text-gray-500" />
                            <button 
                                onClick={logout} 
                                className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
                            >
                                <LogOut className="h-5 w-5 mr-1" />
                                <span>Cerrar sesión</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Dashboard Title */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                    <p className="text-gray-600">Bienvenido a tu centro de gestión financiera</p>
                </div>

                {/* Quick Access Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <Link
                        to="/categories"
                        className="bg-white hover:bg-indigo-50 border border-gray-200 rounded-lg shadow-sm p-6 transition-all duration-300 transform hover:-translate-y-1 group"
                    >
                        <div className="flex flex-col items-center">
                            <div className="bg-indigo-100 p-3 rounded-full mb-4 group-hover:bg-indigo-200 transition-colors">
                                <Folders className="h-8 w-8 text-indigo-600" />
                            </div>
                            <h3 className="font-semibold text-lg text-gray-800">Categorías</h3>
                            <p className="text-gray-500 text-sm mt-1">Gestionar categorías de gastos</p>
                        </div>
                    </Link>
                    <Link
                        to="/budgets"
                        className="bg-white hover:bg-green-50 border border-gray-200 rounded-lg shadow-sm p-6 transition-all duration-300 transform hover:-translate-y-1 group"
                    >
                        <div className="flex flex-col items-center">
                            <div className="bg-green-100 p-3 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
                                <Wallet className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-lg text-gray-800">Presupuestos</h3>
                            <p className="text-gray-500 text-sm mt-1">Definir y rastrear tus presupuestos</p>
                        </div>
                    </Link>
                    <Link
                        to="/transactions"
                        className="bg-white hover:bg-amber-50 border border-gray-200 rounded-lg shadow-sm p-6 transition-all duration-300 transform hover:-translate-y-1 group"
                    >
                        <div className="flex flex-col items-center">
                            <div className="bg-amber-100 p-3 rounded-full mb-4 group-hover:bg-amber-200 transition-colors">
                                <RefreshCw className="h-8 w-8 text-amber-600" />
                            </div>
                            <h3 className="font-semibold text-lg text-gray-800">Transacciones</h3>
                            <p className="text-gray-500 text-sm mt-1">Administrar tus movimientos financieros</p>
                        </div>
                    </Link>
                </div>

                {/* Reports Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Reporte General</h2>
                        <button className="text-sm px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                            Exportar
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-pulse h-6 w-6 rounded-full bg-indigo-400"></div>
                            <div className="animate-pulse h-6 w-6 rounded-full bg-indigo-500 ml-1"></div>
                            <div className="animate-pulse h-6 w-6 rounded-full bg-indigo-600 ml-1"></div>
                        </div>
                    ) : report ? (
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 overflow-auto">
                            {Object.entries(report).map(([key, value]) => (
                                <div key={key} className="mb-4 last:mb-0">
                                    <h3 className="text-md font-medium text-gray-800 mb-2 capitalize">{key.replace('_', ' ')}</h3>
                                    <div className="bg-white p-3 rounded border border-gray-200">
                                        {typeof value === 'object' ? (
                                            <pre className="text-sm text-gray-600 font-mono">
                                                {JSON.stringify(value, null, 2)}
                                            </pre>
                                        ) : (
                                            <p className="text-gray-700">{value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <p>No hay reportes disponibles actualmente</p>
                            <button className="mt-4 px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                                Generar reporte
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}