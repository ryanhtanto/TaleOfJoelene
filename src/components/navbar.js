import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../images/logojoelene.png'
function Navbar() {
  return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className='container'>
                        <a className="navbar-brand" href="/">
                                <img src={Logo} alt ='logo' className='navbar__logo'/>
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                                <Link to={`/`}>
                                                        <p className='nav-link text-decoration-none'>Item List</p>
                                                </Link>
                                        </li>
                                        <li className="nav-item">
                                                <Link to={`/packageList`}>
                                                        <p className='nav-link text-decoration-none'>Package List</p>
                                                </Link>
                                        </li>
                                        <li className="nav-item">
                                                <Link to={`/orderList`}> 
                                                        <p className='nav-link text-decoration-none'>Order List</p>
                                                </Link>
                                        </li>
                                        <li className="nav-item">
                                                <Link to={`/printCard`}> 
                                                        <p className='nav-link text-decoration-none'>Print Card</p>
                                                </Link>
                                        </li>
                                </ul>
                        </div>
                </div>
        </nav>
  );
}

export default Navbar;
