import React, { Component } from 'react';

export default class SendMessageForm extends Component {

  constructor() {
    super()

    this.state = {
      message: ""
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})
    //console.log(e.target.name + ":" + e.target.value)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.sendMessage(this.state.message)
  }

  render() {
    return (
      <form className="send-message-form" onSubmit={this.handleSubmit}>
        <input
          name="message"
          onChange={this.handleChange} 
          value={this.state.message}
          placeholder="Type message and hit ENTER"
          text="text"
        />
      </form>
    )
  }
}