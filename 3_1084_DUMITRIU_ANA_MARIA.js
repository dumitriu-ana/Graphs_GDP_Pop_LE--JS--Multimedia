const sursa = './media/eurostat.json';
let date;
let min = 70000, max = 0;
let minPIB = 7000, maxPIB = 0;
let minSV = 7000, maxSV = 0;
let minPOP = 7000, maxPOP = 0;
const listaPuncte1 = [];
const listaPozitiiPuncte1 = [];
const listaPentruAn = [];
const listaTari =[];


const listaRaze = [];
const listaInaltimiChart = [];

let numarTari = 27;

let ind1 = 'PIB';
let tara1 = 'RO';
let anSel = 2018;

// window.addEventListener("load", () => {
//     document.getElementById("selectareAn").onchange = selectAn;
//     document.getElementById("selectareIndicator").onchange = selectInd;
//     document.getElementById("selectareTara1").onchange = selectTara1;
// });

async function preluarejson() {                  //functie care preia jsonul si apeleaza celelalte functii
    const raspuns = await fetch(sursa);
    date = await raspuns.json();
    creareListaPuncte1(ind1, tara1);             // creez o lista cu puncte asociata indicatorului si tarii selectate (un punct pentru fiecare an)
    creareValoriPentruAn(anSel);                 // lista cu toate cele 3 valori pentru indicatori pentru fiecare tara (27 tari* 3 ind = 81 valori)
    creareListaTari();                           // lista cu toate tarile
    creareListaRaze();                           // lista in care calculez razele pentru cercuri
    creareListaInaltimiChart();                  // lista cu inaltimi pentru cercurile din bubble chart

    umplereGf1(listaPuncte1);                    // functie care creeaza histograma, se foloseste de lista
    umplereChart(anSel);                              // functie care creeaza bubble chart-ul

    // let anSelectat = selectAn();
    let anSelectat = 2018;
    tabelCompletare(date, anSelectat);          // functie care completeaza tabelul
    let m = calculMedie("PIB", 2005);


    //selectAn();
}
//Preluare Json
preluarejson();                                  // apel pentru functia care preia jsonul

//evolutie indicator/tara

function selectInd() {                           //selectarea unui indictor: PIB, SV, POP
    var select = document.getElementById("selectareIndicator");        //iau elem care in HTML are id-ul selectareIndicator
    var idx = select.selectedIndex;                                    // iau indexul elementului selectat din lista derulanta
    ind1 = select.options[idx].text;                                   // iau textul din optiunea care se afla la indexul cu elementul selectat
   // console.log(ind1);
}
document.getElementById("selectareIndicator").addEventListener("change", function (event) {     //adaug eveniment pentru selectarea ind
    selectInd();                                         // apelez functia pentru selectarea indicatorului
    console.log(ind1);                                   // afisez indicatorul
    creareListaPuncte1(ind1, tara1);                     // creez lista de puncte (pentru histograma) pe baza ind selectat, daca nu apelez iar functia, nu pot recrea histograma
    umplereGf1(listaPuncte1);                            // completez histograma cu noile valori
    completareTitlu();                                   // completez titlul (pentru histograma)
}
)

//lista de țări este:
//BE, BG, CZ, DK, DE, EE, IE, EL, ES, 
//FR, HR, IT, CY, LV, LT, LU, HU, MT, NL, AT, PL, PT, RO, SI, SK, FI, SE

function selectTara1() {                              //analog (precum la indicator) procedez si in cazul tarii si a anului
    var select = document.getElementById("selectareTara1");
    var idx = select.selectedIndex;
    tara1 = select.options[idx].text;                // variabila globala pentru tara isi schimba valoarea cu noua valoare selectata
    console.log(tara1);
}
document.getElementById("selectareTara1").addEventListener("change", function (event) {     // pentru fiecare modificare a tarii selectate:
    selectTara1();                                  // apelez functia de selectarea a tarii
    console.log(tara1);                             // afisez
    creareListaPuncte1(ind1, tara1);                // creez lista noua de puncte pe baza careia e creata histograma
    umplereGf1(listaPuncte1);                       // redesenez histograma
    completareTitlu();                              // recompletez titlul (pentru histograma)
}
)

function selectAn() {
    var select = document.getElementById("selectareAn");   
    var idx = select.selectedIndex;
    anSel = select.options[idx].text;
   // console.log(anSel);
    creareValoriPentruAn(anSel);                  // creez lista cu toti indicatorii pentru toate tarile (81 de valori) -> tabel si bubble chart
    //console.log(listaPentruAn);

}
document.getElementById("selectareAn").addEventListener("change", function (event) {    //pentru fiecare modificare a anului:
    selectAn();                                  // apelez functia de modificare a anului 
   // console.log(anSel);
    tabelCompletare(date, anSel);                // recompletez tabelul cu noile valori 
    umplereChart(anSel);                              // redesenez bubble-chart-ul 
    completareTitlu();                           //refac titlul (pentru tabel si bubble-chart)
}
)

function creareValoriPentruAn(anSel) {          // completez lista cu valori pentru toti indicatorii si toate tarile (27*3 = 81 de valori)
    while(listaPentruAn.length>0)               // daca exista elemente in lista, le elimin folosind pop
    {
        listaPentruAn.pop();                    // daca elemenetele nu ar fi eliminate, la fiecare apel s-ar adauga alete 81 de valori pe langa cele existente
    }
    let i = 0;
    while (i < date.length) {                   // parcurg datele din json
        if (date[i].an == anSel) {              // daca elementul curent din json are anul egal cu anul selectat 
            
            if (!isNaN(date[i].valoare)) {      // daca valoarea din json pentru valoare este diferita de null, o adaug in lista
                listaPentruAn.push(date[i].valoare);
            }
            else {
                listaPentruAn.push(0);          // daca valoarea din json este null, adaug 0 in lista
            }
        }
        i++;                                    // merg la urmatorul element din json
    }
}
function creareListaTari()                      // creez o lista cu toate tarile
{
    listaTari[0]='BE';                          //prima tara din json este BE
    let poz = 0;
    for(i=1; i<date.length/3; i++)              // parcurg prima treime din json (pentru primul indicator)
    {
        if(listaTari[poz] != date[i].tara)      //daca tara nu a fost deja adaugata:
        {
            //console.log(listaTari[poz]);
            poz++;                              // cresc numarul de elemente din lista de tari
            listaTari[poz] = date[i].tara;      // adaug tara in lista de tari
        }
    }
}
//console.log(listaTari);


//console.log(listaPentruAn);

//creare vector cu puncte corespunzatoare anului si indicatorului
function creareListaPuncte1(indicator, tara) {         
    while(listaPuncte1.length>0)                   // daca exista elemente in lista, le elimin folosind pop, pentru a nu adauga noile elemente langa cele aflate deja in lista
    { 
        listaPuncte1.pop();
        listaPozitiiPuncte1.pop();                 // golesc si lista de pozitii
    }
    let i = 0;
    //console.log(date[0].an+"   +"+ date[0].tara +"   "+ date[0].indicator+ "    "+ date[i].valoare);

    while (i < date.length) {                      // parcurg datele din json
        if (date[i].indicator == indicator && date[i].tara == tara) {     // daca indicatorul este egal cu cel selectat si tara este egala cu cea selectata:

            if (!isNaN(date[i].valoare)) {         // daca valoarea din json este diferita de null:
                //  console.log("aaaa");
                listaPuncte1.push(date[i].valoare); // adaug valoarea indicatorului in lista de puncte
                listaPozitiiPuncte1.push(i);        // adaug pozitia valorii in lista de pozitii
            }
            else {
                console.log("nullllllll");
                listaPuncte1.push(0);               // daca valoarea din json este null, adaug in lista de puncte valoarea 0
            }
        }
        i++;
    }
}

//console.log(listaPuncte1);
//console.log(listaPozitiiPuncte1);


function minimPentruColoana(numarColoana) {        // pentru a calcula culorile din tabel, trebuie sa stabilesc limitele intervalului pentru respectivul indicator
    let minColoana = 999999;                       // minimul ia o valoarea mai mare decat cele din json
    for (let i = 0; i < 27; i++) {                 // parcurg tarile din json
        if (!isNaN(table.rows[i].cells[numarColoana].innerHTML)) {        // daca valoarea gasita in tabel in linia i si coloana corespunzatoare indicatorului:
            x = parseInt(table.rows[i].cells[numarColoana].innerHTML);    // iau valoarea din tabel intr-o variabila auxiliara, x
            if (x < minColoana) {                  // compar x cu minimul, daca x este mai mic, actualizez minimul
                minColoana = x;
            }
        }
    }
    return minColoana;

}
function maximListaP() {                          // analog si pentru calcularea maximului
    let m = 0;
    for (let i = 0; i < 27; i++) {
        if (m < listaPuncte1[i]) {                // lista de puncte contine valorile pentru fiecare tara, pentru anul selectat
            m = listaPuncte1[i];
        }

    }
    return m;
}

function umplereGf1(listaPuncte1) {                     // completez histograma
   // console.log(listaPuncte1);
    let gf1 = document.getElementById("gf1");           // gf1 este variabila care retine elementul din HTML corespunzator histogramei
    
    while (gf1.lastChild) {                             // daca exista elemente in histograma, le sterg (daca nu sterg elementele, se vor suprapune)
        gf1.removeChild(gf1.lastChild);
    }

    let h = gf1.clientHeight;
    let w = gf1.clientWidth;

    let x, y, latime = w / listaPuncte1.length, inaltime;
    let dreptunghi;                                    // calulez in var. dreptunghi cum vor arata dreptunghiurile in svg
    for (let i = 0; i < listaPuncte1.length; i++) {    // parcurg fiecare punct (pentru fiecare tara)
        if(!listaPuncte1[i])                           // daca valoarea este 0, completez cu o inaltime foarte mica
        {
         inaltime = 20;
        }
        else                                           // calculez inaltimea pentru fiecare punct
        {
        inaltime = h / maximListaP() * listaPuncte1[i] - 100;   //impart inaltimea graficului la inaltimea maxima si apoi inmultesc cu inaltimea punctului curent  (proportional), 
        }                                             // scad 100 pentru ca vreau ca cel mai inalt punct sa fie cu 100px mai jos decat marginea de sus a graficului
        x = i * latime;                                // calculez punctul de inceput pentru oX pentru dreptunghi

        y = h - inaltime;                             // calculez punctul de pe oY pentu dreaptuncghi
        //console.log(maximListaP());

        let culoare = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;    //calculez o culoare random pentru dreptunghi

        dreptunghi = `<rect x="${x}" y="${y}" width="${latime}" height="${inaltime}" style="fill:${culoare};stroke:green;stroke-width:2;fill-opacity:0.4;
        stroke-opacity:0.6 " /> `;
                             // creez un dreptunghi pentru fiecare an, folosindu-ma de variabilele calculate anterior

        //onmousemove="showTooltip(evt, 'Date pentru dreptunghi');" onmouseout="hideTooltip();
        gf1.innerHTML += dreptunghi;               // adaug dreptunghiul creat in interiorul histogramei din HTML
    }
    gf1.innerHTML += dreptunghi;
}

function showTooltip(evt, text) {
    let tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = text;
    tooltip.style.display = "block";
    tooltip.style.left = evt.pageX + 10 + 'px';
    tooltip.style.top = evt.pageY + 10 + 'px';
}

function hideTooltip() {
    var tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
}


//TABEL: Completare tabel

function tabelCompletare(date, anSel) {
    var table = document.getElementById("corpTabel");      // retin in variabila table elemenetul din HTML cu id-ul corespunzator pentru tabel
    table.innerHTML = "";                                  // creez un sir de caratere pe care urmeaza sa il folosesc pentru a completa liniile tabelului
    var pibs, svs, pops;                                   // creez variabile pentru indicatori

    min = 70000; max = 0;    //resetam mereu val pentru ca sunt modif dupa fiecare apel
    let mPIB = calculMedie('PIB', anSel);                  //calculez media pentru un indicator
    //console.log(anSel);
    creareValoriPentruAn(anSel);                           // creez lista cu valori pentru un an selectat (81 de valori)

   // console.log(listaPentruAn);
    //console.log(listaPentruAn.length);
    
    let pozTara = 0;
    let i = 0;
    //console.log(listaPentruAn.length);

    pozVal = 0;
    for(let i=0; i<listaTari.length; i++)                 // parcurg valorile din lista de valori:
    {                                                     // primele 27 de valori din lista sunt pentru speranta de viata, urmatoarele 27 pentru populatie si ultimele 27 pentru PIB
        var x = 5;
        pibs = listaPentruAn[i+54];                       // pentru fiecare tara, retin valoarile pentru cei 3 indicatori
        svs = listaPentruAn[i];
        pops = listaPentruAn[i+27];
                                                          // creez sirul de caractere pentru completarea unei linii din tabel: numele tarii, apoi cei 3 indicatori
        var row = `<tr>
        <td>${listaTari[i]}</td>
        <td>${pibs}</td>
        <td>${svs}</td>
        <td>${pops}</td>
        </tr>`;

        table.innerHTML += row;                          // inserez linia creata in tabel
    }
    culoareCelulaColoanaTABEL1('PIB');                   // calculez procentual culorile pentru fiecare indicator si colorez coloanele
    culoareCelulaColoanaTABEL1('SV');
    culoareCelulaColoanaTABEL1('POP');
}

function calculMedie(indicator, an) {                   // functie pentru calcularea valorii medii pentru un indicator pentru un an 
    let suma = 0;                                       // calculez suma pentru toate valorile acelui indicator
    for (i = 0; i < date.length; i++) {                 // parcurg valorile
        if (date[i].indicator == indicator && date[i].an == an) {      // daca valoarile din json pentru indicator si pentru an corespund cu cele selectate
            if (date[i].valoare == null) {                             // daca valorile sunt null, le marchez cu 0
                date[i].valoare = 0;
            }
            suma += date[i].valoare;                                   // adun valorile
            if (date[i].valoare > max) {
                max = date[i].valoare;                                 // retin valoarea maxima
                // console.log(max);
            }
            if (date[i].valoare < min) {                               // retin valoarea minima
                min = date[i].valoare;
            }
        }
    }
    let med = suma / 19;                              // calculez valoarea medie, impartind suma la numarul de ani
    return med;                                       // rtunrez valoarea medie
}

function primaPozInd(indicator) {                     // functii auxiliare pentru parcurgerea fisierului json
    let ok = 0;
    let i = 0;
    while (i < date.length && ok == 0) {
        if (date[i].indicator == indicator) {
            ok = 1;
            return i;
        }
        i++;
    }
}

function calculNumarTara(numeTara) {                  // functii auxiliare pentru parcurgerea fisierului json
    let ok = 0;
    let i = 0;
    while (i < date.length && ok == 0) {
        if (date[i].tara == numeTara) {
            ok = 1;
            return i;    // 19 e nr de ani, pt fiecare tara sunt 19 ani de date
        }
        i++;
    }
}

//console.log(primaPozInd('SV'));

function culoareCelulaColoanaTABEL1(numeInd, table) {            // calculez culoarea pentru fiecare celula 
    let numarColoana = 1;                          // variabila care retine numarul coloanei (corespunde cu indicatorul)           
    if (numeInd == 'SV') {                         // coloana 1 este pentru PIB, 2= SV, 3 = POP, 0 = numele tarii
        numarColoana = 2;
    }
    if (numeInd == 'POP') {
        numarColoana = 3;
    }

    var table = document.getElementById("corpTabel");     // iau corpul tabelului intr-o variabila

    let sumaCol = 0, medCol = 0;
    let x = 0;
    let minColoana = 80000, maxColoana = 0, numarElementeNule = 0;
    for (let i = 0; i < 27; i++) {                                    // parcurg tarile
        if (isNaN(table.rows[i].cells[numarColoana].innerHTML)) {     // daca nu exista valori in tabel
            x = 0;
            numarElementeNule++;                                      // contorizez  numerul de valori nule din tabel
        }
        else {

            x = parseInt(table.rows[i].cells[numarColoana].innerHTML);   // iau elementul din celula
            // console.log(typeof(x));
            sumaCol += x;                                                // calculez suma
            // console.log(typeof(sumaCol));

            if (x > maxColoana) {
                maxColoana = x;                                         // calculez minimul si maximul pentru coloana
            }
            if (x < minColoana) {
                minColoana = x;
            }

        }
    }
    sumaCol = parseInt(sumaCol);
    medCol = sumaCol / (27 - numarElementeNule);                        // calculez media, impart la numarul de elemente nenule
    //console.log(medCol+"    "+ minColoana+"    "+ maxColoana);

    let culoareCelula;
    let pondereVerde, pondereRosu;                                      // variabile pentru calcului ponderilor de culoare
    for (let i = 0; i < 27; i++) {
        if (isNaN(table.rows[i].cells[numarColoana].innerHTML)) {
            //console.log("nu avem date");
            culoareCelula = 'RGB(255, 255, 0)';                         // calculez culoarea pentru null = galben 
            table.rows[i].cells[numarColoana].style.backgroundColor = culoareCelula;     // atribui celulei culoarea de fundal calculata
        }
        else {
            x = table.rows[i].cells[numarColoana].innerHTML;            // daca valoarea nu e null
            //console.log(x);
            if (x < medCol) {                                        // daca valoarea din coloana este mai mica decat media, ponderea de rosu va fi mai mare
                pondereRosu = Math.trunc(125 + (medCol - x) / (medCol - minColoana) * 125);   // calculez ponderea de rosu (adun jumatatea intervalului de culoare, 125 cu diferenta dintre valoarea curenta si media coloanei (ind) si calculez proportia)
                //console.log("rosu" +x +"      "+ pondereRosu);
                pondereVerde = 255 - pondereRosu;                    // pentru ponderea de verde, scad din maxim ponderea de rosu 
                culoareCelula = 'RGB(' + pondereRosu + ',' + pondereVerde + ',0)';     // calculez culoarea celulei folosind ponderile pentru rosu si verde, ponderea de albastru fiind 0
                table.rows[i].cells[numarColoana].style.backgroundColor = culoareCelula;     // colorez culoarea de fundal pentru tabel cu noua culoare calculata
            }
            else {
                pondereVerde = Math.trunc(125 + (x - medCol) / (maxColoana - medCol) * 125);    // analog pentru valorile calculate cu verde, cu valori mai mari decat media
                // console.log("verde" +x +"      "+ pondereVerde);
                pondereRosu = 255 - pondereVerde;                                       
                culoareCelula = 'RGB(' + pondereRosu + ',' + pondereVerde + ',0)';
                table.rows[i].cells[numarColoana].style.backgroundColor = culoareCelula;
            }

        }
    }
}



//console.log(listaPentruAn);

function creareListaRaze(latimeChart)                   // functie care creeaza o lista cu razele pentru cercurile din Bubble-chart
{
    let suma = 0;
   // console.log(listaPentruAn);                      // lista pentru an contine 81 de valori, datele pentru toti cei 3 indicatori
    for(let i=54; i< listaPentruAn.length; i++)        // pentru calculul razei am folosit indicatorul PIB
    {
        if(!listaPentruAn[i]) suma += 3;               // daca valoarea din lista este 0 sau null, adun o valoare foarte mica pentru cerc
        else suma += listaPentruAn[i]/1000;            // altfel, adun valoarea din lista/ 1.000 (PIB are valori destul de ridicate)
    }
    //console.log(suma);

    for(let i=0; i<listaTari.length; i++)             // parcurg lista valori pentru a calcula ponderi din latimea graficului pentru raze
    {
        if(!listaPentruAn) 
        {
            listaRaze[i] = 3*900/suma;                // lagtimea graficului este 950, am lasat 25px liberi in fiecare parte a graficului
        }
        else{
            listaRaze[i] = listaPentruAn[i+54]/1000 *900/2 /suma;   // pondere, impart si la 2 pentru ca am raza, nu diametru
        }
    }

}


function creareListaInaltimiChart()         // functie care creeaza o lista cu inaltimi pentru cercurile din Bubble-chart
{
    let suma =0;
  // console.log(listaPentruAn[27]);
    for( let i =27;i < 27 +numarTari; i++)   // parcurg valorile pentru tari, inaltimea este calculata pe baza indicatorului Populatie
    {
        if(!listaPentruAn[i])                // daca nu avem valori (0/null), adun o valoare foarte mica pentru inaltime
        {
            suma +=3;
        }
        else suma += listaPentruAn[i]/100000;     // adun valorile din lista, impart la 100.000 pentru ca valorile din POP sunt destul de mari
    }
   // console.log(suma);
    for( let i = 0; i<listaTari.length; i++)      // parcurg pentru a crea proportiile pentru inaltime
    {
        if(!listaInaltimiChart)
        {
            listaInaltimiChart[i] = 210 - 3*420/suma;    // graficul are inaltimea de 420, adun 210 pentru a ma situa la jumatate (cand se aduna, se merge in josul graficului)
        }
        else{
            listaInaltimiChart[i] = 420/2 - listaPentruAn[i+27]/60000*420/suma;   // cand scad, cercurile sunt mai sus pe grafic (pentru ca punctul (0,0) este in stanga sus)
        }
    }
}

//console.log(listaInaltimiChart);    


function umplereChart(anParametru) {                      // completez Bubble-chart-ul
    creareValoriPentruAn(anParametru);
   //console.log(anSel);
    //console.log(listaPentruAn[1]);
    let c = document.getElementById("chart");   // iau elementul cu id-ul chart din HTML
    let ch_context = c.getContext("2d");        // iau contextul variabilei
    let h = c.clientHeight;                     // iau inaltimea si latimea canvasului (h = 420 si w = 950)
    let w = c.clientWidth;

   creareListaInaltimiChart();                  // apelez functiile care creeaza listele pentru inaltime si raza din valorile aferente anului selectat
   creareListaRaze(420);

   console.log(listaRaze[0]);
   console.log(listaInaltimiChart[0]);

    let punctStart = 25;  // functul de start este cu 25px in dreapta 
    let y, razaC;


    ch_context.clearRect(0, 0, w, h);      // golesc desenul inainte de feicare desenare, altfel se vor desena cercuri noi peste cele vechi

    let culoare = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;   // calculez o culoare random

    for(let i = 0; i< listaRaze.length; i++)                    // parcurg elemetele 
    {
         y = listaInaltimiChart[i];                             // y = variabila ce semnifica punctul pe oY pentru centrul cercului
         razaC = listaRaze[i];                                  // valoarea pentru raza cercului curent 
         let culoare = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;   // culoare random

         ch_context.beginPath();                  // inceperea desenului
         ch_context.arc(punctStart+listaRaze[i], y, razaC, 0, 2 * Math.PI);    
                      // pentru centrul cercului pe oX adun punctului de start dimensiunea razei ceruclui curent, parametru y, param raza si 
                      // doi parametrii care arata din ce punct incepe cercul (unghi) si in ce punct se termina (incepe de la 0 -dreapta si face o bucla de 2*Pi, adica un rotund)
         ch_context.fillStyle = culoare;        // stilul de umplere retine culoarea
         ch_context.fill();                     // umplu cercul cu culoare

         punctStart += listaRaze[i]*2;          // punctul pentru oX pentru cercul urmator se deplaseaza la dreapta cu valoarea diametrului cercului curent (2*raza)
    }
}



// animatie
document.getElementById("btnAnimatie").addEventListener("click", () => {      //atunci cand este apasat butonul pentru animatie
    console.log("apasat");

    for (let i = 2000; i <= 2018; i++) {                                     // se parcurg toti anii

        setTimeout(umplereChart, (i-2000)*2000, i);                            // dupa 2 secunde, se afiseaza urmatorul grafic prin apelul functiei de desenare
       // console.log(i);
       setTimeout(completareTitluBubble, (i-2000)*2000, i);                   // apel pentru functia de completare a titlui
       
    }
  });
  function completareTitluBubble(an)
  {
    document.getElementById("titluChart").innerHTML = an;  
  }

  function completareTitlu() {                                               // functie de completare a titlurilor
    let textTitlu = " indicatorul  " + ind1 + ", tara " + tara1 + ", perioada: 2000-1018";     // creez un text pentru titlul Histogramei
    document.getElementById("titluHistograma").innerHTML = textTitlu;        
  //  document.getElementById("titluChart").innerHTML = anAnimatie;
    document.getElementById("titluChart").innerHTML = anSel;                 // completez titlul Bubble-chart-ului
    let anTabel = anSel;
    document.getElementById("titluTabel").innerHTML = anSel;                 // completez titlul tabelului

  }

