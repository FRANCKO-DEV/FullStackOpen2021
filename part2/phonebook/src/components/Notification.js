import React from 'react'

const Notification = ({msg, typeMsg}) => {
    if (msg === null) {
        return null
    }
    return (
        <div className={typeMsg}>
            {msg}
        </div>
    )
}

export default Notification
