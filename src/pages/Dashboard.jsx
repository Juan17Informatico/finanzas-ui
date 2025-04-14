import { useEffect, useState } from "react";
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
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <button onClick={logout} className="text-red-500 underline">
                    Cerrar sesión
                </button>
            </div>
            <div className="mt-6">
                {report ? <pre>{JSON.stringify(report, null, 2)}</pre> : <p>Cargando resumen...</p>}
            </div>
        </div>
    );
}
