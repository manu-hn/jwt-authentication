import React from 'react'
import { Link } from 'react-router-dom'

const BackButton = ({ destination = "/" }) => {
    return (
        <div>
            <button className='bg-cyan-500 px-6 py-2 text-black'  >
                <Link to={destination}>Back</Link>
            </button>
        </div>
    )
}

export default BackButton