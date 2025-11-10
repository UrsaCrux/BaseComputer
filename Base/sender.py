import PIL
import PIL.Image
from communication import Transfer, HEAD, IMAGE_TYPE, Packet

#mainline = Transfer("COM3", timeout=5)

def rgb888_to_rgb565(r: int, g: int, b: int) -> bytes:
    """
    Converts 24-bit RGB888 values to a 16-bit RGB565 byte representation.

    Parameters
    ----------
    r : int
        Red component (0-255).
    g : int
        Green component (0-255).
    b : int
        Blue component (0-255).

    Returns
    -------
    bytes
        2-byte representation of the color in RGB565 format.
    """
    r_565 = (r >> 3) & 0x1F
    g_565 = (g >> 2) & 0x3F
    b_565 = (b >> 3) & 0x1F

    rgb565 = (r_565 << 11) | (g_565 << 5) | b_565
    return rgb565.to_bytes(2, byteorder='big')


SIZE = 480

img = PIL.Image.open("DAMN.jpeg")
img = img.convert("RGB")
img = img.resize((SIZE, SIZE))
#This does not return just the pixels, it has other datatypes, so be this needs to change
pixs = tuple(img.getdata())

new_img_data = []

for idx in range(0, SIZE*SIZE, 8):
    print(idx)
    group = pixs[idx:idx+8]
    for color in group:
        new_img_data.append(color)
    colors = b''.join(rgb888_to_rgb565(r, g, b) for r, g, b in group)
    new_img_data.append(colors)
    packet = Packet(HEAD, IMAGE_TYPE, timestamp=b'\x00\x00\x00\x00', data=colors, crc=b'\x00\x00', verbose=False)
    #mainline.send_packet(packet)
    #print(f"Sent pixels {idx} to {idx+7} as packet: {packet}")

# Save the data sent as image for later comparison
new_img = PIL.Image.new("RGB", (SIZE, SIZE))
print(new_img_data)
new_img.putdata(new_img_data)
new_img.save("DAMN_converted.jpeg")