import qrcode
from PIL import Image, ImageFont, ImageDraw

# Make QR Code an save
qr = qrcode.QRCode(border=0)
qr.add_data("https://jlisenbee.github.io/LisenbeeCellars/#UnderstonePorter")
qr.make()
img_qr = qr.make_image()
img_qr.save("qr.png", "png")

# Load background image and QR
lbl = Image.open("label.png")
lbl.resize((990, 1200), Image.Resampling.NEAREST)
qr = Image.open("qr.png")
qr.resize((330, 330), Image.Resampling.NEAREST)

# Write Text
tfont = ImageFont.truetype("./georgia.ttf", size=96)
ifont = ImageFont.truetype("./georgiai.ttf", size=48)
d = ImageDraw.Draw(lbl)
d.text((lbl.size[0]/2, 200), "Understone Porter", anchor="mm", align="center", font=tfont)
d.text((lbl.size[0]/2, 375), "American Porter", anchor="mm", align="center", font=ifont)
d.text((lbl.size[0]/2, 450), "6.6% ABV, 31 IBU", anchor="mm", align="center", font=ifont)

# Write Label
lbl.paste(qr, (330, 600))
lbl.save("label1.png")