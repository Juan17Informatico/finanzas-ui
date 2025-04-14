import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/v1/login", { email, password });
            login(res.data.token);
            navigate("/");
        } catch (error) {
            alert("Error al iniciar sesión");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded w-96">
                <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    placeholder="Correo"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input mt-2"
                    placeholder="Contraseña"
                />
                <button type="submit" className="bg-blue-500 text-white w-full py-2 mt-4 rounded">
                    Entrar
                </button>
            </form>
        </div>
    );
}
