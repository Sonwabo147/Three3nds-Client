import React, {useState, useEffect} from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Error from "../components/Error";
import Success from "../components/Success";

const AddBusiness = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [type, setType] = useState("");
    const [monthlyBudget, setMonthlyBudget] = useState("");
    const [location, setLocation] = useState("");
    const [leaseStatus, setLeaseStatus] = useState("");
    const [operationalStatus, setOperationalStatus] = useState("");
    const [requiredSpace, setRequiredSpace] = useState("");
    const [notes, setNotes] = useState(null);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const { uid } = useParams();

     useEffect (() => {

     async function getUser () {
          const res = await api (`/auth/getUser/${uid}`);
          if (res.status === 401) {
            navigate ('/')
          } else {
            setUser (res)
          }
        }
    getUser ();
     }, [uid])
    
    const AddBusinessHandler = async e => {
        e.preventDefault ();
        setLoading (true);
        setError ('');
        try {
            let res = await api ('/biz/add', 'POST', {
                name, type, location, leaseStatus, operationalStatus, 
                requiredSpace, monthlyBudget, notes, email, phone, uid
            });
            if (res.error) {
                setError(res)
            } else {
                setSuccess({message: res.success, path: `/biz/${res.bid}`});
            }
            
        } catch (e) {
            console.error(e)
            setError (e.message)
        }
        
    }
    return (
        <>
        {user &&
            <>
                <div className='profile'>
                </div>
                <form onSubmit={AddBusinessHandler}>
                    <h1>Add Business</h1>
                    <div className="profile Datail">
                        <span><b>User</b>:</span>
                        <Link to={`/user/${user.uid}`}>{user.name} {user.surname}</Link>
                    </div>
                    <input 
                        type="text" 
                        name= "name" 
                        value = {name} 
                        placeholder= "Business Name*"
                        onChange = {(e) => setName (e.target.value)} 
                        required
                    />
                    <br /><br />
                    <select
                        name="type"
                        value={type}
                        required
                        onChange = {(e) => setType (e.target.value)} 

                    >
                        <option value="">-- Select Business Type --</option>
                        <optgroup label="Retail">
                        <option value="Clothing Store">Clothing Store</option>
                        <option value="Convenience Store">Convenience Store</option>
                        <option value="Electronics Store">Electronics Store</option>
                        <option value="Furniture Store">Furniture Store</option>
                        <option value="Hardware Store">Hardware Store</option>
                        <option value="Liquor Store">Liquor Store</option>
                        <option value="Pharmacy">Pharmacy</option>
                        <option value="Spaza Shop">Spaza Shop</option>
                        </optgroup>

                        <optgroup label="Food & Beverage">
                        <option value="Bakery">Bakery</option>
                        <option value="Butchery">Butchery</option>
                        <option value="Catering Business">Catering Business</option>
                        <option value="Coffee Shop">Coffee Shop</option>
                        <option value="Fast Food">Fast Food</option>
                        <option value="Grocery Store">Grocery Store</option>
                        <option value="Ice Cream Shop">Ice Cream Shop</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Shisanyama">Shisanyama</option>
                        <option value="Takeaway">Takeaway</option>
                        </optgroup>

                        <optgroup label="Beauty & Personal Care">
                        <option value="Barbershop">Barbershop</option>
                        <option value="Beauty Salon">Beauty Salon</option>
                        <option value="Cosmetics Shop">Cosmetics Shop</option>
                        <option value="Hair Salon">Hair Salon</option>
                        <option value="Massage Studio">Massage Studio</option>
                        <option value="Nail Salon">Nail Salon</option>
                        <option value="Spa">Spa</option>
                        <option value="Wig & Hair Store">Wig & Hair Store</option>
                        </optgroup>

                        <optgroup label="Health & Wellness">
                        <option value="Dental Practice">Dental Practice</option>
                        <option value="Fitness Studio">Fitness Studio</option>
                        <option value="Gym">Gym</option>
                        <option value="Medical Practice">Medical Practice</option>
                        <option value="Physiotherapy Clinic">Physiotherapy Clinic</option>
                        <option value="Optometrist">Optometrist</option>
                        <option value="Psychologist">Psychologist</option>
                        <option value="Wellness Centre">Wellness Centre</option>
                        </optgroup>

                        <optgroup label="Services">
                        <option value="Computer Repair">Electronics Repair</option>
                        <option value="Event Planner">Event Planner</option>
                        <option value="Dry Cleaner">Dry Cleaner</option>
                        <option value="Internet Cafe">Internet Café</option>
                        <option value="Laundry">Laundry</option>
                        <option value="Phone Repair">Phone Repair</option>
                        <option value="Photography Studio">Photography Studio</option>
                        <option value="Printing Shop">Printing Shop</option>
                        <option value="Tailor">Tailor</option>
                        </optgroup>

                        <optgroup label="Industrial">
                        <option value="Auto Workshop">Auto Workshop</option>
                        <option value="Car Wash">Car Wash</option>
                        <option value="Distribution Centre">Distribution Centre</option>
                        <option value="Furniture Manufacturing">Furniture Manufacturing</option>
                        <option value="Metal Fabrication">Metal Fabrication</option>
                        <option value="Panel Beating">Panel Beating</option>
                        <option value="Tyre Centre">Tyre Centre</option>
                        <option value="Warehouse">Warehouse</option>
                        <option value="Woodworking">Woodworking</option>
                        </optgroup>

                        <optgroup label="Education">
                        <option value="Aftercare">Aftercare</option>
                        <option value="Computer Training Centre">Computer Training Centre</option>
                        <option value="Daycare">Daycare</option>
                        <option value="Driving School">Driving School</option>
                        <option value="NGO">NGO</option>
                        <option value="NPO">NPO</option>
                        <option value="Tutoring Centre">Tutoring Centre</option>
                        </optgroup>

                        <optgroup label="Entertainment">
                        <option value="Event Venue">Event Venue</option>
                        <option value="Gaming Lounge">Gaming Lounge</option>
                        <option value="Music Studio">Music Studio</option>
                        <option value="Pool Lounge">Pool Lounge</option>
                        </optgroup>

                    </select><br /><br />
                    <input 
                        type="text" 
                        name="location"
                        value = {location} 
                        placeholder= "Location"
                        onChange={(e) => setLocation (e.target.value)}
                    />
                    <br /><br />
                    <input 
                        type="number" 
                        name="phone"
                        value = {phone} 
                        placeholder= "Phone"
                        onChange={(e) => setPhone (e.target.value)}
                    />
                    <br /><br />
                    <input 
                        type="email" 
                        name="email"
                        value = {email} 
                        placeholder= "Email"
                        onChange={(e) => setEmail (e.target.value)}
                    />
                    <br /><br />
                    <select name="leaseStatus"
                        onChange={(e) => setLeaseStatus (e.target.value)}
                    >
                        <option value="">-- Select Lease Status* --</option>
                        <option>New Lead</option>
                        <option>Contacted</option>
                        <option>Needs Assessment</option>
                        <option>Searching</option>
                        <option>Properties Sent</option>
                        <option>Viewing Scheduled</option>
                        <option>Viewing Completed</option>
                        <option>Negotiating</option>
                        <option>Application Submitted</option>
                        <option>Documents Pending</option>
                        <option>Approved</option>
                        <option>Lease Signing</option>
                        <option>Move-in Scheduled</option>
                        <option>Occupied</option>
                        <option>Completed</option>
                        <option>Follow-up Required</option>
                        <option>On Hold</option>
                        <option>Cancelled</option>
                        <option>Lost Opportunity</option>
                    </select>
                    <br /><br />
                    <select name="operationalStatus"
                        onChange={(e) => setOperationalStatus (e.target.value)}
                    >
                        <option value="">-- Select Operational Status* --</option>
                        <option>Planning</option>
                        <option>Startup</option>
                        <option>Operating</option>
                        <option>Expanding</option>
                        <option>Relocating</option>
                        <option>Franchise</option>
                        <option>Temporary Closure</option>
                        <option>Closed</option>
                    </select>
                    <br /><br />
                    <input 
                    type="number" 
                    name="monthlyBudget"
                    value={monthlyBudget}
                     placeholder="Monthly Budget"
                     onChange={(e) => setMonthlyBudget (e.target.value)}
                     />
                        

                    <br /><br />
                    <input 
                    type="text" 
                    name="requiredSpace"
                    value={requiredSpace}
                    placeholder="Space Required" 
                    onChange={(e) => setRequiredSpace (e.target.value)}
                     />
                     
                    <br /><br />
                    <textarea name="notes" 
                        id="" 
                        placeholder="Notes" 
                        onChange={(e) => setRequiredSpace (e.target.value)}
                    >{notes}</textarea><br /><br />
                    <Error error={error} />
                    <Success success={success}/>
                    <button type="submit" className='cta-btn'>Add Business</button>
                </form>
            </>
        }
        
        </>
    )
}

export default AddBusiness
