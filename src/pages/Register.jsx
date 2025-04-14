import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/v1/register", { email, password });
            alert("Registro exitoso, ahora puedes iniciar sesión");
            navigate("/login");
        } catch (err) {
            alert("Error al registrar");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded w-96">
                <h2 className="text-xl font-bold mb-4">Registrarse</h2>
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
                <button type="submit" className="bg-green-500 text-white w-full py-2 mt-4 rounded">
                    Registrarse
                </button>
            </form>
        </div>
    );
}
