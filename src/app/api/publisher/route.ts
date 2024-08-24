import { NextResponse } from 'next/server';
import zmq from 'zeromq';

export async function POST(request: Request) {
  const { message } = await request.json();
  let publisherSocket: any;
  try {
    publisherSocket = zmq.socket('pub');
    publisherSocket.bindSync('tcp://127.0.0.1:3001');
    publisherSocket.send(message);
    setInterval(function() {
      console.log("sending a multipart message envelope");
      publisherSocket.send(["Brilliant Classics", "https://www.youtube.com/embed/_ioc6sdgugo?si=dwh0qWCbUB-wn4Gb"]);
    }, 500);

    return NextResponse.json({ success: true, message: 'Mensagem enviada!' });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Falha ao criar socket' }, { status: 500 });
  }
}
