import React from 'react';

export default function Message(props) {
    const { username, text } = props;
    return (
      <div className="message">
          <div>
            <div className="message-user">{username}</div>
            <div className="message-text">{text}</div>
          </div>
      </div>
    )
}