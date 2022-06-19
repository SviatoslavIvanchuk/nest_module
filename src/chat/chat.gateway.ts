import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { UnauthorizedException } from '@nestjs/common';

@WebSocketGateway({
  pingTimeout: 6000,
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly authService: AuthService) {}

  @SubscribeMessage('join')
  async joinRoom(client: Socket, data: { token: string }) {
    const userId = await this.authService.getVerifiUserId(data.token);
    console.log(userId);
    if (!userId) {
      throw new UnauthorizedException({ message: 'not auth' });
    }
  }
}
