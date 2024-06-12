---
title: AI Act Beslisboom
---

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
    C.1.node["`Gebruik je een algoritme met impact volgens categorie B van de Handreiking van het Algoritmergister? \n Dat wil zeggen: rechtsgevolgen voor burgers of classificatie van burgers of groepen?`"]
    C.1.node -- ja --> C.1.1.node
    C.1.node -- nee --> C.1.2.node
    C.1.1.node["`Valt je toepassing onder één van de uitzonderingsgronden categorie C of D van de handreiking?`"]
    C.1.2.node["`Je algoritme is niet impactvol en de AI Verordening is niet van toepassing. \n Houd je aan bestaande wet- en regelgeving (bijv. de AVG wanneer je persoonsgegevens gebruikt.)`"]
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
    D.8.node["`Zou je AI-systeem gebruik kunnen worden voor biometrische identificatie op afstand in real time in openbare ruimten met het oog op de rechtshandhaving? Dit geldt niet als het systeem strikt noodzakelijk is voor een van de volgende doelen: \n i. Gericht zoeken naar specifieke slachtoffers van ontvoering, mensenhandel of seksuele uitbuiting, evenals het zoeken naar vermiste personen.\n ii. Voorkomen van een specifieke, aanzienlijke en onmiddellijke dreiging voor het leven of de fysieke veiligheid van personen, of een reële en actuele of voorspelbare dreiging van een terroristische aanslag.\n iii. Lokalisatie of identificatie van een persoon die verdacht wordt van het plegen van een strafbaar feit, voor strafrechtelijk onderzoek of vervolging, met een maximale straf van ten minste vier jaar vrijheidsbeneming zoals vermeld in bijlage II van de betrokken lidstaat.`"]
    D.8.node -- Ja --> D.end.node
    D.8.node -- Nee --> ?
    D.end.node["`Deze type AI-systemen zijn in principe verboden volgens de AI-verordening. *Consequenties toevoegen!*`"]
    end
```


