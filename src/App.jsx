import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';


class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    currentUsername: "Anonymous",
    messages: [] // messages coming from the server will be stored here as they arrive
    };
  }

  addMessage = (event) => {

    if (event.key === "Enter") {

      const newMessage = {type: "postMessage",
                          username: this.state.currentUsername,
                          content: event.target.value};


      this.socket.send(JSON.stringify(newMessage));
      event.target.value = ""
      // this.setState({ messages: messages});
    };
  };

  changeName = (event) => {
    if (event.key === "Enter") {
      const oldName = this.state.currentUsername;

      const newName = event.target.value;
      this.setState({ currentUsername: newName});
      const notification = {type: "postNotification",
                            content: `${oldName } changed their name to ${newName}`
                          };

      this.socket.send(JSON.stringify(notification));
      event.target.value = ""
    }
  }




componentDidMount() {
  console.log("componentDidMount <App />");
  this.socket = new WebSocket("ws://localhost:3001/");
  this.socket.onopen = (event) => {
    console.log("Connected to Server");
  }
  this.socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
      switch(data.type) {
      case "incomingMessage":
        // handle incoming message
        this.incomingMessage(data)

        break;
      case "incomingNotification":
        // handle incoming notification
        this.incomingNotification(data)

        break;
      case "incomingUserCount":
        this.incomingUserCount(data)

        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    }
  }
}
  incomingMessage = (data) => {

    const messages = this.state.messages.concat(data);

    this.setState({messages: messages});

  }

  incomingNotification = (data) => {
    const message = {id: data.id, notification: true, content: data.content}
    const messages = this.state.messages.concat(message);
    this.setState({ messages: messages});
  }

  incomingUserCount = (data) => {

    const userCount = data.count
    this.setState({userCount: userCount})
  }

  render() {
    return (

    <div>
       <nav className="navbar"> Chatty
          <div id= "userCount">usercount:{this.state.userCount}   </div>
      </nav>
      <MessageList messages={this.state.messages}  />
      <div>
        <ChatBar currentUser={this.state.currentUsername}
                  addMessage={this.addMessage}
                  changeName={this.changeName}
                   />

      </div>
    </div>
    );
  };
};




export default App;












