var matriz= [[],[],[],[],[],[]];
var localizador= document.getElementById("tablero");
var nivel = 1;
var rover= {
    x: 5,
    y:0
}

for (let i = 0; i < matriz.length; i++) {

    for (let j = 0; j < 7; j++) {

        matriz[i].push(false);
    }
}

for (let i = 0; i < matriz.length; i++) {

    let fila="<div class='row'>";

    for (let j = 0; j < matriz[i].length; j++) {

        if (i==0 && j==6){
            fila+="<div id=i+'|'+j class='col'>&#128999</div>";
        }else if (i==5 && j==0){

            if(matriz[5][2]===true || matriz[3][0]===true){
                fila+="<div id=i+'|'+j class='col'>&#129000</div>";
            }else if (matriz[5][1]===true || matriz[4][0]===true){
                fila+="<div id=i+'|'+j class='col'>&#128997</div>";
            }else{
                fila+="<div id=i+'|'+j class='col'>&#129001</div>";
            }

        }else{
            fila+="<div id=i+'|'+j class='col'>&#10068;</div>";
        }

    }
    fila+="</div>";
    localizador.innerHTML+=fila;
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

function pintar() {

    var obj= document.getElementById(rover.y+'|'+rover.x);
    //esquina superior izquierda
    if(rover.x==0 && rover.y==0){

        //para el color amarillo
        if (matriz[rover.y+2][rover.x]== true || matriz[rover.y][rover.x+2]== true){

            obj.innerHTML="&#128993;";
        }

        //para el color rojo
        else if (matriz[rover.y+1][rover.x]== true || matriz[rover.y][rover.x+1]== true){

            obj.innerHTML="&#128308;";

        //para el color verde
        }else{

            obj.innerHTML="&#128994;";

        }

        //esquina inferior derecha
    }else if((rover.y==5 && rover.x==6)){

        //amarillo
        if (matriz[rover.y-2][rover.x]== true || matriz[rover.y][rover.x-2]== true){

            obj.innerHTML="&#128993;";

        //rojo
        }else if (matriz[rover.y-1][rover.x]== true || matriz[rover.y][rover.x-1]== true){

            obj.innerHTML="&#128308;";
        //verde
        }else{

            obj.innerHTML="&#128994;";
        }

     //controlamos la casilla de salida
    }else if((rover.y==5 && rover.x==0)) {

        //amarillo
        if (matriz[rover.y-2][rover.x]==true || matriz[rover.y][rover.x+2]== true) {

            obj.innerHTML="&#128993;";
        //rojo
        }else if (matriz[rover.y-1][rover.x]== true || matriz[rover.y][rover.x+1]== true){

            obj.innerHTML="&#128308;";
        //verde
        }else{

            obj.innerHTML="&#128994;";
        }

     //controlamos laterales izquierdos (sin esquinas izquierdas)
    }else if((rover.x==0)){

        if (matriz[rover.y+2][rover.x]== true|| matriz[rover.y-2][rover.x]== true || matriz[rover.y][rover.x+2]== true){

            obj.innerHTML="&#128993;";
        }else if (matriz[rover.y+1][rover.x]== true|| matriz[rover.y-1][rover.x]== true || matriz[rover.y][rover.x+1]== true){

            obj.innerHTML="&#128308;";
        }else{

        obj.innerHTML="&#128994;";
        }

    //controlamos laterales superiores
    }else if(rover.y==0){

        if (matriz[rover.y+2][rover.x]== true|| matriz[rover.y][rover.x-2]== true || matriz[rover.y][rover.x+2]== true){

            obj.innerHTML="&#128993;";
        }else if (matriz[rover.y+1][rover.x]== true|| matriz[rover.y][rover.x-1]== true || matriz[rover.y][rover.x+1]== true){

            obj.innerHTML="&#128308;";
        }else{

            obj.innerHTML="&#128994;";
        }


        //controlamos laterales derechos (sin esquinas derechas)
    }else if(matriz.x==5){

        if (matriz[rover.y-2][rover.x]== true|| matriz[rover.y+2][rover.x]== true || matriz[rover.y][rover.x-2]== true){

            obj.innerHTML="&#128993;";
        }else if (matriz[rover.y-1][rover.x]== true|| matriz[rover.y+1][rover.x]== true || matriz[rover.y][rover.x-1]== true){

            obj.innerHTML="&#128308;";
        }else{

            obj.innerHTML="&#128994;";
        }

        //controlamos laterales inferiores
    }else if(rover.y==5){

        if (matriz[rover.y-2][rover.x]== true|| matriz[rover.y][rover.x-2]== true || matriz[rover.y][rover.x+2]== true ){

            obj.innerHTML="&#128993;";
        }else if (matriz[rover.y-1][rover.x]== true|| matriz[rover.y][rover.x-1]== true || matriz[rover.y][rover.x+1]== true ){

            obj.innerHTML="&#128308;";
        }else{

            obj.innerHTML="&#128994;";
        }

        /*controlamos las demás casillas */
    }else {

        if (matriz[rover.y-2][rover.x]== true|| matriz[rover.y][rover.x-2]== true || matriz[rover.y][rover.x+2]== true ){

            obj.innerHTML="&#128993;";
        }else if ((matriz[rover.y - 1][rover.x] == true || matriz[rover.y][rover.x - 1] == true ||
         matriz[rover.y][rover.x + 1] == true || matriz[rover.y + 1][rover.x] == true)) {

         obj.innerHTML="&#128308;";

        }else{

            obj.innerHTML="&#128994;";
        }

    }
}