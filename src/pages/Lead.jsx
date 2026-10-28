import React , {useEffect, useState} from 'react'
import api from '../services/api'
import Nav from '../components/Nav'
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";





const Lead = () => {
    const [auth, setAuth] = useState (null);
    const { id } = useParams();
    const [lead, setLead] = useState (null);
    const [status, setStatus] = useState (null);
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

        async function getLead () {
          const res = await api (`/leads/enquiry/${id}`);
          if (res.status === 401) {
            navigate ('/')
          } else {
            console.log (res)
            setLead (res)
          }
        }
        checkAuth ()
        getLead ();
     }, [id])

    const updateLeadStatus = async () => {
        if (lead.enq.status !== status) {
            const res = await api (`/leads/updateStatus`, 'POST', {id, status})
            if (res.error) {
                alert(res.error)
            } else {
                alert(res.success)
            }
        }
    }

    const openConfirm = () => setShowModal (true)
    const handleCancel = () => setShowModal(false);
    
    return (
        <>
            <Nav auth={auth}/>
            {lead && auth && (
                <>  
                    <div className='profile'>
                        <h2>Lead</h2>
                        <div className="profileDatail">
                            <span>Full name:</span>
                            <span>{lead.enq.name}</span>
                        </div>

                        <div className="profileDatail">
                            <span><b>Property</b>:</span>
                            <span>{lead.property.title}</span>
                        </div>
                        <div className="profileDatail">
                            <span><b>Phone</b>:</span>
                            <span>{lead.enq.phone}</span>
                        </div>
                        <div className="profileDatail">
                            <span><b>Email</b>:</span>
                            <span>{lead.enq.email || `N/A`}</span>
                        </div>
                        <div>
                            <span>Message:</span><br />
                            <i>{lead.enq.message}</i>
                        </div>
                        <div className="profileDatail">
                            <span><b>Status</b>:</span>
                            <select name="" id="" onChange={(e) => setStatus(e.target.value)}>
                                <option value={lead.enq.status}>{lead.enq.status}</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Viewing">Viewing</option>
                                <option value="Applcation">Applcation</option>
                                <option value="Converted">Converted</option>
                                <option value="Lost">Lost</option>
                            </select>
                        </div>
                        
                        <i></i>
                        <button onClick={updateLeadStatus}>Update status</button>
                    </div>
                </>
            )}
        </>
    )
}

export default Lead

