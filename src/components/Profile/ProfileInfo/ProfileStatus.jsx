import React from 'react'
import { useState, useEffect } from 'react'

const ProfileStatus = props => {

    let [editMode, setEditMode] = useState(false) //HOOK
    let [status, setStatus] = useState(props.status) //HOOK

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
 
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {
                !editMode && <div onDoubleClick={activateEditMode}>
                    {!props.status ? "You don't have status" : props.status }
                </div>
            }
            {
                editMode && <div>
                    <input 
                        type="text" 
                        onChange={onStatusChange}
                        autoFocus={true} 
                        value={status} 
                        onBlur={deactivateEditMode}
                    />
                </div>
            }
        </div>
    )
}

export default ProfileStatus