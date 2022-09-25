import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './Sidebar.css'
import {SidebarData} from './SidebarData'


function Sidebar() {

  return (
    <div className='sidebar'>
     <ul className='sidebarList'>
     {SidebarData.map((val, key) => {
        return (
          <li
            key={key}
            className="row">            
            <Link to = {val.path}>
              {val.icon}
              <span>{val.title}</span>
            </Link>
          </li>
        )
      }
      )}
     </ul>
    </div>
  )
}

export default Sidebar