# Planering - Sida för utspringsslåt

## Ide

Min möjliga ide är att göra en hemsida för att rösta på låt till utspringet på avslutningen. Spotify-embed kommer finnas för att se och höra på låtarna. Användare kan logga in för att lägga till en låt och rösta på låtar. [Passport.js](https://www.npmjs.com/package/passport) kommer kanske användas för att logga in med skolmejl/ google konto och se till att en användare inte kan rösta flera gånger; annars löser jag det utan google-login. En person  kan rösta på endast en låt. 

En annan ide kan vara multiplayer för [mitt julspel](https://github.com/Hjalmar-Lundmark/te20-spel) med hjälp av socket.io, alltså göra att 2 eller fler pers stjuter varann för döda dem istället. Det kanske bara blir en kopia av [Shellshock](https://store.steampowered.com/app/326460/ShellShock_Live/) som finns på steam. Jag kommer nog inte gå med denna ide dock. 

Jag funderade också på en liten sida för att läsa intro till mitt GA och kunna ladda ner det. Den sidan skulle vara liten med få funktioner så jag går inte med den iden. 

## Grovplanering 

|   | Tisdag  | Fredag  |
|---|---|---|
| v16  | Planering, grund med UI.  | Planering, styling, skapa DB, börja ta info från DB, js för att föreslå låtar,  |
| v17  | DB, js för att få röstning att fungera,   | forts.  |
| v18  | Login med google?  |   |
| v19  | ^  | -  |
| v20  | ^  | ^  |
| v21  | Hosting, klar, visa upp?  |   |


## Loggbok
18/4: Gjorde en grund för hur sidan ska se ut. Använde forum-login som en grund men jag kommer ändra mycket.
![Front page](/public/images/frontPage.jpg "Front page")

21/4: Fortsatt CSS-styling, lagt till databas och låtar i databasen. Nu visar hemsidan upp låtar från databasen och deras röstar i stället för hårdkodade prototyper. Också lagt till att användare kan föreslå låtar. 
![Front page version 2](/public/images/frontPage_v2.jpg "Front page version 2")

25/4: Senast fixade jag koden för att föreslå låtar och började skapa koden för att rösta på en låt. Idag ska jag fortsätta med röstnings funktionen och förhoppningsvis bli klar med det. Jag är dock lite osäker på hur den koden ska skrivas på bäst sätt men jag har ett okej sätt. 

Idag skapade jag den första delen till röstnings systemet, att antal röster går upp när en inloggad användare klickar på den knappen. Nästa lektion ska jag fixa resten, att användaren bara ska kunna rösta på en låt och bytta mellan vilken låt. Jag använda också [AI](https://hotpot.ai/art-generator) för att skapa en bild som ska passa som bakgrundsbild, vilket ser hemskt ut och jag inte kommer använda mig av. 
![Front page version 3](/public/images/frontPage_v3.jpg "Front page version 3")

28/4: Senast fick jag röstning att fungera men att ett konto kunde rösta hur många gånger den vill. Nu ska jag fixa så ett konto kan bara rösta en gång. Borde inte bli något stort problem, jag tänkte skapa en del i databasen för att spara om ett konto har röstat eller inte. 

Idag byggde jag om databas tabellen för användare för att lägga till en till del, fixade röstning så ett konto kan bara rösta på en låt och så användare kan ändra sin röst. Jag bytte också bakgrundsbild (igen) men tror att jag nöjer mig med denna. 
![Front page version 4](/public/images/frontPage_v4.jpg "Front page version 4")

Nästa lektion kanske jag hostar upp detta på [Glitch](https://glitch.com/) så har klassen ca 1 månad på sig att rösta fram en låt. Efter det vet jag inte om jag ska fortsätta lägga upp funktioner som en bättre login med google eller om jag ska göra något annat mindre projekt. 

2/5: Föra lektionen fick jag all röstning att fungera. Nu ska jag fortsätta med styling och mer specifikt få knappar att se okej ut. 

Idag har jag fortsatt med CSS styling. Jag har också testat lägga upp projektet på Glitch, mest för repetition i det, men får ut error med något djupt i node_modules. 

5/5: 