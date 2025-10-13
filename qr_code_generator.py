import qrcode
from PIL import Image, ImageFont, ImageDraw

def make_label(output_file: str, name: str, style: str, abv: float, ibu: int, guest_recipe: bool = False, url: str = None):
    HEIGHT = 1000
    WIDTH = int(HEIGHT * 0.7)
    BLACK= (0, 0, 0)
    LOGO_COLOR = (92, 75, 63)

    # Make QR Code an save
    if url:
        qr = qrcode.QRCode(border=0)
        qr.add_data(url)
        qr.make()
        img_qr = qr.make_image(fill_color=BLACK)
        img_qr.save("qr.png", "png")

    # Load background image and QR
    lbl = Image.open("label.png").convert("RGB")
    lbl = lbl.resize((WIDTH, HEIGHT), Image.Resampling.NEAREST)
    if url:
        qr = Image.open("qr.png")
        qr = qr.resize((300, 300), Image.Resampling.NEAREST)

    # Write Text
    tfont = ImageFont.truetype("./georgia.ttf", size=54)
    ifont = ImageFont.truetype("./georgiai.ttf", size=36)
    gfont = ImageFont.truetype("./georgiai.ttf", size=24)
    lfont = ImageFont.truetype("./AUGUSTUS.TTF", size=72)
    d = ImageDraw.Draw(lbl)
    d.text((WIDTH * 0.5, HEIGHT * 0.07), "BASEMENT BEER", fill=BLACK, anchor="mm", align="center", font=lfont)
    d.text((WIDTH * 0.5, HEIGHT * 0.27), name, fill=BLACK, anchor="mm", align="center", font=tfont)
    d.text((WIDTH * 0.5, HEIGHT * 0.34), style, fill=BLACK, anchor="mm", align="center", font=ifont)
    d.text((WIDTH * 0.5, HEIGHT * 0.41), f"{abv}% ABV, {ibu} IBU", fill=BLACK, anchor="mm", align="center", font=ifont)
    if guest_recipe:
        d.text((WIDTH * 0.5, HEIGHT * 0.97), "Note: The recipe for this beer was designed by someone else", fill=BLACK, anchor="mm", align="center", font=gfont)

    # Write Label
    if url:
        d.text((WIDTH * 0.5, HEIGHT * 0.56), "Scan below to see recipe and more!", fill=BLACK, anchor="mm", align="center", font=gfont)
        lbl.paste(qr, (int((WIDTH / 2.0) - 150), int(HEIGHT * 0.6)))

    lbl.save(output_file)

make_label("mild.png", 
           "Mildly Interesting",
           "English Dark Mild",
           3.7,
           16,
           True,
           "https://jlisenbee.github.io/LisenbeeCellars/#MildlyInteresting")