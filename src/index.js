import ReactDOM from 'react-dom';
import React,{useEffect} from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:8000');

const App =()=>{

   const onButtonClicked = (value) => {
        client.send(JSON.stringify({
          type: "message",
          msg: value
        }));
      }

    useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
          };
          client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log('got reply! ', dataFromServer);
          }
    }, [])

    return(
        <div>
            <button onClick={()=>onButtonClicked("hey")}>Send message</button>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));