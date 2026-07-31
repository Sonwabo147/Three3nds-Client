import React , {useEffect, useState} from 'react'
import serverRequest from '../services/api'
import Nav from '../components/Nav'
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";

const User = () => {
    const navigate = useNavigate();
    const [bizError, setBizError] = useState (null);
    const [propError, setPropError] = useState (null);
    const [auth, setAuth] = useState (null);
    const { uid } = useParams();
    const [user, setUser] = useState (null);
    const [properties, setProperties] = useState (null);
    const [businesses, setBusinesses] = useState (null);

    
    useEffect (() => {
        async function checkAuth () {
            try {
                const res = await serverRequest ('/me');
                setAuth (res);
            } catch (e) {throw e}
        }

        async function getUser () {
            const res = await serverRequest (`/auth/getUser/${uid}`);
            if (res.status === 401) {
                navigate ('/')
            } else {
                setUser (res)
            }
        }
        async function getBusinesses () {
            const res = await serverRequest (`/biz/getUser/${uid}`);
            if (res.status === 401) {
                navigate ('/')
            } else if (res.error) {
                setBizError(res)
            } else {
                setBusinesses (res)
            }
        }
        async function getProperties () {
            const res = await serverRequest (`/property/getUser/${uid}`);
            if (res.status === 401) {
                navigate ('/')
            } else if (res.error) {
                setPropError(res)
            } else {
                setProperties (res)
            }
        }
        checkAuth ()
        getUser ();
        getBusinesses ();
        getProperties ();
     }, [uid])

    const openConfirm = () => setShowModal (true)
    const handleCancel = () => setShowModal(false);
    
    return (
        <>
            <Nav auth={auth}/>
            {user && auth && (
                <>  
                <br /><br /><br />
                    <div className='profile'>
                        <h2>{user.name} {user.surname}</h2>
                        <div className="profileDatail">
                            <span><b>Email</b>:</span>
                            <span>{user.email || 'N/A'}</span>
                        </div>
                        <div className="profileDatail">
                            <span><b>Phone</b>:</span>
                            <span>{user.phone || 'N/A'}</span>
                        </div>
                        <div className='profileSection'>
                            <h2>Properties</h2>
                            {properties && properties.map((item, index) => (
                                <div className="profileDatail" key={index}>
                                    <span><b>Name</b>:</span>
                                    <Link to ={`/property/${item.pid}`}>{item.location}
                                    </Link>
                                </div>
                            ))}
                            <div className="profileDatail">
                                <span></span>
                                <Link to ={`/addProperty/${user.uid}`} className='cta-link'>Add Property</Link>
                            </div>
                            <Error error={propError} />
                        </div>

                    <div className='profileSection'>
                        <h2>Businesses</h2>
                        {businesses && businesses.map((item, index) => (
                            <div className="profileDatail" key={index}>
                                <span><b>Name</b>:</span>
                                <Link to ={`/biz/${item.bid}`}>
                                    <b>Name</b>: {item.name}
                                </Link>
                            </div>
                        ))}
                        <div className="profileDatail">
                            <span></span>
                            <Link to ={`/addBusiness/${user.uid}`} className='cta-link'>Add Business</Link>
                        </div>
                        <Error error={bizError} />
                    </div>
                    </div>
                    
                </>
            )}
        </>
    )
}

export default User

