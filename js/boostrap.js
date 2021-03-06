var matriz= [[],[],[],[],[],[]];
var localizador= document.getElementById("tablero");
var nivel = 1;

var rover= {
    x: 0,
    y:5
}



for (let i = 0; i < matriz.length; i++) {

    for (let j = 0; j < 7; j++) {

        matriz[i].push(false);
    }
}

function play() {

    var objeto= document.getElementById("tablero");
    objeto.innerHTML="";

    rover.x=0;
    rover.y=5;

    for (let i = 0; i < matriz.length; i++) {

        let fila="<div class='row'>";

        for (let j = 0; j < matriz[i].length; j++) {

            if (i==0 && j==6){
                fila+="<div id="+i+"-"+j+" class='col'>&#128999</div>";
            }else if (i==5 && j==0){

                if(matriz[5][2]===true || matriz[3][0]===true){
                    fila+="<div id="+i+"-"+j+" class='col'>&#129000</div>";
                }else if (matriz[5][1]===true || matriz[4][0]===true){
                    fila+="<div id="+i+"-"+j+" class='col'>&#128997</div>";
                }else{
                    fila+="<div id="+i+"-"+j+" class='col'>&#129001</div>";
                }

            }else{
                fila+="<div id="+i+"-"+j+" class='col'>&#10068;</div>";
            }

        }
        fila+="</div>";
        localizador.innerHTML+=fila;
    }

    switch (nivel){

        case 1:

            bombasAlea(5);

            break;

        case 2:

            bombasAlea(7);


            break;

        case 3:

            bombasAlea(9);


            break;

        case 4:

            bombasAlea(12);


            break;

        case 5:

            bombasAlea(15);


            break;

    }

}




function bombasAlea(contador) {

    var colocar= Math.round((Math.random() * 1));
    var bombas= 0;

    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {

            colocar=Math.round((Math.random() * 1));

            if(colocar==1 && bombas<contador){

                matriz[i][j]= true;
                bombas+=1;
            }


            if(bombas==contador){
                break;
            }
            //con esto controlamos los bordes y esquinas
            //esquina superior izquierda
            if(i==0 && j==0){

                if ((matriz[i+1][j]== true || matriz[i][j+1]== true) && colocar==1){

                     matriz[i][j]=false;
                     bombas-=1;
                }

            //esquina superior derecha
            }else if((i==0 && j==6)){

                if(matriz[i][j]== true){

                    matriz[i][j]=false;
                    bombas-=1;
                }

            //esquina inferior derecha
            }else if((i==5 && j==6)){

                if ((matriz[i-1][j]== true || matriz[i][j-1]== true) && colocar==1){

                    matriz[i][j]=false;
                    bombas-=1;
                }

            //esquina inferior izquierda
            }else if((i==5 && j==0)){

                if(matriz[i][j]== true){

                    matriz[i][j]=false;
                    bombas-=1;
                }

            //controlamos laterales izquierdos (sin esquinas izquierdas)
            }else if((j==0)){

                if ((matriz[i+1][j]== true|| matriz[i-1][j]== true || matriz[i][j+1]== true)  && colocar==1){

                    matriz[i][j]=false;
                    bombas-=1;
                }

            //controlamos laterales superiores
            }else if((i==0) && colocar==1){

                if (matriz[i+1][j]== true|| matriz[i][j-1]== true || matriz[i][j+1]== true){

                    matriz[i][j]=false;
                    bombas-=1;
                }


             //controlamos laterales derechos (sin esquinas derechas)
            }else if((j==5) && colocar==1){

            if (matriz[i-1][j]== true|| matriz[i+1][j]== true || matriz[i][j-1]== true){

                matriz[i][j]=false;
                bombas-=1;
            }

            //controlamos laterales inferiores
            }else if((i==5) && colocar==1){

                if (matriz[i-1][j]== true|| matriz[i][j-1]== true || matriz[i][j+1]== true ){

                    matriz[i][j]=false;
                    bombas-=1;
                }

            /*controlamos las demás casillas */
            }else {

                if (colocar == 1) {

                if ((matriz[i - 1][j] == true || matriz[i][j - 1] == true || matriz[i][j + 1] == true || matriz[i + 1][j] == true)) {

                    matriz[i][j] = false;
                    bombas -= 1;
                }
                }
            }


            //controlamos que la entrada y la salida no estén rodeadas de bombas
            if((i==1 && j==6) && matriz[0][5]==true && colocar==1){

                matriz[i][j]==false;
            }

            if((i==5 && j==1) && matriz[4][0]==true && colocar==1){

                matriz[i][j]==false;
            }
        }

    }

}


function pintar() {

    var obj= document.getElementById(rover.y+'-'+rover.x);
    //esquina superior izquierda
    if(rover.x==0 && rover.y==0){

        //para el color rojo
        if (matriz[rover.y+1][rover.x]== true || matriz[rover.y][rover.x+1]== true){

            obj.style.backgroundColor= "red";
        }

        //para el color amarillo
        else if (matriz[rover.y+2][rover.x]== true || matriz[rover.y][rover.x+2]== true){


            obj.style.backgroundColor= "yellow";

        //para el color verde
        }else{

            obj.style.backgroundColor= "green";

        }

        //esquina inferior derecha
    }else if((rover.y==5 && rover.x==6)){

        //rojo
      if (matriz[rover.y-1][rover.x]== true || matriz[rover.y][rover.x-1]== true){

            obj.style.backgroundColor= "red";

        //amarillo
        }else if (matriz[rover.y-2][rover.x]== true || matriz[rover.y][rover.x-2]== true){

          obj.style.backgroundColor= "yellow";
        //verde
        }else{

            obj.style.backgroundColor= "green";
        }

     //controlamos la casilla de salida
    }else if((rover.y==5 && rover.x==0)) {

        //amarillo
        if (matriz[rover.y-1][rover.x]== true || matriz[rover.y][rover.x+1]== true){

            obj.style.backgroundColor= "red";
        //rojo
        }else if (matriz[rover.y-2][rover.x]==true || matriz[rover.y][rover.x+2]== true) {

            obj.style.backgroundColor= "yellow";
        //verde
        }else{

            obj.style.backgroundColor= "green";
        }

     //controlamos laterales izquierdos (sin esquinas izquierdas)
    }else if((rover.x==0)){

        if(rover.y== 4){

            if (matriz[rover.y + 1][rover.x] == true || matriz[rover.y - 1][rover.x] == true || matriz[rover.y][rover.x + 1] == true) {

                obj.style.backgroundColor = "red";
            } else if (matriz[rover.y - 2][rover.x] == true || matriz[rover.y][rover.x + 2] == true) {

                obj.style.backgroundColor = "yellow";
            } else {

                obj.style.backgroundColor = "green";
            }

        }if(rover.y== 1){

            if (matriz[rover.y + 1][rover.x] == true || matriz[rover.y - 1][rover.x] == true || matriz[rover.y][rover.x + 1] == true) {

                obj.style.backgroundColor = "red";

            } else if (matriz[rover.y + 2][rover.x] == true || matriz[rover.y][rover.x + 2] == true) {

            obj.style.backgroundColor = "yellow";
            } else {

                obj.style.backgroundColor = "green";
            }

        }else {

            if (matriz[rover.y + 1][rover.x] == true || matriz[rover.y - 1][rover.x] == true || matriz[rover.y][rover.x + 1] == true) {

                obj.style.backgroundColor = "red";

            } else if (matriz[rover.y + 2][rover.x] == true || matriz[rover.y - 2][rover.x] == true || matriz[rover.y][rover.x + 2] == true) {

            obj.style.backgroundColor = "yellow";
            } else {

                obj.style.backgroundColor = "green";
            }
        }
    //controlamos laterales superiores
    }else if(rover.y==0){

        if(rover.x== 5){

            if (matriz[rover.y+1][rover.x]== true|| matriz[rover.y][rover.x-1]== true || matriz[rover.y][rover.x+1]== true) {

                obj.style.backgroundColor = "red";

            } else if (matriz[rover.y+2][rover.x]== true|| matriz[rover.y][rover.x-2]== true) {

            obj.style.backgroundColor = "yellow";
            } else {

                obj.style.backgroundColor = "green";
            }

        }if(rover.x== 1){

            if (matriz[rover.y+1][rover.x]== true|| matriz[rover.y][rover.x-1]== true || matriz[rover.y][rover.x+1]== true) {

                obj.style.backgroundColor = "red";

            } else if (matriz[rover.y+2][rover.x]== true|| matriz[rover.y][rover.x+2]== true) {

            obj.style.backgroundColor = "yellow";
            } else {

                obj.style.backgroundColor = "green";
            }

        } else{

            if (matriz[rover.y+1][rover.x]== true|| matriz[rover.y][rover.x-1]== true || matriz[rover.y][rover.x+1]== true){

                obj.style.backgroundColor= "red";

            }else  if (matriz[rover.y+2][rover.x]== true|| matriz[rover.y][rover.x-2]== true || matriz[rover.y][rover.x+2]== true){

            obj.style.backgroundColor= "yellow";
            }else{

                obj.style.backgroundColor= "green";
            }

        }



        //controlamos laterales derechos (sin esquinas derechas)
    }else if(matriz.x==5){

        if(rover.y== 4){

            if (matriz[rover.y - 2][rover.x] == true || matriz[rover.y][rover.x - 2] == true) {

                obj.style.backgroundColor = "yellow";
            } else if (matriz[rover.y + 1][rover.x] == true || matriz[rover.y - 1][rover.x] == true || matriz[rover.y][rover.x - 1] == true) {

                obj.style.backgroundColor = "red";
            } else {

                obj.style.backgroundColor = "green";
            }

        }if(rover.y== 1){

            if (matriz[rover.y + 2][rover.x] == true || matriz[rover.y][rover.x - 2] == true) {

                obj.style.backgroundColor = "yellow";
            } else if (matriz[rover.y + 1][rover.x] == true || matriz[rover.y - 1][rover.x] == true || matriz[rover.y][rover.x - 1] == true) {

                obj.style.backgroundColor = "red";
            } else {

                obj.style.backgroundColor = "green";
            }

        }else{

            if (matriz[rover.y-2][rover.x]== true|| matriz[rover.y+2][rover.x]== true || matriz[rover.y][rover.x-2]== true){

                obj.style.backgroundColor= "yellow";
            }else if (matriz[rover.y-1][rover.x]== true|| matriz[rover.y+1][rover.x]== true || matriz[rover.y][rover.x-1]== true){

                obj.style.backgroundColor= "red";
            }else{

                obj.style.backgroundColor= "green";
            }
        }

        //controlamos laterales inferiores
    }else if(rover.y==5){

        if(rover.x== 5){

            if (matriz[rover.y-2][rover.x]== true|| matriz[rover.y][rover.x-2]== true) {

                obj.style.backgroundColor = "yellow";
            } else if (matriz[rover.y-1][rover.x]== true|| matriz[rover.y][rover.x-1]== true || matriz[rover.y][rover.x+1]== true) {

                obj.style.backgroundColor = "red";
            } else {

                obj.style.backgroundColor = "green";
            }

        }if(rover.x== 1){

            if (matriz[rover.y-2][rover.x]== true|| matriz[rover.y][rover.x+2]== true) {

                obj.style.backgroundColor = "yellow";
            } else if (matriz[rover.y-1][rover.x]== true|| matriz[rover.y][rover.x-1]== true || matriz[rover.y][rover.x+1]== true) {

                obj.style.backgroundColor = "red";
            } else {

                obj.style.backgroundColor = "green";
            }

        }else{

            if (matriz[rover.y-2][rover.x]== true|| matriz[rover.y][rover.x-2]== true || matriz[rover.y][rover.x+2]== true ){

                obj.style.backgroundColor= "yellow";
            }else if (matriz[rover.y-1][rover.x]== true|| matriz[rover.y][rover.x-1]== true || matriz[rover.y][rover.x+1]== true ){

                obj.style.backgroundColor= "red";
            }else{

                obj.style.backgroundColor= "green";
            }

        }

        /*controlamos las demás casillas */
    }else {

        if (rover.y==4 && rover.x== 1){

            if (matriz[rover.y - 2][rover.x] == true || matriz[rover.y][rover.x + 2] == true) {

                obj.style.backgroundColor = "yellow";
            } else if (matriz[rover.y - 1][rover.x] == true || matriz[rover.y][rover.x - 1] == true ||
                matriz[rover.y][rover.x + 1] == true || matriz[rover.y + 1][rover.x] == true) {

                obj.style.backgroundColor = "red";
            } else {

                obj.style.backgroundColor = "green";
            }

        }else if (rover.y==4 && rover.x== 5){

            if (matriz[rover.y - 2][rover.x] == true || matriz[rover.y][rover.x - 2] == true ) {

                obj.style.backgroundColor = "yellow";
            } else if (matriz[rover.y - 1][rover.x] == true || matriz[rover.y][rover.x - 1] == true ||
                matriz[rover.y][rover.x + 1] == true || matriz[rover.y + 1][rover.x] == true) {

                obj.style.backgroundColor = "red";
            } else {

                obj.style.backgroundColor = "green";
            }

        }else if(rover.y==1 && rover.x== 1){

            if (matriz[rover.y][rover.x + 2] == true || matriz[rover.y][rover.x + 2] == true) {

                obj.style.backgroundColor = "yellow";
            } else if (matriz[rover.y - 1][rover.x] == true || matriz[rover.y][rover.x - 1] == true ||
                matriz[rover.y][rover.x + 1] == true || matriz[rover.y + 1][rover.x] == true) {

                obj.style.backgroundColor = "red";
            } else {

                obj.style.backgroundColor = "green";
            }

        }else if(rover.y==1 && rover.x== 5){

            if (matriz[rover.y + 2][rover.x] == true || matriz[rover.y][rover.x - 2] == true) {

                obj.style.backgroundColor = "yellow";
            } else if (matriz[rover.y - 1][rover.x] == true || matriz[rover.y][rover.x - 1] == true ||
                matriz[rover.y][rover.x + 1] == true || matriz[rover.y + 1][rover.x] == true) {

                obj.style.backgroundColor = "red";
            } else {

                obj.style.backgroundColor = "green";
            }

        } else if(rover.y== 4){

            if (matriz[rover.y - 2][rover.x] == true || matriz[rover.y][rover.x - 2] == true || matriz[rover.y][rover.x + 2] == true) {

                obj.style.backgroundColor = "yellow";
            } else if (matriz[rover.y - 1][rover.x] == true || matriz[rover.y][rover.x - 1] == true ||
                matriz[rover.y][rover.x + 1] == true || matriz[rover.y + 1][rover.x] == true) {

                obj.style.backgroundColor = "red";
            } else {

                obj.style.backgroundColor = "green";
            }

        } else if(rover.y== 1){

            if (matriz[rover.y + 2][rover.x] == true || matriz[rover.y][rover.x + 2] == true || matriz[rover.y][rover.x - 2] == true) {

                obj.style.backgroundColor = "yellow";
            } else if (matriz[rover.y - 1][rover.x] == true || matriz[rover.y][rover.x - 1] == true ||
                matriz[rover.y][rover.x + 1] == true || matriz[rover.y + 1][rover.x] == true) {

                obj.style.backgroundColor = "red";
            } else {

                obj.style.backgroundColor = "green";
            }

        }else if(rover.x== 5){

            if (matriz[rover.y-2][rover.x]== true|| matriz[rover.y][rover.x-2]== true|| matriz[rover.y+2][rover.x]== true) {

                obj.style.backgroundColor = "yellow";
            } else if (matriz[rover.y - 1][rover.x] == true || matriz[rover.y][rover.x - 1] == true ||
                matriz[rover.y][rover.x + 1] == true || matriz[rover.y + 1][rover.x] == true) {

                obj.style.backgroundColor = "red";
            } else {

                obj.style.backgroundColor = "green";
            }

        } else if(rover.x== 1){

            if (matriz[rover.y-2][rover.x]== true|| matriz[rover.y][rover.x+2]== true|| matriz[rover.y+2][rover.x]== true) {

                obj.style.backgroundColor = "yellow";
            } else if (matriz[rover.y - 1][rover.x] == true || matriz[rover.y][rover.x - 1] == true ||
                matriz[rover.y][rover.x + 1] == true || matriz[rover.y + 1][rover.x] == true) {

                obj.style.backgroundColor = "red";
            } else {

                obj.style.backgroundColor = "green";
            }

        }else{


            if (matriz[rover.y+2][rover.x]== true||matriz[rover.y-2][rover.x]== true||
                matriz[rover.y][rover.x-2]== true || matriz[rover.y][rover.x+2]== true ){

                obj.style.backgroundColor= "yellow";
            }else if ((matriz[rover.y - 1][rover.x] == true || matriz[rover.y][rover.x - 1] == true ||
                matriz[rover.y][rover.x + 1] == true || matriz[rover.y + 1][rover.x] == true)) {

                obj.style.backgroundColor= "red";

            }else{

                obj.style.backgroundColor= "green";
            }

        }


    }
}

function perder(){

    if (matriz[rover.y][rover.x]==true){

        alert("GAME OVER");
        nivel = 1;
        play();

    }

}

function subirNivel() {

    if (rover.y== 0 && rover.x== 6  && nivel<10){

        nivel++;
        play();

    }else if(nivel==10 && rover.y== 0 && rover.x== 6){

        alert("FELICIDADES HAS COMPLETADO EL JUEGO");
    }

}
function moverIzq(){

    if(rover.x!=0){ rover.x-=1;}
    pintar();
    perder();
    subirNivel();

}

function moverDer(){

    if(rover.x!=6){ rover.x+=1;}
    pintar();
    perder();
    subirNivel();
}

function moverArr(){

    if(rover.y!=0){ rover.y-=1;}
    pintar();
    perder();
    subirNivel();
}

function moverAbj(){

    if(rover.y!=5){ rover.y+=1;}
    pintar();
    perder();
    subirNivel();
}

function time(){
    cronometro=setInterval(function() {
        secs--;
        document.getElementById("tiempo").innerHTML=secs;
        if (secs==0){
            clearInterval(cronometro);
            document.getElementById("tiempo").innerHTML=secs;
            tablerodom.innerHTML="<h1>HAS PERDIDO</h1>";
            document.getElementById("controles").style.visibility="hidden";
        }
    },1000)
}