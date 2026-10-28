import React, {useState, useEffect} from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Error from "../components/Error";
import Success from "../components/Success";
import Nav from '../components/Nav'


const AddProperty = () => {
    const navigate = useNavigate();
    const { uid } = useParams();
    const [user, setUser] = useState (null);
    const [auth, setAuth] = useState (null);
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dragging, setDragging] = useState(false);
    
    const [form, setForm] = useState({
            uid: uid, name: '', suitable_for: '',
            location: '', monthlyRental: '',
            deposit: '', size: '', availability: '',
            condition: '', floorPlan: [], parking: [],
            power: [], water: [], visibility: '', 
            footTraffic: '', nearbyBusinesses: '', 
            gpsLocation: '', videos: '', documents: ''
    });

    const parkingOptions = [
        "No Parking", "Street Parking",
        "Private Parking", "Covered Parking",
        "Basement Parking", "Loading Bay"
    ];

    const availabilityOptions = [
        "Available Now",
        "Available in 30 Days",
        "Available in 60 Days",
        "Occupied", "Under Offer", "Leased"
    ];

    const conditionOptions = [
        "Brand New", "Excellent",
        "Good", "Fair", "Needs Renovation",
        "Shell Space"
    ];

    const floorPlanOptions = [
        "Open Plan", "Partitioned Offices",
        "Single Floor", "Multi-Level",
        "Corner Unit", "Shell Layout",
        "Custom Layout"
    ];

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

    const waterOptions = [
        "Municipal Water",
        "Borehole", "Water Tank",
        "Included in Rent",
        "Metered", "No Water Connection"
    ];

    const powerOptions = [
        "Single Phase",
        "Three Phase",
        "Generator Backup",
        "Solar Power",
        "Metered Electricity",
        "Prepaid Electricity",
        "Municipal Electricity",
        "No Electricity"
    ];

    const visibilityOptions = [
        "Excellent",
        "High",
        "Medium",
        "Low",
        "Main Road Frontage",
        "Shopping Centre",
        "Inside Business Park"
    ];

    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: checked
                ? [...prev[name], value]
                : prev[name].filter(item => item !== value)
        }));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        setPhotos(Array.from(e.dataTransfer.files));
    };

    const addPropertyHandler = async e => {
        e.preventDefault ();
        setError ('');
        setLoading(true);
        try {
            const formData = new FormData();
            if (photos.length > 0) {
                photos.forEach(photo => {
                    formData.append("photos", photo);
                });
            }

            Object.entries(form).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, value);
                }
            });

            let res = await api ('/property/add', 'POST', formData);
            if (res.status === 401) {
                navigate ('/')
            } else if (res.error) {
                setError (res);
            } else {
                setSuccess({message: res.success, path: `/property/${res.pid}`});
            } 
        } catch (e) { throw e
        } finally {setLoading(false)}
    }
  
  return (
        <>
            <Nav auth={auth}/>
            {user &&
            <>
                <form onSubmit={addPropertyHandler} className='mainForm'>
                    <h2>Add Commercial Property</h2>
                    <div
                        onClick={() => document.getElementById("fileInput").click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className='dropFiles'
                        >
                        {photos && photos.length > 0 ? (
                            <>
                                <p>{photos.length} photo(s) selected</p>

                                <ul>
                                    {photos.map((photo, index) => (
                                        <li key={index}>{photo.name}</li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p>Drag & drop photos here</p>
                        )}
                    </div>
                    <div className="preview">
                        {photos &&
                            photos.map((photo, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(photo)}
                                    alt=""
                                />
                            ))
                        }
                    </div>
                    <div className="inpDiv">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => setPhotos(Array.from(e.target.files))}
                            style={{ display: "none" }}
                            id="fileInput"
                        />
                    </div>
                    <div className="inpDiv">
                        <input 
                            type="text" 
                            name= "name" 
                            value = {form.name} 
                            placeholder= "Property Name*"
                            onChange = {handleChange} 
                            required
                        />
                    </div>
                    <div className="inpDiv">
                        <select
                            name="suitable_for"
                            value={form.suitable_for}
                            required
                            onChange = {handleChange} 
                        >
                            <option value="">-- Suitable for --</option>
                            <option value="Retail">Retail</option>
                            <option value="Office">Office</option>
                            <option value="Salon / Barbar">Salon / Barbar</option>
                            <option value="Warehouse">Warehouse</option>
                            <option value="Manufacture">Manufacture</option>
                            <option value="Any Small Business">Any Small Business</option>
                        </select><br /><br />
                    </div>
                     <div className="inpDiv">
                        <input 
                            type="text" 
                            name="location"
                            value = {form.location} 
                            placeholder= "Location"
                            onChange = {handleChange} 
                            required
                        />
                        <br /><br />
                    </div>
                    <div className="inpDiv">
                        <input 
                            type="number" 
                            name="monthlyRental"
                            step= "any"
                            value = {form.monthlyRental} 
                            placeholder= "Monthly Rental"
                            onChange = {handleChange} 
                            required
                        />
                        <br /><br />
                    </div>
                    <div className="inpDiv">
                        <input 
                            type="number" 
                            name="deposit"
                            step= "any"
                            value = {form.deposit} 
                            placeholder= "Deposit"
                            onChange = {handleChange} 
                            required
                        />
                        <br /><br />
                    </div>
                   
                    
                    <div className="inpDiv">
                        <input 
                            type="text" 
                            name="size"
                            value = {form.size} 
                            placeholder= "Size / Space"
                            onChange = {handleChange} 
                            required
                        />
                    </div>
                    <div className="inpDiv">
                        {/* <label className="check-box-label"><b>Condition</b></label> */}
                        <select name="condition" value={form.condition}
                        onChange={handleChange}
                        >
                            <option value="">-- Select Condition --</option>
                            {conditionOptions.map((option, key) => (
                                <option key= {key} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div className="inpDiv">
                        {/* <label className="check-box-label"><b>Availability</b></label> */}
                        <select name="availability" value={form.availability}
                        onChange={handleChange}
                        >
                            <option value="">-- Select Availability --</option>
                            {availabilityOptions.map((option, key) => (
                                <option  key= {key} value={option}>{option}</option>
                            ))}
                        </select>
                        <br /><br />
                    </div>
                    <div className="inpDiv">
                        <select name="visibility" value={form.visibility}
                        onChange={handleChange}
                        >
                            <option value="">-- Select Visibility --</option>
                            {visibilityOptions.map((option, key) => (
                                <option key= {key} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div className="inpDiv check-box-div">
                        <label className="check-box-label"><b>Parking</b></label>
                        <div className="checkboxGroup">
                            {parkingOptions.map((option) => (
                                <label key={option} className="checkboxItem">
                                    {option}
                                    <input
                                        type="checkbox"
                                        name="parking"
                                        value={option}
                                        checked={form.parking.includes(option)}
                                        onChange={handleCheckboxChange}
                                    />
                                    
                                </label>
                            ))}
                        </div>
                    </div>
                    
                    
                    <div className="inpDiv check-box-div">
                        <label className="check-box-label"><b>Floor Plan</b></label>
                        <div className="checkboxGroup">
                            {floorPlanOptions.map((option) => (
                                <label key={option} className="checkboxItem">
                                    {option}
                                    <input
                                        type="checkbox"
                                        name="floorPlan"
                                        value={option}
                                        checked={form.floorPlan.includes(option)}
                                        onChange={handleCheckboxChange}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>
                    
                    <div className="inpDiv check-box-div">
                        <label className="check-box-label"><b>Water Plan</b></label>
                        <div className="checkboxGroup">
                            {waterOptions.map((option) => (
                                <label key={option} className="checkboxItem">
                                    {option}
                                    <input
                                        type="checkbox"
                                        name="water"
                                        value={option}
                                        checked={form.water.includes(option)}
                                        onChange={handleCheckboxChange}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="inpDiv check-box-div">
                        <label className="check-box-label"><b>Power Plan</b></label>
                        <div className="checkboxGroup">
                            {powerOptions.map((option) => (
                                <label key={option} className="checkboxItem">
                                    {option}
                                    <input
                                        type="checkbox"
                                        name="power"
                                        value={option}
                                        checked={form.power.includes(option)}
                                        onChange={handleCheckboxChange}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>
                    
                    <div className="inpDiv">
                        <textarea name="nearbyBusinesses" 
                            id="" 
                            placeholder="Nearby Businesses" 
                            onChange = {handleChange} 
                            value={form.nearbyBusinesses}
                        /><br /><br />
                    </div>
                    <div className="inpDiv">
                        <input 
                            type="text" 
                            name="gpsLocation"
                            value={form.gpsLocation}
                            placeholder="GPS Location" 
                            onChange = {handleChange} 
                        />
                        <br /><br />
                    </div>
                    <Error error={error} /> 
                    <Success success={success}/>
                    <div className="formActions">
                        <span></span>
                        <button disabled={loading} type="submit" className='cta-btn'>
                             
                            {loading ? "Uploading..." : "Add Property"}
                        </button>
                    </div>
                </form>
                <div className="botNav">
                    <Link to={`/`}>Back</Link>
                </div>
            </>
            }
        </>
  )
}
export default AddProperty
