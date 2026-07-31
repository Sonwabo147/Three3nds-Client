import React , {useEffect, useState} from 'react'
import { Link } from "react-router-dom";

const Error = ({error}) => {
    if (!error || typeof error !== "object") return null;
    if (!error.error && !error.message) return null;    

    return (
        <>
            {error.error && 
                <p className='error'>
                    <span >
                        {error.status}: {error.error}
                    </span>
                </p>
            }
        </>
    )
}

export default Error