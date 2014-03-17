/*
 * Escrito por Alberto García González.
 * Contacto: alberto.garciagonza@alum.uca.es
 * 
 * Copyright 2012 - 2014 Alberto García González.
 * 
 * Este fichero es parte de Campus UCA.
 * 
 * Campus UCA es software libre: puede redistribuirlo y/o modificarlo
 * bajo los términos de la GNU General Public License tal como han sido 
 * publicados por la Free Software Foundation, bien de la versión 3 de
 * la licencia o de cualquier versión posterior (a su elección).
 * 
 * Campus UCA se distribuye con la esperanza de que sea útil,
 * pero SIN NINGUNA GARANTÍA, incluso sin la garantía implícita de
 * COMERCIALIZACIÓN o IDONEIDAD PARA UN PROPÓSITO PARTICULAR. Consulte la
 * GNU General Public License para más detalles.
 * 
 * Debería haber recibido una copia de la GNU General Public License
 * junto con Campus UCA. Si no es así, consulte <http://www.gnu.org/licenses/>.
 * 
 */

// Clase encargada de cargar y modificar las opciones.
function OpcionesExtensionCampusUCA() {}

// Almacena opciones
OpcionesExtensionCampusUCA.prototype.guardar_opciones = function() {
     // Almacena la opción marcada para el renombrado de los elementos del menú
     var opcion = document.getElementById("rdoAsigMostrarNombre");
     if(opcion.checked)
          localStorage["CU.Opciones.Asignaturas"] = "nombres";
     else
          localStorage["CU.Opciones.Asignaturas"] = "siglas";
     
     // Almacena la opción marcada para mostrar o no el nombre del grado
     opcion = document.getElementById("cbMostrarGrado");
     if(opcion.checked)
          localStorage["CU.Opciones.Grado"] = "true";
     else
          localStorage["CU.Opciones.Grado"] = "false";
     
     // Lista de enlaces del botón
     var enlaces = document.querySelectorAll("div#listaAsignaturas input");
     
     var idEnlaces = 0;
     for(var i=0; i < enlaces.length; i++) {
          if(enlaces[i].checked)
               idEnlaces += 1 << enlaces[i].id;
     }
     localStorage["CU.Opciones.Enlaces"] = idEnlaces;
     
     // Informa al usuario de que se han guardado los datos
     var estado = document.getElementById("estado");
     estado.innerHTML = "Cambios guardados";
     setTimeout(function() { estado.innerHTML = ""; }, 1250);
};

// Restaura opciones
OpcionesExtensionCampusUCA.prototype.restaurar_opciones = function() {
     // Cargamos del almacenamiento local los datos de las opciones
     var opcionAsignaturas = localStorage["CU.Opciones.Asignaturas"];
     var mostrarGrado = localStorage["CU.Opciones.Grado"];
     var idEnlaces = localStorage["CU.Opciones.Enlaces"];
     
     // Si no existen los los datos, se crean con los valores por defecto
     if(!opcionAsignaturas) {
          localStorage["CU.Opciones.Asignaturas"] = "nombres";
          opcionAsignaturas = "nombres";
     }
     if(!mostrarGrado) {
          localStorage["CU.Opciones.Grado"] = "false";
          mostrarGrado = "false";
     }
     if(!idEnlaces) {
          localStorage["CU.Opciones.Enlaces"] = 1471;
          idEnlaces = 1471;
     }
     
     // Muestra marcadas las opciones correspondientes según la configuración
     // Para el menú
     if(opcionAsignaturas == "nombres")
          document.getElementById("rdoAsigMostrarNombre").checked = true;
     else
          document.getElementById("rdoAsigMostrarSiglas").checked = true;
     
     // Mostrar o no el nombre del grado
     if(mostrarGrado == "true")
          document.getElementById("cbMostrarGrado").checked = true;
     else
          document.getElementById("cbMostrarGrado").checked = false;
     
     // Enlaces
     var enlaces = document.querySelectorAll("div#listaAsignaturas input");
     
     for(var i=0; i < enlaces.length; i++) {
          if(1 << enlaces[i].id & idEnlaces)
               enlaces[i].checked = true;
     }
};

var opciones = new OpcionesExtensionCampusUCA();

// Se asocian las funciones a la carga de la página de opciones y al botón "Guardar"
document.querySelector('#guardar').addEventListener('click', opciones.guardar_opciones);
window.addEventListener('load', opciones.restaurar_opciones);
