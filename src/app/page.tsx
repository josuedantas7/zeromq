'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  const sendMessage = async () => {
    try {
      const res = await axios.post('/api/publisher', { message });
      console.log(res.data);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  const receiveMessage = async () => {
    try {
      const res = await axios.get('/api/subscriber');
      setReceivedMessage(res.data.message);
    } catch (error) {
      console.error('Erro ao receber mensagem:', error);
    }
  };

  return (
    <div>
      <h1>Publisher/Subscriber com ZeroMQ</h1>

      <div>
        <input
          type="text"
          placeholder="Escreva uma mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Enviar Mensagem</button>
      </div>

      <div>
        <h2>Mensagem Recebida:</h2>
        <p>{receivedMessage}</p>
        <button onClick={receiveMessage}>Receber Mensagem</button>
      </div>
    </div>
  );
}
