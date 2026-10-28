import React, {useState, useEffect} from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Error from "../components/Error";
import Success from "../components/Success";

const Enquire = () => {
    const navigate = useNavigate();
    const { pid } = useParams();
    const [auth, setAuth] = useState (null);
    const [property, setProperty] = useState (null);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [source, setSource] = useState("");
    const [gender, setGender] = useState("");
    const [adults, setAdults] = useState("");
    const [children, setChildren] = useState("");
    useEffect (() => {
        async function checkAuth () {
            try {
                const res = await api ('/me');
                setAuth (res);
            } catch (e) {throw e}
        }

        async function getProperty () {
          const res = await api (`/property/getRes/${pid}`);
          if (res.status === 401) {
            navigate ('/')
          } else {
            setProperty (res)
          }
        }
        checkAuth ()
        getProperty ();
    }, [pid])
    const handleEnquiry = async e => {
        e.preventDefault ();
        setLoading (true);
        setError ('');
        try {
            const res = await api ('/leads/enquire', 'POST', {
                pid, name, email, phone, gender, adults, children, message
            });
            navigate(`/sendWhatsApp/${res.enqId}`);
        } catch (e) {
            console.error(e)
            setError (e.message)
        }
        
    }
    return (
        <>
            <h2>Property Enquire</h2>
            {property &&
            <form onSubmit={handleEnquiry}>
                <p>{property.title || property.name}</p>
                <input 
                    type="text" 
                    name= "name" 
                    value = {name} 
                    placeholder= "Full name*"
                    onChange = {(e) => setName (e.target.value)} 
                    required
                />
                <br /><br />
                <input 
                    type="email" 
                    name="email"
                    value = {email} 
                    placeholder= "Email"
                    onChange={(e) => setEmail (e.target.value)}
                /><br /><br />
                <input 
                    type="number" 
                    name="phone"
                    value = {phone} 
                    placeholder= "Phone*"
                    onChange={(e) => setPhone (e.target.value)}
                    required
                /><br /><br />
                <div>
                    <label htmlFor="gender">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Prefer not to say</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                    </select>       
                </div>
                <br /><br />
                <div>
                    <label htmlFor="adults">
                        How many adults will be moving in?
                    </label>
                    <input
                        type="number"
                        id="adults"
                        name="adults"
                        min="1"
                        step="1"
                        value={adults}
                        onChange={(e) => setAdults(e.target.value)}
                        placeholder="Total number of Adult occupants"
                    />
                </div>
                <div>
                    <label htmlFor="children">
                        How many children will be moving in?
                    </label>
                    <input
                        type="number"
                        id="children"
                        name="children"
                        min="0"
                        step="1"
                        value={children}
                        onChange={(e) => setChildren(e.target.value)}
                        placeholder="Total number of children occupants"
                    />
                </div>
                <div>
                    <textarea name="message" id="" placeholder="Message"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    ></textarea>
                </div>
                <Error error={error} />
                <Success success={success}/>
                <br /><br />
                <button type="submit" className='cta-btn'>Enquire</button>
            </form>
            }
        </>
    )
}

export default Enquire
