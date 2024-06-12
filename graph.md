---
title: AI Act Beslisboom
---

<style>
  .mermaidTooltip {
      position: absolute;
      text-align: left;
      max-width: 200px;
      padding: 2px;
      font-family: 'trebuchet ms', verdana, arial;
      font-size: 12px;
      background: #ffffff;
      border: 1px solid #aaaa33;
      border-radius: 2px;
      pointer-events: none;
      z-index: 100;
    }
  .page-columns .column-page-inset {
      z-index: 100;                     /* default z-index: 998; */
    }
</style>

``` mermaid
graph 

    %%%%%%%%%% Root question - def ARK %%%%%%%%%%
    root_question["`Voldoet je algoritme aan de definitie van 'algoritme' van de Algemene Rekenkamer? 'Een set van regels en instructies die en computer geautomatiseerd volgt bij het maken van berekeningen om een probleem op te lossen of een vraag te beantwoorden'`"]
    root_question -- Ja -->  0.node
    root_question -- Nee --> 1.node
    0.node["`Betreft je algoritme een AI-systeem volgens de definitie van de AI Verordening? *Nog verder uitwerken*`"]
    1.node["`Je gebruikt geen algoritme. De AI Verordening is niet van toepassing. Houd je aan bestaande wet- en regelgeving (bijv. de AVG wanneer je persoonsgegevens gebruikt.)`"]

    %%%%%%%%%% Node 0 - def AI Act %%%%%%%%%%
    0.node -- Ja, maar geen general purpose AI --> A.0.node
    0.node -- Ja, wel general purpose AI --> B.0.node
    0.node -- Nee --> C.0.node
    click 0.node callback """Hier kan je meer toelichting geven voor deze node. Je kan hier best veel tekst in kwijt denk ik. Hier kan je meer toelichting geven voor deze node. Je kan hier best veel tekst in kwijt denk ik. Hier kan je meer toelichting geven voor deze node. Je kan hier best veel tekst in kwijt denk ik. Hier kan je meer toelichting geven voor deze node. Je kan hier best veel tekst in kwijt denk ik. Hier kan je meer toelichting geven voor deze node. Je kan hier best veel tekst in kwijt denk ik. Hier kan je meer toelichting geven voor deze node. Je kan hier best veel tekst in kwijt denk ik.  </br>
    </br>
    - blabblabalbala </br>
    - hoe veel tekst kan je hier kwijt </br>
    - nog meer </br>
    - en nog meer </br>
    - en nog meer dingen </br>
    """

    %%%%%%%%%% subgraph A - Bepaal de reikwijdte van de AI Verordening %%%%%%%%%%
    subgraph "Reikwijdte AI Verordening"
        A.0.node["`We gaan de reikwijdte van de AI Verordening bepalen`"]
        A.0.node --> A.1.node
        A.1.node["`Zal je AI-systeem of de output van het systeem uitsluitend in de handel wordt gebracht, in gebruik worden gesteld of - al dan niet gewijzigd - worden gebruikt voor militaire, defensie- of nationale veiligheidsdoeleinden, ongeacht het soort entiteit dat deze activiteiten uitvoert?`"]
        A.1.node -- Ja --> A.end.node
        A.1.node -- Nee --> A.2.node
        A.2.node["`Ga je een AI-systeem ontwikkelen, maar alleen met wetenschappelijk onderzoek als enig doel?`"]
        A.2.node -- Ja --> A.end.node
        A.2.node -- Nee --> A.3.node
        A.3.node["`Ben je momenteel, of ga je binnekort beginnen met onderzoeks-, test- of ontwikkelingsactiviteiten met betrekking tot AI-systemen of AI-modellen voor zij in de handel worden gebracht of in gebruik worden gesteld?`"]
        A.3.node -- Ja --> A.end.node
        A.3.node -- Nee --> A.4.node
        A.4.node["`Ga je een AI-systeem ontwikkelen die gratis beschikbaar wordt gesteld of vrijgegeven onder opensourcelicenties?`"]
        A.4.node -- Ja --> A.4.1.node
        A.4.node -- Nee --> D.0.node
        A.4.1.node["`Wordt je AI-systeem op de markt gebracht of in gebruik wordt gesteld als AI-systeem met een hoog risico? of als een systeem die verboden is volgens artikel 5 van de AI Verordening, of een systeem die moet voldoen aan de transparantievereisten van artikel 50. *Nog een beetje vaag dit. Nog uitwerken.*`"]
        A.4.1.node -- Nee --> A.end.node
        A.4.1.node -- Ja --> D.0.node
        A.end.node["`In dat geval is de AI-verordening nog niet van toepassing, maar zorg er wel voor dat de activiteiten worden uitgevoerd in overeenstemming met het toepasselijke Unierecht. Bijvoorbeeld: als het AI systeem persoonsgegevens verwerkt, dan moet je nog steeds aan de AVG voldoen.`"]
    end

    %%%%%%%%%% subgraph B - General purpose AI %%%%%%%%%%
    subgraph "General purpose AI"
        B.0.node["`We maken gebruik van general purpose AI`"]
        B.0.node --> B.1.node
    end

    %%%%%%%%%% subgraph C - AI Verordening niet van toepassing %%%%%%%%%%
    subgraph "AI Verordening is niet van toepassing" 
        C.0.node["`De AI Verordening is niet van toepassing`"]
        C.0.node --> C.1.node
        C.1.node["`Gebruik je een algoritme met impact volgens categorie B van de Handreiking van het Algoritmergister? Dat wil zeggen: rechtsgevolgen voor burgers of classificatie van burgers of groepen?`"]
        C.1.node -- ja --> C.1.1.node
        C.1.node -- nee --> C.1.2.node
        C.1.1.node["`Valt je toepassing onder één van de uitzonderingsgronden categorie C of D van de handreiking?`"]
        C.1.2.node["`Je algoritme is niet impactvol en de AI Verordening is niet van toepassing. Houd je aan bestaande wet- en regelgeving (bijv. de AVG wanneer je persoonsgegevens gebruikt.)`"]
        C.1.1.node -- Ja --> C.1.1.1.node
        C.1.1.node -- Nee --> C.1.1.2.node
        C.1.1.1.node["`Het betreft een algoritme met impact, maar de AI verordening is niet van toepassing. Je hoeft vanwege één van de uitzonderingsgronden niet te publiceren in het algoritmeregister.`"]
        C.1.1.2.node["`Het betreft een algoritme met impact, maar de AI verordening is niet van toepassing. Je moet wel publiceren in het algoritmeregister.`"]
    end

    %%%%%%%%%% subgraph D - Verboden AI-systemen %%%%%%%%%%
    subgraph "Verboden AI-systemen"
        D.0.node["`We gaan bepalen of je AI-systeem een verboden toepassing is`"]
        D.0.node --> D.1.node
        D.1.node["`Zou je AI-systeem gebruik kunnen gaan maken van subliminale technieken om mensen onbewust of bewust kunnen manipuleren, waardoor ze beslissingen nemen die ze anders niet zouden hebben genomen?`"]
        D.1.node -- Ja --> D.end.node
        D.1.node -- Nee --> D.2.node
        D.2.node["`Zou je AI-systeem gebruik kunnen gaan maken van kwetsbaarheden van individuen of specifieke groepen, zoals leeftijd, handicaps of sociale/economische omstandigheden, om het gedrag van die personen aanzienlijk te verstoren, wat kan leiden tot aanzienlijke schade bij henzelf of anderen?`"]
        D.2.node -- Ja --> D.end.node
        D.2.node -- Nee --> D.3.node
        D.3.node["`Zou je AI-systemen gebruikt kunnen worden om natuurlijke personen of groepen gedurende een periode te evalueren of te classificeren op basis van hun sociale gedrag of afgeleide persoonlijke kenmerken? Dit kan leiden tot nadelige behandelingen die niet gerechtvaardigd zijn en geen verband houden met de oorspronkelijke context van de data of met de ernst van het sociale gedrag.`"]
        D.3.node -- Ja --> D.end.node
        D.3.node -- Nee --> D.4.node
        D.4.node["`Zou je AI-systeem gebruikt kunnen worden voor risicobeoordelingen van natuurlijke personen om het risico op crimineel gedrag te voorspellen, gebaseerd op profilering of persoonlijkheidskenmerken? Dit geldt niet voor AI-systemen die worden gebruikt om menselijke beoordelingen te ondersteunen, gebaseerd op objectieve en verifieerbare feiten die rechtstreeks verband houden met criminele activiteiten.`"]
        D.4.node -- Ja --> D.end.node
        D.4.node -- Nee --> D.5.node
        D.5.node["`Zou je AI-systemen gebruikt kunnen worden om databanken voor gezichtsherkenning aan te leggen of aan te vullen door willkeurige gezichtsafbeeldingen van internet of CCTV-beelden te scrapen?`"]
        D.5.node -- Ja --> D.end.node
        D.5.node -- Nee --> D.6.node
        D.6.node["`Zou je AI-systemen gebruik kunnen worden om emoties van een persoon op de werkplek of in het onderwijs af te leiden? Dit is niet van toepassing als het gebruik van het AI-systeem is bedoeld voor medische- of veiligheidsdoeleinden.`"]
        D.6.node -- Ja --> D.end.node
        D.6.node -- Nee --> D.7.node
        D.7.node["`Zou je AI-systemen gebruikt kunnen worden om natuurlijke personen individueel in categorieën in te delen op basis van biometrische gegevens om ras, politieke opvattingen, lidmaatschap van een vakbond, religieuze of levensbeschouwelijke overtuigingen, seksleven of seksuele geaardheid af te leiden? Dit verbod geldt niet voor het labelen of filteren van rechtmatig verkregen biometrische datasets, zoals afbeeldingen, op basis van biometrische gegevens, of voor categorisering van biometrische gegevens op het gebied van rechtshandhaving.`"]
        D.7.node -- Ja --> D.end.node
        D.7.node -- Nee --> D.8.node
        D.8.node["`Zou je AI-systeem gebruikt kunnen worden voor biometrische identificatie op afstand in real time in openbare ruimten met het oog op de rechtshandhaving? Dit geldt niet als het systeem strikt noodzakelijk is voor een van de volgende doelen: <br/> i. Gericht zoeken naar specifieke slachtoffers van ontvoering, mensenhandel of seksuele uitbuiting, evenals het zoeken naar vermiste personen. <br/> ii. Voorkomen van een specifieke, aanzienlijke en onmiddellijke dreiging voor het leven of de fysieke veiligheid van personen, of een reële en actuele of voorspelbare dreiging van een terroristische aanslag. <br/> iii. Lokalisatie of identificatie van een persoon die verdacht wordt van het plegen van een strafbaar feit, voor strafrechtelijk onderzoek of vervolging, met een maximale straf van ten minste vier jaar vrijheidsbeneming zoals vermeld in bijlage II van de betrokken lidstaat.`"]
        D.8.node -- Ja --> D.end.node
        D.8.node -- Nee --> E.0.node
        D.end.node["`Deze type AI-systemen zijn in principe verboden volgens de AI-verordening. *Consequenties toevoegen!*`"]
    end

    %%%%%%%%%% subgraph E - Hoog risico AI-systemen %%%%%%%%%%
    subgraph "Hoog risico AI-systemen"
        E.0.node["`We gaan bepalen of je AI-systeem een hoog risico AI-systeem is.`"]
        E.0.node --> E.1.node
        E.1.node["`Is het AI-systeem bedoeld om te worden gebruikt als veiligheidscomponent van een product of is het AI-systeem zelf een product dat valt onder de in bijlage I van de AI-verordening (link) opgenomen harmonisatiewetgeving van de Unie? *verder uitwerken*`"]
        E.1.node -- Ja --> E.end.node
        E.1.node -- Nee --> E.2.node
        E.2.node["`Moet het product waarvan het AI-systeem de veiligheidscomponent vormt een conformiteits-beoordeling door een derde partij laten uitgevoeren met het oog op het in de handel brengen of in gebruik stellen van dat product op grond van de in bijlage I opgenomen harmonisatiewetgeving van de Unie?`"]
        E.2.node -- Ja --> E.end.node
        E.2.node -- Nee --> E.3.node
        E.3.node["`Is je AI-systeem bedoeld om te worden gebruikt voor biometrische identificatie op afstand?`"]
        E.3.node -- Ja --> E.almost.end.node
        E.3.node -- Nee --> E.4.node
        E.4.node["`Is je AI-systeem bedoeld om te worden gebruikt voor biometrische categorisering op basis van gevoelige of beschermde eigenschappen of kenmerken, of op basis van wat uit die eigenschappen of kenmerken wordt afgeleid?`"]
        E.4.node -- Ja --> E.almost.end.node
        E.4.node -- Nee --> E.5.node
        E.5.node["`Is je AI-systeem bedoeld om te worden gebruikt als biometrische systeem voor emotieherkenning?`"]
        E.5.node -- Ja --> E.almost.end.node
        E.5.node -- Nee --> E.6.node
        E.6.node["`Is je AI-systeem bedoeld om te worden gebruikt als veiligheidscomponent bij het beheer of de exploitatie van kritieke digitale infrastructuur, wegverkeer of bij de levering van water, gas, verwarming en elektriciteit?`"]
        E.6.node -- Ja --> E.almost.end.node
        E.6.node -- Nee --> E.7.node
        E.7.node["`Is je AI-systeem bedoeld om te worden gebruikt voor het bepalen van toegang of toelating tot of het toewijzen van natuurlijke personen aan instellingen voor onderwijs en beroepsonderwijs op alle niveaus?`"]
        E.7.node -- Ja --> E.almost.end.node
        E.7.node -- Nee --> E.8.node
        E.8.node["`Is je AI-systeem bedoeld om te worden gebruikt voor het evalueren van leerresultaten, ook wanneer die resultaten worden gebruikt voor het sturen van het leerproces van natuurlijke personen in instellingen voor onderwijs en beroepsonderwijs op alle niveaus?`"]
        E.8.node -- Ja --> E.almost.end.node
        E.8.node -- Nee --> E.9.node
        E.9.node["`Is je AI-systeem bedoeld om te worden gebruikt voor het beoordelen van het passende onderwijsniveau dat een persoon zal ontvangen of waartoe hij toegang zal hebben, in het kader van of binnen instellingen voor onderwijs en beroepsonderwijs op alle niveaus?`"]
        E.9.node -- Ja --> E.almost.end.node
        E.9.node -- Nee --> E.10.node
        E.10.node["`Is je AI-systeem bedoeld om te worden gebruikt voor het monitoren en detecteren van ongeoorloofd gedrag van studenten tijdens toetsen in de context van of binnen instellingen voor onderwijs en beroepsonderwijs op alle niveaus?`"]
        E.10.node -- Ja --> E.almost.end.node
        E.10.node -- Nee --> E.11.node
        E.11.node["`Is je AI-systeem bedoeld om te worden gebruikt voor het werven of selecteren van natuurlijke personen, met name voor het plaatsen van gerichte vacatures, het analyseren en filteren van sollicitaties, en het beoordelen van kandidaten?`"]
        E.11.node -- Ja --> E.almost.end.node
        E.11.node -- Nee --> E.12.node
        E.12.node["`Is je AI-systeem bedoeld om te worden gebruikt voor het nemen van besluiten die van invloed zijn op de voorwaarden van arbeidsgerelateerde betrekkingen, de bevordering of beëindiging van arbeidsgerelateerde contractuele betrekkingen, voor het toewijzen van taken op basis van individueel gedrag of persoonlijke eigenschappen of kenmerken, of voor het monitoren en evalueren van prestaties en gedrag van personen in dergelijke betrekkingen?`"]
        E.12.node -- Ja --> E.almost.end.node
        E.12.node -- Nee --> E.13.node
        E.13.node["`Is je AI-systeem bedoeld om te worden gebruikt om te beoordelen of natuurlijke personen in aanmerking komen voor essentiële overheidsuitkeringen en -diensten, waaronder gezondheidsdiensten, of om dergelijke uitkeringen en diensten te verlenen, te beperken, in te trekken of terug te vorderen?`"]
        E.13.node -- Ja --> E.almost.end.node
        E.13.node -- Nee --> E.14.node
        E.14.node["`Is je AI-systeem bedoeld om te worden gebruikt voor het beoordelen van de kredietwaardigheid van natuurlijke personen of voor het vaststellen van hun kredietscore, met uitzondering van AI-systemen die gebruikt worden om financiële fraude op te sporen?`"]
        E.14.node -- Ja --> E.almost.end.node
        E.14.node -- Nee --> E.15.node
        E.15.node["`Is je AI-systeem bedoeld om te worden gebruikt voor risicobeoordeling en prijsstelling met betrekking tot natuurlijke personen in het geval van levens- en ziektekostenverzekeringen?`"]
        E.15.node -- Ja --> E.almost.end.node
        E.15.node -- Nee --> E.16.node
        E.16.node["`Is je AI-systeem bedoeld om noodoproepen van natuurlijke personen te evalueren en te classificeren of om te worden gebruikt voor het inzetten of het bepalen van prioriteiten voor de inzet van hulpdiensten, onder meer van politie, brandweer en ambulance, alsook van systemen voor de triage van patiënten die dringend medische zorg behoeven?`"]
        E.16.node -- Ja --> E.almost.end.node
        E.16.node -- Nee --> E.17.node
        E.17.node["`Is je AI-systeem bedoeld om door of namens rechtshandhavingsinstanties, of door instellingen, organen of instanties van de Unie ter ondersteuning van rechtshandhavingsinstanties of namens hen, te worden gebruikt om het risico te beoordelen dat een natuurlijke persoon het slachtoffer wordt van strafbare feiten?`"]
        E.17.node -- Ja --> E.almost.end.node
        E.17.node -- Nee --> E.18.node
        E.18.node["`Is je AI-systeem bedoeld om door of namens rechtshandhavingsinstanties of door instellingen, organen of instanties van de Unie ter ondersteuning van rechtshandhavingsinstanties te worden gebruikt als leugendetector of soortgelijke instrumenten?`"]
        E.18.node -- Ja --> E.almost.end.node
        E.18.node -- Nee --> E.19.node
        E.19.node["`Is je AI-systeem bedoeld om door of namens rechtshandhavingsinstanties of door instellingen, organen of instanties van de Unie ter ondersteuning van rechtshandhavingsinstanties te worden gebruikt om de betrouwbaarheid van bewijsmateriaal tijdens het onderzoek naar of de vervolging van strafbare feiten te beoordelen?`"]
        E.19.node -- Ja --> E.almost.end.node
        E.19.node -- Nee --> E.20.node
        E.20.node["`Is je AI-systeem bedoeld om door of namens rechtshandhavingsinstanties of door instellingen, organen of instanties van de Unie ter ondersteuning van rechtshandhavingsinstanties te worden gebruikt om te beoordelen hoe groot het risico is dat een natuurlijke persoon (opnieuw) een strafbaar feit zal plegen, niet uitsluitend op basis van profilering van natuurlijke personen als bedoeld in artikel 3, punt 4, van Richtlijn (EU) 2016/680, of om persoonlijkheidskenmerken en eigenschappen of eerder crimineel gedrag van natuurlijke personen of groepen te beoordelen?`"]
        E.20.node -- Ja --> E.almost.end.node
        E.20.node -- Nee --> E.21.node
        E.21.node["`Is je AI-systeem bedoeld om door of namens rechtshandhavingsinstanties of door instellingen, organen en instanties van de Unie ter ondersteuning van rechtshandhavingsinstanties te worden gebruikt om natuurlijke personen te profileren als bedoeld in artikel 3, punt 4, van Richtlijn (EU) 2016/680, tijdens het opsporen, onderzoeken of vervolgen van strafbare feiten?`"]
        E.21.node -- Ja --> E.almost.end.node
        E.21.node -- Nee --> E.22.node
        E.22.node["`Is je AI-systeem bedoeld om door of namens bevoegde overheidsinstanties of door instellingen, organen of instanties van de Unie te worden gebruikt als leugendetector of soortgelijke hulpmiddelen?`"]
        E.22.node -- Ja --> E.almost.end.node
        E.22.node -- Nee --> E.23.node
        E.23.node["`Is je AI-systeem bedoeld om door of namens bevoegde overheidsinstanties of door instellingen, organen of instanties van de Unie te worden gebruikt om risico’s te beoordelen, waaronder een veiligheidsrisico, een risico op illegale migratie of een gezondheidsrisico, uitgaat van een natuurlijke persoon die voornemens is het grondgebied van een lidstaat te betreden of dat heeft gedaan?`"]
        E.23.node -- Ja --> E.almost.end.node
        E.23.node -- Nee --> E.24.node
        E.24.node["`Is je AI-systeem bedoeld om door of namens bevoegde overheidsinstanties  of door instellingen, organen of instanties van de Unie te worden gebruikt om bevoegde overheidsinstanties bij te staan bij de behandeling van aanvragen voor asiel, visa of verblijfsvergunningen en bij de behandeling van aanverwante klachten in verband met het al dan niet in aanmerking komen van de natuurlijke personen die een aanvraag voor een status indienen, met inbegrip van hieraan gerelateerde beoordelingen van de betrouwbaarheid van bewijsmateriaal?`"]
        E.24.node -- Ja --> E.almost.end.node
        E.24.node -- Nee --> E.25.node
        E.25.node["`Is je AI-systeem bedoeld om door of namens bevoegde overheidsinstanties, of door instellingen, organen of instanties van de Unie, te worden gebruikt in het kader van migratie-, asiel- of grenstoezichtsbeheer, met het oog op het opsporen, herkennen of identificeren van natuurlijke personen, met uitzondering van de verificatie van reisdocumenten?`"]
        E.25.node -- Ja --> E.almost.end.node
        E.25.node -- Nee --> E.26.node
        E.26.node["`Is je AI-systeem bedoeld om door of namens een gerechtelijke instantie te worden gebruikt om een gerechtelijke instantie te ondersteunen bij het onderzoeken en uitleggen van feiten of de wet en bij de toepassing van het recht op een concrete reeks feiten of om te worden gebruikt op soortgelijke wijze in het kader van alternatieve geschillenbeslechting?`"]
        E.26.node -- Ja --> E.almost.end.node
        E.26.node -- Nee --> E.27.node
        E.27.node["`Is je AI-systeem bedoeld voor het beïnvloeden van de uitslag van een verkiezing of referendum of van het stemgedrag van natuurlijke personen bij de uitoefening van hun stemrecht bij verkiezingen of referenda? Dit geldt niet voor AI-systemen aan de output waarvan natuurlijke personen niet rechtstreeks worden blootgesteld, zoals instrumenten die worden gebruikt om politieke campagnes te organiseren, te optimaliseren of te structureren vanuit administratief of logistiek oogpunt.`"]
        E.27.node -- Ja --> E.almost.end.node
        E.27.node -- Nee --> E.28.node
        E.28.node["`Je gebruikt geen hoog-risico systeem.`"]

        %% RK: Het lijkt me logischer deze allemaal hetzelfde te formuleren. Dus antwoord ja betekent dat er inderdaad sprake is van hoog risico. Antwoord nee betekent dat er mogelijk toch geen sprake is van hoog risico
        E.almost.end.node["`Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt.`"]
        E.almost.end.node --> E.almost.end.1.node
        E.almost.end.1.node["`Is het AI-systeem bedoeld om een beperkte procedurele taak uit te voeren en heeft het systeem een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen? *Deze vragen allemaal hetzelfde formuleren. Dus antwoord ja betekent dat er inderdaad sprake is van hoog risico. Antwoord nee betekent dat er mogelijk toch geen sprake is van hoog risico*`"]
        E.almost.end.1.node -- Ja --> E.end.node
        E.almost.end.1.node -- Nee --> E.almost.end.2.node
        E.almost.end.2.node["`Voert het AI-systeem profilering van natuurlijke personen uit? *Deze vragen allemaal hetzelfde formuleren. Dus antwoord ja betekent dat er inderdaad sprake is van hoog risico. Antwoord nee betekent dat er mogelijk toch geen sprake is van hoog risico*`"]
        E.almost.end.2.node -- Ja --> E.end.node
        E.almost.end.2.node -- Nee --> E.almost.end.3.node
        E.almost.end.3.node["`Is het AI-systeem bedoeld om het resultaat van een eerder voltooide menselijke activiteit te verbeteren en heeft het systeem een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen? *Deze vragen allemaal hetzelfde formuleren. Dus antwoord ja betekent dat er inderdaad sprake is van hoog risico. Antwoord nee betekent dat er mogelijk toch geen sprake is van hoog risico*`"]
        E.almost.end.3.node -- Ja --> E.end.node
        E.almost.end.3.node -- Nee --> E.almost.end.4.node
        E.almost.end.4.node["`Is het AI-systeem bedoeld om besluitvormingspatronen of afwijkingen van eerdere besluitvormingspatronen op te sporen en is niet bedoeld om de eerder voltooide menselijke beoordeling zonder behoorlijke menselijke toetsing te vervangen of te beïnvloeden? *Deze vragen allemaal hetzelfde formuleren. Dus antwoord ja betekent dat er inderdaad sprake is van hoog risico. Antwoord nee betekent dat er mogelijk toch geen sprake is van hoog risico*`"]
        E.almost.end.4.node -- Ja --> E.end.node
        E.almost.end.4.node -- Nee --> E.almost.end.5.node
        E.almost.end.5.node["`Is het AI-systeem bedoeld om een voorbereidende taak uit te voeren voor een beoordeling die relevant is voor de in bijlage III vermelde gebruiksgevallen? *Deze vragen allemaal hetzelfde formuleren. Dus antwoord ja betekent dat er inderdaad sprake is van hoog risico. Antwoord nee betekent dat er mogelijk toch geen sprake is van hoog risico*`"]
        E.almost.end.5.node -- Ja --> E.end.node
        E.almost.end.5.node -- Nee --> E.almost.end.6.node
        E.end.node["`Je AI-systeem wordt beschouwd als een hoog-risico AI-systeem. Het moet voldoen aan bepaalde vereisten.`"]
        E.almost.end.6.node["`Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is. *Dit vind ik een beetje vaag. Kunnen we dit duidelijker beschrijven?*`"]
    end
```


