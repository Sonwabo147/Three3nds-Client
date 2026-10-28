import React, {useState, useEffect} from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import Success from "../components/Success";

const BeAgent = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState("");

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const [username, setUsername] = useState("");
    const [rates, setRates] = useState("");

    const [whatsApp, setWhatsApp] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect (() => {
        async function checkAuth () {
            try {
                const res = await api ('/me');
                setAuth (res);
                if (!res.error) {
                    setPhone(res.phone)
                    setEmail(res.email)
                }

                console.log (auth)
            } catch (e) {throw e}
        }
        checkAuth ()
    }, [])
    
    const beAgentHandler = async e => {
        e.preventDefault ();
        setLoading (true);
        setError ('');
        console.log ({
                email, phone, whatsApp, rates, username, 
            })
        try {
            let res = await api ('/agents/beAgent', 'POST', {
                email, phone, whatsApp, rates, username, 
            });
            if (res.status) {
                setError (res)
            } else {
                setSuccess({message: res.success, path: `/`});
            }
            
        } catch (e) {
            console.error(e)
            setError (e.message)
        }
        
    }
    return (
        <>
         {auth && !auth.error && (
            <form onSubmit={beAgentHandler} className="mainForm">
                <h2>Become an Agent</h2>
                <input 
                    type="text" 
                    name= "name" 
                    value = {auth.name} 
                    placeholder= "Name"
                    readOnly
                />
                <br /><br />
                <input 
                    type="text" 
                    name= "surname" 
                    value = {auth.surname} 
                    placeholder= "surname"
                    readOnly
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
                    type="number" 
                    name="phone"
                    value = {whatsApp} 
                    placeholder= "WhatsApp"
                    onChange={(e) => setWhatsApp (e.target.value)}
                /><br /><br />
                <input 
                    type="username" 
                    name="username"
                    value = {username} 
                    placeholder= "Username"
                    onChange={(e) => setUsername (e.target.value)}
                /><br /><br />
                <input 
                    type="number" 
                    step="any"
                    name="rates"
                    value = {rates} 
                    placeholder= "Rate Fee (Rands)"
                    onChange={(e) => setRates (e.target.value)}
                /><br /><br />
                <Error error={error} />
                <Success success={success}/>
                <button type="submit" className='cta-btn'>Add</button>
            </form>
         )}
        </>
    )
}

export default BeAgent
