import React, {useState, useEffect} from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import Success from "../components/Success";

const AddUser = () => {
    const navigate = useNavigate();
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    
    const addUserHandler = async e => {
        e.preventDefault ();
        setLoading (true);
        setError ('');
        try {
            let res = await api ('/admin/addUser', 'POST', {
                name, surname, email, phone
            });
            if (res.status) {
                setError (res)
            } else {
                setSuccess({message: res.success, path: `/user/${res.uid}`});
            }
            
        } catch (e) {
            console.error(e)
            setError (e.message)
        }
        
    }
    return (
        <>
        <form onSubmit={addUserHandler} className="mainForm">
            <h1>Add User</h1>
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
            <Error error={error} />
            <Success success={success}/>
            <button type="submit" className='cta-btn'>Add</button>
        </form>
        </>
    )
}

export default AddUser
