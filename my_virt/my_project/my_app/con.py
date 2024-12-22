from channels.generic.websocket import AsyncWebConsumer
import json
import asyncio #pyton package/ module
import math

# A coroutine is a function that can suspend its execution before reaching the return and it can indirectly pass the control to another coroutine for some time.

class Pongconsumer(AsyncWebsocketConsumer):
# Consumers (the equivalent of Django views) : Structure your code as functions that are called whenever an event happens (as opposed to forcing you to write event loops). Allow you to write both sync, as well as async code.


#  Redis as a backing store.

    players = {}# class-level dictionary
    # {
        'channel_name': 'leftPlayer\ightPlayer'
    # }
    room_group_name = 'game_room'
    ball = {'x': 500, 'y': 350, 'radius': 15, 'speed': 9, 'color': 'white', 'velocityX': 9, 'velocityY': 9}
    rightPlayer = {'x': 980, 'y': 0, 'w': 20, 'h': 120, 'color': '#E84172', 'score': 0}
    leftPlayer = {'x': 0, 'y': 0, 'w': 20, 'h': 120, 'color': '#D8FD62', 'score': 0}

    async def connect(self): #Triggers the connection phase of the WebSocket and waits for the application to either accept or deny the connection
        
        #self.channel_name: Each WebSocket connection is assigned a unique channel_name by Django Channels.await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

        if len(PongConsumer.players) == 0:
            PongConsumer.players[self.channel_name] = 'leftPlayer'
        elif len(pongConsumer.players) == 1:
            PongConsumer.players[self.channel_name] = 'rightPlayer'
        else
            await self.close()#triggers disconnect of consumer
        if not PongConsumer.game_loop_running:
            PongConsumer.game_loop_running = True
            asyncio.create_task(self.game_loop())

# When you call self.room_group_name:

# Python first looks for an instance attribute named room_group_name.
# If no instance attribute exists, it falls back to the class attribute with the same name.
# When you call self.players:

# Python first looks for an instance attribute named players.
# If no instance attribute exists, it does not automatically fall back to the class attribute players.


# whyyy

# room_group_name is immutable (string):
# players is mutable (dictionary):



    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        in PongConsumer.players:

# in PongConsumer.players checks if the current channel_name exists as a key in the dictionary PongConsumer.players.
        if self.channel_name in PongConsumer.players:
            del PongConsumer.players[self.channel_name]
    


def check_collision(self, paddle):
        paddle_top = paddle['y']
        paddle_bottom = paddle['y'] + paddle['h']
        paddle_right = paddle['x'] + paddle['w']
        paddle_left = paddle['x']

        ball_top = self.ball['y'] - self.ball['radius']
        ball_bottom = self.ball['y'] + self.ball['radius']
        ball_right = self.ball['x'] + self.ball['radius']
        ball_left = self.ball['x'] - self.ball['radius']

        return (
            ball_left <= paddle_right and ball_top <= paddle_bottom and ball_bottom >= paddle_top and ball_right >= paddle_left
        )

    async def reset_ball(self):
        self.ball['x'] = 500
        self.ball['y'] = 350
        self.ball['velocityX'] *= -1  # Reverse direction
        self.ball['speed'] = 9

    async def update_ball(self):
        self.ball['x'] += self.ball['velocityX']
        self.ball['y'] += self.ball['velocityY']

        if self.ball['y'] + self.ball['radius'] > 700 or self.ball['y'] - self.ball['radius'] < 0:
            self.ball['velocityY'] *= -1

        paddle = self.rightPlayer if self.ball['x'] > 500 else self.leftPlayer
        if self.check_collision(paddle):
            angleRad = math.pi / 4 if self.ball['velocityY'] > 0 else -math.pi / 4
            direction = 1 if self.ball['x'] < 500 else -1
            self.ball['velocityX'] = math.cos(angleRad) * self.ball['speed'] * direction
            self.ball['velocityY'] = math.sin(angleRad) * self.ball['speed']
            self.ball['speed'] += 0.1

        if self.ball['x'] - self.ball['radius'] <= 0:  # Right player scores
            self.rightPlayer['score'] += 1
            if self.rightPlayer['score'] == 3:
                await self.broadcast_winner("rightPlayer")
            await self.reset_ball()
        elif self.ball['x'] + self.ball['radius'] >= 1000:  # Left player scores
            self.leftPlayer['score'] += 1
            if self.leftPlayer['score'] == 3:
                await self.broadcast_winner("leftPlayer")
            await self.reset_ball()