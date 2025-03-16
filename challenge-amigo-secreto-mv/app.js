// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

// variables:
let listaAmigos = [];
let amigosSorteados = [];

function limpiarCaja() {
    document.getElementById('amigo').value = '';
}

function desactivarBoton(id) {
    document.getElementById(id).setAttribute('disabled', true);
}

function activarBoton(id) {
    document.getElementById(id).removeAttribute('disabled');
}

function agregarAmigo() {

    let nombreIngresado = document.getElementById('amigo').value
    if ((nombreIngresado === '') | !isNaN(nombreIngresado)){
        //mostrar alerta para evitar que intente añadir valor nulo/campo sin nombre
        swal({
            title: '¡Campo vacío!',
            text:'Para añadir, debes ingresar un nombre. Intente de nuevo.',
            icon: 'info'
        });
    } else if (listaAmigos.includes(nombreIngresado)) {
        //mostrar alerta cuando el nombre tipeado es exactamente igual a uno ingresado anteriormente
        swal({
            title: 'Nombre repetido',
            text:`¡${nombreIngresado} ya está en la lista! Ingresa nombres distintos, sino intenta agregar la primera letra del apellido de tu amigo/a o su apodo.`,
            icon:'info'
        })
    } else {
        //añadir a la lista el nombre tipeado después de tocar el botón añadir
        listaAmigos.push(nombreIngresado);
        limpiarCaja();
        //generar la lista debajo
        const listaImprimir = document.getElementById('listaAmigos');
        const li = document.createElement('li');
        li.textContent = nombreIngresado;
        listaImprimir.append(li);
    }
    return;
}

function sortearAmigo() {
    //almacenar la longitud - indice máximo
    let lenLista = listaAmigos.length;
    let indiceAleatorio = Math.floor(Math.random() * lenLista);
    //generar lista de amigos
    const amigoSecreto = listaAmigos[indiceAleatorio];
    if (lenLista < 3) {
        swal({
            title: "¡Añade más nombres!",
            text:`Para sortear, debes haber añadido 3 o más nombres de amigos/as a la lista`,
            icon: 'info'
        })
    } else if (amigosSorteados.includes(amigoSecreto)) {
        //cuando faltan amigos por sortear, aplica recursividad para evadir la repetición de nombres ya sorteados
        if (lenLista > amigosSorteados.length) {
        return sortearAmigo();
        } else {
            swal({
                title:'Ya han sido sorteados todos tus amigos/as, ahora cada uno/a tiene su "Amigo Secreto".',
                icon: 'success'
            });
            let resultado = document.getElementById('resultado');
            resultado.textContent = '';
            let listaBorrar = document.getElementById('listaAmigos')
            listaBorrar.textContent = ''
            desactivarBoton('sortear')
            desactivarBoton('agregar')
            let h2 = document.querySelector('h2')
            h2.innerHTML = 'Juego finalizado'
        }
    } else {
    //obtener el objeto "result-list":
    let resultado = document.getElementById('resultado');
    resultado.textContent = `Tu amigo/a secreto/a es: ¡${amigoSecreto}!`;
    amigosSorteados.push(amigoSecreto)
    swal({
        title:'El nombre del amigo/a secreto/a desaparecerá en 5 segundos. ¡Asegúrate de recordarlo!',
    })
    setTimeout(() => {
        resultado.textContent = '';
    }, 5000);
    return amigoSecreto;
    }   
}

activarBoton('agregar');