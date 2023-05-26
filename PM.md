# PM - Röstningssida för utspringslåt

[Readme.md](/README.md) | [Planering.md](/Planering.md)

## Arbetsgång

Efter iden började jag kolla hur spotify embed-ing fungerar och analysera hur jag ska automatiskt skapa de efter data sparad i databasen. ...

## Utvärdering utifrån min preliminära tidsplanering

|   | Tisdag  | Fredag  |
|---|---|---|
| v16  | Planering, grund med UI.  | Planering, styling, skapa DB, börja ta info från DB, js för att föreslå låtar,  |
| v17  | DB, js för att få röstning att fungera,   | forts.  |
| v18  | Login med google?  |   |
| v19  | ^  | ^  |
| v20  | ^  | -  |
| v21  | Nya funktioner??  |   |
| v22  | Skriva PM, finsjusteringar  | - |
| v23  | Hosting, klar, visa upp?  |   |

Under de första gick det bra och tidsplaneringen följdes ganska exakt till att jag kom till punkten av att skapa login med google. Då kollade jag på hur det fungerade men ändrade om hur jag tänkte och strök den iden för att jobba på annat utan att ändra i grovplaneringen. Jag fokusera istället den tiden reserverad för Google-login till att få upp sidan på internet i vettig tid och att allt skulle fungera. Senare i planeringen(v21) la jag till en sista funktion, vilket var admin. 

## Vad har gått bra?



## Vad har gått dåligt? 
En sak som var i planeringen var att byta ut login till att använda Googles egna, vilket skulle öka säkerheten på sidan och göra det mycket svårare för någon att rösta flera gånger. Jag tänkte använda mig av [Passport.js](https://www.npmjs.com/package/passport) men på grund av dålig dokumentation och att jag inte visste hur jag skulle koppla det till skolans databas så bestämde jag mig att strycka den planen för att fokusera på att få upp sidan på internet i vettig tid och att allt skulle fungera. 