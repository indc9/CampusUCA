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
 
// Clase encargada de renombrar las asignaturas
function CU_Renombrador() {
	/*****************
	 * Atributos
	 *****************/
    // Patrón para la búsqueda del nombre del grado mediante expresiones regulares.
    this.patronNomGrado = / - GRADO EN .*$/i;
    this.mostrarGrado = false;

    // Palabras que se deben eliminar del nombre.
    this.filtro = ["DE", "DEL", "Y", "EN", "A", "LA", "CON", "AL", "EL", "LOS", "LAS"];
	
	// Se buscan los objetos que contienen los nombres de las asignaturas en el DOM y se almacenan
	this.asignaturasNavBar = document.querySelectorAll("div.breadcrumb > ul > li > a");
		
	this.asignaturasMenu = document.querySelectorAll("li.contains_branch > p.tree_item > a");
	
	/*****************
	 * Métodos
	 *****************/
	// Comprueba si texto pertenece a la lista de palabras excluidas
	this.pertenece = function(texto) {
		for(var i in this.filtro)
			if(texto.toUpperCase() == this.filtro[i])
				return true;
		
		return false;
	};

	// Obtiene el nombre de una asignatura como un array de cadenas de texto, lo procesa y devuelve sus siglas.
	this.dameSiglas = function(arrTexto) {
		 var siglas = "";
		 var cierraParentesis = false, abreParentesis = false, punto = false;
		 
		 // Para cada palabra del nombre...
		 for(var i in arrTexto) {
			  // Comprobamos paréntesis
			  if(arrTexto[i][0] == "(") {
				   siglas += " (";
				   arrTexto[i] = arrTexto[i].substring(1, arrTexto[i].length);
				   abreParentesis = true;
			  }
			  
			  // Si la palabra no pertenece al filtro
			  if(!this.pertenece(arrTexto[i])) {
				   // Comprobamos que el primer carácter no sea un número
				   if(isNaN(arrTexto[i][0])) {
						// Si hay que cerrar paréntesis al final
						if(arrTexto[i][arrTexto[i].length - 1] == ")")
							 cierraParentesis = true;
						// Si termina con un punto
						else if(arrTexto[i][arrTexto[i].length - 1] == ".")
							 punto = true;
						
						// Si es un número romano, se deja tal cual.
						if(arrTexto[i] == "I" || arrTexto[i] == "II" || arrTexto[i] == "III" || arrTexto[i] == "IV" || arrTexto[i] == "V")
							 siglas += " " + arrTexto[i];
						// Si es un guión, se añade junto con otro espacio detrás
						else if(arrTexto[i] == "-")
							 siglas += " " + arrTexto[i] + " ";
						// Si no, se añade la primera letra.
						else
							 siglas += arrTexto[i][0];
				   }
				   // En caso de que el primer carácter sea un número, se añade a siglas la palabra entera (para mostrar fechas completas, etc.)
				   else {
						if(!abreParentesis)
							 siglas += " ";
							 
						siglas += arrTexto[i];
				   }
				   abreParentesis = false;
			  }
			  
			  // Se cierra el paréntesis
			  if(cierraParentesis) {
				   siglas += ")";
				   cierraParentesis = false;
			  }
			  
			  // Se separa de las siguientes palabras
			  if(punto) {
				   siglas += " ";
				   punto = false;
			  }
		 }
		 
		 // Devuelve la cadena siglas que contiene las siglas de la asignatura.
		 return siglas;
	};

	// Procesa el nombre de la asignatura que se le pase y lo deja con solo las iniciales en mayúsculas.
	this.noMayus = function(texto) {
		 var aux = "";
		 // Se pone todo el texto a minúsculas y se separa por los espacios en un array.
		 arrTexto = texto.split(" ");
		 
		 for(var i in arrTexto) {
			  var ok = true;
			  
			  // Si empieza por paréntesis
			  if(arrTexto[i][0] == "(") {
				   aux += "(";
				   arrTexto[i] = arrTexto[i].substring(1, arrTexto[i].length);
			  }
			  
			  // Si la palabra no está en el filtro...
			  if(!this.pertenece(arrTexto[i])) {
				   // Si es un número romano, se deja tal cual.
				   if(arrTexto[i] == "I" || arrTexto[i] == "II" || arrTexto[i] == "III" || arrTexto[i] == "IV" || arrTexto[i] == "V")
						aux += arrTexto[i] + " ";
				   // Si no, se añade con la inicial en mayúsculas.
				   else
						aux += arrTexto[i].substring(0, 1).toUpperCase() + arrTexto[i].substring(1, arrTexto[i].length).toLowerCase() + " ";
			  } else
				   // Si la palabra está en el filtro, se añade en minúsculas.
				   aux += arrTexto[i].toLowerCase() + " ";
		 }
		 
		 return aux;
	};

	// Método que se encarga de sustituir el código de cada asignatura en el menú por su nombre.
	this.muestraNombres = function() {
		 // Barra
		 // La asignatura se encuentra siempre en la posición 3 del array de asignaturas de la barra de navegación.
		 this.asignaturasNavBar[3].innerHTML = this.noMayus(this.asignaturasNavBar[3].title);
		 
		 // Menú
		 // Recorre cada asignatura de la lista y sustituye el código (almacenado en la propiedad innerHTML) por su nombre (que se obtiene de la propiedad title).
		 for(var i in this.asignaturasMenu) {
			  if(this.asignaturasMenu[i].title) {
				   if(this.mostrarGrado == true)
						this.asignaturasMenu[i].innerHTML = this.noMayus(this.asignaturasMenu[i].title);
				   else
						this.asignaturasMenu[i].innerHTML = this.noMayus(this.asignaturasMenu[i].title.replace(this.patronNomGrado, ""));
			  }
		 }
	};

	// Método que se encarga de sustituir el código de cada asignatura en el menú por sus siglas.
	this.muestraSiglas = function() {
		// Barra
		// La asignatura se encuentra siempre en la posición 1 del array de asignaturas de la barra de navegación.
		// Se almacena el nombre del grado para posteriormente mostralo si está activada la opción correspondiente.
		
		// Extraer el nombre del grado
		// Se separa en palabras
		arrTexto = this.asignaturasNavBar[3].title.split(" ");
		
		// Si el nombre de la asignatura contiene más de una palabra, se obtienen sus siglas y se insertan sustituyendo el código.
		if(arrTexto.length > 1)
			this.asignaturasNavBar[3].innerHTML = this.dameSiglas(arrTexto);
		// Si el nombre está compuesto de una sola palabra se obtienen las 3 primeras letras de la palabra y se insertan sustituyendo el código.
		else
			this.asignaturasNavBar[3].innerHTML = arrTexto[0].substring(0, 3);
		 
		// Menú
		// Recorre la lista de asignaturas del menú.
		for(var i in this.asignaturasMenu) {
			// A partir del curso 13-14 no aparece el nombre del grado en el menú "Mis cursos", luego hay que darle algún valor.
			// Dicho valor además deberá ser nulo cuando no se trate de alguna asignatura.
			nombreAsignatura = this.asignaturasMenu[i].title;
			
			if(nombreAsignatura) {
				// Se almacena el nombre del grado para posteriormente mostralo si está activada la opción correspondiente.
				arrTexto = this.asignaturasMenu[i].title.replace(this.patronNomGrado, "").split(" ");
			   
			    // Si el nombre de la asignatura contiene más de una palabra, se obtienen sus siglas y se insertan sustituyendo el código.
			    if(arrTexto.length > 1)
					this.asignaturasMenu[i].innerHTML = this.dameSiglas(arrTexto);
			    // Si el nombre está compuesto de una sola palabra se obtienen las 3 primeras letras de la palabra y se insertan sustituyendo el código.
			    else
					this.asignaturasMenu[i].innerHTML = arrTexto[0].substring(0, 3);

				if (this.mostrarGrado) {
					nombreGrado = this.patronNomGrado.exec(this.asignaturasMenu[i].title);
					
					if (nombreGrado) {
						nombreGrado = String(nombreGrado);
						arrNombreGrado = nombreGrado.substring(3, nombreGrado.length).split(" ");
						this.asignaturasMenu[i].innerHTML += " - " + this.dameSiglas(arrNombreGrado);
					}
				}

			  }
		 }
	};
}; // CU_Renombrador

function CU_Renombrar() {
	// Instanciación de clases
	renombrador = new CU_Renombrador();

	// Se realiza una petición a la background page de la extensión para obtener la configuración almacenada
	// Mejorar: guardar la config. y añadir método a CU_Renombrador para no tener que volver a crear otro objeto al desplegar
	// el menú y así ahorrar una petición a la background page.
	chrome.extension.sendMessage(
		 { msg: "dameOpciones" },
		 function(respuesta) {
			  // Por defecto no se mostrará el nombre de la carrera junto a las asignaturas en el menú
			  if(respuesta.grado == "true")
				   renombrador.mostrarGrado = true;
			  
			  // Si no hay ninguna opción almacenada se muestran las siglas.
			  if(respuesta.asignaturas == "siglas")
				   renombrador.muestraSiglas();
			  else
				   renombrador.muestraNombres();
		 }
	);
};

// Comprueba si se ha desplegado el menú "Mis cursos". En caso negativo, se realiza una nueva llamada tras una pequeña espera.
function CU_RenombrarDesplegable() {
	// acumulador para dejar de realizar llamadas a esta función en caso de que por algún motivo el menú no llegara
	// a renombrarse
	intentos++;

	if(!menuRenombrado && intentos < 50) {
		if(menuDesplegable.parentNode.children.length == 2) {
			// Cuando aparece el contenido del menú desplegable se crea otro objeto CU_Renombrador
			CU_Renombrar();
			menuRenombrado = true;
		} else
			setTimeout(CU_RenombrarDesplegable, 500);
	}
};

// Lanza el script
var renombrador = null;
CU_Renombrar();

// Se busca el menú desplegable "Mis cursos" y se añade un evento
// que debe dispararse cuando se despliegue.
var menuRenombrado = false;
var nodosMC = document.querySelectorAll('a[href="https://av03-14-15.uca.es/moodle/my/"]');
var menuDesplegable = nodosMC[2].parentNode;
var intentos = 0;

// Añade un evento que se dispara cuando se despliega el menú "Mis cursos", que carga dinámicamente las asignaturas.
if(menuDesplegable)
	menuDesplegable.addEventListener('click', CU_RenombrarDesplegable);
