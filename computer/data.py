import json
import csv

SUPPORTED_FILETYPES = ["json", "csv"]

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
        self.crcpass = self.crc_check(self.head + self.type + self.timestamp + self.data, crc)
        self.full = self.head + self.type + self.timestamp + self.data + self.crc

    @staticmethod
    def crc_check(data: bytes, expected_crc: bytes) -> bool:
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
        return crc.to_bytes(2, 'big') == expected_crc

    def __str__(self)->str:
        return f"""Packet object with:
        Type: {self.type.hex(" ")}
        Timestamp: {self.timestamp.hex(" ")}
        Data: {self.data.hex(" ")}
        CRCPass: {self.crcpass}
        """

def _savejson_packets(filename:str, packets:list["Packet"])->None:
    with open(filename, "w") as f:
        json.dump([packet.asjson() for packet in packets], f)

def _savecsv_packets(filename:str, packets:list["Packet"])->None:
    with open(filename, "w") as f:
        writer = csv.writer(f)
        writer.writerow(["Type", "Timestamp", "Data", "CRCPass"])
        for packet in packets:
            writer.writerow([packet.type.hex(), packet.timestamp.hex(), packet.data.hex(), packet.crcpass])

def save_packets(filename:str, packets:list["Packet"], filetype:str="json")->None:
    """Saves a list of packets to a file in JSON format."""

    if filetype == "csv":
        _savecsv_packets(filename, packets)
    elif filetype == "json":    
        _savejson_packets(filename, packets)
    else:
        print(f"Unsupported file type: {filetype}. Supported types are: {SUPPORTED_FILETYPES}")
        print("Defaulting to csv...")
        _savecsv_packets(filename, packets)