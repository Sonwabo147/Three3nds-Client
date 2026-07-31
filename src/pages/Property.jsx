import React , {useEffect, useState} from 'react'
import api from '../services/api'
import Nav from '../components/Nav'
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Property = () => {
    const [auth, setAuth] = useState (null);
    const { pid } = useParams();
    const [property, setProperty] = useState (null);
    const [error, setError] = useState (null);
    const [isOpen, setIsOpen] = useState (true);
    const [showModal, setShowModal] = useState (false)
    const navigate = useNavigate();
    useEffect (() => {

        async function checkAuth () {
            try {
                const res = await api ('/me');
                setAuth (res);
            } catch (e) {throw e}
        }

        async function getProperty () {
          const res = await api (`/property/get/${pid}`);
          if (res.status === 401) {
            navigate ('/')
          } else {
            setProperty (res)
          }
        }
        checkAuth ()
        getProperty ();
     }, [pid])

    const openConfirm = () => setShowModal (true)
    const handleCancel = () => setShowModal(false);
    
    return (
        <>
            <Nav auth={auth}/>
            {property && auth && (
                <>  
                    <div className='profile'>
                        <div className="preview">
                            {JSON.parse(property.photos).map((photo, index) => (
                                <img
                                    key={index}
                                    src={photo}
                                />
                            ))}
                        </div>
                        <h2>{property.name || ''}</h2>
                        <div className="profileDatail">
                            <span><b>Location</b>:</span>
                            <span>{property.location}</span>
                        </div>

                        <div className="profileDatail">
                            <span><b>Suitable For</b>:</span>
                            <span>{property.suitable_for}</span>
                        </div>

                        <div className="profileDatail">
                            <span><b>Owner</b>:</span>
                            <span>{property.user.name} {property.user.surname}</span>
                        </div>

                        <div className="profileDatail">
                            <span><b>Availability</b>:</span>
                            <span>{property.availability}</span>
                        </div>

                        <div className="profileDatail">
                            <span><b>Condition</b>:</span>
                            <span>{property.property_condition}</span>
                        </div>

                        <div className="profileDatail">
                            <span><b>Monthly Rental</b>:</span>
                            <span>{property.monthly_rental || "N/A"}</span>
                        </div>

                        <div className="profileDatail">
                            <span><b>Deposit</b>:</span>
                            <span>{property.deposit || "N/A"}</span>
                        </div>

                        <div className="profileDatail">
                            <span><b>Size</b>:</span>
                            <span>{property.size || "N/A"}</span>
                        </div>

                        <div className="profileDatail">
                            <span><b>Power</b>:</span>
                            <span>{property.power || "N/A"}</span>
                        </div>

                        <div className="profileDatail">
                            <span><b>Water</b>:</span>
                            <span>{property.water || "N/A"}</span>
                        </div>
                        
                    </div>
                </>
            )}
        </>
    )
}

export default Property

