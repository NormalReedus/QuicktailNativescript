# Quicktail - Quick Cocktails

## Specs:
- Man skal kunne tilføje metoder osv
	-	Man skal kunne vælge en glas-type til sine egne tilføjede glas, som dukker op i visning (jeg skal lave illustrationer)
- Der skal være mulighed for flere metoder osv
	- Valgte skal være selected i styling
- Der skal være "notes" til hvert valg
- Feedback på om glas/is/metode osv er valgt
	- Brug en progressbar
	-	Animation om at ens valg "hopper" ind i en sidebar til oversigt
- Man skal kunne tilføje billede i Misc.
- Ingredients skal være en "todo" formular-stil
	- Man skal kunne vælge måleenhed (og tilføje ligesom alt andet)
	- Der skal være sliderstil (op/ned) på talmængden
- **BRUG NATIVESCRIPT PLAYGROUND CODE SAMPLES OG STJÆL, STJÆL**
- Ændr startside til at være cocktailsiden og brug et lille + i bunden til højre (SE SAMPLES) til at adde
	- Forside skal fjernes
- Inde på en cocktail skal der laves et parallax scroll (SE SAMPLES) til at vise billede
- Lav en gesture til hurtigt create etc (SE SAMPLES)
- Lav float up text labels på ingredients input (SE SAMPLES)
- Lav dialog om til custom
- filter: hue-rotate(360) transition på et eller andet
- Skal kunne slette filer fra documents() med fileSystemModule når man sletter en cocktail, men ikke når man sletter en, hvor billedet er valgt fra en picker
- Man skal kunne edit opskrifter
- Brug zip, share og fs til at eksportere
    - zip: https://www.npmjs.com/package/nativescript-zip
    - share: https://market.nativescript.org/plugins/nativescript-share-file
    - Skriv json til temp
    - kopier billeder til temp
    - zip billedmappe og json med dest i temp
    - share filen
    - hvordan importerer man / åbner en fil?
    - unzip filen i temp
    - flet json ind i appSettings
    - flet billeder ind i documents/billedmappen

## Fix:
- Lav create siden om til at bruge v-for
- Se forskellen på listview og stack
- Ny løsning til at vælge units som er mere native
	- Lige nu kan man ikke tappe på en anden unit, det gør bare, at den selecter den man har markeret
- Ændr vuex -Data navne
- Sørg for at alt bliver reverted, hvis man ikke tager / vælger et billede HELT - uden errors der crasher
- Alle billeder skal have en default, hvis ikke filen findes
- Efter billede er taget med kamera skal det gemmes i vuex, men ikke på device. Først ved saveCocktail skal det gemmes på device
	- Kig på at gemme imageSource midlertidigt KUN til visning i misc-tabben (da dette ikke må gemmes som cocktail fordi JSON fucker det op), derefter hvis det gemmes, skal imageSource forkastes og bare path gemmes i vuex, da <Image> læser det på samme måde
	- rename fsm til fs

## Inspo:
- Styling:
	- NS samples
	- Youtube creators
	- Nativescript theme siden
