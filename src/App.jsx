import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
const data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
}



class App extends React.Component {
  state = {...data}

  addMessage = (event) => {

    if (event.key === "Enter") {

      const newMessage = {username: "Anonymous", content: event.target.value};
      const messages = this.state.messages.concat(newMessage);
      this.setState({ messages: messages});
    }
  }




componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
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












