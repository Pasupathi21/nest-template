import { Module, Global } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';

@Global()
@Module({
  controllers: [],
  providers: [SocketService, SocketGateway],
  exports: [SocketGateway]
})
export class SocketModule {}
