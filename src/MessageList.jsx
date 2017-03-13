import React from 'react';
import Message from './Message.jsx'


class MessageList extends React.Component {
  render() {
  return (
    <div id="message-list">

      { this.props.messages.map((message, index) => {
        if (message.notification) {
          return (<div key={index} className="message system">{message.content} </div>)
        } else {
        return (
          <Message key={index} username={message.username} content={message.content} />)

          }
        })}
    </div>

    )
  }
}

export default MessageList;



