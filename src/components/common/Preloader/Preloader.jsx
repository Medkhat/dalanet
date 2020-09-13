import React from 'react'
import loader from '../../../img/loader.svg'

const Preloader = () => {
    return (
        <div style={{
            display: "flex", 
            justifyContent: "center",
            alignItems: "center",
            width: `${100}%`,
            height: `${100}%`,
            backgroundColor: "#fff",
            padding: `${20}px ${0}`
        }}>
            <img src={loader} alt="LOADER" />
        </div>
    )
}

export default Preloader