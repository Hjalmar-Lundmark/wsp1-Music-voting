# Planering - Sida för utspringsslåt

[Readme.md](/README.md) | [PM.md](/PM.md)

## Ide

Min möjliga ide är att göra en hemsida för att rösta på låt till utspringet på avslutningen. Spotify-embed kommer finnas för att se och höra på låtarna. Användare kan logga in för att lägga till en låt och rösta på låtar. [Passport.js](https://www.npmjs.com/package/passport) kommer kanske användas för att logga in med skolmejl/ google konto och se till att en användare inte kan rösta flera gånger; annars löser jag det utan google-login. En person  kan rösta på endast en låt. 

En annan ide kan vara multiplayer för [mitt julspel](https://github.com/Hjalmar-Lundmark/te20-spel) med hjälp av sockets, alltså göra att 2 eller fler pers stjuter varann för döda dem istället. Det kanske bara blir en kopia av [Shellshock](https://store.steampowered.com/app/326460/ShellShock_Live/) som finns på steam. Jag kommer nog inte gå med denna ide dock. 

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

***

21/4: Fortsatt CSS-styling, lagt till databas och låtar i databasen. Nu visar hemsidan upp låtar från databasen och deras röstar i stället för hårdkodade prototyper. Också lagt till att användare kan föreslå låtar. 
![Front page version 2](/public/images/frontPage_v2.jpg "Front page version 2")

***

25/4: Senast fixade jag koden för att föreslå låtar och började skapa koden för att rösta på en låt. Idag ska jag fortsätta med röstnings funktionen och förhoppningsvis bli klar med det. Jag är dock lite osäker på hur den koden ska skrivas på bäst sätt men jag har ett okej sätt. 

Idag skapade jag den första delen till röstnings systemet, att antal röster går upp när en inloggad användare klickar på den knappen. Nästa lektion ska jag fixa resten, att användaren bara ska kunna rösta på en låt och bytta mellan vilken låt. Jag använda också [AI](https://hotpot.ai/art-generator) för att skapa en bild som ska passa som bakgrundsbild, vilket ser hemskt ut och jag inte kommer använda mig av. 
![Front page version 3](/public/images/frontPage_v3.jpg "Front page version 3")

***

28/4: Senast fick jag röstning att fungera men att ett konto kunde rösta hur många gånger den vill. Nu ska jag fixa så ett konto kan bara rösta en gång. Borde inte bli något stort problem, jag tänkte skapa en del i databasen för att spara om ett konto har röstat eller inte. 

Idag byggde jag om databas tabellen för användare för att lägga till en till del, fixade röstning så ett konto kan bara rösta på en låt och så användare kan ändra sin röst. Jag bytte också bakgrundsbild (igen) men tror att jag nöjer mig med denna. 
![Front page version 4](/public/images/frontPage_v4.jpg "Front page version 4")

Nästa lektion kanske jag hostar upp detta på [Glitch](https://glitch.com/) så har klassen ca 1 månad på sig att rösta fram en låt. Efter det vet jag inte om jag ska fortsätta lägga upp funktioner som en bättre login med google eller om jag ska göra något annat mindre projekt. 

***

2/5: Föra lektionen fick jag all röstning att fungera. Nu ska jag fortsätta med styling och mer specifikt få knappar att se okej ut. 

Idag har jag fortsatt med CSS styling. Jag har också testat lägga upp projektet på Glitch, mest för repetition i det, men får ut error med något djupt i node_modules. 

***

5/5: Idag har jag inte gjort så mycket, bara lite omformatering. Anledningen beror på att jag har slut ideer, CSS styling är klart och hosting på Glitch ger konstiga error meddelanden. De meddelandena är problem i node_modules och ser ut att bero på något långt in i MySQL2s filer. 
Jag har kollat igenom tutorials och dokumentation för Passport.js men det ger inget. 

Sista 5 minutrarna av lektionen lyckades jag lösa de problemen genom att by till version 2.3.3 av MySQL2 istället för nuvarande 3.2.4. Jag hade också testat 3.2.2 och 3.2.3 utan framgång. Hade också testat annat, som att googla och skriva in saker från andras problem i terminalen, utan framgång. Sidan ligger upp på [https://te20-musik.glitch.me/](https://te20-musik.glitch.me/) för nu, jag har dock inte gett ut den till klassen utan väntar till tisdags lektionen. 

***

9/5: Jag fixade felen i Glitch och kunde därför ge ut hemsidan till klassen. Problemen med Glitch var bland annat skumma saker med npm paket, ett som inte fungerade förrän jag återinstallerade den och ett där nyare versioner inte fungerar. Sedan la jag till funktion för att jag ska stänga av röstning och ändrade hur sidan ska se ut när jag har stängt av röstning. Det kommer nog hända ungefär 30 maj. 

Kvarvarande att göra kan vara att utveckla hemsidan för att den ska innehålla flera klasser, koppla upp Google-login eller något annat.  

***

12/5: Senast fixade jag errors i Glitch. Idag ska jag fixa ett Issue efter lite feedback som jag har fått, alltså att en klasskamrat vill info en låt som bara finns sparad som podd-avsnitt. Att fixa det är hyfsat enkelt men skulle behöva ändra hur låtar sparas i databasen.

Jag ändrade lite i databasen och infon som skickades in i DB för att inkludera vilken typ av spotify media som är sparad. Genom att veta det i DB kan jag automatiskt embeda som de typerna istället för hård-kodat som en låt, det betyder att spellistor och eventuellt annan spotify media kan embedas automatiskt. Fortfarande så låter jag användarna bara lägga in låtar och eventuellt något avsnitt från podd om det är en låt, jag vet inte ens om utspringslåten får vara i avsnittsformat men det spelar ingen roll om ingen röstar för den låten. Jag formaterade också om lite kod och html för konsistens. Allt det gjordes i en annan github branch, namnged Hjalmar-Lundmark-test-branch. 

Nästa lektion funderar jag på om jag ska lägga till en prototyp för fler klasser. Då gör jag startsidan till intro och knappar för att ta sig till vilken klass man vill, te20, ee20, osv. Då flyttar jag låtlistan till ```/:idk``` och kopplar id till vilken databas tabell som är relevant. Lägga in låtar blir på ```/:idk/newSong``` eller ```/newSong/:idk``` som också kopplas rätt. Login och skapa konto vet jag inte hur jag ska göra med. 

***

16/5: Sjuk. 

***

23/5: Innan lektionen så slog jag ihop grenarna i github så ändringarna hamnade i huvudgrenen Main och på Glitch hostingen. Nu funderar jag på att skapa en admin funktion, där ett konto får speciella funktioner, bland annat att se användare, vilka som har röstat och sådant. Admin kanske också kan ha funktioner för att ta bort användare eller låtar som inte passar. All info över är redan sparad i databasen så jag behöver bara skapa någon sida och några funktioner. 

Idag har jag skapat så konton kan ha admin rank/status och kan då komma åt en lista av alla användare. Där kan då adminen se vilka som har röstat på en låt samt vilken låt det är. Adminen skulle kunna deleta konton genom en knapp där vilket tar bort deras röst om den har röstat innan och tar sedan bort kontot. Nästa lektion kanske jag lägger till en funktion för att ta bort en låt från låtlistan. 
![admin page](/public/images/admin.jpg "Admin page")

Arbetet gjordes i ```hjalmar-lundmark-test-branch``` och flyttades sedan över till ```main``` och Glitch

***

26/5: 