let formulario = document.getElementById("formulario");
let prestamo = document.getElementById("prestamo");
let boton = document.getElementById("calcular");
let contenedor = document.getElementById("contenedor");
let rangoPrestamo

let precio = 0;
const intereses = [1.7, 1.5, 1.3]


let prestamoSolicitado = JSON.parse(localStorage.getItem("prestamoSolicitado")) || []; /* OPERADOR LÓGICO OR */


class prestamoUsuario {
    constructor(monto, interes) {
        this.monto = monto,
        this.interes = interes,
        this.pres = this.monto * this.interes
    }
}


const crearTarjeta = () => {

        prestamoFinal = parseInt(prestamo.value)

    if (prestamoFinal <= 1000) {
        rangoPrestamo = ("Solicitando prestamo hasta $1000 el 70% de interés anual, por lo tanto tu total a devolver es de " + "$" + prestamoFinal * intereses[0]);
        prestamoSolicitado.push(new prestamoUsuario(prestamoFinal, intereses[0]));

    } else if (prestamoFinal <= 2000) {
        rangoPrestamo = ("Solicitando prestamo hasta $2000 el 50% de interés anual, por lo tanto tu total a devolver es de " + "$" + prestamoFinal * intereses[1]);
        prestamoSolicitado.push(new prestamoUsuario(prestamoFinal, intereses[1]));


    } else {
        rangoPrestamo = ("Solicitando prestamo hasta $3000 el 30% de interés anual, por lo tanto tu total a devolver es de " + "$" + prestamoFinal * intereses[2]);
        prestamoSolicitado.push(new prestamoUsuario(prestamoFinal, intereses[2]));
    }


    console.log (prestamoFinal?.a || "el prestamo no existe")

    
    localStorage.setItem("prestamoSolicitado", JSON.stringify(prestamoSolicitado));

    contenedor.innerHTML = `<div class="card col-4 mx-1 p-3">
                                <h3> Tu prestamo es de $ ${prestamoFinal}.</h3>
                                <p> ${rangoPrestamo}.</p>
                            </div>`;

    formulario.reset();

}


boton.addEventListener("click", (e) => {
    e.preventDefault();    
        crearTarjeta();
   
});


let contenedorPrestamo = document.getElementById("contenedorPrestamo");
let btnHistorial = document.getElementById("verHistorial");
let totalizador = document.getElementById("totalizador");


const verHistorial = () => {
    contenedorPrestamo.innerHTML = "";
    prestamoSolicitado.forEach((plazo) => {
        contenedorPrestamo.innerHTML += `<li> Total del prestamo: $ ${plazo.monto}, devolviendo total de $ ${plazo.pres}.<li>`;
    })
};


const mostrarTotal = () => {
    let inversionTotal = prestamoSolicitado.reduce((acc, plazo) => acc + plazo.monto, 0);
    let depositoTotal = prestamoSolicitado.reduce((acc, plazo) => acc + plazo.pres, 0);
    let gananciaTotal = depositoTotal - inversionTotal;

    console.log(prestamoSolicitado);
    totalizador.innerHTML = `Tu prestamo será de $ <strong>${inversionTotal}</strong>, devolviendo un total de $<strong>${depositoTotal}</strong>, interes total de $ <strong>${gananciaTotal}</strong>.`
};


btnHistorial.addEventListener("click", () => {
    verHistorial();
    mostrarTotal();
    5
})


function borrarHistorial() {

    localStorage.removeItem("prestamoSolicitado");
    prestamoSolicitado.length = 0;
}

const btnBorrarHistorial = document.getElementById("borrarHistorial");
btnBorrarHistorial.addEventListener('click', (event) => {

    event.preventDefault();
    borrarHistorial();
    verHistorial();
    mostrarTotal();
    

    contenedor.innerHTML = `<div class="card col-4 mx-1 p-3">
                                <h3> Gracias por utilizar nuestro simulador </h3>
                                <p>Esperamos que solicites tu prestamo!</p>

                            </div>`;

    formulario.reset();
    Swal.fire({
    title: 'Podes simular nuevo prestamo!',
    text: 'Historial vacio',
  
})
    
});


const cotizacionDolar = () => {
    fetch('https://api.bluelytics.com.ar/v2/latest')
        .then((response) => response.json())
        .then(informacion => {
            console.log(informacion);
            let acumulador = ``;
            for (const monedas in informacion) {
                if (monedas === "last_update") {
                    continue
                }
                acumulador += `<div class="card">
                  <h4>${monedas}</h4>
                  <h6>Precio Venta: ${informacion[monedas].value_sell}</h6>
                  <h6>Precio Compra: ${informacion[monedas].value_buy}</h6>
                  </div>`
          }
          
          document.getElementById('cotizacionDolar').innerHTML = acumulador;
       })       
}

cotizacionDolar();

const titulo = (document.querySelector("h1").textContent = "Tu mejor banco");
const subTitulo = (document.querySelector(".text-dark-50").textContent = "La tasa de interes mas baja, siempre");
const titulo2 = (document.querySelector("h2").textContent = "Que esperas para solicitar tu prestamo con nosotros");
const descripcion = (document.querySelector(".lead").textContent = "Estamos para brindarte beneficios!");

const enlace = document.querySelector(".navbar-brand");
enlace.remove()
