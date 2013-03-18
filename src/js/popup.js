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

function ControlPopUpExtensionCampusUCA() {}

ControlPopUpExtensionCampusUCA.prototype.muestraEnlaces = function() {
     var idEnlaces = localStorage["CU.Opciones.Enlaces"];
     
     if(!idEnlaces)
          idEnlaces = 2039;
     
     var enlaces = document.querySelectorAll("div#menu a");
     
     for(var i=0; i < enlaces.length; i++) {
          if(enlaces[i].id != -1 && (1 << enlaces[i].id & idEnlaces)) {
               enlaces[i].style.display = "list-item";
          }
     }
};

var controlPopUp = new ControlPopUpExtensionCampusUCA();

window.addEventListener('load', controlPopUp.muestraEnlaces); 
