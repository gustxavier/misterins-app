import Pusher from 'pusher-js';
import React, { Component } from 'react'
import Echo from 'laravel-echo';

export default class ChatMessage extends Component {

  componentDidMount() {
    const token = localStorage.getItem('token');

    Pusher.logToConsole = true;

    const options = {
      broadcaster: 'pusher',
      key: 'e7vm5kd1ebik',
      wsHost: window.location.hostname,
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
      authEndpoint: ' //localhost:8000/broadcasting/auth',
      // As I'm using JWT tokens, I need to manually set up the headers.
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    };

    window.Echo = new Echo(options);

    window.Echo.channel('channel-chat').listen('event-message', (data) => {
        console.log(data);    
    });

  }

  render() {
    return (
      <div className="container" >
        <ul>
          {/* {
            this.state.message.map((msg) => {
              return (
                <li key={msg.id}> <strong>{msg.user}: </strong>{msg.message}</li>
              )
            })
          } */}
        </ul>
      </div>
    );
  }

}


