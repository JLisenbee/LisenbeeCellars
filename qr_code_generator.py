import qrcode
from PIL import Image, ImageFont, ImageDraw, ImageOps

def make_label(output_file: str, name: str, style: str, abv: float, ibu: int, guest_recipe: bool = False, brew_date: str = "", flavor_text: str = None, url: str = None):
    HEIGHT = 400
    WIDTH = int(HEIGHT * 0.825)
    BLACK= (0, 0, 0)
    LOGO_COLOR = (75, 75, 75)

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
        qr = qr.resize((150, 150), Image.Resampling.NEAREST)

    # Write Text
    tfont = ImageFont.truetype("./georgia.ttf", size=36)
    ifont = ImageFont.truetype("./georgiai.ttf", size=18)
    gfont = ImageFont.truetype("./georgiai.ttf", size=12)
    lfont = ImageFont.truetype("./AUGUSTUS.TTF", size=36)
    d = ImageDraw.Draw(lbl)
    d.text((WIDTH * 0.5, HEIGHT * 0.07), "BASEMENT BEER", fill=LOGO_COLOR, anchor="mm", align="center", font=lfont)
    d.text((WIDTH * 0.5, HEIGHT * 0.20), name, fill=BLACK, anchor="mm", align="center", font=tfont)
    d.text((WIDTH * 0.5, HEIGHT * 0.32), style, fill=BLACK, anchor="mm", align="center", font=ifont)
    d.text((WIDTH * 0.5, HEIGHT * 0.37), f"{abv}% ABV, {ibu} IBU", fill=BLACK, anchor="mm", align="center", font=ifont)
    if guest_recipe:
        d.text((WIDTH * 0.5, HEIGHT * 0.45), "Note: The recipe for this beer was designed by someone else", fill=BLACK, anchor="mm", align="center", font=gfont)
    elif flavor_text:
        d.multiline_text((WIDTH * 0.5, HEIGHT * 0.45), flavor_text, fill=BLACK, anchor="mm", align="center", font=gfont)
    d.text((WIDTH * 0.5, HEIGHT * 0.97), f"Brewed On: {brew_date}", fill=BLACK, anchor="mm", align="center", font=gfont)

    # Write Label
    if url:
        d.text((WIDTH * 0.5, HEIGHT * 0.92), "Scan above to see the recipe for this beer and more!", fill=BLACK, anchor="mm", align="center", font=gfont)
        lbl.paste(qr, (int((WIDTH / 2.0) - 75), int(HEIGHT * 0.5)))

    lbl.save(output_file)

make_label(output_file="amber.png", name="Whispering Woods", style="Amber Ale", 
           abv=6.0, ibu=34, guest_recipe=False, brew_date="01/17/2026",
           flavor_text="Through the endless cycle of the seasons\nthe trees always remain to remember.",
           url="https://jlisenbee.github.io/LisenbeeCellars/#WhisperingWoods")