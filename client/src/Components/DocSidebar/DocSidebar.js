import React from 'react'
import { Link } from 'react-router-dom'

import { DocumentationData } from './DocumentationData'


function DocSidebar() {
  return (
    <div className='sidebar'>
        <ul className='sidebarList'>
        {DocumentationData.map((val, key) => {
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
export default DocSidebar