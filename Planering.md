# Planering - Music vote

## Grovplanering 

|   | Tisdag  | Fredag  |
|---|---|---|
| v16  | Planering, grund med UI.  | Planering, styling, skapa DB, börja ta info från DB, js för att föreslå låtar,  |
| v17  | DB, js för att få röstning att fungera,   | forts.  |
| v18  | Login med google?  |   |
| v19  | ^  | -  |
| v20  | ^  | ^  |
| v21  | Hosting, klar, visa upp  |   |


## Loggbok
18/4: Gjorde en grund för hur sidan ska se ut. Använde forum-login som en grund men jag kommer ändra mycket.
![Front page](/public/images/frontPage.jpg "Front page")

21/4: Fortsatt CSS-styling, lagt till databas och låtar i databasen. Nu visar hemsidan upp låtar från databasen och deras röstar i stället för hårdkodade prototyper. Också lagt till att användare kan föreslå låtar. 
![Front page version 2](/public/images/frontPage_v2.jpg "Front page version 2")

25/4: Senast fixade jag koden för att föreslå låtar och började skapa koden för att rösta på en låt. Idag ska jag fortsätta med röstnings funktionen och förhoppningsvis bli klar med det. Jag är dock lite osäker på hur den koden ska skrivas på bäst sätt men jag har ett okej sätt. 

Idag skapade jag den första delen till röstnings systemet, att antal röster går upp när en inloggad användare klickar på den knappen. Nästa lektion ska jag fixa resten, att användaren bara ska kunna rösta på en låt och bytta mellan vilken låt. Jag använda också [AI](https://hotpot.ai/art-generator) för att skapa en bild som ska passa som bakgrundsbild, vilket ser hemskt ut och jag inte kommer använda mig av. 
![Front page version 3](/public/images/frontPage_v3.jpg "Front page version 3")

28/4: Senast fick jag röstning att fungera men att ett konto kunde rösta hur många gånger den vill. Nu ska jag fixa så ett konto kan bara rösta en gång. Borde inte bli något stort problem, jag tänkte skapa en del i databasen för att spara om ett konto har röstat eller inte. 

Idag byggde jag om databas tabellen för användare, 

2/5: 