import { OnModuleInit, OnModuleDestroy, Logger} from '@nestjs/common'
import {
    WebSocketGateway, WebSocketServer, MessageBody, SubscribeMessage
} from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway()
export class SocketGateway implements OnModuleInit {
    logger = new Logger(SocketGateway.name)
    // ******* socket instance without room connection
    @WebSocketServer()
    private readonly server: Server

    onModuleInit() {
        this.server.on('connection', (socket) => {
            this.logger.log(`socket connected with id ${socket.id}`)
        })
    }

    // Listen event from client
    @SubscribeMessage('TEST_LISTEN')
    handleListenEvent(@MessageBody() body: any){
        this.logger.log('subscribe event working', body)
        this.handleEmitEvent('REPLY_EVENT', body)
    }

    // emit the event to client
    handleEmitEvent(eventName: string, data: any) {
        this.server.emit(eventName,data)
    }
    

}