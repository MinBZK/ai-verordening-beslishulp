---
title: AI Act Beslisboom
---
graph 
root_question["Waar heb je hulp bij nodig?"]
0.node["Ik wil een AI-systeem ontwikkelen"]
0.result["Het lijkt er op dat je een aanbieder van AI systemen bent volgens de AI verordening. We zullen nu proberen om vast te stellen of dit klopt."]
root_question ---> 0.node
0.node ---> 0.result
0.0.node["Ja, dat klopt"]
0.0.result["Dan ben je inderdaad een aanbieder volgens de AI verordening. Dan gaan we nu bepalen wat dit voor je betekent."]
0.result ---> 0.0.node
0.0.node ---> 0.0.result
0.0.0.node["Een systeem gebaseerd op machine learning, deep learning en/of NLP die geen Generatieve AI systeem is. Of een expert systeem of symbolisch systeem."]
0.0.0.result["We gaan bepalen of de AI-verordening van toepassing is op je AI-systeem"]
0.0.result ---> 0.0.0.node
0.0.0.node ---> 0.0.0.result
0.0.1.node["Ja"]
0.0.1.result["In dat geval is de AI-verordening niet van toepassing; maar zorg er wel voor dat de activiteiten worden uitgevoerd in overeenstemming met het toepasselijke Unierecht."]
0.0.result ---> 0.0.1.node
0.0.1.node ---> 0.0.1.result
0.0.1.node["Nee"]
0.0.1.result["Ga door naar de volgende vraag."]
0.0.result ---> 0.0.1.node
0.0.1.node ---> 0.0.1.result
0.0.2.node["Ja, dat klopt"]
0.0.2.result["In dat geval is de AI-verordening niet van toepassing, maar zorg er wel voor dat de activiteiten worden uitgevoerd in overeenstemming met het toepasselijke Unierecht. Bijvoorbeeld: als het AI systeem persoonsgegevens verwerkt, dan moet je nog steeds aan de AVG voldoen."]
0.0.result ---> 0.0.2.node
0.0.2.node ---> 0.0.2.result
0.0.2.node["Nee"]
0.0.2.result["Ga door naar de volgende vragen"]
0.0.result ---> 0.0.2.node
0.0.2.node ---> 0.0.2.result
0.0.3.node["Ja, dat klopt"]
0.0.3.result["In dat geval is de AI-verordening nog niet van toepassing, maar zorg er wel voor dat de activiteiten worden uitgevoerd in overeenstemming met het toepasselijke Unierecht. Bijvoorbeeld: als het AI systeem persoonsgegevens verwerkt, dan moet je nog steeds aan de AVG voldoen."]
0.0.result ---> 0.0.3.node
0.0.3.node ---> 0.0.3.result
0.0.3.node["Nee"]
0.0.3.result["Ga door naar de volgende vragen"]
0.0.result ---> 0.0.3.node
0.0.3.node ---> 0.0.3.result
0.0.4.node["Ja, dat klopt"]
0.0.4.result["In dat geval is de AI-verordening niet van toepassing, tenzij je AI-systeem op de markt wordt gebracht of in gebruik wordt gesteld als een AI-systeem met een hoog risico, of als een systeem die verboden is volgens artikel 5 van de AI-verordening of een systeem die moet voldoen aan de transparantievereisten van artikel 50. Ga naar de volgende vraag om hier achter te komen. -------------------LINK naar 1a1a14--------------------"]
0.0.result ---> 0.0.4.node
0.0.4.node ---> 0.0.4.result
0.0.4.node["Nee"]
0.0.4.result["Ga door naar de volgende vragen.We gaan bepalen of je AI-systeem valt onder de veboden systemen van artikel 5 van de AI-verordening."]
0.0.result ---> 0.0.4.node
0.0.4.node ---> 0.0.4.result
0.0.5.node["Ja"]
0.0.5.result["Deze type AI-systemen zijn in principe verboden volgens de AI-verordening. We adviseren om contact te maken met....om dit verder te bekijken ..."]
0.0.result ---> 0.0.5.node
0.0.5.node ---> 0.0.5.result
0.0.5.node["Nee"]
0.0.5.result["Ga door naar de volgende vraag."]
0.0.result ---> 0.0.5.node
0.0.5.node ---> 0.0.5.result
0.0.6.node["Ja"]
0.0.6.result["Deze type AI-systemen zijn in principe verboden volgens de AI-verordening. We adviseren om contact te maken met....om dit verder te bekijken ..."]
0.0.result ---> 0.0.6.node
0.0.6.node ---> 0.0.6.result
0.0.6.node["Nee"]
0.0.6.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.6.node
0.0.6.node ---> 0.0.6.result
0.0.7.node["Ja"]
0.0.7.result["Deze type AI-systemen zijn in principe verboden volgens de AI-verordening. We adviseren om contact te maken met....om dit verder te bekijken ..."]
0.0.result ---> 0.0.7.node
0.0.7.node ---> 0.0.7.result
0.0.7.node["Nee"]
0.0.7.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.7.node
0.0.7.node ---> 0.0.7.result
0.0.8.node["Ja"]
0.0.8.result["Deze type AI-systemen zijn in principe verboden volgens de AI-verordening. We adviseren om contact te maken met....om dit verder te bekijken ..."]
0.0.result ---> 0.0.8.node
0.0.8.node ---> 0.0.8.result
0.0.8.node["Nee"]
0.0.8.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.8.node
0.0.8.node ---> 0.0.8.result
0.0.9.node["Ja"]
0.0.9.result["Deze type AI-systemen zijn in principe verboden volgens de AI-verordening. We adviseren om contact te maken met....om dit verder te bekijken ..."]
0.0.result ---> 0.0.9.node
0.0.9.node ---> 0.0.9.result
0.0.9.node["Nee"]
0.0.9.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.9.node
0.0.9.node ---> 0.0.9.result
0.0.10.node["Ja"]
0.0.10.result["Deze type AI-systemen zijn in principe verboden volgens de AI-verordening. We adviseren om contact te maken met....om dit verder te bekijken ..."]
0.0.result ---> 0.0.10.node
0.0.10.node ---> 0.0.10.result
0.0.10.node["Nee"]
0.0.10.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.10.node
0.0.10.node ---> 0.0.10.result
0.0.11.node["Ja"]
0.0.11.result["Deze type AI-systemen zijn in principe verboden volgens de AI-verordening. We adviseren om contact te maken met....om dit verder te bekijken ..."]
0.0.result ---> 0.0.11.node
0.0.11.node ---> 0.0.11.result
0.0.11.node["Nee"]
0.0.11.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.11.node
0.0.11.node ---> 0.0.11.result
0.0.12.node["Ja"]
0.0.12.result["Deze type AI-systemen zijn in principe verboden volgens de AI-verordening. We adviseren om contact te maken met....om dit verder te bekijken ..."]
0.0.result ---> 0.0.12.node
0.0.12.node ---> 0.0.12.result
0.0.12.node["Nee"]
0.0.12.result["Het lijkt er op dat je AI-systeem geen verboden systeem is. We gaan nu bepalen of het systeem valt onder de hoog-risico categorisatie van de AI-verordening."]
0.0.result ---> 0.0.12.node
0.0.12.node ---> 0.0.12.result
0.0.13.node["Ja"]
0.0.13.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem en moet voldoen aan bepaalde vereisten."]
0.0.result ---> 0.0.13.node
0.0.13.node ---> 0.0.13.result
0.0.13.node["Nee"]
0.0.13.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.13.node
0.0.13.node ---> 0.0.13.result
0.0.14.node["Ja"]
0.0.14.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem en moet voldoen aan bepaalde vereisten. Ga verder om de vereisten te zien."]
0.0.result ---> 0.0.14.node
0.0.14.node ---> 0.0.14.result
0.0.14.node["Nee"]
0.0.14.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.14.node
0.0.14.node ---> 0.0.14.result
0.0.15.node["Ja"]
0.0.15.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de volgende vragen."]
0.0.result ---> 0.0.15.node
0.0.15.node ---> 0.0.15.result
0.0.15.0.node["Ja"]
0.0.15.0.result["Ga dan door naar de volgende vraag"]
0.0.15.result ---> 0.0.15.0.node
0.0.15.0.node ---> 0.0.15.0.result
0.0.15.0.node["Nee"]
0.0.15.0.result["Ga dan door naar de volgende vraag."]
0.0.15.result ---> 0.0.15.0.node
0.0.15.0.node ---> 0.0.15.0.result
0.0.15.1.node["Nee"]
0.0.15.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.15.result ---> 0.0.15.1.node
0.0.15.1.node ---> 0.0.15.1.result
0.0.15.1.node["Ja"]
0.0.15.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.15.result ---> 0.0.15.1.node
0.0.15.1.node ---> 0.0.15.1.result
0.0.15.2.node["Ja"]
0.0.15.2.result["Ga dan door naar de volgende vraag"]
0.0.15.result ---> 0.0.15.2.node
0.0.15.2.node ---> 0.0.15.2.result
0.0.15.2.node["Nee"]
0.0.15.2.result["Ga dan door naar de volgende vraag."]
0.0.15.result ---> 0.0.15.2.node
0.0.15.2.node ---> 0.0.15.2.result
0.0.15.3.node["Nee"]
0.0.15.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.15.result ---> 0.0.15.3.node
0.0.15.3.node ---> 0.0.15.3.result
0.0.15.3.node["Ja"]
0.0.15.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.15.result ---> 0.0.15.3.node
0.0.15.3.node ---> 0.0.15.3.result
0.0.15.4.node["Ja"]
0.0.15.4.result["Ga dan door naar de volgende vraag"]
0.0.15.result ---> 0.0.15.4.node
0.0.15.4.node ---> 0.0.15.4.result
0.0.15.4.node["Nee"]
0.0.15.4.result["Ga dan door naar de volgende vraag."]
0.0.15.result ---> 0.0.15.4.node
0.0.15.4.node ---> 0.0.15.4.result
0.0.15.5.node["Nee"]
0.0.15.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.15.result ---> 0.0.15.5.node
0.0.15.5.node ---> 0.0.15.5.result
0.0.15.5.node["Ja"]
0.0.15.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.15.result ---> 0.0.15.5.node
0.0.15.5.node ---> 0.0.15.5.result
0.0.15.6.node["Ja"]
0.0.15.6.result["Ga dan door naar de volgende vraag"]
0.0.15.result ---> 0.0.15.6.node
0.0.15.6.node ---> 0.0.15.6.result
0.0.15.6.node["Nee"]
0.0.15.6.result["Ga dan door naar de volgende vraag."]
0.0.15.result ---> 0.0.15.6.node
0.0.15.6.node ---> 0.0.15.6.result
0.0.15.7.node["Nee"]
0.0.15.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.15.result ---> 0.0.15.7.node
0.0.15.7.node ---> 0.0.15.7.result
0.0.15.7.node["Ja"]
0.0.15.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.15.result ---> 0.0.15.7.node
0.0.15.7.node ---> 0.0.15.7.result
0.0.15.node["Nee"]
0.0.15.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.15.node
0.0.15.node ---> 0.0.15.result
0.0.16.node["Ja"]
0.0.16.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.16.node
0.0.16.node ---> 0.0.16.result
0.0.16.0.node["Ja"]
0.0.16.0.result["Ga dan door naar de volgende vraag"]
0.0.16.result ---> 0.0.16.0.node
0.0.16.0.node ---> 0.0.16.0.result
0.0.16.0.node["Nee"]
0.0.16.0.result["Ga dan door naar de volgende vraag."]
0.0.16.result ---> 0.0.16.0.node
0.0.16.0.node ---> 0.0.16.0.result
0.0.16.1.node["Nee"]
0.0.16.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.16.result ---> 0.0.16.1.node
0.0.16.1.node ---> 0.0.16.1.result
0.0.16.1.node["Ja"]
0.0.16.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.16.result ---> 0.0.16.1.node
0.0.16.1.node ---> 0.0.16.1.result
0.0.16.2.node["Ja"]
0.0.16.2.result["Ga dan door naar de volgende vraag"]
0.0.16.result ---> 0.0.16.2.node
0.0.16.2.node ---> 0.0.16.2.result
0.0.16.2.node["Nee"]
0.0.16.2.result["Ga dan door naar de volgende vraag."]
0.0.16.result ---> 0.0.16.2.node
0.0.16.2.node ---> 0.0.16.2.result
0.0.16.3.node["Nee"]
0.0.16.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.16.result ---> 0.0.16.3.node
0.0.16.3.node ---> 0.0.16.3.result
0.0.16.3.node["Ja"]
0.0.16.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.16.result ---> 0.0.16.3.node
0.0.16.3.node ---> 0.0.16.3.result
0.0.16.4.node["Ja"]
0.0.16.4.result["Ga dan door naar de volgende vraag"]
0.0.16.result ---> 0.0.16.4.node
0.0.16.4.node ---> 0.0.16.4.result
0.0.16.4.node["Nee"]
0.0.16.4.result["Ga dan door naar de volgende vraag."]
0.0.16.result ---> 0.0.16.4.node
0.0.16.4.node ---> 0.0.16.4.result
0.0.16.5.node["Nee"]
0.0.16.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.16.result ---> 0.0.16.5.node
0.0.16.5.node ---> 0.0.16.5.result
0.0.16.5.node["Ja"]
0.0.16.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.16.result ---> 0.0.16.5.node
0.0.16.5.node ---> 0.0.16.5.result
0.0.16.6.node["Ja"]
0.0.16.6.result["Ga dan door naar de volgende vraag"]
0.0.16.result ---> 0.0.16.6.node
0.0.16.6.node ---> 0.0.16.6.result
0.0.16.6.node["Nee"]
0.0.16.6.result["Ga dan door naar de volgende vraag."]
0.0.16.result ---> 0.0.16.6.node
0.0.16.6.node ---> 0.0.16.6.result
0.0.16.7.node["Nee"]
0.0.16.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.16.result ---> 0.0.16.7.node
0.0.16.7.node ---> 0.0.16.7.result
0.0.16.7.node["Ja"]
0.0.16.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.16.result ---> 0.0.16.7.node
0.0.16.7.node ---> 0.0.16.7.result
0.0.16.node["Nee"]
0.0.16.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.16.node
0.0.16.node ---> 0.0.16.result
0.0.17.node["Ja"]
0.0.17.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.17.node
0.0.17.node ---> 0.0.17.result
0.0.17.0.node["Ja"]
0.0.17.0.result["Ga dan door naar de volgende vraag"]
0.0.17.result ---> 0.0.17.0.node
0.0.17.0.node ---> 0.0.17.0.result
0.0.17.0.node["Nee"]
0.0.17.0.result["Ga dan door naar de volgende vraag."]
0.0.17.result ---> 0.0.17.0.node
0.0.17.0.node ---> 0.0.17.0.result
0.0.17.1.node["Nee"]
0.0.17.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.17.result ---> 0.0.17.1.node
0.0.17.1.node ---> 0.0.17.1.result
0.0.17.1.node["Ja"]
0.0.17.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.17.result ---> 0.0.17.1.node
0.0.17.1.node ---> 0.0.17.1.result
0.0.17.2.node["Ja"]
0.0.17.2.result["Ga dan door naar de volgende vraag"]
0.0.17.result ---> 0.0.17.2.node
0.0.17.2.node ---> 0.0.17.2.result
0.0.17.2.node["Nee"]
0.0.17.2.result["Ga dan door naar de volgende vraag."]
0.0.17.result ---> 0.0.17.2.node
0.0.17.2.node ---> 0.0.17.2.result
0.0.17.3.node["Nee"]
0.0.17.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.17.result ---> 0.0.17.3.node
0.0.17.3.node ---> 0.0.17.3.result
0.0.17.3.node["Ja"]
0.0.17.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.17.result ---> 0.0.17.3.node
0.0.17.3.node ---> 0.0.17.3.result
0.0.17.4.node["Ja"]
0.0.17.4.result["Ga dan door naar de volgende vraag"]
0.0.17.result ---> 0.0.17.4.node
0.0.17.4.node ---> 0.0.17.4.result
0.0.17.4.node["Nee"]
0.0.17.4.result["Ga dan door naar de volgende vraag."]
0.0.17.result ---> 0.0.17.4.node
0.0.17.4.node ---> 0.0.17.4.result
0.0.17.5.node["Nee"]
0.0.17.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.17.result ---> 0.0.17.5.node
0.0.17.5.node ---> 0.0.17.5.result
0.0.17.5.node["Ja"]
0.0.17.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.17.result ---> 0.0.17.5.node
0.0.17.5.node ---> 0.0.17.5.result
0.0.17.6.node["Ja"]
0.0.17.6.result["Ga dan door naar de volgende vraag"]
0.0.17.result ---> 0.0.17.6.node
0.0.17.6.node ---> 0.0.17.6.result
0.0.17.6.node["Nee"]
0.0.17.6.result["Ga dan door naar de volgende vraag."]
0.0.17.result ---> 0.0.17.6.node
0.0.17.6.node ---> 0.0.17.6.result
0.0.17.7.node["Nee"]
0.0.17.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.17.result ---> 0.0.17.7.node
0.0.17.7.node ---> 0.0.17.7.result
0.0.17.7.node["Ja"]
0.0.17.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.17.result ---> 0.0.17.7.node
0.0.17.7.node ---> 0.0.17.7.result
0.0.17.node["Nee"]
0.0.17.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.17.node
0.0.17.node ---> 0.0.17.result
0.0.18.node["Ja"]
0.0.18.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.18.node
0.0.18.node ---> 0.0.18.result
0.0.18.0.node["Ja"]
0.0.18.0.result["Ga dan door naar de volgende vraag"]
0.0.18.result ---> 0.0.18.0.node
0.0.18.0.node ---> 0.0.18.0.result
0.0.18.0.node["Nee"]
0.0.18.0.result["Ga dan door naar de volgende vraag."]
0.0.18.result ---> 0.0.18.0.node
0.0.18.0.node ---> 0.0.18.0.result
0.0.18.1.node["Nee"]
0.0.18.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.18.result ---> 0.0.18.1.node
0.0.18.1.node ---> 0.0.18.1.result
0.0.18.1.node["Ja"]
0.0.18.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.18.result ---> 0.0.18.1.node
0.0.18.1.node ---> 0.0.18.1.result
0.0.18.2.node["Ja"]
0.0.18.2.result["Ga dan door naar de volgende vraag"]
0.0.18.result ---> 0.0.18.2.node
0.0.18.2.node ---> 0.0.18.2.result
0.0.18.2.node["Nee"]
0.0.18.2.result["Ga dan door naar de volgende vraag."]
0.0.18.result ---> 0.0.18.2.node
0.0.18.2.node ---> 0.0.18.2.result
0.0.18.3.node["Nee"]
0.0.18.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.18.result ---> 0.0.18.3.node
0.0.18.3.node ---> 0.0.18.3.result
0.0.18.3.node["Ja"]
0.0.18.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.18.result ---> 0.0.18.3.node
0.0.18.3.node ---> 0.0.18.3.result
0.0.18.4.node["Ja"]
0.0.18.4.result["Ga dan door naar de volgende vraag"]
0.0.18.result ---> 0.0.18.4.node
0.0.18.4.node ---> 0.0.18.4.result
0.0.18.4.node["Nee"]
0.0.18.4.result["Ga dan door naar de volgende vraag."]
0.0.18.result ---> 0.0.18.4.node
0.0.18.4.node ---> 0.0.18.4.result
0.0.18.5.node["Nee"]
0.0.18.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.18.result ---> 0.0.18.5.node
0.0.18.5.node ---> 0.0.18.5.result
0.0.18.5.node["Ja"]
0.0.18.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.18.result ---> 0.0.18.5.node
0.0.18.5.node ---> 0.0.18.5.result
0.0.18.6.node["Ja"]
0.0.18.6.result["Ga dan door naar de volgende vraag"]
0.0.18.result ---> 0.0.18.6.node
0.0.18.6.node ---> 0.0.18.6.result
0.0.18.6.node["Nee"]
0.0.18.6.result["Ga dan door naar de volgende vraag."]
0.0.18.result ---> 0.0.18.6.node
0.0.18.6.node ---> 0.0.18.6.result
0.0.18.7.node["Nee"]
0.0.18.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.18.result ---> 0.0.18.7.node
0.0.18.7.node ---> 0.0.18.7.result
0.0.18.7.node["Ja"]
0.0.18.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.18.result ---> 0.0.18.7.node
0.0.18.7.node ---> 0.0.18.7.result
0.0.18.node["Nee"]
0.0.18.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.18.node
0.0.18.node ---> 0.0.18.result
0.0.19.node["Ja"]
0.0.19.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.19.node
0.0.19.node ---> 0.0.19.result
0.0.19.0.node["Ja"]
0.0.19.0.result["Ga dan door naar de volgende vraag"]
0.0.19.result ---> 0.0.19.0.node
0.0.19.0.node ---> 0.0.19.0.result
0.0.19.0.node["Nee"]
0.0.19.0.result["Ga dan door naar de volgende vraag."]
0.0.19.result ---> 0.0.19.0.node
0.0.19.0.node ---> 0.0.19.0.result
0.0.19.1.node["Nee"]
0.0.19.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.19.result ---> 0.0.19.1.node
0.0.19.1.node ---> 0.0.19.1.result
0.0.19.1.node["Ja"]
0.0.19.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.19.result ---> 0.0.19.1.node
0.0.19.1.node ---> 0.0.19.1.result
0.0.19.2.node["Ja"]
0.0.19.2.result["Ga dan door naar de volgende vraag"]
0.0.19.result ---> 0.0.19.2.node
0.0.19.2.node ---> 0.0.19.2.result
0.0.19.2.node["Nee"]
0.0.19.2.result["Ga dan door naar de volgende vraag."]
0.0.19.result ---> 0.0.19.2.node
0.0.19.2.node ---> 0.0.19.2.result
0.0.19.3.node["Nee"]
0.0.19.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.19.result ---> 0.0.19.3.node
0.0.19.3.node ---> 0.0.19.3.result
0.0.19.3.node["Ja"]
0.0.19.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.19.result ---> 0.0.19.3.node
0.0.19.3.node ---> 0.0.19.3.result
0.0.19.4.node["Ja"]
0.0.19.4.result["Ga dan door naar de volgende vraag"]
0.0.19.result ---> 0.0.19.4.node
0.0.19.4.node ---> 0.0.19.4.result
0.0.19.4.node["Nee"]
0.0.19.4.result["Ga dan door naar de volgende vraag."]
0.0.19.result ---> 0.0.19.4.node
0.0.19.4.node ---> 0.0.19.4.result
0.0.19.5.node["Nee"]
0.0.19.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.19.result ---> 0.0.19.5.node
0.0.19.5.node ---> 0.0.19.5.result
0.0.19.5.node["Ja"]
0.0.19.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.19.result ---> 0.0.19.5.node
0.0.19.5.node ---> 0.0.19.5.result
0.0.19.6.node["Ja"]
0.0.19.6.result["Ga dan door naar de volgende vraag"]
0.0.19.result ---> 0.0.19.6.node
0.0.19.6.node ---> 0.0.19.6.result
0.0.19.6.node["Nee"]
0.0.19.6.result["Ga dan door naar de volgende vraag."]
0.0.19.result ---> 0.0.19.6.node
0.0.19.6.node ---> 0.0.19.6.result
0.0.19.7.node["Nee"]
0.0.19.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.19.result ---> 0.0.19.7.node
0.0.19.7.node ---> 0.0.19.7.result
0.0.19.7.node["Ja"]
0.0.19.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.19.result ---> 0.0.19.7.node
0.0.19.7.node ---> 0.0.19.7.result
0.0.19.node["Nee"]
0.0.19.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.19.node
0.0.19.node ---> 0.0.19.result
0.0.20.node["Ja"]
0.0.20.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.20.node
0.0.20.node ---> 0.0.20.result
0.0.20.0.node["Ja"]
0.0.20.0.result["Ga dan door naar de volgende vraag"]
0.0.20.result ---> 0.0.20.0.node
0.0.20.0.node ---> 0.0.20.0.result
0.0.20.0.node["Nee"]
0.0.20.0.result["Ga dan door naar de volgende vraag."]
0.0.20.result ---> 0.0.20.0.node
0.0.20.0.node ---> 0.0.20.0.result
0.0.20.1.node["Nee"]
0.0.20.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.20.result ---> 0.0.20.1.node
0.0.20.1.node ---> 0.0.20.1.result
0.0.20.1.node["Ja"]
0.0.20.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.20.result ---> 0.0.20.1.node
0.0.20.1.node ---> 0.0.20.1.result
0.0.20.2.node["Ja"]
0.0.20.2.result["Ga dan door naar de volgende vraag"]
0.0.20.result ---> 0.0.20.2.node
0.0.20.2.node ---> 0.0.20.2.result
0.0.20.2.node["Nee"]
0.0.20.2.result["Ga dan door naar de volgende vraag."]
0.0.20.result ---> 0.0.20.2.node
0.0.20.2.node ---> 0.0.20.2.result
0.0.20.3.node["Nee"]
0.0.20.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.20.result ---> 0.0.20.3.node
0.0.20.3.node ---> 0.0.20.3.result
0.0.20.3.node["Ja"]
0.0.20.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.20.result ---> 0.0.20.3.node
0.0.20.3.node ---> 0.0.20.3.result
0.0.20.4.node["Ja"]
0.0.20.4.result["Ga dan door naar de volgende vraag"]
0.0.20.result ---> 0.0.20.4.node
0.0.20.4.node ---> 0.0.20.4.result
0.0.20.4.node["Nee"]
0.0.20.4.result["Ga dan door naar de volgende vraag."]
0.0.20.result ---> 0.0.20.4.node
0.0.20.4.node ---> 0.0.20.4.result
0.0.20.5.node["Nee"]
0.0.20.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.20.result ---> 0.0.20.5.node
0.0.20.5.node ---> 0.0.20.5.result
0.0.20.5.node["Ja"]
0.0.20.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.20.result ---> 0.0.20.5.node
0.0.20.5.node ---> 0.0.20.5.result
0.0.20.6.node["Ja"]
0.0.20.6.result["Ga dan door naar de volgende vraag"]
0.0.20.result ---> 0.0.20.6.node
0.0.20.6.node ---> 0.0.20.6.result
0.0.20.6.node["Nee"]
0.0.20.6.result["Ga dan door naar de volgende vraag."]
0.0.20.result ---> 0.0.20.6.node
0.0.20.6.node ---> 0.0.20.6.result
0.0.20.7.node["Nee"]
0.0.20.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.20.result ---> 0.0.20.7.node
0.0.20.7.node ---> 0.0.20.7.result
0.0.20.7.node["Ja"]
0.0.20.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.20.result ---> 0.0.20.7.node
0.0.20.7.node ---> 0.0.20.7.result
0.0.20.node["Nee"]
0.0.20.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.20.node
0.0.20.node ---> 0.0.20.result
0.0.21.node["Ja"]
0.0.21.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.21.node
0.0.21.node ---> 0.0.21.result
0.0.21.0.node["1a"]
0.0.21.0.result["Ga dan door naar de volgende vraag"]
0.0.21.result ---> 0.0.21.0.node
0.0.21.0.node ---> 0.0.21.0.result
0.0.21.0.node["Nee"]
0.0.21.0.result["Ga dan door naar de volgende vraag."]
0.0.21.result ---> 0.0.21.0.node
0.0.21.0.node ---> 0.0.21.0.result
0.0.21.1.node["Nee"]
0.0.21.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.21.result ---> 0.0.21.1.node
0.0.21.1.node ---> 0.0.21.1.result
0.0.21.1.node["Ja"]
0.0.21.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.21.result ---> 0.0.21.1.node
0.0.21.1.node ---> 0.0.21.1.result
0.0.21.2.node["Ja"]
0.0.21.2.result["Ga dan door naar de volgende vraag"]
0.0.21.result ---> 0.0.21.2.node
0.0.21.2.node ---> 0.0.21.2.result
0.0.21.2.node["Nee"]
0.0.21.2.result["Ga dan door naar de volgende vraag."]
0.0.21.result ---> 0.0.21.2.node
0.0.21.2.node ---> 0.0.21.2.result
0.0.21.3.node["Nee"]
0.0.21.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.21.result ---> 0.0.21.3.node
0.0.21.3.node ---> 0.0.21.3.result
0.0.21.3.node["Ja"]
0.0.21.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.21.result ---> 0.0.21.3.node
0.0.21.3.node ---> 0.0.21.3.result
0.0.21.4.node["Ja"]
0.0.21.4.result["Ga dan door naar de volgende vraag"]
0.0.21.result ---> 0.0.21.4.node
0.0.21.4.node ---> 0.0.21.4.result
0.0.21.4.node["Nee"]
0.0.21.4.result["Ga dan door naar de volgende vraag."]
0.0.21.result ---> 0.0.21.4.node
0.0.21.4.node ---> 0.0.21.4.result
0.0.21.5.node["Nee"]
0.0.21.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.21.result ---> 0.0.21.5.node
0.0.21.5.node ---> 0.0.21.5.result
0.0.21.5.node["Ja"]
0.0.21.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.21.result ---> 0.0.21.5.node
0.0.21.5.node ---> 0.0.21.5.result
0.0.21.6.node["Ja"]
0.0.21.6.result["Ga dan door naar de volgende vraag"]
0.0.21.result ---> 0.0.21.6.node
0.0.21.6.node ---> 0.0.21.6.result
0.0.21.6.node["Nee"]
0.0.21.6.result["Ga dan door naar de volgende vraag."]
0.0.21.result ---> 0.0.21.6.node
0.0.21.6.node ---> 0.0.21.6.result
0.0.21.7.node["Nee"]
0.0.21.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.21.result ---> 0.0.21.7.node
0.0.21.7.node ---> 0.0.21.7.result
0.0.21.7.node["Ja"]
0.0.21.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.21.result ---> 0.0.21.7.node
0.0.21.7.node ---> 0.0.21.7.result
0.0.21.node["Nee"]
0.0.21.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.21.node
0.0.21.node ---> 0.0.21.result
0.0.22.node["Ja"]
0.0.22.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.22.node
0.0.22.node ---> 0.0.22.result
0.0.22.0.node["Ja"]
0.0.22.0.result["Ga dan door naar de volgende vraag"]
0.0.22.result ---> 0.0.22.0.node
0.0.22.0.node ---> 0.0.22.0.result
0.0.22.0.node["Nee"]
0.0.22.0.result["Ga dan door naar de volgende vraag."]
0.0.22.result ---> 0.0.22.0.node
0.0.22.0.node ---> 0.0.22.0.result
0.0.22.1.node["Nee"]
0.0.22.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.22.result ---> 0.0.22.1.node
0.0.22.1.node ---> 0.0.22.1.result
0.0.22.1.node["Ja"]
0.0.22.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.22.result ---> 0.0.22.1.node
0.0.22.1.node ---> 0.0.22.1.result
0.0.22.2.node["Ja"]
0.0.22.2.result["Ga dan door naar de volgende vraag"]
0.0.22.result ---> 0.0.22.2.node
0.0.22.2.node ---> 0.0.22.2.result
0.0.22.2.node["Nee"]
0.0.22.2.result["Ga dan door naar de volgende vraag."]
0.0.22.result ---> 0.0.22.2.node
0.0.22.2.node ---> 0.0.22.2.result
0.0.22.3.node["Nee"]
0.0.22.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.22.result ---> 0.0.22.3.node
0.0.22.3.node ---> 0.0.22.3.result
0.0.22.3.node["Ja"]
0.0.22.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.22.result ---> 0.0.22.3.node
0.0.22.3.node ---> 0.0.22.3.result
0.0.22.4.node["Ja"]
0.0.22.4.result["Ga dan door naar de volgende vraag"]
0.0.22.result ---> 0.0.22.4.node
0.0.22.4.node ---> 0.0.22.4.result
0.0.22.4.node["Nee"]
0.0.22.4.result["Ga dan door naar de volgende vraag."]
0.0.22.result ---> 0.0.22.4.node
0.0.22.4.node ---> 0.0.22.4.result
0.0.22.5.node["Nee"]
0.0.22.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.22.result ---> 0.0.22.5.node
0.0.22.5.node ---> 0.0.22.5.result
0.0.22.5.node["Ja"]
0.0.22.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.22.result ---> 0.0.22.5.node
0.0.22.5.node ---> 0.0.22.5.result
0.0.22.6.node["Ja"]
0.0.22.6.result["Ga dan door naar de volgende vraag"]
0.0.22.result ---> 0.0.22.6.node
0.0.22.6.node ---> 0.0.22.6.result
0.0.22.6.node["Nee"]
0.0.22.6.result["Ga dan door naar de volgende vraag."]
0.0.22.result ---> 0.0.22.6.node
0.0.22.6.node ---> 0.0.22.6.result
0.0.22.7.node["Nee"]
0.0.22.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.22.result ---> 0.0.22.7.node
0.0.22.7.node ---> 0.0.22.7.result
0.0.22.7.node["Ja"]
0.0.22.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.22.result ---> 0.0.22.7.node
0.0.22.7.node ---> 0.0.22.7.result
0.0.22.node["Nee"]
0.0.22.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.22.node
0.0.22.node ---> 0.0.22.result
0.0.23.node["Ja"]
0.0.23.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.23.node
0.0.23.node ---> 0.0.23.result
0.0.23.0.node["Ja"]
0.0.23.0.result["Ga dan door naar de volgende vraag"]
0.0.23.result ---> 0.0.23.0.node
0.0.23.0.node ---> 0.0.23.0.result
0.0.23.0.node["Nee"]
0.0.23.0.result["Ga dan door naar de volgende vraag."]
0.0.23.result ---> 0.0.23.0.node
0.0.23.0.node ---> 0.0.23.0.result
0.0.23.1.node["Nee"]
0.0.23.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.23.result ---> 0.0.23.1.node
0.0.23.1.node ---> 0.0.23.1.result
0.0.23.1.node["Ja"]
0.0.23.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.23.result ---> 0.0.23.1.node
0.0.23.1.node ---> 0.0.23.1.result
0.0.23.2.node["Ja"]
0.0.23.2.result["Ga dan door naar de volgende vraag"]
0.0.23.result ---> 0.0.23.2.node
0.0.23.2.node ---> 0.0.23.2.result
0.0.23.2.node["Nee"]
0.0.23.2.result["Ga dan door naar de volgende vraag."]
0.0.23.result ---> 0.0.23.2.node
0.0.23.2.node ---> 0.0.23.2.result
0.0.23.3.node["Nee"]
0.0.23.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.23.result ---> 0.0.23.3.node
0.0.23.3.node ---> 0.0.23.3.result
0.0.23.3.node["Ja"]
0.0.23.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.23.result ---> 0.0.23.3.node
0.0.23.3.node ---> 0.0.23.3.result
0.0.23.4.node["Ja"]
0.0.23.4.result["Ga dan door naar de volgende vraag"]
0.0.23.result ---> 0.0.23.4.node
0.0.23.4.node ---> 0.0.23.4.result
0.0.23.4.node["Nee"]
0.0.23.4.result["Ga dan door naar de volgende vraag."]
0.0.23.result ---> 0.0.23.4.node
0.0.23.4.node ---> 0.0.23.4.result
0.0.23.5.node["Nee"]
0.0.23.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.23.result ---> 0.0.23.5.node
0.0.23.5.node ---> 0.0.23.5.result
0.0.23.5.node["Ja"]
0.0.23.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.23.result ---> 0.0.23.5.node
0.0.23.5.node ---> 0.0.23.5.result
0.0.23.6.node["Ja"]
0.0.23.6.result["Ga dan door naar de volgende vraag"]
0.0.23.result ---> 0.0.23.6.node
0.0.23.6.node ---> 0.0.23.6.result
0.0.23.6.node["Nee"]
0.0.23.6.result["Ga dan door naar de volgende vraag."]
0.0.23.result ---> 0.0.23.6.node
0.0.23.6.node ---> 0.0.23.6.result
0.0.23.7.node["Nee"]
0.0.23.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.23.result ---> 0.0.23.7.node
0.0.23.7.node ---> 0.0.23.7.result
0.0.23.7.node["Ja"]
0.0.23.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.23.result ---> 0.0.23.7.node
0.0.23.7.node ---> 0.0.23.7.result
0.0.23.node["Nee"]
0.0.23.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.23.node
0.0.23.node ---> 0.0.23.result
0.0.24.node["Ja"]
0.0.24.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.24.node
0.0.24.node ---> 0.0.24.result
0.0.24.0.node["Ja"]
0.0.24.0.result["Ga dan door naar de volgende vraag"]
0.0.24.result ---> 0.0.24.0.node
0.0.24.0.node ---> 0.0.24.0.result
0.0.24.0.node["Nee"]
0.0.24.0.result["Ga dan door naar de volgende vraag."]
0.0.24.result ---> 0.0.24.0.node
0.0.24.0.node ---> 0.0.24.0.result
0.0.24.1.node["Nee"]
0.0.24.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.24.result ---> 0.0.24.1.node
0.0.24.1.node ---> 0.0.24.1.result
0.0.24.1.node["Ja"]
0.0.24.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.24.result ---> 0.0.24.1.node
0.0.24.1.node ---> 0.0.24.1.result
0.0.24.2.node["Ja"]
0.0.24.2.result["Ga dan door naar de volgende vraag"]
0.0.24.result ---> 0.0.24.2.node
0.0.24.2.node ---> 0.0.24.2.result
0.0.24.2.node["Nee"]
0.0.24.2.result["Ga dan door naar de volgende vraag."]
0.0.24.result ---> 0.0.24.2.node
0.0.24.2.node ---> 0.0.24.2.result
0.0.24.3.node["Nee"]
0.0.24.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.24.result ---> 0.0.24.3.node
0.0.24.3.node ---> 0.0.24.3.result
0.0.24.3.node["Ja"]
0.0.24.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.24.result ---> 0.0.24.3.node
0.0.24.3.node ---> 0.0.24.3.result
0.0.24.4.node["Ja"]
0.0.24.4.result["Ga dan door naar de volgende vraag"]
0.0.24.result ---> 0.0.24.4.node
0.0.24.4.node ---> 0.0.24.4.result
0.0.24.4.node["Nee"]
0.0.24.4.result["Ga dan door naar de volgende vraag."]
0.0.24.result ---> 0.0.24.4.node
0.0.24.4.node ---> 0.0.24.4.result
0.0.24.5.node["Nee"]
0.0.24.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.24.result ---> 0.0.24.5.node
0.0.24.5.node ---> 0.0.24.5.result
0.0.24.5.node["Ja"]
0.0.24.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.24.result ---> 0.0.24.5.node
0.0.24.5.node ---> 0.0.24.5.result
0.0.24.6.node["Ja"]
0.0.24.6.result["Ga dan door naar de volgende vraag"]
0.0.24.result ---> 0.0.24.6.node
0.0.24.6.node ---> 0.0.24.6.result
0.0.24.6.node["Nee"]
0.0.24.6.result["Ga dan door naar de volgende vraag."]
0.0.24.result ---> 0.0.24.6.node
0.0.24.6.node ---> 0.0.24.6.result
0.0.24.7.node["Nee"]
0.0.24.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.24.result ---> 0.0.24.7.node
0.0.24.7.node ---> 0.0.24.7.result
0.0.24.7.node["Ja"]
0.0.24.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.24.result ---> 0.0.24.7.node
0.0.24.7.node ---> 0.0.24.7.result
0.0.24.node["Nee"]
0.0.24.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.24.node
0.0.24.node ---> 0.0.24.result
0.0.25.node["Ja"]
0.0.25.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.25.node
0.0.25.node ---> 0.0.25.result
0.0.25.0.node["Ja"]
0.0.25.0.result["Ga dan door naar de volgende vraag"]
0.0.25.result ---> 0.0.25.0.node
0.0.25.0.node ---> 0.0.25.0.result
0.0.25.0.node["Nee"]
0.0.25.0.result["Ga dan door naar de volgende vraag."]
0.0.25.result ---> 0.0.25.0.node
0.0.25.0.node ---> 0.0.25.0.result
0.0.25.1.node["Nee"]
0.0.25.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.25.result ---> 0.0.25.1.node
0.0.25.1.node ---> 0.0.25.1.result
0.0.25.1.node["Ja"]
0.0.25.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.25.result ---> 0.0.25.1.node
0.0.25.1.node ---> 0.0.25.1.result
0.0.25.2.node["Ja"]
0.0.25.2.result["Ga dan door naar de volgende vraag"]
0.0.25.result ---> 0.0.25.2.node
0.0.25.2.node ---> 0.0.25.2.result
0.0.25.2.node["Nee"]
0.0.25.2.result["Ga dan door naar de volgende vraag."]
0.0.25.result ---> 0.0.25.2.node
0.0.25.2.node ---> 0.0.25.2.result
0.0.25.3.node["Nee"]
0.0.25.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.25.result ---> 0.0.25.3.node
0.0.25.3.node ---> 0.0.25.3.result
0.0.25.3.node["Ja"]
0.0.25.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.25.result ---> 0.0.25.3.node
0.0.25.3.node ---> 0.0.25.3.result
0.0.25.4.node["Ja"]
0.0.25.4.result["Ga dan door naar de volgende vraag"]
0.0.25.result ---> 0.0.25.4.node
0.0.25.4.node ---> 0.0.25.4.result
0.0.25.4.node["Nee"]
0.0.25.4.result["Ga dan door naar de volgende vraag."]
0.0.25.result ---> 0.0.25.4.node
0.0.25.4.node ---> 0.0.25.4.result
0.0.25.5.node["Nee"]
0.0.25.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.25.result ---> 0.0.25.5.node
0.0.25.5.node ---> 0.0.25.5.result
0.0.25.5.node["Ja"]
0.0.25.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.25.result ---> 0.0.25.5.node
0.0.25.5.node ---> 0.0.25.5.result
0.0.25.6.node["Ja"]
0.0.25.6.result["Ga dan door naar de volgende vraag"]
0.0.25.result ---> 0.0.25.6.node
0.0.25.6.node ---> 0.0.25.6.result
0.0.25.6.node["Nee"]
0.0.25.6.result["Ga dan door naar de volgende vraag."]
0.0.25.result ---> 0.0.25.6.node
0.0.25.6.node ---> 0.0.25.6.result
0.0.25.7.node["Nee"]
0.0.25.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.25.result ---> 0.0.25.7.node
0.0.25.7.node ---> 0.0.25.7.result
0.0.25.7.node["Ja"]
0.0.25.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.25.result ---> 0.0.25.7.node
0.0.25.7.node ---> 0.0.25.7.result
0.0.25.node["Nee"]
0.0.25.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.25.node
0.0.25.node ---> 0.0.25.result
0.0.26.node["Ja"]
0.0.26.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.26.node
0.0.26.node ---> 0.0.26.result
0.0.26.0.node["Ja"]
0.0.26.0.result["Ga dan door naar de volgende vraag"]
0.0.26.result ---> 0.0.26.0.node
0.0.26.0.node ---> 0.0.26.0.result
0.0.26.0.node["Nee"]
0.0.26.0.result["Ga dan door naar de volgende vraag."]
0.0.26.result ---> 0.0.26.0.node
0.0.26.0.node ---> 0.0.26.0.result
0.0.26.1.node["Nee"]
0.0.26.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.26.result ---> 0.0.26.1.node
0.0.26.1.node ---> 0.0.26.1.result
0.0.26.1.node["Ja"]
0.0.26.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.26.result ---> 0.0.26.1.node
0.0.26.1.node ---> 0.0.26.1.result
0.0.26.2.node["Ja"]
0.0.26.2.result["Ga dan door naar de volgende vraag"]
0.0.26.result ---> 0.0.26.2.node
0.0.26.2.node ---> 0.0.26.2.result
0.0.26.2.node["Nee"]
0.0.26.2.result["Ga dan door naar de volgende vraag."]
0.0.26.result ---> 0.0.26.2.node
0.0.26.2.node ---> 0.0.26.2.result
0.0.26.3.node["Nee"]
0.0.26.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.26.result ---> 0.0.26.3.node
0.0.26.3.node ---> 0.0.26.3.result
0.0.26.3.node["Ja"]
0.0.26.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.26.result ---> 0.0.26.3.node
0.0.26.3.node ---> 0.0.26.3.result
0.0.26.4.node["Ja"]
0.0.26.4.result["Ga dan door naar de volgende vraag"]
0.0.26.result ---> 0.0.26.4.node
0.0.26.4.node ---> 0.0.26.4.result
0.0.26.4.node["Nee"]
0.0.26.4.result["Ga dan door naar de volgende vraag."]
0.0.26.result ---> 0.0.26.4.node
0.0.26.4.node ---> 0.0.26.4.result
0.0.26.5.node["Nee"]
0.0.26.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.26.result ---> 0.0.26.5.node
0.0.26.5.node ---> 0.0.26.5.result
0.0.26.5.node["Ja"]
0.0.26.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.26.result ---> 0.0.26.5.node
0.0.26.5.node ---> 0.0.26.5.result
0.0.26.6.node["Ja"]
0.0.26.6.result["Ga dan door naar de volgende vraag"]
0.0.26.result ---> 0.0.26.6.node
0.0.26.6.node ---> 0.0.26.6.result
0.0.26.6.node["Nee"]
0.0.26.6.result["Ga dan door naar de volgende vraag."]
0.0.26.result ---> 0.0.26.6.node
0.0.26.6.node ---> 0.0.26.6.result
0.0.26.7.node["Nee"]
0.0.26.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.26.result ---> 0.0.26.7.node
0.0.26.7.node ---> 0.0.26.7.result
0.0.26.7.node["Ja"]
0.0.26.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.26.result ---> 0.0.26.7.node
0.0.26.7.node ---> 0.0.26.7.result
0.0.26.node["Nee"]
0.0.26.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.26.node
0.0.26.node ---> 0.0.26.result
0.0.27.node["Ja"]
0.0.27.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.27.node
0.0.27.node ---> 0.0.27.result
0.0.27.0.node["Ja"]
0.0.27.0.result["Ga dan door naar de volgende vraag"]
0.0.27.result ---> 0.0.27.0.node
0.0.27.0.node ---> 0.0.27.0.result
0.0.27.0.node["Nee"]
0.0.27.0.result["Ga dan door naar de volgende vraag."]
0.0.27.result ---> 0.0.27.0.node
0.0.27.0.node ---> 0.0.27.0.result
0.0.27.1.node["Nee"]
0.0.27.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.27.result ---> 0.0.27.1.node
0.0.27.1.node ---> 0.0.27.1.result
0.0.27.1.node["Ja"]
0.0.27.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.27.result ---> 0.0.27.1.node
0.0.27.1.node ---> 0.0.27.1.result
0.0.27.2.node["Ja"]
0.0.27.2.result["Ga dan door naar de volgende vraag"]
0.0.27.result ---> 0.0.27.2.node
0.0.27.2.node ---> 0.0.27.2.result
0.0.27.2.node["Nee"]
0.0.27.2.result["Ga dan door naar de volgende vraag."]
0.0.27.result ---> 0.0.27.2.node
0.0.27.2.node ---> 0.0.27.2.result
0.0.27.3.node["Nee"]
0.0.27.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.27.result ---> 0.0.27.3.node
0.0.27.3.node ---> 0.0.27.3.result
0.0.27.3.node["Ja"]
0.0.27.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.27.result ---> 0.0.27.3.node
0.0.27.3.node ---> 0.0.27.3.result
0.0.27.4.node["Ja"]
0.0.27.4.result["Ga dan door naar de volgende vraag"]
0.0.27.result ---> 0.0.27.4.node
0.0.27.4.node ---> 0.0.27.4.result
0.0.27.4.node["Nee"]
0.0.27.4.result["Ga dan door naar de volgende vraag."]
0.0.27.result ---> 0.0.27.4.node
0.0.27.4.node ---> 0.0.27.4.result
0.0.27.5.node["Nee"]
0.0.27.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.27.result ---> 0.0.27.5.node
0.0.27.5.node ---> 0.0.27.5.result
0.0.27.5.node["Ja"]
0.0.27.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.27.result ---> 0.0.27.5.node
0.0.27.5.node ---> 0.0.27.5.result
0.0.27.6.node["Ja"]
0.0.27.6.result["Ga dan door naar de volgende vraag"]
0.0.27.result ---> 0.0.27.6.node
0.0.27.6.node ---> 0.0.27.6.result
0.0.27.6.node["Nee"]
0.0.27.6.result["Ga dan door naar de volgende vraag."]
0.0.27.result ---> 0.0.27.6.node
0.0.27.6.node ---> 0.0.27.6.result
0.0.27.7.node["Nee"]
0.0.27.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.27.result ---> 0.0.27.7.node
0.0.27.7.node ---> 0.0.27.7.result
0.0.27.7.node["Ja"]
0.0.27.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.27.result ---> 0.0.27.7.node
0.0.27.7.node ---> 0.0.27.7.result
0.0.27.node["Nee"]
0.0.27.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.27.node
0.0.27.node ---> 0.0.27.result
0.0.28.node["Ja"]
0.0.28.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.28.node
0.0.28.node ---> 0.0.28.result
0.0.28.0.node["Ja"]
0.0.28.0.result["Ga dan door naar de volgende vraag"]
0.0.28.result ---> 0.0.28.0.node
0.0.28.0.node ---> 0.0.28.0.result
0.0.28.0.node["Nee"]
0.0.28.0.result["Ga dan door naar de volgende vraag."]
0.0.28.result ---> 0.0.28.0.node
0.0.28.0.node ---> 0.0.28.0.result
0.0.28.1.node["Nee"]
0.0.28.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.28.result ---> 0.0.28.1.node
0.0.28.1.node ---> 0.0.28.1.result
0.0.28.1.node["Ja"]
0.0.28.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.28.result ---> 0.0.28.1.node
0.0.28.1.node ---> 0.0.28.1.result
0.0.28.2.node["Ja"]
0.0.28.2.result["Ga dan door naar de volgende vraag"]
0.0.28.result ---> 0.0.28.2.node
0.0.28.2.node ---> 0.0.28.2.result
0.0.28.2.node["Nee"]
0.0.28.2.result["Ga dan door naar de volgende vraag."]
0.0.28.result ---> 0.0.28.2.node
0.0.28.2.node ---> 0.0.28.2.result
0.0.28.3.node["Nee"]
0.0.28.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.28.result ---> 0.0.28.3.node
0.0.28.3.node ---> 0.0.28.3.result
0.0.28.3.node["Ja"]
0.0.28.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.28.result ---> 0.0.28.3.node
0.0.28.3.node ---> 0.0.28.3.result
0.0.28.4.node["Ja"]
0.0.28.4.result["Ga dan door naar de volgende vraag"]
0.0.28.result ---> 0.0.28.4.node
0.0.28.4.node ---> 0.0.28.4.result
0.0.28.4.node["Nee"]
0.0.28.4.result["Ga dan door naar de volgende vraag."]
0.0.28.result ---> 0.0.28.4.node
0.0.28.4.node ---> 0.0.28.4.result
0.0.28.5.node["Nee"]
0.0.28.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.28.result ---> 0.0.28.5.node
0.0.28.5.node ---> 0.0.28.5.result
0.0.28.5.node["Ja"]
0.0.28.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.28.result ---> 0.0.28.5.node
0.0.28.5.node ---> 0.0.28.5.result
0.0.28.6.node["Ja"]
0.0.28.6.result["Ga dan door naar de volgende vraag"]
0.0.28.result ---> 0.0.28.6.node
0.0.28.6.node ---> 0.0.28.6.result
0.0.28.6.node["Nee"]
0.0.28.6.result["Ga dan door naar de volgende vraag."]
0.0.28.result ---> 0.0.28.6.node
0.0.28.6.node ---> 0.0.28.6.result
0.0.28.7.node["Nee"]
0.0.28.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.28.result ---> 0.0.28.7.node
0.0.28.7.node ---> 0.0.28.7.result
0.0.28.7.node["Ja"]
0.0.28.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.28.result ---> 0.0.28.7.node
0.0.28.7.node ---> 0.0.28.7.result
0.0.28.node["Nee"]
0.0.28.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.28.node
0.0.28.node ---> 0.0.28.result
0.0.29.node["Ja"]
0.0.29.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.29.node
0.0.29.node ---> 0.0.29.result
0.0.29.0.node["Ja"]
0.0.29.0.result["Ga dan door naar de volgende vraag"]
0.0.29.result ---> 0.0.29.0.node
0.0.29.0.node ---> 0.0.29.0.result
0.0.29.0.node["Nee"]
0.0.29.0.result["Ga dan door naar de volgende vraag."]
0.0.29.result ---> 0.0.29.0.node
0.0.29.0.node ---> 0.0.29.0.result
0.0.29.1.node["Nee"]
0.0.29.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.29.result ---> 0.0.29.1.node
0.0.29.1.node ---> 0.0.29.1.result
0.0.29.1.node["Ja"]
0.0.29.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.29.result ---> 0.0.29.1.node
0.0.29.1.node ---> 0.0.29.1.result
0.0.29.2.node["Ja"]
0.0.29.2.result["Ga dan door naar de volgende vraag"]
0.0.29.result ---> 0.0.29.2.node
0.0.29.2.node ---> 0.0.29.2.result
0.0.29.2.node["Nee"]
0.0.29.2.result["Ga dan door naar de volgende vraag."]
0.0.29.result ---> 0.0.29.2.node
0.0.29.2.node ---> 0.0.29.2.result
0.0.29.3.node["Nee"]
0.0.29.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.29.result ---> 0.0.29.3.node
0.0.29.3.node ---> 0.0.29.3.result
0.0.29.3.node["Ja"]
0.0.29.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.29.result ---> 0.0.29.3.node
0.0.29.3.node ---> 0.0.29.3.result
0.0.29.4.node["Ja"]
0.0.29.4.result["Ga dan door naar de volgende vraag"]
0.0.29.result ---> 0.0.29.4.node
0.0.29.4.node ---> 0.0.29.4.result
0.0.29.4.node["Nee"]
0.0.29.4.result["Ga dan door naar de volgende vraag."]
0.0.29.result ---> 0.0.29.4.node
0.0.29.4.node ---> 0.0.29.4.result
0.0.29.5.node["Nee"]
0.0.29.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.29.result ---> 0.0.29.5.node
0.0.29.5.node ---> 0.0.29.5.result
0.0.29.5.node["Ja"]
0.0.29.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.29.result ---> 0.0.29.5.node
0.0.29.5.node ---> 0.0.29.5.result
0.0.29.6.node["Ja"]
0.0.29.6.result["Ga dan door naar de volgende vraag"]
0.0.29.result ---> 0.0.29.6.node
0.0.29.6.node ---> 0.0.29.6.result
0.0.29.6.node["Nee"]
0.0.29.6.result["Ga dan door naar de volgende vraag."]
0.0.29.result ---> 0.0.29.6.node
0.0.29.6.node ---> 0.0.29.6.result
0.0.29.7.node["Nee"]
0.0.29.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.29.result ---> 0.0.29.7.node
0.0.29.7.node ---> 0.0.29.7.result
0.0.29.7.node["Ja"]
0.0.29.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.29.result ---> 0.0.29.7.node
0.0.29.7.node ---> 0.0.29.7.result
0.0.29.node["Nee"]
0.0.29.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.29.node
0.0.29.node ---> 0.0.29.result
0.0.30.node["Ja"]
0.0.30.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.30.node
0.0.30.node ---> 0.0.30.result
0.0.30.0.node["Ja"]
0.0.30.0.result["Ga dan door naar de volgende vraag"]
0.0.30.result ---> 0.0.30.0.node
0.0.30.0.node ---> 0.0.30.0.result
0.0.30.0.node["Nee"]
0.0.30.0.result["Ga dan door naar de volgende vraag."]
0.0.30.result ---> 0.0.30.0.node
0.0.30.0.node ---> 0.0.30.0.result
0.0.30.1.node["Nee"]
0.0.30.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.30.result ---> 0.0.30.1.node
0.0.30.1.node ---> 0.0.30.1.result
0.0.30.1.node["Ja"]
0.0.30.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.30.result ---> 0.0.30.1.node
0.0.30.1.node ---> 0.0.30.1.result
0.0.30.2.node["Ja"]
0.0.30.2.result["Ga dan door naar de volgende vraag"]
0.0.30.result ---> 0.0.30.2.node
0.0.30.2.node ---> 0.0.30.2.result
0.0.30.2.node["Nee"]
0.0.30.2.result["Ga dan door naar de volgende vraag."]
0.0.30.result ---> 0.0.30.2.node
0.0.30.2.node ---> 0.0.30.2.result
0.0.30.3.node["Nee"]
0.0.30.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.30.result ---> 0.0.30.3.node
0.0.30.3.node ---> 0.0.30.3.result
0.0.30.3.node["Ja"]
0.0.30.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.30.result ---> 0.0.30.3.node
0.0.30.3.node ---> 0.0.30.3.result
0.0.30.4.node["Ja"]
0.0.30.4.result["Ga dan door naar de volgende vraag"]
0.0.30.result ---> 0.0.30.4.node
0.0.30.4.node ---> 0.0.30.4.result
0.0.30.4.node["Nee"]
0.0.30.4.result["Ga dan door naar de volgende vraag."]
0.0.30.result ---> 0.0.30.4.node
0.0.30.4.node ---> 0.0.30.4.result
0.0.30.5.node["Nee"]
0.0.30.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.30.result ---> 0.0.30.5.node
0.0.30.5.node ---> 0.0.30.5.result
0.0.30.5.node["Ja"]
0.0.30.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.30.result ---> 0.0.30.5.node
0.0.30.5.node ---> 0.0.30.5.result
0.0.30.6.node["Ja"]
0.0.30.6.result["Ga dan door naar de volgende vraag"]
0.0.30.result ---> 0.0.30.6.node
0.0.30.6.node ---> 0.0.30.6.result
0.0.30.6.node["Nee"]
0.0.30.6.result["Ga dan door naar de volgende vraag."]
0.0.30.result ---> 0.0.30.6.node
0.0.30.6.node ---> 0.0.30.6.result
0.0.30.7.node["Nee"]
0.0.30.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.30.result ---> 0.0.30.7.node
0.0.30.7.node ---> 0.0.30.7.result
0.0.30.7.node["Ja"]
0.0.30.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.30.result ---> 0.0.30.7.node
0.0.30.7.node ---> 0.0.30.7.result
0.0.30.node["Nee"]
0.0.30.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.30.node
0.0.30.node ---> 0.0.30.result
0.0.31.node["Ja"]
0.0.31.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.31.node
0.0.31.node ---> 0.0.31.result
0.0.31.0.node["Ja"]
0.0.31.0.result["Ga dan door naar de volgende vraag"]
0.0.31.result ---> 0.0.31.0.node
0.0.31.0.node ---> 0.0.31.0.result
0.0.31.0.node["Nee"]
0.0.31.0.result["Ga dan door naar de volgende vraag."]
0.0.31.result ---> 0.0.31.0.node
0.0.31.0.node ---> 0.0.31.0.result
0.0.31.1.node["Nee"]
0.0.31.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.31.result ---> 0.0.31.1.node
0.0.31.1.node ---> 0.0.31.1.result
0.0.31.1.node["Ja"]
0.0.31.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.31.result ---> 0.0.31.1.node
0.0.31.1.node ---> 0.0.31.1.result
0.0.31.2.node["Ja"]
0.0.31.2.result["Ga dan door naar de volgende vraag"]
0.0.31.result ---> 0.0.31.2.node
0.0.31.2.node ---> 0.0.31.2.result
0.0.31.2.node["Nee"]
0.0.31.2.result["Ga dan door naar de volgende vraag."]
0.0.31.result ---> 0.0.31.2.node
0.0.31.2.node ---> 0.0.31.2.result
0.0.31.3.node["Nee"]
0.0.31.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.31.result ---> 0.0.31.3.node
0.0.31.3.node ---> 0.0.31.3.result
0.0.31.3.node["Ja"]
0.0.31.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.31.result ---> 0.0.31.3.node
0.0.31.3.node ---> 0.0.31.3.result
0.0.31.4.node["Ja"]
0.0.31.4.result["Ga dan door naar de volgende vraag"]
0.0.31.result ---> 0.0.31.4.node
0.0.31.4.node ---> 0.0.31.4.result
0.0.31.4.node["Nee"]
0.0.31.4.result["Ga dan door naar de volgende vraag."]
0.0.31.result ---> 0.0.31.4.node
0.0.31.4.node ---> 0.0.31.4.result
0.0.31.5.node["Nee"]
0.0.31.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.31.result ---> 0.0.31.5.node
0.0.31.5.node ---> 0.0.31.5.result
0.0.31.5.node["Ja"]
0.0.31.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.31.result ---> 0.0.31.5.node
0.0.31.5.node ---> 0.0.31.5.result
0.0.31.6.node["Ja"]
0.0.31.6.result["Ga dan door naar de volgende vraag"]
0.0.31.result ---> 0.0.31.6.node
0.0.31.6.node ---> 0.0.31.6.result
0.0.31.6.node["Nee"]
0.0.31.6.result["Ga dan door naar de volgende vraag."]
0.0.31.result ---> 0.0.31.6.node
0.0.31.6.node ---> 0.0.31.6.result
0.0.31.7.node["Nee"]
0.0.31.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.31.result ---> 0.0.31.7.node
0.0.31.7.node ---> 0.0.31.7.result
0.0.31.7.node["Ja"]
0.0.31.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.31.result ---> 0.0.31.7.node
0.0.31.7.node ---> 0.0.31.7.result
0.0.31.node["Nee"]
0.0.31.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.31.node
0.0.31.node ---> 0.0.31.result
0.0.32.node["Ja"]
0.0.32.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.32.node
0.0.32.node ---> 0.0.32.result
0.0.32.0.node["Ja"]
0.0.32.0.result["Ga dan door naar de volgende vraag"]
0.0.32.result ---> 0.0.32.0.node
0.0.32.0.node ---> 0.0.32.0.result
0.0.32.0.node["Nee"]
0.0.32.0.result["Ga dan door naar de volgende vraag."]
0.0.32.result ---> 0.0.32.0.node
0.0.32.0.node ---> 0.0.32.0.result
0.0.32.1.node["Nee"]
0.0.32.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.32.result ---> 0.0.32.1.node
0.0.32.1.node ---> 0.0.32.1.result
0.0.32.1.node["Ja"]
0.0.32.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.32.result ---> 0.0.32.1.node
0.0.32.1.node ---> 0.0.32.1.result
0.0.32.2.node["Ja"]
0.0.32.2.result["Ga dan door naar de volgende vraag"]
0.0.32.result ---> 0.0.32.2.node
0.0.32.2.node ---> 0.0.32.2.result
0.0.32.2.node["Nee"]
0.0.32.2.result["Ga dan door naar de volgende vraag."]
0.0.32.result ---> 0.0.32.2.node
0.0.32.2.node ---> 0.0.32.2.result
0.0.32.3.node["Nee"]
0.0.32.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.32.result ---> 0.0.32.3.node
0.0.32.3.node ---> 0.0.32.3.result
0.0.32.3.node["Ja"]
0.0.32.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.32.result ---> 0.0.32.3.node
0.0.32.3.node ---> 0.0.32.3.result
0.0.32.4.node["Ja"]
0.0.32.4.result["Ga dan door naar de volgende vraag"]
0.0.32.result ---> 0.0.32.4.node
0.0.32.4.node ---> 0.0.32.4.result
0.0.32.4.node["Nee"]
0.0.32.4.result["Ga dan door naar de volgende vraag."]
0.0.32.result ---> 0.0.32.4.node
0.0.32.4.node ---> 0.0.32.4.result
0.0.32.5.node["Nee"]
0.0.32.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.32.result ---> 0.0.32.5.node
0.0.32.5.node ---> 0.0.32.5.result
0.0.32.5.node["Ja"]
0.0.32.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.32.result ---> 0.0.32.5.node
0.0.32.5.node ---> 0.0.32.5.result
0.0.32.6.node["Ja"]
0.0.32.6.result["Ga dan door naar de volgende vraag"]
0.0.32.result ---> 0.0.32.6.node
0.0.32.6.node ---> 0.0.32.6.result
0.0.32.6.node["Nee"]
0.0.32.6.result["Ga dan door naar de volgende vraag."]
0.0.32.result ---> 0.0.32.6.node
0.0.32.6.node ---> 0.0.32.6.result
0.0.32.7.node["Nee"]
0.0.32.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.32.result ---> 0.0.32.7.node
0.0.32.7.node ---> 0.0.32.7.result
0.0.32.7.node["Ja"]
0.0.32.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.32.result ---> 0.0.32.7.node
0.0.32.7.node ---> 0.0.32.7.result
0.0.32.node["Nee"]
0.0.32.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.32.node
0.0.32.node ---> 0.0.32.result
0.0.33.node["Ja"]
0.0.33.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.33.node
0.0.33.node ---> 0.0.33.result
0.0.33.0.node["Ja"]
0.0.33.0.result["Ga dan door naar de volgende vraag"]
0.0.33.result ---> 0.0.33.0.node
0.0.33.0.node ---> 0.0.33.0.result
0.0.33.0.node["Nee"]
0.0.33.0.result["Ga dan door naar de volgende vraag."]
0.0.33.result ---> 0.0.33.0.node
0.0.33.0.node ---> 0.0.33.0.result
0.0.33.1.node["Nee"]
0.0.33.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.33.result ---> 0.0.33.1.node
0.0.33.1.node ---> 0.0.33.1.result
0.0.33.1.node["Ja"]
0.0.33.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.33.result ---> 0.0.33.1.node
0.0.33.1.node ---> 0.0.33.1.result
0.0.33.2.node["Ja"]
0.0.33.2.result["Ga dan door naar de volgende vraag"]
0.0.33.result ---> 0.0.33.2.node
0.0.33.2.node ---> 0.0.33.2.result
0.0.33.2.node["Nee"]
0.0.33.2.result["Ga dan door naar de volgende vraag."]
0.0.33.result ---> 0.0.33.2.node
0.0.33.2.node ---> 0.0.33.2.result
0.0.33.3.node["Nee"]
0.0.33.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.33.result ---> 0.0.33.3.node
0.0.33.3.node ---> 0.0.33.3.result
0.0.33.3.node["Ja"]
0.0.33.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.33.result ---> 0.0.33.3.node
0.0.33.3.node ---> 0.0.33.3.result
0.0.33.4.node["Ja"]
0.0.33.4.result["Ga dan door naar de volgende vraag"]
0.0.33.result ---> 0.0.33.4.node
0.0.33.4.node ---> 0.0.33.4.result
0.0.33.4.node["Nee"]
0.0.33.4.result["Ga dan door naar de volgende vraag."]
0.0.33.result ---> 0.0.33.4.node
0.0.33.4.node ---> 0.0.33.4.result
0.0.33.5.node["Nee"]
0.0.33.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.33.result ---> 0.0.33.5.node
0.0.33.5.node ---> 0.0.33.5.result
0.0.33.5.node["Ja"]
0.0.33.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.33.result ---> 0.0.33.5.node
0.0.33.5.node ---> 0.0.33.5.result
0.0.33.6.node["Ja"]
0.0.33.6.result["Ga dan door naar de volgende vraag"]
0.0.33.result ---> 0.0.33.6.node
0.0.33.6.node ---> 0.0.33.6.result
0.0.33.6.node["Nee"]
0.0.33.6.result["Ga dan door naar de volgende vraag."]
0.0.33.result ---> 0.0.33.6.node
0.0.33.6.node ---> 0.0.33.6.result
0.0.33.7.node["Nee"]
0.0.33.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.33.result ---> 0.0.33.7.node
0.0.33.7.node ---> 0.0.33.7.result
0.0.33.7.node["Ja"]
0.0.33.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.33.result ---> 0.0.33.7.node
0.0.33.7.node ---> 0.0.33.7.result
0.0.33.node["Nee"]
0.0.33.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.33.node
0.0.33.node ---> 0.0.33.result
0.0.34.node["Ja"]
0.0.34.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.34.node
0.0.34.node ---> 0.0.34.result
0.0.34.0.node["Ja"]
0.0.34.0.result["Ga dan door naar de volgende vraag"]
0.0.34.result ---> 0.0.34.0.node
0.0.34.0.node ---> 0.0.34.0.result
0.0.34.0.node["Nee"]
0.0.34.0.result["Ga dan door naar de volgende vraag."]
0.0.34.result ---> 0.0.34.0.node
0.0.34.0.node ---> 0.0.34.0.result
0.0.34.1.node["Nee"]
0.0.34.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.34.result ---> 0.0.34.1.node
0.0.34.1.node ---> 0.0.34.1.result
0.0.34.1.node["Ja"]
0.0.34.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.34.result ---> 0.0.34.1.node
0.0.34.1.node ---> 0.0.34.1.result
0.0.34.2.node["Ja"]
0.0.34.2.result["Ga dan door naar de volgende vraag"]
0.0.34.result ---> 0.0.34.2.node
0.0.34.2.node ---> 0.0.34.2.result
0.0.34.2.node["Nee"]
0.0.34.2.result["Ga dan door naar de volgende vraag."]
0.0.34.result ---> 0.0.34.2.node
0.0.34.2.node ---> 0.0.34.2.result
0.0.34.3.node["Nee"]
0.0.34.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.34.result ---> 0.0.34.3.node
0.0.34.3.node ---> 0.0.34.3.result
0.0.34.3.node["Ja"]
0.0.34.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.34.result ---> 0.0.34.3.node
0.0.34.3.node ---> 0.0.34.3.result
0.0.34.4.node["Ja"]
0.0.34.4.result["Ga dan door naar de volgende vraag"]
0.0.34.result ---> 0.0.34.4.node
0.0.34.4.node ---> 0.0.34.4.result
0.0.34.4.node["Nee"]
0.0.34.4.result["Ga dan door naar de volgende vraag."]
0.0.34.result ---> 0.0.34.4.node
0.0.34.4.node ---> 0.0.34.4.result
0.0.34.5.node["Nee"]
0.0.34.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.34.result ---> 0.0.34.5.node
0.0.34.5.node ---> 0.0.34.5.result
0.0.34.5.node["Ja"]
0.0.34.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.34.result ---> 0.0.34.5.node
0.0.34.5.node ---> 0.0.34.5.result
0.0.34.6.node["Ja"]
0.0.34.6.result["Ga dan door naar de volgende vraag"]
0.0.34.result ---> 0.0.34.6.node
0.0.34.6.node ---> 0.0.34.6.result
0.0.34.6.node["Nee"]
0.0.34.6.result["Ga dan door naar de volgende vraag."]
0.0.34.result ---> 0.0.34.6.node
0.0.34.6.node ---> 0.0.34.6.result
0.0.34.7.node["Nee"]
0.0.34.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.34.result ---> 0.0.34.7.node
0.0.34.7.node ---> 0.0.34.7.result
0.0.34.7.node["Ja"]
0.0.34.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.34.result ---> 0.0.34.7.node
0.0.34.7.node ---> 0.0.34.7.result
0.0.34.node["Nee"]
0.0.34.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.34.node
0.0.34.node ---> 0.0.34.result
0.0.35.node["Ja"]
0.0.35.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.35.node
0.0.35.node ---> 0.0.35.result
0.0.35.0.node["Ja"]
0.0.35.0.result["Ga dan door naar de volgende vraag"]
0.0.35.result ---> 0.0.35.0.node
0.0.35.0.node ---> 0.0.35.0.result
0.0.35.0.node["Nee"]
0.0.35.0.result["Ga dan door naar de volgende vraag."]
0.0.35.result ---> 0.0.35.0.node
0.0.35.0.node ---> 0.0.35.0.result
0.0.35.1.node["Nee"]
0.0.35.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.35.result ---> 0.0.35.1.node
0.0.35.1.node ---> 0.0.35.1.result
0.0.35.1.node["Ja"]
0.0.35.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.35.result ---> 0.0.35.1.node
0.0.35.1.node ---> 0.0.35.1.result
0.0.35.2.node["Ja"]
0.0.35.2.result["Ga dan door naar de volgende vraag"]
0.0.35.result ---> 0.0.35.2.node
0.0.35.2.node ---> 0.0.35.2.result
0.0.35.2.node["Nee"]
0.0.35.2.result["Ga dan door naar de volgende vraag."]
0.0.35.result ---> 0.0.35.2.node
0.0.35.2.node ---> 0.0.35.2.result
0.0.35.3.node["Nee"]
0.0.35.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.35.result ---> 0.0.35.3.node
0.0.35.3.node ---> 0.0.35.3.result
0.0.35.3.node["Ja"]
0.0.35.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.35.result ---> 0.0.35.3.node
0.0.35.3.node ---> 0.0.35.3.result
0.0.35.4.node["Ja"]
0.0.35.4.result["Ga dan door naar de volgende vraag"]
0.0.35.result ---> 0.0.35.4.node
0.0.35.4.node ---> 0.0.35.4.result
0.0.35.4.node["Nee"]
0.0.35.4.result["Ga dan door naar de volgende vraag."]
0.0.35.result ---> 0.0.35.4.node
0.0.35.4.node ---> 0.0.35.4.result
0.0.35.5.node["Nee"]
0.0.35.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.35.result ---> 0.0.35.5.node
0.0.35.5.node ---> 0.0.35.5.result
0.0.35.5.node["Ja"]
0.0.35.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.35.result ---> 0.0.35.5.node
0.0.35.5.node ---> 0.0.35.5.result
0.0.35.6.node["Ja"]
0.0.35.6.result["Ga dan door naar de volgende vraag"]
0.0.35.result ---> 0.0.35.6.node
0.0.35.6.node ---> 0.0.35.6.result
0.0.35.6.node["Nee"]
0.0.35.6.result["Ga dan door naar de volgende vraag."]
0.0.35.result ---> 0.0.35.6.node
0.0.35.6.node ---> 0.0.35.6.result
0.0.35.7.node["Nee"]
0.0.35.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.35.result ---> 0.0.35.7.node
0.0.35.7.node ---> 0.0.35.7.result
0.0.35.7.node["Ja"]
0.0.35.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.35.result ---> 0.0.35.7.node
0.0.35.7.node ---> 0.0.35.7.result
0.0.35.node["Nee"]
0.0.35.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.35.node
0.0.35.node ---> 0.0.35.result
0.0.36.node["Ja"]
0.0.36.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.36.node
0.0.36.node ---> 0.0.36.result
0.0.36.0.node["Ja"]
0.0.36.0.result["Ga dan door naar de volgende vraag"]
0.0.36.result ---> 0.0.36.0.node
0.0.36.0.node ---> 0.0.36.0.result
0.0.36.0.node["Nee"]
0.0.36.0.result["Ga dan door naar de volgende vraag."]
0.0.36.result ---> 0.0.36.0.node
0.0.36.0.node ---> 0.0.36.0.result
0.0.36.1.node["Nee"]
0.0.36.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.36.result ---> 0.0.36.1.node
0.0.36.1.node ---> 0.0.36.1.result
0.0.36.1.node["Ja"]
0.0.36.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.36.result ---> 0.0.36.1.node
0.0.36.1.node ---> 0.0.36.1.result
0.0.36.2.node["Ja"]
0.0.36.2.result["Ga dan door naar de volgende vraag"]
0.0.36.result ---> 0.0.36.2.node
0.0.36.2.node ---> 0.0.36.2.result
0.0.36.2.node["Nee"]
0.0.36.2.result["Ga dan door naar de volgende vraag."]
0.0.36.result ---> 0.0.36.2.node
0.0.36.2.node ---> 0.0.36.2.result
0.0.36.3.node["Nee"]
0.0.36.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.36.result ---> 0.0.36.3.node
0.0.36.3.node ---> 0.0.36.3.result
0.0.36.3.node["Ja"]
0.0.36.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.36.result ---> 0.0.36.3.node
0.0.36.3.node ---> 0.0.36.3.result
0.0.36.4.node["Ja"]
0.0.36.4.result["Ga dan door naar de volgende vraag"]
0.0.36.result ---> 0.0.36.4.node
0.0.36.4.node ---> 0.0.36.4.result
0.0.36.4.node["Nee"]
0.0.36.4.result["Ga dan door naar de volgende vraag."]
0.0.36.result ---> 0.0.36.4.node
0.0.36.4.node ---> 0.0.36.4.result
0.0.36.5.node["Nee"]
0.0.36.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.36.result ---> 0.0.36.5.node
0.0.36.5.node ---> 0.0.36.5.result
0.0.36.5.node["Ja"]
0.0.36.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.36.result ---> 0.0.36.5.node
0.0.36.5.node ---> 0.0.36.5.result
0.0.36.6.node["Ja"]
0.0.36.6.result["Ga dan door naar de volgende vraag"]
0.0.36.result ---> 0.0.36.6.node
0.0.36.6.node ---> 0.0.36.6.result
0.0.36.6.node["Nee"]
0.0.36.6.result["Ga dan door naar de volgende vraag."]
0.0.36.result ---> 0.0.36.6.node
0.0.36.6.node ---> 0.0.36.6.result
0.0.36.7.node["Nee"]
0.0.36.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.36.result ---> 0.0.36.7.node
0.0.36.7.node ---> 0.0.36.7.result
0.0.36.7.node["Ja"]
0.0.36.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.36.result ---> 0.0.36.7.node
0.0.36.7.node ---> 0.0.36.7.result
0.0.36.node["Nee"]
0.0.36.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.36.node
0.0.36.node ---> 0.0.36.result
0.0.37.node["Ja"]
0.0.37.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.37.node
0.0.37.node ---> 0.0.37.result
0.0.37.0.node["Ja"]
0.0.37.0.result["Ga dan door naar de volgende vraag"]
0.0.37.result ---> 0.0.37.0.node
0.0.37.0.node ---> 0.0.37.0.result
0.0.37.0.node["Nee"]
0.0.37.0.result["Ga dan door naar de volgende vraag."]
0.0.37.result ---> 0.0.37.0.node
0.0.37.0.node ---> 0.0.37.0.result
0.0.37.1.node["Nee"]
0.0.37.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.37.result ---> 0.0.37.1.node
0.0.37.1.node ---> 0.0.37.1.result
0.0.37.1.node["Ja"]
0.0.37.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.37.result ---> 0.0.37.1.node
0.0.37.1.node ---> 0.0.37.1.result
0.0.37.2.node["Ja"]
0.0.37.2.result["Ga dan door naar de volgende vraag"]
0.0.37.result ---> 0.0.37.2.node
0.0.37.2.node ---> 0.0.37.2.result
0.0.37.2.node["Nee"]
0.0.37.2.result["Ga dan door naar de volgende vraag."]
0.0.37.result ---> 0.0.37.2.node
0.0.37.2.node ---> 0.0.37.2.result
0.0.37.3.node["Nee"]
0.0.37.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.37.result ---> 0.0.37.3.node
0.0.37.3.node ---> 0.0.37.3.result
0.0.37.3.node["Ja"]
0.0.37.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.37.result ---> 0.0.37.3.node
0.0.37.3.node ---> 0.0.37.3.result
0.0.37.4.node["Ja"]
0.0.37.4.result["Ga dan door naar de volgende vraag"]
0.0.37.result ---> 0.0.37.4.node
0.0.37.4.node ---> 0.0.37.4.result
0.0.37.4.node["Nee"]
0.0.37.4.result["Ga dan door naar de volgende vraag."]
0.0.37.result ---> 0.0.37.4.node
0.0.37.4.node ---> 0.0.37.4.result
0.0.37.5.node["Nee"]
0.0.37.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.37.result ---> 0.0.37.5.node
0.0.37.5.node ---> 0.0.37.5.result
0.0.37.5.node["Ja"]
0.0.37.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.37.result ---> 0.0.37.5.node
0.0.37.5.node ---> 0.0.37.5.result
0.0.37.6.node["Ja"]
0.0.37.6.result["Ga dan door naar de volgende vraag"]
0.0.37.result ---> 0.0.37.6.node
0.0.37.6.node ---> 0.0.37.6.result
0.0.37.6.node["Nee"]
0.0.37.6.result["Ga dan door naar de volgende vraag."]
0.0.37.result ---> 0.0.37.6.node
0.0.37.6.node ---> 0.0.37.6.result
0.0.37.7.node["Nee"]
0.0.37.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.37.result ---> 0.0.37.7.node
0.0.37.7.node ---> 0.0.37.7.result
0.0.37.7.node["Ja"]
0.0.37.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.37.result ---> 0.0.37.7.node
0.0.37.7.node ---> 0.0.37.7.result
0.0.37.node["Nee"]
0.0.37.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.37.node
0.0.37.node ---> 0.0.37.result
0.0.38.node["Ja"]
0.0.38.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.38.node
0.0.38.node ---> 0.0.38.result
0.0.38.0.node["Ja"]
0.0.38.0.result["Ga dan door naar de volgende vraag"]
0.0.38.result ---> 0.0.38.0.node
0.0.38.0.node ---> 0.0.38.0.result
0.0.38.0.node["Nee"]
0.0.38.0.result["Ga dan door naar de volgende vraag."]
0.0.38.result ---> 0.0.38.0.node
0.0.38.0.node ---> 0.0.38.0.result
0.0.38.1.node["Nee"]
0.0.38.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.38.result ---> 0.0.38.1.node
0.0.38.1.node ---> 0.0.38.1.result
0.0.38.1.node["Ja"]
0.0.38.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.38.result ---> 0.0.38.1.node
0.0.38.1.node ---> 0.0.38.1.result
0.0.38.2.node["Ja"]
0.0.38.2.result["Ga dan door naar de volgende vraag"]
0.0.38.result ---> 0.0.38.2.node
0.0.38.2.node ---> 0.0.38.2.result
0.0.38.2.node["Nee"]
0.0.38.2.result["Ga dan door naar de volgende vraag."]
0.0.38.result ---> 0.0.38.2.node
0.0.38.2.node ---> 0.0.38.2.result
0.0.38.3.node["Nee"]
0.0.38.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.38.result ---> 0.0.38.3.node
0.0.38.3.node ---> 0.0.38.3.result
0.0.38.3.node["Ja"]
0.0.38.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.38.result ---> 0.0.38.3.node
0.0.38.3.node ---> 0.0.38.3.result
0.0.38.4.node["Ja"]
0.0.38.4.result["Ga dan door naar de volgende vraag"]
0.0.38.result ---> 0.0.38.4.node
0.0.38.4.node ---> 0.0.38.4.result
0.0.38.4.node["Nee"]
0.0.38.4.result["Ga dan door naar de volgende vraag."]
0.0.38.result ---> 0.0.38.4.node
0.0.38.4.node ---> 0.0.38.4.result
0.0.38.5.node["Nee"]
0.0.38.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.38.result ---> 0.0.38.5.node
0.0.38.5.node ---> 0.0.38.5.result
0.0.38.5.node["Ja"]
0.0.38.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.38.result ---> 0.0.38.5.node
0.0.38.5.node ---> 0.0.38.5.result
0.0.38.6.node["Ja"]
0.0.38.6.result["Ga dan door naar de volgende vraag"]
0.0.38.result ---> 0.0.38.6.node
0.0.38.6.node ---> 0.0.38.6.result
0.0.38.6.node["Nee"]
0.0.38.6.result["Ga dan door naar de volgende vraag."]
0.0.38.result ---> 0.0.38.6.node
0.0.38.6.node ---> 0.0.38.6.result
0.0.38.7.node["Nee"]
0.0.38.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.38.result ---> 0.0.38.7.node
0.0.38.7.node ---> 0.0.38.7.result
0.0.38.7.node["Ja"]
0.0.38.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.38.result ---> 0.0.38.7.node
0.0.38.7.node ---> 0.0.38.7.result
0.0.38.node["Nee"]
0.0.38.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.38.node
0.0.38.node ---> 0.0.38.result
0.0.39.node["Ja"]
0.0.39.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem als het een significant risico op schade voor de gezondheid, veiligheid of de grondrechten van natuurlijke personen inhoudt. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door met de vragen."]
0.0.result ---> 0.0.39.node
0.0.39.node ---> 0.0.39.result
0.0.39.0.node["Ja"]
0.0.39.0.result["Ga dan door naar de volgende vraag"]
0.0.39.result ---> 0.0.39.0.node
0.0.39.0.node ---> 0.0.39.0.result
0.0.39.0.node["Nee"]
0.0.39.0.result["Ga dan door naar de volgende vraag."]
0.0.39.result ---> 0.0.39.0.node
0.0.39.0.node ---> 0.0.39.0.result
0.0.39.1.node["Nee"]
0.0.39.1.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.39.result ---> 0.0.39.1.node
0.0.39.1.node ---> 0.0.39.1.result
0.0.39.1.node["Ja"]
0.0.39.1.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.39.result ---> 0.0.39.1.node
0.0.39.1.node ---> 0.0.39.1.result
0.0.39.2.node["Ja"]
0.0.39.2.result["Ga dan door naar de volgende vraag"]
0.0.39.result ---> 0.0.39.2.node
0.0.39.2.node ---> 0.0.39.2.result
0.0.39.2.node["Nee"]
0.0.39.2.result["Ga dan door naar de volgende vraag."]
0.0.39.result ---> 0.0.39.2.node
0.0.39.2.node ---> 0.0.39.2.result
0.0.39.3.node["Nee"]
0.0.39.3.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.39.result ---> 0.0.39.3.node
0.0.39.3.node ---> 0.0.39.3.result
0.0.39.3.node["Ja"]
0.0.39.3.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.39.result ---> 0.0.39.3.node
0.0.39.3.node ---> 0.0.39.3.result
0.0.39.4.node["Ja"]
0.0.39.4.result["Ga dan door naar de volgende vraag"]
0.0.39.result ---> 0.0.39.4.node
0.0.39.4.node ---> 0.0.39.4.result
0.0.39.4.node["Nee"]
0.0.39.4.result["Ga dan door naar de volgende vraag."]
0.0.39.result ---> 0.0.39.4.node
0.0.39.4.node ---> 0.0.39.4.result
0.0.39.5.node["Nee"]
0.0.39.5.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.39.result ---> 0.0.39.5.node
0.0.39.5.node ---> 0.0.39.5.result
0.0.39.5.node["Ja"]
0.0.39.5.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.39.result ---> 0.0.39.5.node
0.0.39.5.node ---> 0.0.39.5.result
0.0.39.6.node["Ja"]
0.0.39.6.result["Ga dan door naar de volgende vraag"]
0.0.39.result ---> 0.0.39.6.node
0.0.39.6.node ---> 0.0.39.6.result
0.0.39.6.node["Nee"]
0.0.39.6.result["Ga dan door naar de volgende vraag."]
0.0.39.result ---> 0.0.39.6.node
0.0.39.6.node ---> 0.0.39.6.result
0.0.39.7.node["Nee"]
0.0.39.7.result["Het is mogelijk dat je AI-systeem toch geen hoog-risico systeem is."]
0.0.39.result ---> 0.0.39.7.node
0.0.39.7.node ---> 0.0.39.7.result
0.0.39.7.node["Ja"]
0.0.39.7.result["Je AI-systeem wordt waarschijnlijk beschouwd als een hoog-risico AI-systeem. Het zou dan moeten voldoen aan bepaalde vereisten. Ga door om de vereisten te zien."]
0.0.39.result ---> 0.0.39.7.node
0.0.39.7.node ---> 0.0.39.7.result
0.0.39.node["Nee"]
0.0.39.result["Ga door naar de volgende vraag"]
0.0.result ---> 0.0.39.node
0.0.39.node ---> 0.0.39.result
0.0.node["Een Generatieve AI systeem"]
0.0.result["?"]
0.result ---> 0.0.node
0.0.node ---> 0.0.result
0.0.node["Nee of ik weet het niet"]
0.0.result["Ga door naar de volgende vragen"]
0.result ---> 0.0.node
0.0.node ---> 0.0.result
0.question["Ga je een AI-systeem ontwikkelen, maar alleen met wetenschappelijk onderzoek als enig doel?"]
root_question ---> 0.question
0.0.node["Ja, dat klopt"]
0.0.result["In dat geval is de AI verordening niet van toepassing, maar zorg er wel voor dat de activiteiten worden uitgevoerd in overeenstemming met het toepasselijke Unierecht. Bijvoorbeeld: als het AI systeem persoonsgegevens verwerkt, dan moet je nog steeds aan de AVG voldoen."]
0.question ---> 0.0.node
0.0.node ---> 0.0.result
0.0.node["Nee"]
0.0.result["Ga door naar de volgende vragen."]
0.question ---> 0.0.node
0.0.node ---> 0.0.result
0.question["Ga je een AI-systeem ontwikkelen die gratis beschikbaar wordt gesteld of vrijgegeven wordt onder opensourcelicenties?"]
root_question ---> 0.question
0.0.node["Ja, dat klopt"]
0.0.result["In dat geval is de AI verordening niet van toepassing, tenzij je AI-systeem op de markt wordt gebracht of in gebruik wordt gesteld als een AI-systeem met een hoog risico, of als een systeem die verboden is volgens artikel 5 van de AI-verordening of een systeem die moet voldoen aan de transparantie vereisten van artikel 50. Ga door naar de volgende vraag om hier achter te komen."]
0.question ---> 0.0.node
0.0.node ---> 0.0.result