import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
    const [report, setReport] = useState(null);
    const { logout } = useAuth();

    useEffect(() => {
        API.get("/v1/budgets/reports").then((res) => {
            setReport(res.data);
        });
    }, []);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <button onClick={logout} className="text-red-500 underline">
                    Cerrar sesión
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <Link
                    to="/categories"
                    className="bg-blue-100 hover:bg-blue-200 p-4 rounded shadow text-center"
                >
                    📁 Categorías
                </Link>
                <Link
                    to="/budgets"
                    className="bg-green-100 hover:bg-green-200 p-4 rounded shadow text-center"
                >
                    💰 Presupuestos
                </Link>
                <Link
                    to="/transactions"
                    className="bg-yellow-100 hover:bg-yellow-200 p-4 rounded shadow text-center"
                >
                    🔄 Transacciones
                </Link>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-2">Reporte general</h2>
                {report ? (
                    <pre className="bg-gray-100 p-4 rounded shadow overflow-auto">
                        {JSON.stringify(report, null, 2)}
                    </pre>
                ) : (
                    <p>No hay reportes asociados</p>
                )}
            </div>
        </div>
    );
}
