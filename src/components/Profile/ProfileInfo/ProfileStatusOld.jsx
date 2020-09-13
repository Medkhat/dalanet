import React from 'react'

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    } 

    componentDidUpdate(prevProps, PrevState) {
        if (prevProps.props !== this.props.state) {
            this.setState({
                status: this.props.state
            })
        }
    }

    render() {
        return (
            <div>
                {
                    !this.state.editMode && <div onDoubleClick={this.activateEditMode}>
                        {!this.props.status ? "You don't have status" : this.props.status }
                    </div>
                }
                {
                    this.state.editMode && <div>
                        <input 
                            type="text" 
                            onChange={this.onStatusChange}
                            autoFocus={true} 
                            value={this.state.status} 
                            onBlur={this.deactivateEditMode}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus