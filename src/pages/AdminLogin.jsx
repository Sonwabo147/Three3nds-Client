import React, {useState, useEffect} from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import Success from "../components/Success";


const Login = () => {
    const navigate = useNavigate();
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = async e => {
        e.preventDefault ();
        setLoading (true);
        setError ('');
        try {
            const data = await api ('/admin/login', 'POST', {email, password});
            setLoading(false);
            if (data.status) {
                setError(data)
            } else if (data.uid) {
                navigate(`/setPassword/${data.uid}`);
            } else {
                setSuccess({message: data.message, path: `/`});
            }
        } catch (e) {setError (e); throw e}
    }
    return (
        <>
            <form onSubmit={handleLogin} className="mainForm">
                <h2>Admin Login</h2>
                <div className="inpDiv">
                <input 
                    type="email" 
                    name="email"
                    value = {email} 
                    placeholder= "Email"
                    onChange={(e) => setEmail (e.target.value)}
                    required
                /></div>
                <div className="inpDiv">
                    <input 
                        type="password" 
                        name="password"
                        value = {password} 
                        placeholder= "Password"
                        onChange={(e) => setPassword (e.target.value)}
                    />
                </div>
                <Error error={error} />
                <Success success={success}/>
                <div className="formActions">
                    <span></span>
                    <button type="submit" className='cta-btn'>Login</button>
                </div>
            </form>
        </>
    )
}

export default Login
