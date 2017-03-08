import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx'


class App extends React.Component {
  render() {
    return (
    <div>
      <nav className="navbar">
        <h1>Chatty</h1>
      </nav>

      <MessageList />
      <ChatBar />
    </div>
    );
  }
}
export default App;












