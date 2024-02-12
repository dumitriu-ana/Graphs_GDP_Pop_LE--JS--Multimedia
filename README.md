# Proiect js: Realizarea de Grafice pe baza indicatorilor anuali (interactiv)

## JSON
![image](https://github.com/dumitriu-ana/Graphs_GDP_Pop_LE--JS--Multimedia/assets/72306782/3c88b494-9f48-4867-a1ac-bc9bb0d5ceca)

Pentru a genera graficele, datele necesare sunt extrase dintr-un fișier JSON. Acest fișier conține o listă de obiecte, fiecare obiect reprezentând o înregistrare specifică care conține țara, anul, indicatorul și valoarea corespunzătoare pentru acel indicator. <br>
Indicatorii care pot fi selectați includ speranța de viață, PIB și populație, iar anii acopera intervalul 2000 - 2018. <br>
Lista țărilor disponibile este: BE, BG, CZ, DK, DE, EE, IE, EL, ES, FR, HR, IT, CY, LV, LT, LU, HU, MT, NL, AT, PL, PT, RO, SI, SK, FI, SE.<br>

De fiecare dată când este selectat un alt indicator sau an, graficele sunt redesenate prin apelul funcțiilor specializate care sunt responsabile de crearea lor. Această abordare asigură actualizarea continuă a vizualizărilor pentru a reflecta schimbările în setul de date selectat, oferind utilizatorului o experiență interactivă și dinamică. <br>
Se inițializează variabilele globale și listele necesare pentru stocarea datelor și configurarea graficului.

## Histograma

Pentru a realiza histograma, înălțimea fiecărui punct este calculată în funcție de valoarea indicatorului ales. <br>
Există trei evenimente principale care conduc la selectarea anului, a indicatorului și a țării.
Se definește o funcție creareListaPuncte1 care creează o listă de puncte pentru histogramă pe baza indicatorului și țării selectate.
Se apelează funcția umplereGf1 pentru a desena histograma utilizând listele create anterior.

![image](https://github.com/dumitriu-ana/Graphs_GDP_Pop_LE--JS--Multimedia/assets/72306782/277da0c9-63e5-48fa-9c6d-044035227d97)

![image](https://github.com/dumitriu-ana/Graphs_GDP_Pop_LE--JS--Multimedia/assets/72306782/059ab4a5-ed60-42a9-a71f-2cc9704f5eed)

![image](https://github.com/dumitriu-ana/Graphs_GDP_Pop_LE--JS--Multimedia/assets/72306782/008dd853-6d0e-4270-b9e9-818679aa9020)

## Bubble Chart
Se creaza doua liste pentru a retine valorile aferente razei (in functie de PIB) si inaltimii pentru fiecare tara (in functie de populatie). <br>
Functia creareListaRaze calculează razele pentru cercurile din bubble chart (pe baza indicatorului PIB) si funcția creareListaInaltimiChart calculează înălțimile pentru cercurile din bubble chart (pe baza indicatorului Populație). <br>
Se apelează funcția umplereChart pentru a desena bubble chart-ul utilizând listele create anterior. <br>
Butonul Animatie declanșează o animație care afișează succesiv graficele pentru fiecare an într-un interval de 2 secunde.

![image](https://github.com/dumitriu-ana/Graphs_GDP_Pop_LE--JS--Multimedia/assets/72306782/6583a58b-2357-4b2e-acbe-27ca333541fb)

![image](https://github.com/dumitriu-ana/Graphs_GDP_Pop_LE--JS--Multimedia/assets/72306782/cff90b36-b8be-41c5-92f7-97a184991c7b)


## Tabel
Se apelează funcții pentru a calcula și aplica culorile în tabel, culorile sunt nuante de rosu sau verde calculate in functie de valoarea indicatorului.
Daca indicatorul respectiv este mai mic decat media sa, va fi o nuanta de rosu, altfel o nuanta de verde. Valorile null sunt marcate cu galben.

![image](https://github.com/dumitriu-ana/Graphs_GDP_Pop_LE--JS--Multimedia/assets/72306782/77b287b3-c254-415e-b2d1-1dc5ad9e1f81)

![image](https://github.com/dumitriu-ana/Graphs_GDP_Pop_LE--JS--Multimedia/assets/72306782/41bba51f-e52d-435b-8224-57887aa860a0)

![image](https://github.com/dumitriu-ana/Graphs_GDP_Pop_LE--JS--Multimedia/assets/72306782/0d4e452c-d28c-44fa-953e-c042d40b6e62)




