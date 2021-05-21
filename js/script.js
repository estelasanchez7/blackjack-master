let jugador = document.querySelector("input[name='jugador']")
let imgCarta = document.querySelector(".carta")
let imgJugada = document.querySelector(".jugada")
let alerta = document.querySelector(".alert")
let resultado = document.querySelector(".resultadoNum")

let palos = ["corazones", "diamantes", "treboles", "picas"]
let frases = ["¡Vamos, a por todas!","¿Ganarás esta vez?","Arriesga más ,anda","Mejor dedícate a otra cosa","A la siguiente palmas"]
let cartas = [], jugada = []

//boton sacar carta
document.querySelector("#sacarCarta").onclick=sacarCarta
//boton me planto
document.querySelector("#mePlanto").onclick=()=>{
    document.querySelector("#sacarCarta").setAttribute("disabled",true)
    let puntos = jugada.map(c=>c.valor).reduce((a,b)=>a+b)
    if(puntos+cartas[0].valor<=21)
        mostrarMensaje(`PERDISTE, Y ADEMÁS ERES UN CAGÓN! La siguiente carta era ${cartas[0].valor} y la suma total sería de ${puntos + cartas[0].valor}`)
    else
        mostrarMensaje(`GANASTE, PERO ERES UN CAGÓN! La siguiente carta era ${cartas[0].valor} y la suma total sería de ${puntos + cartas[0].valor}`)
}
//botón reiniciar
document.querySelector("#reiniciar").onclick=reiniciarPartida

//COMIENZA EL JUEGO

mezclarCartas()

function mezclarCartas(){
    palos.forEach(palo=>{
        for(let i=1;i<14;i++)
            cartas.push({valor:i>10?10:i, palo:palo, imagen:`${palo}_${i}.svg`})
    })
    cartas = cartas.sort(() => Math.random()-.5)
    console.log(cartas)
}

function sacarCarta(){
    let carta = cartas.shift()
    jugada.push(carta)
    if(carta.valor==1) 
        if(confirm("Te ha salido un As ¿Quieres que valga 10?")) 
            carta.valor=10
    imgCarta.src="/img/baraja/" + jugada[jugada.length-1].imagen
    let miniCarta = imgCarta.cloneNode()
    miniCarta.classList.add("mini")
    imgJugada.appendChild(miniCarta)
    comprobarJugada()
}

function comprobarJugada(){
    let puntos = jugada.map(c=>c.valor).reduce((a,b)=>a+b)
    resultado.innerHTML = `${puntos}`
    if(cartas.length==0) mezclarCartas()
    if(puntos>=21){
        document.querySelector("#sacarCarta").setAttribute("disabled",true)
        document.querySelector("#mePlanto").setAttribute("disabled",true)
    }
        
    if(puntos==21)
        mostrarMensaje("GANASTE CRACK La suma total es de " + puntos)
    else if(puntos>21)
        mostrarMensaje("PERDISTE LOSER La suma total es de " + puntos)
    else
        mostrarMensaje(frases[Math.round(Math.random()*4)])
}

function reiniciarPartida(){
    if(confirm("¿Deseas guardar esta partida?")) guardarPartida()
    while(imgJugada.firstChild)
        imgJugada.removeChild(imgJugada.firstChild)
    jugada = []
    document.querySelector("#sacarCarta").removeAttribute("disabled")
    document.querySelector("#mePlanto").removeAttribute("disabled")
}

function guardarPartida(){
    let jugadasDe=JSON.parse(localStorage.getItem(jugador.value))
    if(jugadasDe==null) jugadasDe=[]
    jugadasDe.push(jugada)
    localStorage.setItem(jugador.value,JSON.stringify(jugadasDe))
}

function mostrarMensaje(texto){
    alerta.querySelector(".texto").innerHTML=texto
    alerta.classList.add("mostrar")
}
alerta.querySelector(".close").onclick=()=>alerta.classList.remove("mostrar")