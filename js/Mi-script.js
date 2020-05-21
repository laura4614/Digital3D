//DECLARACION DE VARIABLES
var cotizante,
    tipoDeInmueble,
    metrosCuadrados = 0,
    cantHabitantes = 0,
    administracion = 0,
    cuotaAseo = 0,
    derechosGYM = 0,
    total = 0,
    faltanCampos;

const inputCantHabitantes = document.getElementById("habitantesPredio"); //ENTRADA CANTIDAD DE HABITANTES
const contendorSalidas = document.getElementById("salidas"); //CONTENEDOR PARA PONER LAS TABLAS
const generosEdades = document.getElementById("genero-edades-contenedor"); //CONTENEDOR PARA PONER LOS CAMPOS "GENERO" Y "EDAD"
const campos = document.querySelectorAll(".validar"); //SELECCIONA TODOS LOS CAMPOS. TODOS TIENE LA MISMA CLASE 

//DECLARACION DE FUNCIONES
const validarDatos = () => {
    faltanCampos = false; //NO HAY CAMPOS VACIOS
    campos.forEach(campo => { //HACE UN RECORRIDO DE TODOS LOS CAMPOS
        if (campo.value.trim() == "") {
            faltanCampos = true; //AHORA HAY CAMPOS VACIOS
            campo.classList.add("validar-animacion"); //AÑADE ANIMACION BORDES ROJOS AL CAMPO VACIO
            setTimeout(() => {
                campo.classList.remove("validar-animacion"); //ELIMINA LA ANIMACION DESPUES DE TRES SEGUNDOS
            }, 3000)
        }
    });

    //SI YA NO HAY CAMPOS VACIOS, HACE LOS CALCULOS
    if (faltanCampos == false) {
        hacerCalculos();
    }
}

const hacerCalculos = () => { //FUNCION EJECUTADA AL PRESIONAR EL BOTON CALCULAR
    tipoDeInmueble = document.getElementById("tipoInmueble").value;
    metrosCuadrados = document.getElementById("metrosCuadrados").value;

    administracion = calcularAdministracion(metrosCuadrados, tipoDeInmueble);
    cuotaAseo = calcularCuotaAseo(administracion, metrosCuadrados);

    //SELECCIONA TODOS LOS CAMPOS DE "GENERO" Y "EDAD" CREADOS DINAMICAMENTE
    const generos = document.querySelectorAll(".genero");
    const edades = document.querySelectorAll(".edad");
    for (let i = 0; i < generos.length; i++) { //ITERA LOS CAMPOS OPTENIDOS Y LLAMA A LA FUNCION "calcularDerechosGYM" POR CADA UNO 
        genero = generos[i].value;
        edad = edades[i].value;
        derechosGYM = derechosGYM + calcularDerechosGYM(genero, edad); //VA GUARDANDO LOS VALORES Y LOS ACUMULA EN LA VARIBLE
        //ASI SE OPTIONE EL TOTAL DE "derechosGYM" DEPENDIENDO DE LA CANTIDAD DE HABITANES
    }

    total = administracion + cuotaAseo + derechosGYM; //TOTAL AL SUMAR LOS VALORES RETORNADOS POR LAS FUNCIONES

    crearTabla(cotizante, administracion, cuotaAseo, derechosGYM, total); //CREA LA TABLA

    //REINICIA LOS VALORES PARA QUE NO SE SUMEN EN EL SIGUIENTE CALCULO
    metrosCuadrados = 0;
    administracion = 0;
    cuotaAseo = 0;
    derechosGYM = 0;
    cantHabitantes = 0;
    total = 0;
    generosEdades.innerHTML = "";
}

const calcularAdministracion = (metrosCuadrados, tipoDeInmueble) => {
    if (tipoDeInmueble == 'casa') {
        return (metrosCuadrados * 1500 + 100000);
    } else if (tipoDeInmueble === 'apartamento') {
        return metrosCuadrados * 1500 + 50000;
    } else {
        console.error("Tipo de inmueble no valido")
        return -1;
    }
}

const calcularCuotaAseo = (administracion, metrosCuadrados) => {
    return ((administracion * 10) / 100) + (metrosCuadrados * 1000);
}

const predirEdades = () => {
    //ESTA FUNCION PONE LAS CAMPOS PARA "GENERO" Y "EDAD" DINAMICAMENTE CON LA CATIDAD DE HABITANTES INGRESADOS
    cantHabitantes = inputCantHabitantes.value > 1 ? inputCantHabitantes.value : 1;
    document.getElementById("em").innerText = cantHabitantes; //CAMPO PARA PONER EL NUMERO DE HABITANTES

    //HTML CON LOS CAMPOS DINAMICOS
    var inputs = `
        <select name="genero" id="genero" class="genero validar">
            <option value="">Escoja un genero</option>
            <option value="m">Masculino</option>
            <option value="f">Femenino</option>
        </select>
        <input type="number" class="edad corto validar" name="edad" min="5" max="100"
        placeholder="Edad">
        <br/>
    `;

    generosEdades.innerHTML = ""; //VACIA EL CONTENEDOR DE LOS "GENEROS" Y "EDADE"

    //LLENE EL CONTENEDOR PARA LA CANTIDAD DE HABITANTES
    for (let i = 0; i < cantHabitantes; i++) {
        generosEdades.innerHTML += inputs;
    }
}

const calcularDerechosGYM = (genero, edad) => {
    if (genero == "m") {
        if (edad < 10) {
            return 0;
        } else if (edad >= 10 && edad < 20) {
            return 20000;
        } else if (edad >= 20 && edad < 40) {
            return 15000;
        } else if (edad >= 40 && edad < 60) {
            return 10000;
        } else {
            return 0;
        }
    } else if (genero == "f") {
        if (edad < 10) {
            return 0;
        } else if (edad >= 10 && edad < 18) {
            return 15000;
        } else if (edad >= 18 && edad < 35) {
            return 12000;
        } else if (edad >= 35 && edad < 55) {
            return 10000;
        } else {
            return 0;
        }
    } else {
        console.error("Genero no valido")
        return -1;
    }
}

//CREA UNA TABLA HTML PARA AÑADIRLA EN CADA ALCULO
const crearTabla = (cotizante, administracion, cuotaAseo, derechosGYM, total) => {
    const tabla = `
    <div>
        <h4>Recibo de cobro mensual</h4>
        <table>
            <thead>
                <th>Señor(a) ${cotizante}</th>
                <th>Couta de Abril</th>
            </thead>
            <tbody>
                <tr>
                    <td>Valor administración</td>
                    <td>${administracion}</td>
                </tr>
                <tr>
                    <td>Valor cuota de aseo</td>
                    <td>${cuotaAseo}</td>
                </tr>
                <tr>
                    <td>Derechos de gimnasio</td>
                    <td>${derechosGYM}</td>
                </tr>
                <tr>
                    <th>Total a pagar</th>
                    <td>${total}</td>
                </tr>
            </tbody>
        </table>
    </div>`;
    contendorSalidas.innerHTML += tabla;
}