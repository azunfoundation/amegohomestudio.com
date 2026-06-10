import os
import glob

old_text = """                <a href="category.html?page=sleek-kitchens" class="mp-logo" title="Sleek Kitchens"><img src="logos folder/sleek logo (1).png" alt="Sleek"></a>
                <a href="category.html?page=bathsense" class="mp-logo" title="Bathsense"><img src="logos folder/bathsense.png" alt="Bathsense"></a>
                <a href="category.html?page=the-white-teak-company" class="mp-logo" title="The White Teak Company"><img src="logos folder/the ehite t6eak company.png" alt="White Teak"></a>
                <a href="category.html?page=nilaya" class="mp-logo" title="Nilaya"><img src="logos folder/nilaya.png" alt="Nilaya"></a>
                <a href="category.html?page=ador" class="mp-logo" title="Ador"><img src="logos folder/ador.png" alt="Ador"></a>
                <a href="category.html?page=hafele" class="mp-logo" title="Häfele"><img src="logos folder/hafele.png" alt="Häfele"></a>
                <a href="category.html?page=weatherseal" class="mp-logo" title="Weatherseal"><img src="logos folder/weather seal.png" alt="Weatherseal"></a>
                <a href="category.html?page=pure-royale" class="mp-logo" title="Pure Royale"><img src="logos folder/pure.png" alt="Pure Royale"></a>
                <a href="category.html?page=action-tesa" class="mp-logo" title="Action Tesa"><img src="logos folder/action tesa.png" alt="Action Tesa"></a>"""

new_text = """                <a href="category.html?page=sleek-kitchens" class="mp-logo" title="Sleek Kitchens"><img src="logos folder/sleek logo (1).png" alt="Sleek"><span class="mp-name">Sleek Kitchens</span></a>
                <a href="category.html?page=bathsense" class="mp-logo" title="Bathsense"><img src="logos folder/bathsense.png" alt="Bathsense"><span class="mp-name">Bathsense</span></a>
                <a href="category.html?page=the-white-teak-company" class="mp-logo" title="The White Teak Company"><img src="logos folder/the ehite t6eak company.png" alt="White Teak"><span class="mp-name">White Teak</span></a>
                <a href="category.html?page=nilaya" class="mp-logo" title="Nilaya"><img src="logos folder/nilaya.png" alt="Nilaya"><span class="mp-name">Nilaya</span></a>
                <a href="category.html?page=ador" class="mp-logo" title="Ador"><img src="logos folder/ador.png" alt="Ador"><span class="mp-name">Ador</span></a>
                <a href="category.html?page=hafele" class="mp-logo" title="Häfele"><img src="logos folder/hafele.png" alt="Häfele"><span class="mp-name">Häfele</span></a>
                <a href="category.html?page=weatherseal" class="mp-logo" title="Weatherseal"><img src="logos folder/weather seal.png" alt="Weatherseal"><span class="mp-name">Weatherseal</span></a>
                <a href="category.html?page=pure-royale" class="mp-logo" title="Pure Royale"><img src="logos folder/pure.png" alt="Pure Royale"><span class="mp-name">Pure Royale</span></a>
                <a href="category.html?page=action-tesa" class="mp-logo" title="Action Tesa"><img src="logos folder/action tesa.png" alt="Action Tesa"><span class="mp-name">Action Tesa</span></a>"""

for file in glob.glob("*.html"):
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    if old_text in content:
        content = content.replace(old_text, new_text)
        with open(file, "w", encoding="utf-8") as f:
            f.write(content)
        print("Updated", file)
