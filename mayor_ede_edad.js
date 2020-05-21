let ArrayEdades = new Array();
	
function calcularEdad(){
    let edad = parseInt(document.getElementById("edad").value); 
    let nombre = document.getElementById("nombre").value;
    
    let registro;
    if(Number.isInteger(edad)){
        registro = {'nombre' : nombre, 'edad' : edad};
        ArrayEdades.push(registro);
        if(edad >= 18) {
            document.getElementById("mensaje").innerHTML = nombre + " usted es mayor de edad";
        } else {
            document.getElementById("mensaje").innerHTML = nombre + " usted es menor de edad";
        }
    }else{
        console.log("La edad no es numerica");
    }
}

function calcularIVA(valor){
    let resultado;
    resultado = valor * 0.16;
    return resultado;
}

function imprimirPares(){
    let contador = 0;
    while(contador <= 20){
        if((contador % 2) == 0){ 
            console.log(contador);
        }
        contador++;
    }
    return false;
}

function imprimirImpares(){
	let contador;
    for(contador = 1 ; contador <= 20 ; contador += 2){
        console.log(contador)
    }
}