window.onload = function()
{
	
	inicio();
}
//var debug = "";
//Inicio de la aplición...
function inicio()
{
	vectorMinMAX = [];
	var terminaJuego = false; 
	var puntuaJuego = [0, 0];
	var turnos = 0; 
	var conMinMax = 1; 
	var txtFichas = ["<img src='img/esfera_am.png'  WIDTH=30 HEIGHT=30 />", "<img src='img/esfera_ro.png'  WIDTH=30 HEIGHT=30 />"];
	var fichaJugador = 1;
	var pc = 0;

	var tmpNumerodeCiclos = 0;
	var realizaDebug = false;

	function creaEscenario()
	{
		var txt = "<table id = 'chess_board' cellpadding = '0' cellspacing = '0'>";
		var divTabla = "";
		for(var i = 0; i < 6; i++)
		{
			txt += "<tr>";
			for(var c = 0; c < 6; c++)
			{
				divTabla = i + "_" + c;
				txt += "<td id = '"+(divTabla)+"'></td>";
				vectorMinMAX.push(0); //Nuevo...
				//console.log('vectorMinMAX'+ vectorMinMAX);
			}
			txt += "</tr>";
		}
		txt += "</table>";
		return txt;
	}
	nom_div("escenario").innerHTML = creaEscenario();
	for(var i = 0; i < 6; i++)
	{
		for(var c = 0; c < 6; c++)
		{
			nom_div(i + "_" + c).addEventListener('click', function(event)
			{
				//debug = event;
				var pos = event.target.id.split("_");
				
				if(nom_div(this.id).innerHTML == "" && !terminaJuego)
				{
			
					nom_div(this.id).innerHTML = txtFichas[fichaJugador - 1];
					procesarJugada(fichaJugador, 1);
				}
			});
		}
	}
	function juegaPC()
	{
		
		var fila = 0;
		var columna = 0;
		var pc = 0;
		var fichaPC = 1;

		if(fichaJugador == 1)
		{
			fichaPC = 2;
		}
		do
		{
			pc = Math.floor((Math.random() * 36) + 1);
			if(pc <= 6 )
			{
				fila = 0;
				columna = pc - 1;
			}
			else
			{ 
               
				if(pc <= 6)
				{
					fila = Math.floor((Math.random() * 5) + 1);
					columna = Math.floor((Math.random() * 5) + 1);;
				}
				else 
				{
					fila = Math.floor((Math.random() * 5) + 1);
					columna = Math.floor((Math.random() * 5) + 1);
				}
			}
			if(nom_div( fila+"_"+columna ).innerHTML == "" && !terminaJuego)
			{
				nom_div(fila+"_"+columna).innerHTML = txtFichas[fichaPC - 1];
				posMinMax(fila, columna, 2);
				procesarJugada(fichaPC, 2);
				break;
			}
		}while(1);
	}

	function posMinMax(fila, columna, jugador)
	{
		var ind = 0;
	
		if(fila == 0)
		{
			ind = columna; //2
			
		}
		else
		{
			if(fila == 1)
			{
				ind = columna + 6;
				
			}
			else
			{
				ind = columna + 6;
				
			}
		}
		vectorMinMAX[ind] = jugador;
		console.log('vector'+ vectorMinMAX[ind] );
	}

	/*
	1 = Ganó el PC..
	0 = Empatados...
	-1 = Ganó Humano...
	*/

	function procesarJugada(fichaLlega, jugador)
	{    
		
		var nomJugador = ["Humano", "PC"];
		var hayTriqui = revisarTriqui(jugador);
		var quedaTablas = entablas();
		var txtPuntua = "";
		//No hay triqui y además hay espacio
		if(!hayTriqui && !quedaTablas)
		{
			if(jugador == 1)//El HUMANO!!
			{
				if(Number(conMinMax) === 1)
				{
					movimientoPC();
				}
				else
				{
					juegaPC();
				}
			}
		}
		else
		{
			if(hayTriqui)
			{
				
				//console.log("EL jugador triqui es: " + jugador);
				puntuaJuego[jugador - 1]++;
				txtPuntua = "Humano = "+(puntuaJuego[0])+" - PC = " + puntuaJuego[1];
				nom_div("puntuacion").innerHTML = txtPuntua;
				alert("Ha hecho triqui El " + nomJugador[jugador - 1]);
			}
			else
			{
				alert("El juego ha quedao en Tablas");
			}
			terminaJuego = true;
		}
	}

		function revisarTriqui(ficha)
	{   
		
		//HORIZONTAL		
    var estriqui = (vectorMinMAX[0] == ficha && vectorMinMAX[1] == ficha && vectorMinMAX[2]==ficha && vectorMinMAX[3] == ficha );
		estriqui = estriqui || (vectorMinMAX[2]==ficha && vectorMinMAX[3] == ficha     && vectorMinMAX[4] == ficha && vectorMinMAX[5] == ficha);
		estriqui = estriqui || (vectorMinMAX[6] == ficha && vectorMinMAX[7] == ficha   && vectorMinMAX[8]==ficha && vectorMinMAX[9] == ficha );
		estriqui = estriqui || (vectorMinMAX[8] == ficha && vectorMinMAX[9] == ficha   && vectorMinMAX[10]==ficha && vectorMinMAX[11] == ficha );
		estriqui = estriqui || (vectorMinMAX[12] == ficha && vectorMinMAX[13] == ficha && vectorMinMAX[14] == ficha && vectorMinMAX[15] == ficha);
		estriqui = estriqui || (vectorMinMAX[14] == ficha && vectorMinMAX[15] == ficha && vectorMinMAX[16] == ficha && vectorMinMAX[17] == ficha);
		estriqui = estriqui || (vectorMinMAX[18] == ficha && vectorMinMAX[19] == ficha && vectorMinMAX[20] == ficha && vectorMinMAX[21] == ficha);
		estriqui = estriqui || (vectorMinMAX[20] == ficha && vectorMinMAX[21] == ficha && vectorMinMAX[22] == ficha && vectorMinMAX[23] == ficha);
		estriqui = estriqui || (vectorMinMAX[24] == ficha && vectorMinMAX[25] == ficha && vectorMinMAX[26] == ficha && vectorMinMAX[27] == ficha);
		estriqui = estriqui || (vectorMinMAX[26] == ficha && vectorMinMAX[27] == ficha && vectorMinMAX[28] == ficha && vectorMinMAX[29] == ficha);
		estriqui = estriqui || (vectorMinMAX[30] == ficha && vectorMinMAX[31] == ficha && vectorMinMAX[32] == ficha && vectorMinMAX[33] == ficha);
		estriqui = estriqui || (vectorMinMAX[32] == ficha && vectorMinMAX[33] == ficha && vectorMinMAX[34] == ficha && vectorMinMAX[35] == ficha);
		
		//VERTICALES
		estriqui = estriqui || (vectorMinMAX[0] == ficha && vectorMinMAX[6] == ficha && vectorMinMAX[12]==ficha  && vectorMinMAX[18]==ficha);
		estriqui = estriqui || (vectorMinMAX[12]==ficha  && vectorMinMAX[18]==ficha && vectorMinMAX[24]==ficha && vectorMinMAX[30]==ficha);
		estriqui = estriqui || (vectorMinMAX[1] == ficha && vectorMinMAX[7] == ficha && vectorMinMAX[13]==ficha  && vectorMinMAX[19]==ficha );
		estriqui = estriqui || (vectorMinMAX[13]==ficha  && vectorMinMAX[19]==ficha && vectorMinMAX[25]==ficha && vectorMinMAX[31]==ficha);
		estriqui = estriqui || (vectorMinMAX[2] == ficha && vectorMinMAX[8] == ficha && vectorMinMAX[14]==ficha  && vectorMinMAX[20]==ficha );
		estriqui = estriqui || (vectorMinMAX[14]==ficha  && vectorMinMAX[20]==ficha && vectorMinMAX[26]==ficha && vectorMinMAX[32]==ficha);
		estriqui = estriqui || (vectorMinMAX[3] == ficha && vectorMinMAX[9] == ficha && vectorMinMAX[15]==ficha  && vectorMinMAX[21]==ficha );
		estriqui = estriqui || (vectorMinMAX[15]==ficha  && vectorMinMAX[21]==ficha && vectorMinMAX[27]==ficha && vectorMinMAX[33]==ficha);
  		estriqui = estriqui || (vectorMinMAX[4] == ficha && vectorMinMAX[10] == ficha && vectorMinMAX[16]==ficha && vectorMinMAX[22]==ficha );
        estriqui = estriqui || (vectorMinMAX[16]==ficha && vectorMinMAX[22]==ficha && vectorMinMAX[28]==ficha && vectorMinMAX[34]==ficha);
		estriqui = estriqui || (vectorMinMAX[5] == ficha && vectorMinMAX[11] == ficha && vectorMinMAX[17]==ficha && vectorMinMAX[23]==ficha );
		estriqui = estriqui || (vectorMinMAX[17]==ficha && vectorMinMAX[23]==ficha && vectorMinMAX[29]==ficha && vectorMinMAX[35]==ficha);
		//DIAGONAlES
		estriqui = estriqui || (vectorMinMAX[0] == ficha && vectorMinMAX[7] == ficha && vectorMinMAX[14]==ficha && vectorMinMAX[21]==ficha );
		estriqui = estriqui || (vectorMinMAX[1] == ficha && vectorMinMAX[8] == ficha && vectorMinMAX[15]==ficha && vectorMinMAX[22]==ficha );
		estriqui = estriqui || (vectorMinMAX[2] == ficha && vectorMinMAX[9] == ficha && vectorMinMAX[16]==ficha && vectorMinMAX[23]==ficha );
		estriqui = estriqui || (vectorMinMAX[6] == ficha && vectorMinMAX[13] == ficha && vectorMinMAX[20]==ficha && vectorMinMAX[27]==ficha );
		estriqui = estriqui || (vectorMinMAX[12] == ficha && vectorMinMAX[19] == ficha && vectorMinMAX[26]==ficha && vectorMinMAX[33]==ficha );

		return estriqui;
		
	}

	function entablas()
	{
		var empatados = true;
		for(var i = 0; i < vectorMinMAX.length; i++)
		{
			if(vectorMinMAX[i] == 0)
			{
				empatados = false;
				break;
			}
		}
		return empatados;
	}
	function movimientoPC()
	{
		tmpNumerodeCiclos = 0;
		console.log(tmpNumerodeCiclos+'#ciclos');
		var posicion = 0;
		var aux, mejor = -9999; // aux = 0;
		for (var i = 0; i < 36;i++) //i == 1...
		{                      
			if (vectorMinMAX[i] == 0)
			{
				vectorMinMAX[i] = 2; //Juega el PC...	ç
                
				if(realizaDebug)
				{
					tmpNumerodeCiclos++;
					console.log("movimientoPC: " + tmpNumerodeCiclos + " Minimax: " + vectorMinMAX);
				}

				aux = Min(); //
				if (aux > mejor)
				{
					mejor = aux;
					posicion = i;
				
				}
				vectorMinMAX[i] = 0; 			}
		}
		
		var fila = columna = 0;
		var posTablero = posicion + 1;
		

		if(posTablero <= 6)
		{
			fila = 0;
			columna = posTablero - 1;
		}
		else
		{
			if(posTablero <= 36)

			{
				fila = Math.floor((Math.random() * 5) + 1);
				columna = Math.floor((Math.random() * 5) + 1);
				//console.log(columna)
			}
			else
			{
				fila = Math.floor((Math.random() * 5) + 1);
				columna = Math.floor((Math.random() * 5) + 1);
				//console.log(fila+"_"+columna)
			}
		}
		var fichaPC = 1;
		if(fichaJugador == 1)
		{
			fichaPC = 2;
		}
		nom_div(fila+"_"+columna).innerHTML = txtFichas[fichaPC - 1];
		vectorMinMAX[posicion] = 2;
		procesarJugada(fichaPC, 2);
 	}
 	function Min()
	{
		
		if(revisarTriqui(2)) return 1;
		if(entablas()) return 0; 
		var aux, mejor = 9999;
		
		for (var i=0;i<6;i++)//2, 4
		{
			if (vectorMinMAX[i] == 0)
			{
				
				vectorMinMAX[i] = 1; //Juega el HUMANO...	
			
				if(realizaDebug)
				{
					tmpNumerodeCiclos++;
					console.log("Min: " + tmpNumerodeCiclos + " Minimax: " + vectorMinMAX);
				}
				aux = Max();
				if (aux < mejor)
				{
					mejor = aux;
				}
				vectorMinMAX[i] = 0;
			}
		}
		return mejor;
	}

	function Max()
	{
		if(revisarTriqui(1)) return -1;
		if(entablas()) return 0;
		var aux, mejor = 0;
		for (var i=0;i<6;i++)//3, 5
		{
			//console.log(vectorMinMAX);
			if (vectorMinMAX[i] == 0)
			{
				vectorMinMAX[i] = 2; //Juega el PC...	
				if(realizaDebug)
				{
					tmpNumerodeCiclos++;
					console.log("Max: " + tmpNumerodeCiclos + " Minimax: " + vectorMinMAX);
				}
				aux = Min();
				if (aux > mejor)
				{
					mejor = aux;
				}
				vectorMinMAX[i] = 0;
			}
		}
		return mejor;
	};
   
}
function nom_div(div)
{
	return document.getElementById(div);
} 
