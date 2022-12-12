import React, { Children, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

import './Sidebar.css'
import {SidebarData} from './SidebarData'

const Sidebar = ({children}) => {
  const[isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='sidebar-container'>
      <div  style={{width: isOpen ? "200px" : "50px" }} className= {isOpen ? 'advSidebar advOpenSidebar' : 'advSidebar advCloseSidebar'}>
        <div className='top-section'>
          <h1 style = {{display: isOpen ? "block" : "none"}}className='logo'>Tutorial</h1>
          <div style = {{marginLeft: isOpen ? "50px": "10px"}}className='bars'>
            {isOpen? <FaArrowLeft onClick={toggle}/> : <FaArrowRight onClick={toggle}/>}
          </div>
        </div>
        {
          SidebarData.map((item, index) => (
            <NavLink 
              to={item.path} 
              key={index} 
              className="link"
              activeclassName="active">
                <div className='icon'>{item.icon}</div>
                <div className='link-text'>{item.title}</div>
              </NavLink>
          ))
        }
      </div>
      <main>
        {children}
      </main>
    </div>
  )

};
export default Sidebar