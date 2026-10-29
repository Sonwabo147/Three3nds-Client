import React , {useEffect, useState} from 'react'
import api from '../services/api'
import Nav from '../components/Nav'
import Error from '../components/Error'

import { Link } from "react-router-dom";


const Home = () => {
  const [auth, setAuth] = useState (null);
  const [properties, setProperties] = useState (null);
  const [leads, setLeads] = useState (null);
  const [leadError, setLeadError] = useState (null);
  const [propertyError, setPropertyError] = useState (null);

  useEffect (() => {
        async function checkAuth () {
          const res = await api ('/me');
          setAuth (res);
        }

        async function getProperties () {
          const res = await api (`/property/getAllRes`);
          if (res.error) {
            setPropertyError (res)
          } else {
            setProperties (res)
          }
        }

        async function getLeads () {
          const res = await api (`/leads/getAgent`);
          if (res.error) {
            setLeadError (res)
          } else {
            console.log (res)
            setLeads (res)
          }
        }

        checkAuth ();
        getProperties ();
        getLeads ();

    }, []);
  
  return (
    <>
      <Nav auth={auth}/>
      <header>
        <h1 style={h1Style}>Property Agency</h1> 
        <br />
        <p id='subHeading' style={subTextStyle}>Find your perfect location</p>
        
      </header>
      {auth && auth.super?
        (<Link to = '/addUser' className='cta-link'>Add User</Link>)
      :auth && !auth.error && !auth.agent?
        (<Link to = "/beAgent" className='cta-link'>Become an Agent</Link>)
      :auth && !auth.error && auth.agent?
        <Link to = '/addResProperty' className='cta-link'>Add Residential Property</Link>
      : null}
      
      <br /><br /><br /><br />
      <h2>Properties</h2>
      <div className="tableCont">
      {properties &&
          <table >
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Rental</th>
                      <th>Availability</th>
                  </tr>
              </thead>
              <tbody>
                  {properties.map((item, index) => (
                      <tr key={index}>
                          <td>
                              <Link to={`/resproperty/${item.pid}`} >{item.name || item.title || 'N/A'}</Link>
                          </td>
                          <td>{`R${item.monthly_rental}` || 'N/A'}</td>
                          <td>{item.availability}</td>
                          
                      </tr>
                  ))}
              </tbody>
          </table>
      }
      <Error error={propertyError}/>
      </div>
      <br /><br /><br />
      <h2>Leads</h2>
      <div className="tableCont">
        {leads &&
            <table >
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <Link to={`/lead/${item.id}`} >{item.property.title}</Link>
                            </td>
                            <td>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        }
        <Error error={leadError}/>
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
