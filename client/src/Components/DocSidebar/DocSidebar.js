import React from 'react'
import './DocSidebar.css'
import { SidebarData } from './DocSidebarData'

function DocSidebar() {
  return (
    <div className='sidebar'>
     <ul className='sidebarList'>
      {SidebarData.map((val, key) => {
        return (
          <li
            key={key}
            className="row"
            onClick={() => {
              window.location.pathname = val.link;
            }}
          >            
            {""}
            <div>{val.title}</div>
          </li>
        )
      }
      )}
     </ul>
    </div>
  )
}

export default DocSidebar