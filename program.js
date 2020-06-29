var calyKodHtml = "";
function dodajDoHtml(x){
    calyKodHtml+=x;
}
var wyswietl = true;
var pominPierwszeX = 3

const fs = require('fs');
try{
let rawdata = fs.readFileSync(process.argv[2]);}
catch(err){console.log("nie ma takiego pliku");
}

let rawdata = fs.readFileSync(process.argv[2])
let questionData = JSON.parse(rawdata)


const multimediaFolder = './audi/';
var plikiMultimediow = fs.readdirSync(multimediaFolder);


bezObrazkow = process.argv[3] === 'noImage';
bezOpisu = process.argv[4] ==='noSentence';   //NOWA OPCJA NOWA OPCJA

function testNazwy(nazwa){

  // tutaj test 1

  var ciecie1 = nazwa.split('-');
  var ciecie2 = nazwa.split('.');

  if(ciecie1[1]!== undefined){
      var ciecie3 = ciecie1[1].split('.');
  }
  if(ciecie1.length!==2){
      return false;
  }


  if(ciecie2.length!==2){
      return false;
  }
  // tutaj test 2


  if(!(ciecie2[1]==="jpg" || ciecie2[1]==="mp4")){
      return false;
  }
  // ....

  if(!(ciecie3[0]==="pre" || ciecie3[0]==="post")){
      return false;
  }

  return true;
}


function wykryjZle(lista){

  var wykryteZle = [];

  for(var i = 0 ; i<lista.length ; i++){
      if(!testNazwy(lista[i])){
         wykryteZle.push(lista[i]);
      }
  }

  return wykryteZle;

};




function pytanie(i){
    var kategoria=(questionData[i-1]).t;
    var ciekawostkaPrzed = (questionData[i-1]).trivia.pre;
    var ciekawostkaPo = (questionData[i-1]).trivia.post;
    var pytanie = (questionData[i-1]).q;
    var odpowiedzPrawidlowa = (questionData[i-1]).a[0];
    var pozostaleOdpowiedzi1 = (questionData[i-1]).a[1];;
    var pozostaleOdpowiedzi2 = (questionData[i-1]).a[2];;
    var pozostaleOdpowiedzi3 = (questionData[i-1]).a[3];;
    
    var doDodania = "";

    doDodania += '<h3 class="round">Runda ' + String(i-pominPierwszeX) +' : ' +kategoria +'</h3>';
    
    var filmPrzed = String(i)+"-pre.mp4";
    var filmPo = String(i)+"-post.mp4";
    var nazwaPlikuPo = String(i)+"-post.jpg";
    var nazwaPlikuPrzed = String(i)+"-pre.jpg";


// PRZYKŁAD PRZYKŁAD PRZYKŁAD

    if((plikiMultimediow.indexOf(filmPrzed)>=0)&&(plikiMultimediow.indexOf(nazwaPlikuPrzed)>=0)){
      doDodania += '<p class="error_text">[BŁĄD: film i grafika występują razem]</p>'
      }else if(plikiMultimediow.indexOf(nazwaPlikuPrzed)>=0 && bezObrazkow && bezOpisu){
              doDodania +='<p class="no_sentence">[GRAFIKA PRZED]</p>'
      }else if(plikiMultimediow.indexOf(nazwaPlikuPrzed)>=0 && bezObrazkow ){
              doDodania +='<p class="sentence">[GRAFIKA PRZED]</p>'     
      }else if(plikiMultimediow.indexOf(filmPrzed)>=0 && bezObrazkow && bezOpisu){
                doDodania +='<p class="no_sentence">[FILM PRZED]</p>'
      }else if(plikiMultimediow.indexOf(filmPrzed)>=0 && bezObrazkow ){
                doDodania +='<p class="sentence">[FILM PRZED]</p>'    
      }else if((plikiMultimediow.indexOf(filmPrzed)===-1)&&(plikiMultimediow.indexOf(nazwaPlikuPrzed)===-1)&&bezObrazkow&&bezOpisu){
              doDodania += '<p class="no_sentence">[BRAK MULTIMEDIÓW PRZED]</p>'
      }else if((plikiMultimediow.indexOf(filmPrzed)===-1)&&(plikiMultimediow.indexOf(nazwaPlikuPrzed)===-1)&&bezOpisu){
             doDodania += '<p class="sentence">[BRAK MULTIMEDIÓW PRZED]</p>'
      }else if((plikiMultimediow.indexOf(filmPrzed)===-1)&&(plikiMultimediow.indexOf(nazwaPlikuPrzed)===-1)){
               doDodania += '<p class="multimedia_text">[BRAK MULTIMEDIÓW PRZED]</p>'
      }else  if(plikiMultimediow.indexOf(nazwaPlikuPrzed)>=0){
              doDodania += '<p class="multimedia_text"><img height="120" src="'+multimediaFolder+nazwaPlikuPrzed+'"</p>'
      }
// KONIEC PRZYKŁADU KONIEC PRZYKŁADU

    // if((plikiMultimediow.indexOf(filmPrzed)>=0)&&(plikiMultimediow.indexOf(nazwaPlikuPrzed)>=0)){
    //        doDodania += '<p class="error_text">[BŁĄD: film i grafika występują razem]</p>'
    //        }else  if(plikiMultimediow.indexOf(nazwaPlikuPrzed)>=0 && drukujObrazki){
    //                doDodania += '<p class="multimedia_text"><img height="120" src="'+multimediaFolder+nazwaPlikuPrzed+'"</p>'
    //        }else if(plikiMultimediow.indexOf(nazwaPlikuPrzed)>=0 && (!drukujObrazki)){
    //                doDodania +='<p class="multimedia_text">[GRAFIKA PRZED]</p>'
    //        }else if(plikiMultimediow.indexOf(filmPrzed)>=0 && (!drukujObrazki)){
    //               doDodania += '<p class="multimedia_text">[Film PRZED pytaniem]</p>'        
    //        }else if(plikiMultimediow.indexOf(filmPrzed)>=0 && drukujObrazki){
    //                doDodania += '<br class="multimedia_text"><video controls height="240" src="'+multimediaFolder+filmPrzed+'"></video>'
    //        }else if(plikiMultimediow.indexOf(filmPrzed)>=0 && (!drukujObrazki)){
    //                doDodania += '<p class="multimedia_text">[Film PRZED pytaniem]</p>'
    //        }else if((plikiMultimediow.indexOf(filmPrzed)===-1)&&(plikiMultimediow.indexOf(nazwaPlikuPrzed)===-1)){
    //                doDodania += '<p class="multimedia_text">[BRAK MULTIMEDIÓW PRZED]</p>'
    //        }



  //  //brak multimediow przed
  //   if((plikiMultimediow.indexOf(filmPrzed)===-1)&&(plikiMultimediow.indexOf(nazwaPlikuPrzed)===-1)){
  //     doDodania += '<p>[BRAK MULTIMEDIÓW PRZED]</p>'
  //   }
  //   //film i grafika razem
  //   if((plikiMultimediow.indexOf(filmPrzed)>=0)&&(plikiMultimediow.indexOf(nazwaPlikuPrzed)>=0)){
  //     doDodania += '<p>[BŁĄD: film i grafika występują razem]</p>'
  //   }
  //   //film przed pytaniem
  //   if(plikiMultimediow.indexOf(filmPrzed)>=0 && (!drukujObrazki)){
  //     doDodania += '<p>[Film PRZED pytaniem]</p>'
  //   }
  //   if(plikiMultimediow.indexOf(filmPrzed)>=0 && drukujObrazki){
  //     doDodania += '<br><video controls height="240" src="'+multimediaFolder+filmPrzed+'"></video>'
  //   }

  //   //grafika przed pytaniem
  //   if(plikiMultimediow.indexOf(nazwaPlikuPrzed)>=0 && drukujObrazki){
  //     doDodania += '<br><img height="120" src="'+multimediaFolder+nazwaPlikuPrzed+'">'
  //   }
  //   if(plikiMultimediow.indexOf(nazwaPlikuPrzed)>=0 && (!drukujObrazki)){
  //     doDodania +='<p>[GRAFIKA PRZED]</p>'
  //   }

    // if(ciekawostkaPrzed.length===0){
    //   doDodania +=	'<p><b><strong>[Brak ciekawostki przed]</strong></b><br /></p>';
    // }else{
    // doDodania +=	'<p><b><strong>Ciekawostka przed:</strong></b><br />'+ciekawostkaPrzed+'</p>';
    // }
    doDodania +=            '<h3 class="question"><b>'+pytanie+'</b></h3>';
    doDodania +=		'<ul>';
    doDodania +=			'<li class="correct_answer"><b>'+odpowiedzPrawidlowa+'</b></li>';
    doDodania +=			'<li class="answers">'+pozostaleOdpowiedzi1+'</li>';
    doDodania +=			'<li class="answers">'+pozostaleOdpowiedzi2+'</li>';
    doDodania +=			'<li class="answers">'+pozostaleOdpowiedzi3+'</li>';
    doDodania +=		'</ul>';
    // if(ciekawostkaPo.length===0){
    //   doDodania +=		'<p><strong><b>[Brak ciekawostki po]</b></strong><br />'
    // }else{
    // doDodania +=		'<p><strong><b>Ciekawostka po:</b></strong><br />'+ciekawostkaPo;
    // }
    // doDodania +=        '</p>';

    var nazwaPlikuPo = String(i)+"-post.jpg";



    // if((plikiMultimediow.indexOf(filmPo)>=0)&&(plikiMultimediow.indexOf(nazwaPlikuPo)>=0)){
    //   doDodania += '<p class="error_text">[BŁĄD: film i grafika występują razem]</p>'
    //   }else if(plikiMultimediow.indexOf(nazwaPlikuPo)>=0 && drukujObrazki){
    //           doDodania += '<p class="multimedia_text"><img height="120" src="'+multimediaFolder+nazwaPlikuPo+'"</p>'
    //   }else if(plikiMultimediow.indexOf(nazwaPlikuPo)>=0 && (!drukujObrazki)){
    //           doDodania +='<p class="multimedia_text">[GRAFIKA PO]</p>'
    //   }else if(plikiMultimediow.indexOf(filmPo)>=0 && drukujObrazki){
    //           doDodania += '<br class="multimedia_text"><video controls height="240" src="'+multimediaFolder+filmPo+'"></video>'
    //   }else if(plikiMultimediow.indexOf(filmPo)>=0 && (!drukujObrazki)){
    //           doDodania += '<p class="multimedia_text">[FILM PO PYTANIU]</p>'
    //   }else if((plikiMultimediow.indexOf(filmPo)===-1)&&(plikiMultimediow.indexOf(nazwaPlikuPo)===-1)){
    //           doDodania += '<p class="multimedia_text">[BRAK MULTIMEDIÓW PO]</p>'
    //   }



    // //brak multimediow po
    // if((plikiMultimediow.indexOf(filmPo)===-1)&&(plikiMultimediow.indexOf(nazwaPlikuPo))===-1){
    //   doDodania += '<p>[BRAK MULTIMEDIÓW PO]</p>'
    // }
    // //film i grafika razem
    // if((plikiMultimediow.indexOf(filmPo)>=0)&&(plikiMultimediow.indexOf(nazwaPlikuPo))>=0){
    //   doDodania += '<p>[BŁĄD: film i grafika występują razem]</p>'
    // }
    //  //film po pytaniu
    //  if(plikiMultimediow.indexOf(filmPo)>=0 && (!drukujObrazki)){
    //   doDodania += '<p>[FILM PO PYTANIU]</p>'
    // }
    // if(plikiMultimediow.indexOf(filmPo)>=0 && drukujObrazki){
    //   doDodania += '<br><video controls height="240" src="'+multimediaFolder+filmPo+'"></video>'
    // }
    // //grafika po pytaniu
    // if(plikiMultimediow.indexOf(nazwaPlikuPo)>=0 && drukujObrazki){
    //   doDodania += '<br><img height="120" src="'+multimediaFolder+nazwaPlikuPo+'">'
    // }
    // if(plikiMultimediow.indexOf(nazwaPlikuPo)>=0 && (!drukujObrazki)){
    //   doDodania +='<p>[GRAFIKA PO]</p>'
    // } 

    doDodania +=	'<hr />';
    return doDodania;
}

function pytania(){
    for(let i=pominPierwszeX+1;i<=questionData.length;i++){
        
       dodajDoHtml(pytanie(i));
    }
};


function poczatek(){
var doDodania = "";
doDodania += '<html>';
doDodania +=  '<head>';
doDodania += '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
doDodania += '<META NAME="robots" CONTENT="noindex,nofollow">';
doDodania += '<link rel="stylesheet" href="css/main.css"></link>'
doDodania += '</head>';
doDodania += '<body>';
doDodania += '<style>';
doDodania += 'body, td, p {';
		doDodania += 'font-size: 14pt;';
        doDodania += '}';
doDodania += '</style>'
dodajDoHtml(doDodania);
}

function koniec(){
    var doDodania = "";
    doDodania += '</body>';
    doDodania +=  '</html>';
    
    dodajDoHtml(doDodania);
}

function komunikatOZlych(){
  var doDodania = "";

  var zle = wykryjZle(plikiMultimediow);

  if(zle.length>0){
    doDodania += '<h1>Wykryto zle</h1>';

    doDodania += '<strong>';

    for(var i = 0; i < zle.length ; i++){
      doDodania += zle[i] + ' ';

    }

    doDodania += '</strong>';

  }
  
  dodajDoHtml(doDodania);
}

function main(){
    komunikatOZlych();
    poczatek();

    pytania();
    koniec();
    console.log(calyKodHtml);
}
main();





