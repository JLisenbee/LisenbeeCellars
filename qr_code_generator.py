import qrcode
from PIL import Image, ImageFont, ImageDraw

def make_label(output_file: str, name: str, style: str, abv: float, ibu: int, guest_recipe: bool = False, url: str = None):
    HEIGHT = 1000
    WIDTH = int(HEIGHT * 0.7)

    # Make QR Code an save
    if url:
        qr = qrcode.QRCode(border=0)
        qr.add_data(url)
        qr.make()
        img_qr = qr.make_image()
        img_qr.save("qr.png", "png")

    # Load background image and QR
    lbl = Image.open("label.png")
    lbl = lbl.resize((WIDTH, HEIGHT), Image.Resampling.NEAREST)
    if url:
        qr = Image.open("qr.png")
        qr = qr.resize((300, 300), Image.Resampling.NEAREST)

    # Write Text
    tfont = ImageFont.truetype("./georgia.ttf", size=64)
    ifont = ImageFont.truetype("./georgiai.ttf", size=36)
    gfont = ImageFont.truetype("./georgiai.ttf", size=24)
    d = ImageDraw.Draw(lbl)
    d.text((WIDTH * 0.5, HEIGHT * 0.2), name, anchor="mm", align="center", font=tfont)
    d.text((WIDTH * 0.5, HEIGHT * 0.25), style, anchor="mm", align="center", font=ifont)
    d.text((WIDTH * 0.5, HEIGHT * 0.35), f"{abv}% ABV, {ibu} IBU", anchor="mm", align="center", font=ifont)
    if guest_recipe:
        d.text((WIDTH * 0.5, HEIGHT * 0.3), "Note: The recipe for this beer was designed by someone else)", anchor="mm", align="center", font=gfont)

    # Write Label
    if url:
        d.text((WIDTH * 0.5, HEIGHT * 0.56), "Scan below to see recipe and more!", anchor="mm", align="center", font=gfont)
        lbl.paste(qr, (int((WIDTH / 2.0) - 150), int(HEIGHT * 0.6)))

    lbl.save(output_file)

make_label("coffee_stout.png", 
           "Coffee Stout",
           "American Stout",
           5.5,
           40,
           True,
           "https://cdn.shopify.com/s/files/1/2785/6868/t/3/assets/PeaceCoffee2ndCrack-1526978194647.pdf")