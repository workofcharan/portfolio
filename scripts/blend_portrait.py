import os
import numpy as np
from PIL import Image, ImageFilter, ImageOps

input_path = r"C:\Users\charan\Desktop\portfolio\public\charan-portrait.jpg"
output_path = r"C:\Users\charan\Desktop\portfolio\public\charan-hero.png"

img = Image.open(input_path).convert("RGBA")
width, height = img.size

# Create a studio gradient mask where the center (subject) is opaque,
# the bottom fades out smoothly to black, and outer sides blend smoothly into dark vignette
alpha = Image.new("L", (width, height), 255)
alpha_np = np.array(alpha, dtype=np.float32)

# Bottom fade (last 25% fades to 0)
fade_start = int(height * 0.75)
for y in range(fade_start, height):
    factor = 1.0 - ((y - fade_start) / (height - fade_start))
    alpha_np[y, :] *= factor

# Top and side soft vignette
center_x = width // 2
for y in range(height):
    for x in range(width):
        dist_x = abs(x - center_x) / (width / 2)
        if dist_x > 0.8:
            edge_factor = 1.0 - ((dist_x - 0.8) / 0.2)
            alpha_np[y, x] *= max(0.0, edge_factor)

img.putalpha(Image.fromarray(alpha_np.astype(np.uint8)))
img.save(output_path, "PNG")
print("Saved charan-hero.png successfully!")

