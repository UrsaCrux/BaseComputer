# test_ws.py
import asyncio
import websockets

async def test():
    async with websockets.connect("ws://localhost:8765") as ws:
        for _ in range(5):
            msg = await ws.recv()
            print(msg)

asyncio.run(test())
