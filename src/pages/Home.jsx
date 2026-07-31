import React , {useEffect, useState} from 'react'
import api from '../services/api'
import Nav from '../components/Nav'
import Error from '../components/Error'

import { Link } from "react-router-dom";


const Home = () => {
  const [auth, setAuth] = useState (null);
  const [properties, setProperties] = useState (null);
  const [businesses, setBusinesses] = useState (null);
  const [userError, setUserError] = useState (null);
  const [businessError, setBusinessError] = useState (null);
  const [propertyError, setPropertyError] = useState (null);


  const [users, setUsers] = useState (null);



  useEffect (() => {
        async function checkAuth () {
          const res = await api ('/me');
          setAuth (res);
        }

        async function getProperties () {
          const res = await api (`/property/getAll`);
          if (res.error) {
            setPropertyError (res)
          } else {
            setProperties (res)
          }
        }
        async function getBusinesses () {
          const res = await api (`/biz/getAll`);
          if (res.error) {
            setBusinessError (res)
          } else {
            setBusinesses (res)
          }
        }

        async function getUsers () {
          const res = await api (`/auth/all`);
          if (res.error) {
            setUserError (res)
          } else {
            setUsers (res)
          }
          
        }

        checkAuth ();
        getProperties ();
        getBusinesses ();
        getUsers ();

    }, []);
  
  return (
    <>
      <Nav auth={auth}/>
      <header>
        <h1 style={h1Style}>Property Agency</h1> 
        <br />
        <p id='subHeading' style={subTextStyle}>Find your perfect business location</p>
        
      </header>
      {auth && auth.super &&
          <Link to = '/addUser' className='cta-link'>Add User</Link>
        }
      <br /><br /><br /><br />
      <h2>Properties</h2>
      <div className="tableCont">
      {properties &&
          <table >
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Location</th>
                      <th>Availability</th>
                      <th>Parking</th>
                      <th>Rental</th>
                      <th>Deposit</th>
                  </tr>
              </thead>
              <tbody>
                  {properties.map((item, index) => (
                      <tr key={index}>
                          <td>
                              <Link to={`/property/${item.pid}`} >{item.name || 'N/A'}</Link>
                          </td>
                          <td>
                              <Link to={`/property/${item.pid}`} >{item.location}</Link>
                          </td>
                          <td>{item.availability}</td>
                          <td>{JSON.parse(item.parking)[0]}</td>
                          <td>R{item.monthly_rental}</td>
                          <th>R{item.deposit || 'N/A'}</th>
                      </tr>
                  ))}
              </tbody>
          </table>
      }
      <Error error={propertyError}/>
      </div>
      <br /><br /><br />
      <h2>Businesses</h2>
      <div className="tableCont">
        {businesses &&
            <table >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>O Status</th>
                        <th>L Status</th>
                    </tr>
                </thead>
                <tbody>
                    {businesses.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <Link to={`/biz/${item.bid}`} >{item.name}</Link>
                            </td>
                            <td>{item.type}</td>
                            <td>{item.operational_status}</td>
                            <td>{item.lease_status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        }
        <Error error={businessError}/>
      </div>

      <br /><br />
      <h2>Users</h2>
      <div className="tableCont">
        {users &&
            <table >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <Link to={`/user/${item.uid}`} >{item.name} {item.surname}</Link>
                            </td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        }
        <Error error={userError}/>
      </div>
    </>
  )
}

export default Home

const h1Style = {
    width: `100%`,
    textAlign: 'center',
    marginBottom: 0
    // margin: 'auto'
}

const subTextStyle = {
  textAlign: 'center',
  margin: '4px'
}

const picStyle = {
  width: '300px'
}
