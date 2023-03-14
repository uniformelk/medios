const url = ('../../csvjson.json');




cargaDatos();

 function cargaDatos(){
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarEmisoras(resultado))
}

function mostrarEmisoras(data){
    const {emisoras } = data
    const emisorasContenedor = document.querySelector('.emisora');
    const unicas = [];

    data.forEach(e => {
        if (!unicas.includes(e.casa)) {
            unicas.push(e.casa);
          }
    });

    unicas.forEach(e => {
        if(e != ""){
            emisorasContenedor.innerHTML += `
            <div class="form-check">
            <input class="form-check-input" type="checkbox" value="${e}" id="${e}">
            <label class="form-check-label" for="${e}">
            ${e}
            </label>
          </div>
            `
        }
    });
}
