import React from 'react';


class ChatBar extends React.Component {
  render(){
  return (
      <footer className="chatbar">
        <input type="text" className="chatbar-username" placeholder="Your Name (Optional)" />
        <input
          type="text"
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"

          onKeyUp={this.props.addMessage}
          />
      </footer>
      )
  }
}





export default ChatBar;