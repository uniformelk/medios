const url = ('../../csvjson.json');
const selectFormato = document.querySelector('#formato');
const selectCasa = document.querySelector('#casa');
const selectEmisora = document.querySelector('#emisora');
cargaDatos();
eventsListeners();

//crear un promise
const obtenerData = data => new Promise(resolve =>{
    resolve(data)
});

function eventsListeners(){
    selectFormato.addEventListener('change', seleccionFormato);
    selectCasa.addEventListener('change', seleccionEmisora);
}
async function consultar(){
    
    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        const data = await obtenerData(resultado);
        const datos = data;
        return datos;
        return data;
    } catch (error) {
        console.log(error);
    }
}
function cargaDatos(){
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarFormatos(resultado))
}

function mostrarFormatos(data){
    const {formato } = data
    
    const unicas = [];

    data.forEach(e => {
        if (!unicas.includes(e.formato)) {
            unicas.push(e.formato);
          }
    });

    unicas.forEach(e => {
        if(e != ""){
            const option = document.createElement('option');
            option.value = e;
            option.textContent = e;

            selectFormato.appendChild(option);
        }
    });
}

async function seleccionFormato(e){
    limpiarCasa();
    formato = e.target.value;
    const data = consultar();
    const datos = await obtenerData(data);
    const unicasCasa = [];
    
    datos.forEach(element => {
        if (element.formato == formato && !unicasCasa.includes(element.casa)) {
            unicasCasa.push(element.casa);
          }
    });
    unicasCasa.forEach(e => {
        if(e != ""){
            const option = document.createElement('option');
            option.value = e;
            option.textContent = e;

            selectCasa.appendChild(option);
            selectCasa.disabled = false;
        }
    });
}

async function seleccionEmisora(e){
    limpiarEmisora();
    casa = e.target.value;
    const data = consultar();
    const datos = await obtenerData(data);
    const unicas = [];

    datos.forEach(element => {
        if (element.casa == casa && !unicas.includes(element.EMISORAS) && element.formato == selectFormato.value) {
            unicas.push(element.EMISORAS);
          }
    });

    unicas.forEach(e => {
        if(e != ""){
            const option = document.createElement('option');
            option.value = e;
            option.textContent = e;

            selectEmisora.appendChild(option);
            selectEmisora.disabled = false;
        }
    });
}

function limpiarCasa(){
    
    for (let i = selectCasa.options.length; i >= 1; i--) {
        selectCasa.remove(i);
      }
    selectCasa.disabled =true;
    if(selectCasa.value == 'casa'){
        selectEmisora.disabled = true;
    }
    
}

function limpiarEmisora(){
    
    for (let i = selectEmisora.options.length; i >= 1; i--) {
        selectEmisora.remove(i);
      }
      selectEmisora.disabled =true;

}