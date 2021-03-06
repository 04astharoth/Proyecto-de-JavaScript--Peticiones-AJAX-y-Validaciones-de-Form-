$(document).ready(function () {
  //Define las variables que necesites
  var eventos, fechaActual, eventosProximos;
  var html = "";

  //Carga los datos que estan en el JSON (info.json) usando AJAX
  $.ajax({
    url: "info.json"
  }).done(function (peticion) {
    //Guarda el resultado en variables
    eventos = peticion.eventos;
    fechaActual = peticion.fechaActual;
    //Selecciona los eventos que sean posteriores a la fecha actual del JSON
    eventosProximos = eventos.filter(e => new Date(e.fecha).getTime() >= new Date(fechaActual).getTime());
    //Ordena los eventos segun la fecha (los mas recientes primero)
    eventosProximos = eventosProximos.sort((a, b) => {
      if (new Date(a.fecha).getTime() > new Date(b.fecha).getTime()) {
        return 1;
      }
      if (new Date(a.fecha).getTime() < new Date(b.fecha).getTime()) {
        return -1;
      }
      return 0;
    });
    console.log(eventosProximos);
    //Recorre el arreglo y concatena el HTML para cada evento
    eventosProximos.forEach(e => {
      //Crea un string que contenga el HTML que describe el detalle del evento
      html += `<div class="col-12 mb-4">
                  <div class="p-3 border bg-light rounded">
                  <h2><a href="detalle.html?id=${e.id}">${e.nombre}</a></h2>
                  <p class="text-black-50">${e.fecha} - ${e.lugar}</p>
                  <p>${e.descripcion}</p>
                  <p class="text-info">Costo: ${e.precio}</p>
                  </div>
              </div>`;
    });
    //Modifica el DOM agregando el html generado
    document.getElementById("proximos").innerHTML = html;
  });
});

