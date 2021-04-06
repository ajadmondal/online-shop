import React from 'react'
import './NavItem.css';
export default function NavItem({span, text}) {
    return (
        <div>
            <h6>{span}</h6>
            <p>{text}</p>
        </div>
    )
}
