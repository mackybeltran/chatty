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

      const newMessage = {username: document.getElementById('chatbar-username').value, content: event.target.value};
      const messages = this.state.messages.concat(newMessage);
      this.socket.send(JSON.stringify(newMessage));

      // this.setState({ messages: messages});
    }
  }




componentDidMount() {
  console.log("componentDidMount <App />");
  this.socket = new WebSocket("ws://localhost:3001/");
  this.socket.onopen = (event) => {
    console.log("Connected to Server");
  }
  this.socket.onmessage = (event) => {
  let incomingMessage = JSON.parse(event.data);
  let messageList = this.state.messages.concat(incomingMessage);
  this.setState({messages: messageList});
  console.log(document.getElementById('chatbar-username').value)
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












