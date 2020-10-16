var matriz= [[],[],[],[],[],[]];
var localizador= document.getElementById("tablero");
var nivel = 1;




for (let i = 0; i < matriz.length; i++) {

    for (let j = 0; j < 7; j++) {

        matriz[i].push(false);
    }
}

for (let i = 0; i < matriz.length; i++) {

    let fila="<div class='row'>";

    for (let j = 0; j < matriz[i].length; j++) {

        if (i==0 && j==6){
            fila+="<div class='col'>&#128999</div>";
        }else if (i==5 && j==0){

            if(matriz[5][2]===true || matriz[3][0]===true){
                fila+="<div class='col'>&#129000</div>";
            }else if (matriz[5][1]===true || matriz[4][0]===true){
                fila+="<div class='col'>&#128997</div>";
            }else{
                fila+="<div class='col'>&#129001</div>";
            }

        }else{
            fila+="<div class='col'>&#11036</div>";
        }

    }
    fila+="</div>";
    localizador.innerHTML+=fila;
}

function bombasAlea(contador) {

    var filaRan= Math.floor((Math.random() * 6));
    var colRan= Math.floor((Math.random() * 7));
    var bombas= 0;
    console.log(filaRan);
    console.log(colRan);


    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {

            if(matriz[i][j]==true){

                bombas+=1;
            }

        }
    }

    if(bombas==0){

        matriz [filaRan][colRan]=true;

    }else{



    if((filaRan== 0 && colRan!= 6)|| (filaRan== 5 && colRan!= 0 ) ){

        if(filaRan==0 || filaRan==5 || colRan==0 || colRan== 6) {


        }else if (matriz[filaRan-1][colRan]!= true && matriz[filaRan+1][colRan]!= true &&
                matriz[filaRan][colRan+1]!= true &&  matriz[filaRan][colRan-1]!= true){

                if((matriz[4][0]!= true && (filaRan== 5 && colRan== 1)) || (matriz[5][1]!= true && (filaRan==4 && colRan== 0))
                (matriz[0][5]!= true && (filaRan== 1 && colRan== 6)) || (matriz[1][6]!= true && (filaRan==0 && colRan== 5))){

                    matriz [filaRan][colRan]=true;
                }else{ contador-=1;}
            }else{ contador-=1;}

    }else{ contador-=1;}

    }
}

switch (nivel){

    case 1:

        for (let i = 0; i < 10; i++) {

            bombasAlea(i);

        }
        break;

    case 2:

        for (let i = 0; i < 15; i++) {

            bombasAlea(i);

        }
        break;

    case 3:

        for (let i = 0; i < 20; i++) {

            bombasAlea(i);

        }
        break;

    case 4:

        for (let i = 0; i < 25; i++) {

            bombasAlea(i);

        }
        break;

    case 5:

        for (let i = 0; i < 30; i++) {

            bombasAlea(i);

        }
        break;

}