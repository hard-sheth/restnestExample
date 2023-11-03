import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { TestingService } from './testing.service';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  // cors: {
  //   origin: '*',
  // },
  transports: ['websocket'],
})
export class TestingGateway {
  @WebSocketServer()
  server: Server;
  // private rooms: Map<string, Room> = new Map();
  constructor(private readonly testingService: TestingService) {}
  @SubscribeMessage('welcome')
  welcome() {
    console.log('reached till welcome');
    this.server.emit('messages', `Welcome msg 444444444444`);
    return this.testingService.welcomeMsg();
  }
  @SubscribeMessage('join')
  join(@MessageBody() sentBody: any, @ConnectedSocket() client: Socket) {
    console.log(sentBody, 'sentBody');
    console.log(client.id, 'client', client.client);
    client.on('room', function (room) {
      console.log('what is room?', room);

      client.join(room);
    });
    return this.testingService.welcomeMsg();
  }
  @SubscribeMessage('type')
  typing(@MessageBody() sentBody: any, @ConnectedSocket() client: Socket) {
    console.log(sentBody, 'sentBody');
    client.broadcast.emit('typing', `${client.id} is typing`);
    console.log('servers');
    this.server.to('Bypass');
    return this.testingService.welcomeMsg();
  }
}
