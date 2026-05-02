from communication import Transfer
import pygame
import sys

WIDTH = 800
HEIGHT = 800
CELLSIZE = 20

#Initialize pygame
pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
screen.fill((255, 255, 255))
pygame.display.update()
pygame.display.set_caption("Image Visualizer")


def scale(value, src_min, src_max, dst_min, dst_max):
    """Scales a value from one range to another."""
    return int(((value - src_min) / (src_max - src_min)) * (dst_max - dst_min) + dst_min)

def rgb565_to_rgb888(color_565: bytes):
    """
    Converts a 2-byte RGB565 value to a 24-bit RGB888 tuple (R, G, B).
    """
    if len(color_565) != 2:
        return (0, 0, 0)
    value = int.from_bytes(color_565, 'big')
    r = (value >> 11) & 0x1F
    g = (value >> 5) & 0x3F
    b = value & 0x1F
    r = (r << 3) | (r >> 2)
    g = (g << 2) | (g >> 4)
    b = (b << 3) | (b >> 2)
    return (r, g, b)

def get_color_from_packet(packet) -> tuple:
    """Extracts color information from a packet and returns a list of RGB tuples."""
    colors = []
    data = packet.data
    for i in range(0, len(data), 2):
        color_565 = data[i:i+2]

        color_888 = rgb565_to_rgb888(color_565)
        colors.append(color_888)
    return tuple(colors)

def draw_pixel(x, y, color):
    """Draws a single pixel on the screen at (x, y) with the specified color."""
    pygame.draw.rect(screen, color, (x * CELLSIZE, y * CELLSIZE, CELLSIZE, CELLSIZE))
    pygame.display.update()

#Initialize the port and recieve continuos information
mainline = Transfer("COM3")
xpos = 0
ypos = 0

for packet in mainline.receive_packets():
    print(packet)
    colors = get_color_from_packet(packet)
    for color in colors:
        draw_pixel(xpos, ypos, color)
        xpos += 1
        if xpos >= WIDTH // CELLSIZE:
            xpos = 0
            ypos += 1
            if ypos >= HEIGHT // CELLSIZE:
                ypos = 0

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()