
import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useParams } from "react-router-dom";
import Error from "../components/Error";
import Success from "../components/Success";


const SendWhatsApp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [enq, setEnq] = useState (null);
    const [property, setProperty] = useState (null);
    const [agent, setAgent] = useState (null);

    useEffect (() => {
        async function getEnq () {
            try {
                const res = await api (`/leads/enquiry/${id}`);
                if (!res.error) {
                    setEnq (res.enq);
                    setAgent (res.agent);
                    setProperty (res.property);
                }
                
            } catch (e) {throw e}
        }
        getEnq ()
    }, [id])
    

    if (!enq || !agent || !property) {
        return (
            <div>
                <h2>Enquiry details not found</h2>
                <button onClick={() => navigate(-1)}>
                    Go Back
                </button>
            </div>
        );
    }

    const message = `Hi ${agent.name}, I am ${enq.name}. I have submitted an Enquiry about ${property.title}. 

${enq.message || ""}`;

    const whatsappNumber = (agent.details.whatsapp || agent.details.phone || "")
        .replace(/\D/g, "");

    const whatsappUrl = whatsappNumber
        ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
        : `https://wa.me/?text=${encodeURIComponent(message)}`;

    return (
        <div className="mainForm">
            <h2>Send your enquiry on WhatsApp</h2>
            <p>Review your message before opening WhatsApp.</p>
            <textarea
                value={message}
                readOnly
                rows={6}
            />

            <br /><br />

            <button
                type="button"
                className="cta-btn"
                onClick={() => window.open(
                    whatsappUrl,
                    "_blank",
                    "noopener,noreferrer"
                )}
            >
                Send on WhatsApp
            </button>
        </div>
    );
};

export default SendWhatsApp;
