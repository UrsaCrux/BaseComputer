import serial
import serial.tools.list_ports

from typing import Generator

HEAD = b"\x14"
IMAGE_TYPE = b"\x00"

TYPES_PAYLOAD = {
    IMAGE_TYPE: 48,
}

class Packet:
    """Handles packet data using the PHUC Protocol.
    
    Header
    ------
    1 byte: Magic Num (0x69)
    1 byte: Packet type

    Body
    ----
    4 bytes: timestamp
    Up to 48 bytes: data

    Tail
    ----
    2 bytes: CRC data
    
    Packet size (8 -> 56) inclusive

    Parameters
    ----------

    Methods
    -------

    """
    def __init__(self, head:bytes, type:bytes, timestamp:bytes, data:bytes, crc:bytes, verbose:bool = False):
        self.head = head
        self.type = type
        self.timestamp = timestamp
        self.data = data
        self.crc = crc
        self.crcpass = self.crc_check(self.head + self.type + self.timestamp + self.data)
        self.full = self.head + self.type + self.timestamp + self.data + self.crc

        if verbose:
            if not self.crcpass:
                print(f"Packet of type {self.type} at {self.timestamp} failed CRC.")


    def asjson(self)->dict:
        """Returns a dictionary containing all the packet information to save in a json file."""
        return {"Type": self.type, "Timestamp": self.timestamp, "Data": self.data, "CRCPass": self.crcpass}

    @staticmethod
    def crc_check(data: bytes) -> bool:
        """Checks if the CRC is correct."""
        crc = 0xFFFF
        for b in data:
            crc ^= b << 8
            for _ in range(8):
                if crc & 0x8000:
                    crc = (crc << 1) ^ 0x1021
                else:
                    crc <<= 1
                crc &= 0xFFFF
        
        if crc.to_bytes(2, 'big') == data[-2:]:
            return True
        return False

    def __str__(self)->str:
        return f"""Packet object with:
        Type: {self.type.hex(" ")}
        Timestamp: {self.timestamp.hex(" ")}
        Data: {self.data.hex(" ")}
        CRCPass: {self.crcpass}
        """

class Transfer:

    """
    Handles data transfer over serial communication.

    Parameters
    ----------
    port : str
        Serial port name (e.g., 'COM3', '/dev/ttyUSB0').
    baudrate : int, optional
        Communication speed in baud. Default is 115200.
    timeout : float or None, optional
        Read timeout in seconds. None means blocking mode. Default is None.
    dtr : bool, optional
        Data Terminal Ready line state. Default is False.
    rts : bool, optional
        Request To Send line state. Default is False.
    """

    def __init__(self, port:str, baudrate:int=115200, timeout:float|None = None, dtr:bool=False, rts:bool=False):
        try:
            # Channel setup
            self.channel = serial.Serial(port, baudrate, timeout=timeout)
            self.dtr = dtr
            self.rts = rts
            self.channel.dtr = dtr
            self.channel.rts = rts
            self.timeout = timeout

            # Initial device info retrieval
            print(f"Connected to {port} at {baudrate} baud.")

        except serial.SerialException as serialerror:
            available_ports = serial.tools.list_ports.comports()
            raise ConnectionError(f"Could not open port {port}. Available ports: {[p.device for p in available_ports]}") from serialerror
        
        except Exception as e:
            raise e

    def getbyte(self) -> bytes:
        """
        Reads a single byte from the serial channel.

        Returns
        -------
        bytes
            The byte read, or b'' if timeout occurs.
        """
        return self.channel.read(1)

    def getbytes(self, n: int) -> bytes:
        """
        Reads n bytes from the serial channel.

        Parameters
        ----------
        n : int
            Number of bytes to read.

        Returns
        -------
        bytes
            Bytes read, or fewer if timeout occurs.
        """
        return self.channel.read(n)

    def getline(self) -> bytes:
        """
        Reads a line from the serial channel (until newline or timeout).

        Returns
        -------
        bytes
            The line read, including the newline character, or b'' if timeout occurs.
        """
        return self.channel.readline()

    def getlines(self, n: int) -> list[bytes]:
        """
        Reads n lines from the serial channel.

        Parameters
        ----------
        n : int
            Number of lines to read.

        Returns
        -------
        list of bytes
            List of lines read (each as bytes).
        """
        return [self.channel.readline() for _ in range(n)]

    def send(self, data: bytes) -> int:
        """
        Sends data over the serial channel.

        Parameters
        ----------
        data : bytes
            Data to send.

        Returns
        -------
        int
            Number of bytes written.
        """
        return self.channel.write(data)

    def receive(self) -> Generator[bytes, None, None]:
        """
        Receives continuous data from the serial channel until timeout.

        Yields
        ------
        bytes
            Each line read from the serial channel.
        """
        while line := self.channel.readline():
            yield line
        print("Reception ended. No data received after timeout of", self.timeout, "seconds.")

    def send_packet(self, packet: Packet) -> int:
        """
        Sends a packet over the serial channel.

        Parameters
        ----------
        packet : bytes
            Packet data to send.

        Returns
        -------
        int
            Number of bytes written.
        """

        return self.channel.write(packet.head + packet.type + packet.timestamp + packet.data + packet.crc)

    def receive_packets(self):
        """
        Receives packets continuously from the serial channel until timeout.

        Yields
        ------
        Packet
            Each packet received, parsed into a Packet object.
        """
        while True:
            while self.getbyte() != HEAD:
                continue
            
            # Packet parsing logic to be implemented
            packet_byte = self.getbyte()
            if not packet_byte in TYPES_PAYLOAD:
                print(f"Unknown packet type: {packet_byte}")
                continue

            length = TYPES_PAYLOAD[packet_byte]
            timestamp = self.getbytes(4)

            data = self.getbytes(length)
            crc = self.getbytes(2)

            # Create and yield the packet
            packet = Packet(HEAD, packet_byte, timestamp, data, crc)
            yield packet