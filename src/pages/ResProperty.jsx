import React , {useEffect, useState} from 'react'
import api from '../services/api'
import Nav from '../components/Nav'
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const PropertySharing = ({ property }) => {
    // Use the current website URL and property ID
    const listingUrl =
        `${window.location.origin}/property/${property.id}`;

    const shareMessage =
        `${property.name}\n` +
        `Location: ${property.location}\n` +
        `Monthly rental: R${property.monthly_rental || "N/A"}\n` +
        `View property: ${listingUrl}`;

    const shareWhatsApp = () => {
        const url =
            `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

        window.open(url, "_blank", "noopener,noreferrer");
    };

    const shareFacebook = () => {
        const url =
            `https://www.facebook.com/sharer/sharer.php?u=${
                encodeURIComponent(listingUrl)
            }`;

        window.open(url, "_blank", "noopener,noreferrer");
    };

    const copyAdvert = async () => {
        try {
            await navigator.clipboard.writeText(shareMessage);
            alert("Property advert copied!");
        } catch (error) {
            alert("Unable to copy. Please copy the property link manually.");
        }
    };

    return (
        <>
            <h3 style={{textAlign: "center"}}>Share</h3>
            <div className="propertySharing">
                <br />
                <button
                    className="shareIcon"
                    onClick={shareWhatsApp}
                    aria-label="Share on WhatsApp"
                    title="Share on WhatsApp"
                >
                    <img src="/whatsappIcon.png" alt="" />
                </button>

                <button className="shareIcon"
                    onClick={shareFacebook}
                    aria-label="Share on Facebook"
                    title="Share on Facebook"
                >
                    <img src="/facebook.png" alt="" />
                </button>

                <button className="shareIcon"
                    onClick={copyAdvert}
                    aria-label="Copy Advert"
                    title="Copy Advert"
                >
                    <img src="/copy.png" alt="" />
                </button>
            </div>
        </>
    );
};


const ResProperty = () => {
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
                        <h2>{property.title || ''}</h2>
                        <div className="profileDatail">
                            <span><b>Location</b>:</span>
                            <span>{property.location}</span>
                        </div>

                        <div className="profileDatail">
                            <span><b>Agent</b>:</span>
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
                        <PropertySharing property={property} />
                    </div>
                </>
            )}
        </>
    )
}

export default ResProperty

