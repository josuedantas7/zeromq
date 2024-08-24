import { NextResponse, NextRequest } from 'next/server';
import zmq from 'zeromq';

export async function POST(request: NextRequest) {

  const { message: channel } = await request.json();
  
  try {
    const subscriberSocket = zmq.socket('sub');
    subscriberSocket.connect('tcp://127.0.0.1:3001');
    subscriberSocket.subscribe(channel);

    const messagePromise = new Promise((resolve, reject) => {
      subscriberSocket.on('message', function(topic, message) {
        const topicString = Buffer.from(topic).toString();
        const messageString = JSON.parse(Buffer.from(message).toString());
        
        console.log('Mensagem recebida:', messageString);
        console.log('Tópico:', topicString);

        resolve({ topic: topicString, message: messageString });

        
      });

      subscriberSocket.on('error', (err) => {
        reject(err);
      });
    });

    const result = await messagePromise;
    const dataForResponse = JSON.stringify(result)
    return NextResponse.json({ success: true, message: dataForResponse }, { status: 200 });

  } catch (error) {
    console.error('Erro ao receber mensagem:', error);
    return NextResponse.json({ success: false, error: 'Falha ao receber mensagem' }, { status: 500 });
  }
}
