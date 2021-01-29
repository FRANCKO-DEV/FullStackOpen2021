import React from 'react'

const Filter = (props) => {
    return (
        <div>
            <input type="text" placeholder="Search" onChange={props.change} />
        </div>
    )
}

export default Filter
