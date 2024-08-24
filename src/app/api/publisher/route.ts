import { NextRequest, NextResponse } from 'next/server';
import zmq from 'zeromq';
import { Canal, canais } from '../data/data';
export async function POST(request: NextRequest) {
  const { message: channel } = await request.json();
  let dataChannel:Canal | undefined
  if(channel){
    dataChannel =  canais.find((nameChannel:Canal) => nameChannel.nome = channel)
  }
  let publisherSocket: any;
  try {
    console.log(zmq)
    publisherSocket = zmq.socket('pub');
    publisherSocket.bindSync('tcp://127.0.0.1:3001');
    publisherSocket.send(channel);
    setInterval(function() {
      console.log("sending a multipart message envelope");
      publisherSocket.send([channel, JSON.stringify(dataChannel)]);
    }, 500);

    console.log(zmq)
    return NextResponse.json({ success: true, message: 'Mensagem enviada!' });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Falha ao criar socket' }, { status: 500 });
  }
}
