var xlc = {};

xlc.rowCount = 45;
xlc.cellCount = 25;

xlc.init = function(){
    xlc._generateTable();

   /* window.onscroll = function () {
        xlc._newBottomRows();
    }*/
    xlc._getLocalStorageValues();
    xlc._setLocalStorageValues();
    window.addEventListener('scroll',xlc._newAdditionalRowsAndCalls);


}
xlc.dataObj = {};
xlc.letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

xlc._setLocalStorageValues = function (){

    var INPUTS=[].slice.call(document.querySelectorAll(".main-table input"));
    //console.log(INPUTS);
    INPUTS.forEach(function(elm) {

        elm.onblur = function (e) {
          //  var ce11 ='sheetNumber'+e.target.parentElement.parentElement.rowIndex +'_'+e.target.parentElement.cellIndex;
            var ce1 ='s1_'+xlc.letters[e.target.parentElement.cellIndex-1]+e.target.parentElement.parentElement.rowIndex;

            console.log(ce1);
            //if(e.target.value!='') {
                localStorage[ce1] = e.target.value;
                xlc.dataObj[ce1]= e.target.value;
                //console.log(xlc.dataObj);
           // }
           // localStorage[e.target.id] = e.target.value;
            
            xlc._calcCells(localStorage[ce1],elm);
            xlc._getLocalStorageValues();
            //e.target.value=ce11;
        }
        elm.onfocus = function (e) {
            var ce1 ='s1_'+xlc.letters[e.target.parentElement.cellIndex-1]+e.target.parentElement.parentElement.rowIndex;
            e.target.value=localStorage[ce1]|| "";
            // computeAll();
           // console.log(e.target.parentElement.parentElement.rowIndex,e.target.parentElement.cellIndex);
        }
    });


}
xlc._getLocalStorageValues = function (){
    var INPUTS=[].slice.call(document.querySelectorAll(".main-table input"));
    INPUTS.forEach(function(elm) {
       // var ce11 ='sheetNumber'+elm.parentElement.parentElement.rowIndex +'_'+elm.parentElement.cellIndex;
        var ce1 ='s1_'+xlc.letters[elm.parentElement.cellIndex-1]+elm.parentElement.parentElement.rowIndex;
        xlc.dataObj[ce1]= localStorage[ce1];
        if(localStorage[ce1]!=undefined){
            elm.value = localStorage[ce1];

        }
        xlc._calcCells(localStorage[ce1],elm);
    });
    console.log(xlc.dataObj);


}
xlc._calcCells = function (ce1,elm){
    console.log('ddddddddddddddddddddddd');

    if (ce1==undefined)return;
    if (ce1.charAt(0) != "=")return;
    var value = ce1.toUpperCase();

    console.log(value);    console.log(ce1);
    //var newValue = '=s1_A1-s1_B1-s1_C1-s1_D1'.substring(1);
    //value.lastIndexOf('=')
    //var newValue = value.substring(value.lastIndexOf('=')+1);
    var newValue = value.substring(1);
    if (newValue.length==0)return;
    //console.log(newValue);
    //console.log(value);
    var indexPlus = '+',indexMinus = '-', indexDev= '/', indexMult = '*';
    var i=0;
    var newValue1 = '';
    var flag1 = true;
    dodo: do {

        var foundPlus = newValue.indexOf(indexPlus);
        var foundMinus = newValue.indexOf(indexMinus);
        var foundDev = newValue.indexOf(indexDev);
        var foundMult = newValue.indexOf(indexMult);
        if (newValue.charAt(0) == "=") newValue = newValue.substring(1);
        ifif: if(foundPlus==-1&&foundMinus==-1&&foundDev==-1&&foundMult==-1){
            var tt ='s1_'+(newValue);
            var tt1 = localStorage[tt];
            tt1 = (tt1+'').toLocaleUpperCase();
            console.log('IIIIIIII',tt1);
             if (tt1.charAt(0) == "=") {
                var adRecursion =  xlc._calcCells(tt1,elm);
                newValue1+=adRecursion;
                console.log('TTTTTTTTTT',newValue1);
               // newValue=newValue.substring(foundPlus+1);
                break ifif;
            }

            for(var key1 in xlc.dataObj){
                var s4='s1_'+newValue;
                //if(key1==('s1_'+newValue)){
                if(key1==s4){
                    if(xlc.dataObj[key1]==undefined)xlc.dataObj[key1]=0;
                    newValue1+=xlc.dataObj[key1];
                    break dodo;
                }

            }
            if(xlc.dataObj[key1]==undefined)xlc.dataObj[key1]=0;
            newValue1+=newValue;
            break;
        }
        if(foundPlus==-1&&foundMinus==-1&&foundDev==-1&&foundMult==-1)break;



        //console.log(foundPlus,foundMinus);
        if(foundPlus == -1)foundPlus=100;
        if(foundMinus == -1)foundMinus=100;
        if(foundDev == -1)foundDev=100;
        if(foundMult == -1)foundMult=100;

        //console.log('----------');
        //console.log(newValue);
        //console.log(newValue1);
        forfor: if(foundPlus<foundMinus&&foundPlus<foundDev&&foundPlus<foundMult){
            var tt ='s1_'+(newValue.substring(0,foundPlus));
            var tt1 = localStorage[tt];
            tt1 = (tt1+'').toLocaleUpperCase();
            console.log('IIIIIIII',tt1);
            if (tt1.charAt(0) == "=") {
                var adRecursion =  xlc._calcCells(tt1,elm);
                newValue1+=adRecursion+'+';
                console.log('TTTTTTTTTT',newValue1);
                newValue=newValue.substring(foundPlus+1);
                break forfor;
            }

            for(var key2 in xlc.dataObj){
                if(xlc.dataObj[key2]==undefined)xlc.dataObj[key2]=0;
                var s2='s1_'+newValue.substring(0,foundPlus);
                if(key2==s2){
                //if(key2==(newValue.substring(0,foundPlus))){
                    newValue1+=xlc.dataObj[key2]+'+';
                }


            }
            if(!isNaN(newValue.substring(0,foundPlus)))  {
                newValue1+=newValue.substring(0,foundPlus)+'+';
            }
            newValue=newValue.substring(foundPlus+1);
        }
        else if (foundMinus<foundPlus&&foundMinus<foundDev&&foundMinus<foundMult){
            var tt ='s1_'+(newValue.substring(0,foundMinus));
            var tt1 = localStorage[tt];
            tt1 = (tt1+'').toLocaleUpperCase();
            if (tt1.charAt(0) == "=") {
                var adRecursion =  xlc._calcCells(tt1,elm);
                newValue1+=adRecursion+'-';
                newValue=newValue.substring(foundMinus+1);
                break forfor;
            }

            for(var key3 in xlc.dataObj){
                if(xlc.dataObj[key3]==undefined)xlc.dataObj[key3]=0;
                var s3='s1_'+newValue.substring(0,foundMinus);
                if(key3==s3){
                    //if(key3==(newValue.substring(0,foundMinus))){
                    newValue1+=xlc.dataObj[key3]+'-';
                }
            }
            if(!isNaN(newValue.substring(0,foundMinus)))  {
                newValue1+=newValue.substring(0,foundMinus)+'-';
            }
            newValue=newValue.substring(foundMinus+1);

        }
        else if (foundMult<foundPlus&&foundMult<foundDev&&foundMult<foundMinus){
            var tt ='s1_'+(newValue.substring(0,foundMult));
            var tt1 = localStorage[tt];
            tt1 = (tt1+'').toLocaleUpperCase();
            if (tt1.charAt(0) == "=") {
                var adRecursion =  xlc._calcCells(tt1,elm);
                newValue1+=adRecursion+'*';
                newValue=newValue.substring(foundMult+1);
                break forfor;
            }

            for(var key4 in xlc.dataObj){
                if(xlc.dataObj[key4]==undefined)xlc.dataObj[key4]=0;
                var s4='s1_'+newValue.substring(0,foundMult);
                if(key4==s4){
                    //if(key3==(newValue.substring(0,foundMinus))){
                    newValue1+=xlc.dataObj[key4]+'*';
                }
            }
            if(!isNaN(newValue.substring(0,foundMult)))  {
                newValue1+=newValue.substring(0,foundMult)+'*';
            }
            newValue=newValue.substring(foundMult+1);

        }
        else if (foundDev<foundPlus&&foundDev<foundMult&&foundDev<foundMinus){
            var tt ='s1_'+(newValue.substring(0,foundDev));
            var tt1 = localStorage[tt];
            tt1 = (tt1+'').toLocaleUpperCase();
            if (tt1.charAt(0) == "=") {
                var adRecursion =  xlc._calcCells(tt1,elm);
                newValue1+=adRecursion+'/';
                newValue=newValue.substring(foundDev+1);
                break forfor;
            }

            for(var key4 in xlc.dataObj){
                if(xlc.dataObj[key4]==undefined)xlc.dataObj[key4]=0;
                var s4='s1_'+newValue.substring(0,foundDev);
                if(key4==s4){
                    //if(key3==(newValue.substring(0,foundDev))){
                    newValue1+=xlc.dataObj[key4]+'/';
                }
            }
            if(!isNaN(newValue.substring(0,foundDev)))  {
                newValue1+=newValue.substring(0,foundDev)+'/';
            }
            newValue=newValue.substring(foundDev+1);

        }
        else{}
        i++;



    }while(i<100)
    //console.log('End');
    //console.log(newValue);
    //console.log(newValue1);

    try {
        console.log('EVAL',newValue1);
    elm.value = eval(newValue1);
        adRecursion =eval(newValue1);

    } catch(err){
        elm.value = 'упс';
        console.log('!!!!!',newValue1);

    }
    return elm.value;

}

xlc._newAdditionalRowsAndCalls = function () {
   // console.log(e.currentTarget.innerHTML,e.target.innerHTML);

    var tableBody = document.querySelector('tbody')


    var trCount = document.querySelectorAll('tbody tr');
   // console.log('trCount',trCount.length);
    var tdCount = document.querySelectorAll('thead tr td');
   // console.log('tdCount',tdCount.length);

    var y = window.pageYOffset + window.innerHeight;
    //console.log(window.pageYOffset , window.innerHeight,'yyy',document.body.offsetHeight)

    if(y >= document.body.offsetHeight){

        for(var i=0;i<5;i++){
            var tableRow1 = tableBody.insertRow(-1);

            for(var k=0; k<tdCount.length;k++){
                var tableCell1 = tableRow1.insertCell(-1);

                var input = document.createElement('input');
                input.setAttribute("type", "text");

                if(k!=0) {
                    tableCell1.appendChild(input);
                }
                if(k==0){
                    tableCell1.innerHTML=trCount.length+1+i;
                }
            }
            //console.log('scrolled');
        }

    }

    var x = window.pageXOffset + window.innerWidth;
    //console.log(window.pageXOffset+window.innerWidth,window.innerHeight,'xxx',document.body.offsetWidth,document.body.scrollWidth)
    if(x >= document.body.scrollWidth) {
        var theadTr2 = document.querySelectorAll('tbody tr');
        var theadTr = document.querySelector('thead tr');

        for (var i = 0; i < 2; i++) {
            var tableCell2 = theadTr.insertCell(-1);
           // tableCell2.innerHTML = tdCount.length + i;
            
            tableCell2.innerHTML = String.fromCharCode("A".charCodeAt(0)+tdCount.length + i-1);
            for (var k = 0; k < trCount.length; k++) {
                var tableCell3 = theadTr2[k].insertCell(-1);
                var input = document.createElement('input');
                input.setAttribute("type", "text");
                tableCell3.appendChild(input);
            }
            //console.log('scrolled');
        }

    }
    xlc._getLocalStorageValues();
    xlc._setLocalStorageValues();

}


xlc._generateTable = function(){
    var mainTable = document.createElement('table');
    mainTable.className = 'main-table';
    var divTable = document.querySelector('#table');
    var tableBody = document.createElement('tbody');
    mainTable.appendChild(tableBody);
    var tableHeader = mainTable.createTHead();
    var tableRow = tableHeader.insertRow(0);

    for(var j=0; j<xlc.cellCount;j++) {
        var tableCell = tableRow.insertCell(-1);
        if(j!=0){
            tableCell.innerHTML = String.fromCharCode("A".charCodeAt(0)+j-1);
        }
    }

    for(var i=1;i<xlc.rowCount;i++){
        var tableRow1 = tableBody.insertRow(-1);
        for(var k=0; k<xlc.cellCount;k++){
            var tableCell1 = tableRow1.insertCell(-1);
            var input = document.createElement('input');
            input.setAttribute("type", "text");
            if(k!=0) {
                tableCell1.appendChild(input);

            }
            if(k==0){
                if(i!=0)  tableCell1.innerHTML=i+'';
            }
        }

    }
    divTable.appendChild(mainTable);
    console.log('generateTable');
}

xlc.getJSONData = function (path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}


xlc.init();














/*for(var i=0;i<cRow;i++){
    var tr = document.createElement('tr')
    for(var j=0; j<cF;j++){
        var td = document.createElement('td');
        var input = document.createElement('input');
        input.setAttribute("type", "text");
        tr.appendChild(td);
       if(i!=0&&j!=0) {
           td.appendChild(input);
       }
        if(i==0){
          if(j!=0)   td.innerHTML=j+'';
                  }
        if(j==0){
            if(i!=0)  td.innerHTML=i+'';
        }
    }
    table.appendChild(tr);
    console.log('ddd');
}
var rr=document.querySelector('#table');
table.className='main-table';
rr.appendChild(table);

function tt() {
    for (var i1 = 0; i1 < 15; i1++) {
        var tr = document.createElement('tr')
        for (var j1 = 0; j1 < cF; j1++) {
            var td = document.createElement('td');
            var input = document.createElement('input');
            input.setAttribute("type", "text");
            tr.appendChild(td);
            if (i1 != 0 && j1 != 0) {
                td.appendChild(input);
            }

        }
        table.appendChild(tr);
        console.log('ddd');
    }
    info=0;
}*/