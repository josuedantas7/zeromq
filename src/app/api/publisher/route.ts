import { NextRequest, NextResponse } from 'next/server';
import zmq from 'zeromq';
import db from '../../utils/db'

let publisherSocket: zmq.Socket | null = null;
let isBound = false;

async function ensureSocket() {
  if (publisherSocket) {
    // Se o socket já estiver ligado, faça unbind e feche o socket existente
    if (isBound) {
      try {
        publisherSocket.unbindSync('tcp://127.0.0.1:3001');
        isBound = false;
      } catch (error) {
        console.error('Erro ao desfazer o bind:', error);
      }
    }
    publisherSocket.close();
  }

  // Crie um novo socket de publicação
  publisherSocket = zmq.socket('pub');
  publisherSocket.bindSync('tcp://127.0.0.1:3001');
  isBound = true;
}

export async function POST(request: NextRequest) {
  const { message: channel } = await request.json();
  let dataChannel: any

  if (channel) {
    dataChannel = await db.canal.findFirst({
      where: {
        id: channel
      },
      include: {
        videos: true
      }
    })
  }

  try {
    // Garante que o socket esteja criado e ligado
    await ensureSocket();

    // Envia a primeira mensagem
    publisherSocket?.send([channel, JSON.stringify(dataChannel)]);

    // Configura o intervalo de envio de mensagens
    setInterval(function () {
      console.log("Enviando uma mensagem multipart...");
      publisherSocket?.send([channel, JSON.stringify(dataChannel)]);
    }, 500);

    return NextResponse.json({ success: true, message: 'Mensagem enviada!' });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erro ao enviar a mensagem via ZeroMQ" }, { status: 500 });
  }
}
