import React, { Component } from 'react';
import Message from './Message'

export default class MessageList extends Component {
  render() {
    return (
      <div className="message-list">
        {this.props.messages.map((msg, idx) => {
          return (
            <Message
              key={idx} 
              username={msg.senderId} 
              text={msg.parts.map(msg => msg.payload.content)}
            />
          )
        })}

      </div>
    )
  }
}