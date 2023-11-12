import { useEffect, useRef } from 'react';

const WebSocketClient = (url, onMessageReceived) => {
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('WebSocket Connected');
    };

    ws.current.onclose = (event) => {
      console.log('WebSocket Disconnected', event);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket Error', error);
    };

    ws.current.onmessage = (event) => {
      onMessageReceived && onMessageReceived(event.data);
    };

    // Cleanup function
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [url, onMessageReceived]);

  const sendMessage = (message) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    } else {
      console.error('WebSocket is not connected, cannot send message using sendMessage.');
    }
  };

  return { sendMessage };
};

export default WebSocketClient;
