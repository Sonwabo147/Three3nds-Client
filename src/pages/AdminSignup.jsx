import React, {useState, useEffect} from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import Success from "../components/Success";

const AdminSignup = () => {
    const navigate = useNavigate();
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    
    
    const handleSignup = async e => {
        e.preventDefault ();
        setLoading (true);
        setError ('');
        try {
            await api ('/admin/signup', 'POST', {
                username, email, password
            });
            navigate('/admin_login');
        } catch (e) {
            console.error(e)
            setError (e.message)
        }
        
    }
    return (
        <>
            <h1>Admin Signup</h1>
            <form onSubmit={handleSignup}>
                <input 
                    type="text" 
                    name= "username" 
                    value = {username} 
                    placeholder= "username"
                    onChange = {(e) => setUsername (e.target.value)} 
                    required
                />
                <br /><br />
                <input 
                    type="email" 
                    name="email"
                    value = {email} 
                    placeholder= "Email"
                    onChange={(e) => setEmail (e.target.value)}
                    required
                /><br /><br />
                <input 
                    type="password" 
                    name="password"
                    value = {password} 
                    placeholder= "Password"
                    onChange={(e) => setPassword (e.target.value)}
                    required
                />
                <Error error={error} />
                <Success success={success}/>
                <br /><br />
                <button type="submit" className='cta-btn'>Signup</button>
            </form>
        </>
    )
}

export default AdminSignup
