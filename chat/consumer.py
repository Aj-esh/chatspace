import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .cassandra_model import ChatMessage

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Join room
        self.room_addr = self.scope['url_route']['kwargs']['room_addr']
        self.room_group_name = f'chat_{self.room_addr}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # leave room 
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # handle incoming messages
        data = json.loads(text_data)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type' : 'broadcast_message',
                'payload' : data
            }
        )
        await self.save_message(data)

    async def broadcast_message(self, event):
        # Send message to WebSocket
        await self.send(text_data=json.dumps(event['payload']))

    @sync_to_async
    def save_message(self, data):
        ChatMessage.create(
            room_addr=self.room_addr,
            username=data.get('username'),
            content=data.get('message'),
            msg_type=data.get('msg_type', 'text')
        )


