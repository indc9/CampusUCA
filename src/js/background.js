/*
 * Escrito por Alberto García González.
 * Contacto: alberto.garciagonza@alum.uca.es
 * 
 * Copyright 2012, 2013 Alberto García González.
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

// Se pone la background page a la escucha de peticiones.
chrome.extension.onMessage.addListener(
     function(peticion, sender, respuesta) {
          // Se actualiza el log
          console.log(sender.tab ? "Petición desde content script:" + sender.tab.url : "Petición desde la extensión");
          // Si el motivo del mensaje es solicitar los datos de las opciones del usuario, se devuelve un array asociativo con los mismos.
          if(peticion.msg == "dameOpciones") {
               respuesta( {
                    asignaturas: localStorage["CU.Opciones.Asignaturas"],
                    grado: localStorage["CU.Opciones.Grado"]
               } );
          }
     }
);
