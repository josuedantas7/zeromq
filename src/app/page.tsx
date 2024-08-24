'use client';
import { Canal } from './api/data/data';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState<Canal>();

  const sendMessage = async () => {
    try {
      const res = await axios.post('/api/publisher', { message: message });
      console.log(res.data);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  const receiveMessage = async () => {
    try {
      const res = await axios.post('/api/subscriber', {
        message: message,
      });
      console.log(JSON.parse(res.data.message));
      setReceivedMessage(JSON.parse(res.data.message));
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
        <p>{receivedMessage && receivedMessage.message && receivedMessage.message.videos.map((i, idx) => {
          return (
            <iframe key={idx} width="560" height="315" src={i.url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          )
        } )}</p>
        <button onClick={receiveMessage}>Receber Mensagem</button>
      </div>
    </div>
  );
}
