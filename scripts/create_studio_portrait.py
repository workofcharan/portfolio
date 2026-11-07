import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

input_path = r"C:\Users\charan\Desktop\portfolio\public\charan-portrait.jpg"
output_path = r"C:\Users\charan\Desktop\portfolio\public\charan-studio.jpg"

img = Image.open(input_path).convert("RGB")
w, h = img.size
np_img = np.array(img, dtype=np.float32)

# Create an elliptical mask centered on Charan's face and upper torso
# Center is around x=0.51, y=0.45
center_x = 0.51 * w
center_y = 0.45 * h
radius_x = 0.38 * w
radius_y = 0.48 * h

y_coords, x_coords = np.ogrid[:h, :w]
norm_dist = ((x_coords - center_x) / radius_x) ** 2 + ((y_coords - center_y) / radius_y) ** 2
dist = np.sqrt(norm_dist)

# Inner area (dist <= 0.7) stays 100% original
# Transition area (0.7 < dist < 1.3) falls off to dark studio black
# Outer area (dist >= 1.3) fades to dark charcoal/black
weight = np.clip(1.0 - (dist - 0.65) / 0.55, 0.0, 1.0)
weight = weight[:, :, np.newaxis]
# Smooth cosine curve for weight
weight = 0.5 * (1.0 + np.cos(np.pi * (1.0 - weight)))

# Create dark background matching #0e0e11
studio_bg = np.zeros_like(np_img)
studio_bg[:, :, 0] = 14  # R
studio_bg[:, :, 1] = 14  # G
studio_bg[:, :, 2] = 17  # B

# Blend
blended = np_img * weight + studio_bg * (1.0 - weight)
blended = np.clip(blended, 0, 255).astype(np.uint8)

res_img = Image.fromarray(blended)
# Enhance contrast slightly for crisp editorial finish
enhancer = ImageEnhance.Contrast(res_img)
res_img = enhancer.enhance(1.08)

res_img.save(output_path, "JPEG", quality=95)
print(f"Successfully generated studio portrait at {output_path}!")

