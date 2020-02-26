import React, { Component } from 'react';

export default class RoomList extends Component {
  render() {
    console.log(this.props.rooms)
    return (
      <div className="room-list">
        <ul >
        <h3>Your Rooms:</h3>
          {this.props.rooms.map((room, idx) => {
            return (
              <li className="room" key={idx}>
                <a 
                  onClick={() => this.props.subscribe(room.id)} 
                  href="#">
                  # {room.name}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}