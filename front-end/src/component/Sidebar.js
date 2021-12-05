import React, { useState } from 'react';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';

import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';

import '.././all.css';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    //Simple function to turn sidebar on if off, off if on, when called
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            {/*Makes all the icons of sidebar and hamburger sign black*/}
            <IconContext.Provider value={{ color: '#000' }}>
                {/*The new header */}
                <div className='navbar'>
                    {/*3 Bar that opens the sidebar*/}
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    {/*CompFood Logo that directs to Home*/}
                    <Link to='/home' className='menu-bars'>
                        <img className="imgcenter" src="/Logo.png" alt="Home Logo"  />
                    </Link>
                    {/*Dark/Light mode button*/}
                    <Link to='#' className='menu-bars'>
                        <button onClick={clickMe} type="button" className="button">Dark/Light Mode</button>
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
//Copy-pasted function for the light/dark mode that was previously in header
let mode = 'light';

function clickMe(){
	if(mode === 'light'){
		mode = 'dark';
	}
	else{
		mode = 'light';
	}
	
	console.log(mode);
}
export default Navbar;