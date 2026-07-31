import React , {useEffect, useState} from 'react'
import api from '../services/api'
import Nav from '../components/Nav'
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Business = () => {
    const [auth, setAuth] = useState (null);
    const { bid } = useParams();
    const [biz, setBiz] = useState (null);
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

        async function getBiz () {
          const res = await api (`/biz/get/${bid}`);
          if (res.status === 401) {
            navigate ('/')
          } else {
            setBiz (res)
          }
        }
        checkAuth ()
        getBiz ();
     }, [bid])

    const openConfirm = () => setShowModal (true)
    const handleCancel = () => setShowModal(false);
    
    return (
        <>
            <Nav auth={auth}/>
            {biz && auth && (
                <>  
                    <br /><br /><br />
                    <div className='profile'>
                        <h2>{biz.name}</h2>
                        <p><b>Type</b>: {biz.type}</p>
                        <p><b>Owner</b>: {biz.user.name} {biz.user.surname}</p>
                        <p><b>Operational Status</b>: {biz.operational_status} </p>
                        <p><b>Lease Status</b>: {biz.lease_status} </p>
                        <p><b>Monthly Rental Budget</b>: R{biz.monthly_budget || 'N/A'} </p>
                        <p><b>Require Space</b>: {biz.required_space || 'N/A'} </p>
                        <p><b>Phone</b>: {biz.phone}</p>
                        <p><b>Email</b>: {biz.email}</p>
                        

                        <p><b>Phone</b>:  {biz.location}</p>
                    </div>
                </>
            )}
        </>
    )
}

export default Business

