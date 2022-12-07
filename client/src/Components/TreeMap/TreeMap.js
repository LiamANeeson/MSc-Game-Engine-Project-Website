import React from 'react'
import './TreeMap.css'


export default function Treemap({ links = [] }) {
    return (
        <div className='treemap-container'>
            <span>Content On this Page</span>
            <br />
            {links.map((l, i) => {
                return <>
                    <a href={l.id} key={i}>{l.text}</a>
                    <br />
                </>
            })}
        </div>
    )
}