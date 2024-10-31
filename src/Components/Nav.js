import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Nav = () => {
  const auth = localStorage.getItem('User');
  const navigate=useNavigate();
  const logeee=()=>{
    localStorage.clear();
    navigate('/signup')
  }
  return (
    <div>
      { auth ? 
      <ul className='Navboo nav-left'>
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/add">ADD PRODUCT</Link></li>
        <li><Link to="/profile">PROFILE</Link></li>
        <li><Link onClick={logeee} to="/signup">LOGOUT ({JSON.parse(auth).name})</Link></li>
        </ul>
        
        : 
          <ul className='Navboo nav-right' >
          <li><Link to="/signup">SIGNUP</Link></li>
          <li><Link to="/login">LOGIN</Link></li>
          </ul>
        }
      
    </div>
  );
}

export default Nav;
