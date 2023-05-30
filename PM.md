# PM - Röstningssida för utspringslåt

[Readme.md](/README.md) | [Planering.md](/Planering.md)

## Röstningssida
Det här är en hemsida för att rösta på låt till utspringet på avslutningen i TE20. Spotify-embed finns för att se och höra på låtarna. Användare kan logga in för att lägga till en låt och rösta på låtar. Endast 1 röst per person och det går alltid att byta vilken låt. 

## Arbetsgång

Efter iden bestämdes började jag direkt kolla hur spotify embed-ing fungerar och analysera hur jag ska automatiskt skapa de efter data sparad i databasen. Jag märkte att i alla spotify linkar till en låt så har den specifika låten en slumpmässig kod som kopplas till den låten. Den specifika koden består av ca 22 blandade tecken och blev perfekt att spara i databasen. Jag skapade en sida och post funktion där användaren lägger in en Spotify låt länk, exempelvis ```https://open.spotify.com/track/5iRVNYbhfWNO2VzBykX7GS``` där delen efter ```/track/``` är låtens kod. Skär ut den ur stringen, INSERT in i databasen och ta ut den för att lägga in den i en Spotify embed mall, som skapas efter den har fått koden till en låt. 

Sedan fixade jag login, skapa konto och sådant som har varit med i de senaste uppgifterna, det var lätt och gick bra. Att snygga till sidan med SASS och sådant gick bra även om det tog ett tag att få till bra färger och bakgrundsbild. 

Då var det dags att få in att konton skulle kunna rösta och då blev hemligheten Spotifys låt kod igen. När en användare röstar så sparas den låt koden i databasen för användaren samt antal röster, vilket är sparad i databasen för låtar, går upp med 1 röst. En användare som har något i db-fältet för vilken den har röstat på, kan inte rösta, utan måste klicka på en "Byt röst" knapp vilket tömmer det fältet och drar ner rösten med 1 för den låt som har samma kod som den användaren hade röstat på. Då när personens "röstat på" db-fält är tomt igen kan personen rösta. 

Sedan var webbsidan klar att användas och kunde läggas ut på internet, i alla fall om hosting sidan ville fungera. Jag la upp Github repot på [Glitch.com](https://glitch.com/), fyllde i .env och väntade spänningsfullt på att det skulle fungera, det gjorde det inte. Några skumma errors var allt som kom ut på grund av att MySQL2 versionen var för ny. Jag googlade och testade allt, bland annat att gå tillbaka några versioner av MySQL2, men det hjälpte inte. Till slut efter några lektioner gick jag tillbaka ca 6 månader av uppdateringar till MySQL2 vilket fixade problemet och allt fungerade efter det. 

Från feedback från klassen ändrade jag lite hur låtar sparas genom att lägga till en till del, vilken typ av spotify-innehåll som ska sparas. Det var bara att ta ut en annan del av låten som kommer in, spara den och sedan också stoppa in den i embed mallen. Då kan alla typer av Spotifys innehåll embedas automatisk bara det är sparat i databasen, MEN jag låter användare bara stoppa in låt och podd episoder(om det är låtar). 

Admin funktioner var sista funktionen jag la till på detta arbete och det gick ut på att ge några konton extra funktioner. Konton blev fick admin krafter ifrån att lägga till en del i användar-databasen som klarifierar att vissa konto har tillgång till fler funktioner. Dessa funktioner är att komma åt en sida som visar alla användare samt låtar och dess gömda detaljer, exempelvis vem som har röstat på vilken låt och vem som har lagt in vilken låt. Där skulle admins kunna ta bort användare vilket också tar bort dess röst. 

## Utvärdering utifrån min preliminära tidsplanering

|   | Tisdag  | Fredag  |
|---|---|---|
| v16  | Planering, grund med UI.  | Planering, styling, skapa DB, börja ta info från DB, js för att föreslå låtar,  |
| v17  | DB, js för att få röstning att fungera,   | forts.  |
| v18  | Login med google?  |   |
| v19  | ^  | ^  |
| v20  | ^  | -  |
| v21  | Nya funktioner??  |   |
| v22  | Skriva PM, finsjusteringar, bli klar?  | - |
| v23  | -  | -  |

Under de första gick det bra och tidsplaneringen följdes ganska exakt till att jag kom till punkten av att skapa login med google. Då kollade jag på hur det fungerade men ändrade om hur jag tänkte och strök den iden för att jobba på annat utan att ändra i grovplaneringen. Jag fokusera istället den tiden reserverad för Google-login till att få upp sidan på internet i vettig tid och att allt skulle fungera. Senare i planeringen(v21) la jag till en sista funktion, vilket var admin. 

## Vad har gått bra?
Arbetet har flutit på bra och jag fick in allt jag planerade. Jag fastnade aldrig riktigt på någon del utan jag tog mig över alla problem jag stötte på. Att det har gått så bra är beroende på att jag tycker att sånt här är roligt, att jag kan koncentrera mig på att lösa problem och ta mig framåt hela lektionen; och att jag testar olika saker samt googlar för att lösa de problem och errors jag stöter på. 

## Vad har gått mindre bra? 
En sak som var i planeringen var att byta ut login till att använda Googles egna, vilket skulle öka säkerheten på sidan och göra det mycket svårare för någon att rösta flera gånger. Jag tänkte använda mig av [Passport.js](https://www.npmjs.com/package/passport) men på grund av dålig dokumentation och att jag inte visste hur jag skulle koppla det till skolans databas så bestämde jag mig att strycka den planen för att fokusera på att få upp sidan på internet i vettig tid och att allt skulle fungera. 

## Vidareutveckling
En till sak jag funderade på att lägga till är fler klasser / fler sidor där det röstas på olika saker. Då hade jag behövt ändra på hur hela fil / URL upplägget ser ut. I sådana fall hade jag gjort startsidan till en introduktion och knappar för att ta sig till vilken klass man vill, te20, ee20, osv, eller till andra typer av röstningssidor. Då flyttar jag låtlistan till ```/:idk``` och kopplar id till vilken databas tabell som är relevant. Lägga in låtar blir på ```/:idk/newSong``` eller ```/newSong/:idk``` som också kopplas rätt. Login och skapa konto skulle nog vara likadan som här om inte jag kommer på något sätt att dela upp användare för om de bara får vara på vissa röstningssidor. 

## Avslutning
Jag blev väldigt nöjd med detta arbete, specifikt då det fick användning. Iden må inte ha varit min från början, utan jag fick den från Jens, men jag känner att jag klarade utmaningen med att skapa en sida för att klassen skulle rösta på utspringslåt. 
