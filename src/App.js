import React, { Component } from 'react';
import ChatKit from '@pusher/chatkit-client'
import SendMessageForm from './components/SendMessageForm'
import MessageList from './components/MessageList'
import RoomList from './components/RoomList'
import { tokenUrl, instanceLocator } from './config'
import './App.css';

class App extends Component {

  constructor() {
    super()

    this.state = {
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
  }

  componentDidMount() {
    const tokenProvider = new ChatKit.TokenProvider({
      url: tokenUrl
    })

    const chatManager = new ChatKit.ChatManager({
      instanceLocator,
      userId: "flashcabaja64",
      tokenProvider,
    });

    chatManager.connect()
      .then(currentUser => {
        console.log("Current user:", currentUser)
        this.currentUser = currentUser
        this.getRooms()
      })
      .catch(err => console.log("error on connecting:", err))
  }

  subscribeToRoom = (roomId) => {
    this.currentUser.subscribeToRoomMultipart({
      roomId: roomId,
      hooks: {
        onMessage: message => {
          //console.log("Message Received:", message.parts.map(msg => msg.payload.content))
          this.setState({
            messages: [...this.state.messages, message]
          })
        }
      }
    })
  }

  getRooms = () => {
    this.currentUser.getJoinableRooms()
    .then(joinableRooms => {
      this.setState({
        joinableRooms,
        joinedRooms: this.currentUser.rooms
      })
    })
    .catch(err => console.log("error on joinableRooms:", err))
  }

  sendMessage = (text) => {
    this.currentUser.sendMessage({
      text,
      roomId: this.currentUser.rooms[0].id
    })
  }

  render() {
    console.log(this.state.messages)
    return (
      <div className="App">
       <RoomList
        subscribe={this.subscribeToRoom}
        rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
       <MessageList messages={this.state.messages} />
       <SendMessageForm sendMessage={this.sendMessage}/>
      </div>
    );
  }
}

export default App;
