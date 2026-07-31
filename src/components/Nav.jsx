import React , {useEffect, useRef, useState} from 'react'
import logo from '../assets/react.svg'
import { Link } from "react-router-dom";
import api from '../services/api'
// import UsersPage from '../pages/users/UsersPage'

import { useNavigate } from "react-router-dom";

function Nav({auth}) {
      const [openMenu, setOpenMenu] = useState(null);
      const menuRef = useRef();
      const navigate = useNavigate();

      const navHandler = (path) => {navigate(path)}

      const toggleMenu = (menu) => {
        setOpenMenu(prev => (prev === menu ? null : menu));
      };

      useEffect(() => {
          const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
              setOpenMenu(null);
            }
          };

          document.addEventListener("mousedown", handleClickOutside);
          return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);
      
      const logoutHandler = async (path) => {
        try {
          await api (path);
          window.location.reload();
        } catch (e) {console.error (e)}
      }

      return (
        <nav className='nav'>
          <span style={logoStyle}>3nds</span>
          <ul ref={menuRef}>
            {auth && auth.uid? 
                <>
                    <li>
                      <Link to="/profile" id='loginLink'>{auth.name || auth.username}</Link>
                    </li>
                    {auth.name? 
                        <li> <a onClick={() => logoutHandler('/auth/logout')}>Logout</a></li>:
                        <li> <Link onClick={() => logoutHandler('/admin/logout')}>Logout</Link></li>
                    }
                    
                </>
              : <>
                <li>
                  <Link to="/login" id='loginLink'>Login</Link>
                </li>
                  <li>
                    <Link to="/signup" id='loginLink'>Signup</Link>
                  </li>
                </>
            }
          </ul>
        </nav>
      )
}


const linkBtn = {
  color: '#646cff',
  backgroundColor: 'unset',
  padding: '4px'
}

const logoStyle = {
  color: "#fe7900",
  fontWeight: "800",
  padding: "8px",
  fontStyle: "italic",
  fontSize: "20px",
  paddingLeft: "16px"
}





const navItemStyle = {
  position: "relative",
};


const navImgStyle = {
    position: 'relative',
    width: '30%', 
    textAlign: 'left'
}

const navliStyle = {
    position: "relative",
    width: '30%', 
    textAlign: 'center', 
    cursor: 'pointer'
}

const linkStyle = {
  position: 'relative',
  padding: "8px"
}


const dropdownStyle = {
  position: "absolute",
  top: "50px",
  right: "5px",
  background: "white",
  border: "1px solid #ccc",
  borderRadius: "6px",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  minWidth: "150px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};

export default Nav
