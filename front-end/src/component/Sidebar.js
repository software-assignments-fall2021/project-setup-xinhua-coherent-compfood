import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '.././all.css';
import { IconContext } from 'react-icons';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    //Simple function to turn sidebar on if off, off if on, when called
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            {/*Makes all the icons of sidebar and hamburger sign black*/}
            <IconContext.Provider value={{ color: '#000' }}>
                {/*The hamburger sign visible when sidebar not opened */}
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <Link to='/home' className='menu-bars'>
                        <img className="imgcenter" src="/Logo.png" alt="Home Logo"  />
                    </Link>
                </div>
                {/*The sidebar menu items*/}
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        {/*The X button to close the sidebar */}
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {/*Takes all the SidebarData data and turns into sidebar components*/}
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;