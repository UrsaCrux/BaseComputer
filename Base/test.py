from communication import Transfer, save_packets

mainline = Transfer("COM3")

all_packets = []
for packet in mainline.receive_packets():
    print(packet)
    all_packets.append(packet)

save_packets("received_packets.json", all_packets)
