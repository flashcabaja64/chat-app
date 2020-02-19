import React, { Component } from 'react';
import ChatKit from '@pusher/chatkit-client'
import SendMessageForm from './components/SendMessageForm'
import MessageList from './components/MessageList'
import { tokenUrl, instanceLocator } from './config'
import './App.css';

class App extends Component {

  constructor() {
    super()

    this.state = {
      messages: [],
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
        //console.log("Current user:", currentUser)
        this.currentUser = currentUser
        this.currentUser.subscribeToRoomMultipart({
          roomId: currentUser.rooms[0].id,
          hooks: {
            onMessage: message => {
              //console.log("Message Received:", message.parts.map(msg => msg.payload.content))
              this.setState({
                messages: [...this.state.messages, message]
              })
            }
          }
        })
      })
      .catch(err => console.log("error:", err))
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
       <MessageList messages={this.state.messages} />
       <SendMessageForm sendMessage={this.sendMessage}/>
      </div>
    );
  }
}

export default App;
