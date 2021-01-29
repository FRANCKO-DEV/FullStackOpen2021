import React from 'react'

const PersonForm = ({submit,number, name, changeOne, changeTwo}) => {
    return (
        <form onSubmit={submit}>
            <div>
                name: <input type="text" value={name} onChange={changeOne}  />
            </div>
            <div>
                number: <input type="number" value={number} onChange={changeTwo}  />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
