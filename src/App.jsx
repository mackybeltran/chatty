import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';


class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    currentUser: {name: "Bob"},
    messages: [] // messages coming from the server will be stored here as they arrive
    };
  }

  addMessage = (event) => {

    if (event.key === "Enter") {

      const newMessage = {username: "Anonymous", content: event.target.value};
      const messages = this.state.messages.concat(newMessage);
      this.socket.send(`User ${newMessage.username} said ${newMessage.content}`)
      this.setState({ messages: messages});
    }
  }




componentDidMount() {
  console.log("componentDidMount <App />");
  this.socket = new WebSocket("ws://localhost:3001/");
  this.socket.onopen = (event) => {
    console.log("Connected to Server");
  }

}

  render() {
    return (

    <div>
      <MessageList messages={this.state.messages}  />
      <div>
        <ChatBar currentUser={this.state.currentUser}
                  addMessage={this.addMessage}
                   />
      </div>
    </div>
    );
  }



}




export default App;












