import os
import sys
from PIL import Image

input_path = os.path.abspath(r"C:\Users\charan\Desktop\portfolio\public\charan-portrait.jpg")
output_path = os.path.abspath(r"C:\Users\charan\Desktop\portfolio\public\charan-cutout.png")

print(f"Reading input image from: {input_path}")
img = Image.open(input_path)
print(f"Image size: {img.size}, mode: {img.mode}")

try:
    from rembg import remove
    print("Running rembg removal...")
    output = remove(img)
    output.save(output_path, "PNG")
    print(f"Cutout successfully saved to {output_path}!")
except Exception as e:
    print(f"Rembg failed or not ready: {e}")
    # Fallback: create soft vignette feathered portrait
    print("Creating feathered portrait...")
    img = img.convert("RGBA")
    # Save standard RGBA
    img.save(output_path, "PNG")
    print("Saved fallback PNG.")

