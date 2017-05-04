var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var maxWidth = 1000;
var lineHeight = 30;
var generado = false;
var sourcesNotas = {
  boton0: 'resources/BOTON_0.png',
  boton1: 'resources/BOTON_1.png',
  boton2: 'resources/BOTON_2.png',
  boton3: 'resources/BOTON_3.png'
};
var sourcesPlantilla = {
    plantilla: 'resources/PLANTILLA.png',
    tecBas: 'resources/TEC_BAS.png',
    tecMed: 'resources/TEC_MED.png',
    tecAvz: 'resources/TEC_AVZ.png',
    tecExp: 'resources/TEC_EXP.png',
    tecExp2: 'resources/TEC_EXP2.png',
    botBas: 'resources/BOTON_BAS.png',
    botMed: 'resources/BOTON_MED.png',
    botAvz: 'resources/BOTON_AVZ.png',
    botExp: 'resources/BOTON_EXP.png',
    botExp2: 'resources/BOTON_EXP2.png'
};

var tecnicas = {
    basico: ['Equilibrio','Patinaje Básico','giro A','Freno Taco','Cuña Frente','Patinaje ESP','Giro Paralelo','Cuña ESP','Spin Stop','Salto'],
    medio: ['Equilibrio','Patinaje Medio','Freno T','Giro Paralelo','Patinaje Espaldas','Cuña Espaldas','CS Sim/ALT','Giro A/MIX Espaldas','Águila','Salto'],
    avanzado: ['Equilibrio','Patinaje Avanzado','Freno T','Patinaje Espaldas TIJ','CS Avanzado','Giro Cruzado','Giro Paralelo ESP','Derrape T Espaldas','Águila','Salto'],
    experto: ['Equilibrio ESP','Patinaje Experto','Freno T Curva','Giro Cruzado','Patinaje Espaldas TIJ Cruzado','CS Experto','Giro Cruzado ESP','Derrape T Frente','Águila','Salto'],
    experto2: ['Equilibrio Curva ESP','Patinaje Experto 2','Salida Cruzada','Giro Cruzado ESP','CS Trote','3M','Combo','Derrape A','Águila Recta','Salto 360º']
};
generateTableTecnicas(tecnicas.basico);
function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    for(var src in sources) {
        numImages++;
    }
    for(var src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            if(++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}

function generateTemplate(){
    generado = true;
    var nombreAlumno = document.getElementById("nombre").value;
    var nombreEscuela = document.getElementById("escuela").value;
    var nivelAlumno = document.getElementById("niveles").value;
    var nombreMonitor = document.getElementById("monitores").value;
    var comentarioAlumno = document.getElementById("comentario").value;
    canvas.setAttribute('width', 1082);
    canvas.setAttribute('height', 1920);
    context.clearRect(0,0,1080,1920);
    loadImages(sourcesPlantilla, function(images) {
        context.drawImage(images.plantilla, 0, 0);
        getTemplateLevel(images,nivelAlumno);
        context.font = "30px Monitor";
        context.fillStyle = "#990000";
        context.fillText(nombreMonitor.toUpperCase(),620,340);
        switch(nombreEscuela){
            case "Retiro":
                context.font = "60px Escuela";
                break;
            case "Sanse":
                context.font = "60px Escuela";
                break;
            case "Madrid Rio":
                context.font = "50px Escuela";
                break;
            case "Juan Carlos I":
                context.font = "45px Escuela";
                break;
        }
        context.fillStyle = "#990000";
        context.fillText("ESCUELA "+nombreEscuela.toUpperCase(),40,220);
        context.font = "60px Comentario";
        context.fillStyle = "#666666";
        context.fillText(nombreAlumno.toUpperCase(),40,340);
        context.font = "30px Comentario";
        context.fillStyle = "#333333";
        wrapText(context, comentarioAlumno, 40, 1650, maxWidth, lineHeight);
    });
    loadImages(sourcesNotas, function(images){
        getNotasTecnicas(images);
    });
}

function getTemplateLevel(images, level){
    switch (level){
        case "Basico":
            context.drawImage(images.tecBas, 140, 380);
            context.drawImage(images.botBas, 600, 140);
            break;
        case "Medio":
            context.drawImage(images.tecMed, 140, 380);
            context.drawImage(images.botMed, 600, 140);
            break;
        case "Avanzado":
            context.drawImage(images.tecAvz, 140, 380);
            context.drawImage(images.botAvz, 600, 140);
            break;
        case "Experto":
            context.drawImage(images.tecExp, 140, 380);
            context.drawImage(images.botExp, 600, 140);
            break;
        case "Experto 2":
            context.drawImage(images.tecExp2, 140, 380);
            context.drawImage(images.botExp2, 600, 140);
            break;
    }
};

function getNotasTecnicas(images){
    var arrayNotas = [];
    var wIni = 840;
    var hIni = 260;
    for (var i = 0;i<10;i++){
        var arrayNotasPies = [];
        notaI = $("#tecI"+i).val();
        notaD = $("#tecD"+i).val();
        arrayNotasPies.push(parseInt(notaI));
        arrayNotasPies.push(parseInt(notaD));
        arrayNotas.push(arrayNotasPies);
    }
    for (var x = 0;x<arrayNotas.length;x++){
        hIni = hIni + 120;
        switch (arrayNotas[x][0]){
            case 0:
                context.drawImage(images.boton0, wIni,hIni);
                break;
            case 1:
                context.drawImage(images.boton1, wIni,hIni);
                break;
            case 2:
                context.drawImage(images.boton2, wIni,hIni);
                break;
            case 3:
                context.drawImage(images.boton3, wIni,hIni);
                break;
        }
        switch (arrayNotas[x][1]){
            case 0:
                context.drawImage(images.boton0, wIni + 120,hIni);
                break;
            case 1:
                context.drawImage(images.boton1, wIni + 120,hIni);
                break;
            case 2:
                context.drawImage(images.boton2, wIni + 120,hIni);
                break;
            case 3:
                context.drawImage(images.boton3, wIni + 120,hIni);
                break;
        }
    }
};

function downloadCanvas() {
    if (generado === true){
        var nombreAlumno = document.getElementById("nombre").value;
        canvas.toBlob(function(blob) {
            saveAs(blob, "notas_"+nombreAlumno+".png");
        }, "image/png");
    }
};

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
};

function generateTableTecnicas(tecnicas){
    $('#divTabla > table').remove();
    var table = $('<table>',{class:'mdl-data-table mdl-js-data-table mdl-shadow--2dp'});
    var tHead = $('<thead>');
    var tBody = $('<tbody>');
    var trHead = $('<tr>');
    var thTecnica = $('<th>',{class:'mdl-data-table__cell--non-numeric'}).text('Técnica');
    var thIzquierdo = $('<th>').text('Pie Izquierdo');
    var thDerecho = $('<th>').text('Pie Derecho');
    trHead.append(thTecnica);
    trHead.append(thIzquierdo);
    trHead.append(thDerecho);
    tHead.append(trHead);
    table.append(tHead);
    for (var i = 0;i<tecnicas.length;i++){
        var tr = $('<tr>');
        var tdNombre = $('<td>',{class:'mdl-data-table__cell--non-numeric'}).text(tecnicas[i]);
        var tdI = $('<td>');
        var tdD = $('<td>');
        var selectD = $('<select>',{id:'tecD'+i});
        var selectI = $('<select>',{id:'tecI'+i});
        for (x=0;x<4;x++){
            var optionD = $('<option>'+x+'</option>');
            var optionI = $('<option>'+x+'</option>');
            selectD.append(optionD);
            selectI.append(optionI);
        }
        tdI.append(selectI);
        tdD.append(selectD);
        tr.append(tdNombre);
        tr.append(tdI);
        tr.append(tdD);
        tBody.append(tr);
    }
    table.append(tBody);
    $('#divTabla').append(table);
}

$(document).ready(function() {
    $("#niveles").change(function() {
        switch (this.value){
            case "Basico":
                generateTableTecnicas(tecnicas.basico)
                break;
            case "Medio":
                generateTableTecnicas(tecnicas.medio)
                break;
            case "Avanzado":
                generateTableTecnicas(tecnicas.avanzado)
                break;
            case "Experto":
                generateTableTecnicas(tecnicas.experto)
                break;
            case "Experto 2":
                generateTableTecnicas(tecnicas.experto2)
                break;
        }
    });
});
