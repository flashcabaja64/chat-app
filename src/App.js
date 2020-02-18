import React, { Component } from 'react';
import ChatKit from '@pusher/chatkit-client'
import { tokenUrl, instanceLocator } from './config'
import MessageList from './components/MessageList'
import './App.css';

class App extends Component {

  constructor() {
    super()

    this.state = {

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
        console.log("Current user:",currentUser)
        currentUser.subscribeToRoom({
          roomId: '969e43c8-3cdf-4672-9f84-6c3ef4cc48ad',
          hooks: {
            onNewMessage: message => {
              console.log("Message Received:", message)
            }
          }
        })
      })
      .catch(err => console.log("error:", err))
  }

  render() {
    return (
      <div className="App">
       <MessageList />
      </div>
    );
  }
}

export default App;
