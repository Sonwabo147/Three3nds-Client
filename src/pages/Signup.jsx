import React, {useState, useEffect} from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import Success from "../components/Success";

const Signup = () => {
    const navigate = useNavigate();
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    
    // User Inputs
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSignup = async e => {
        e.preventDefault ();
        setLoading (true);
        setError ('');
        try {
            let res = await api ('/auth/signup', 'POST', {
                name, surname, email, phone, password
            });
            if (res.status === 402) {
                setError (res)
            } else {
                setSuccess({message: res.success, path: `/`});
            }
        } catch (e) {
            console.log(e)
            setError (e.error)
        }
        
    }
    return (
        <>
        <form onSubmit={handleSignup} className="mainForm">
            <h1>Sign Up</h1>
            <input 
                type="text" 
                name= "name" 
                value = {name} 
                placeholder= "Name"
                onChange = {(e) => setName (e.target.value)} 
                required
            />
            <br /><br />
             <input 
                type="text" 
                name= "surname" 
                value = {surname} 
                placeholder= "surname"
                onChange = {(e) => setSurname (e.target.value)} 
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
                type="number" 
                name="phone"
                value = {phone} 
                placeholder= "Phone"
                onChange={(e) => setPhone (e.target.value)}
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
            <br /><br />
            <Error error={error} />
            <Success success={success}/>
            <button type="submit"  className='cta-btn'>Signup</button>
        </form>
        </>
    )
}

export default Signup
