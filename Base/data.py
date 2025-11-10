import json
import csv

from Base.communication import Packet
SUPPORTED_FILETYPES = ["json", "csv"]

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