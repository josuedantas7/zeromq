import { NextResponse } from 'next/server';
import zmq from 'zeromq';

export async function GET() {
  try {
    const subscriberSocket = zmq.socket('sub');
    subscriberSocket.connect('tcp://127.0.0.1:3001');
    subscriberSocket.subscribe('Brilliant Classics');

    return new Promise((resolve, reject) => {
      subscriberSocket.on('message', function(topic, message) {
        console.log('Mensagem recebida:', Buffer.from(message).toString());

        // Retorna a resposta ao cliente quando uma mensagem é recebida
        resolve(NextResponse.json({ message: message.toString() }));

        // Feche o socket após receber a mensagem
        subscriberSocket.close();
      });

      // Timeout se nenhuma mensagem for recebida
      setTimeout(() => {
        subscriberSocket.close();
        reject(NextResponse.json({ error: 'Timeout - Nenhuma mensagem recebida' }, { status: 500 }));
      }, 5000); // Espera até 5 segundos por uma mensagem
    });
  } catch (error) {
    console.error('Erro ao receber mensagem:', error);
    return NextResponse.json({ success: false, error: 'Falha ao receber mensagem' }, { status: 500 });
  }
}
