const APP = {
    /**
     * desde el mismo js se inicializa la app
     */
    inicializarDatos: function () {
        const BOTON = document.getElementById("boton");
        //se obtiene el botón y hasta que no es accionado, no se ejecuta el código
        BOTON.addEventListener('click', function () {
            //se obtiene el elemento propio y el elemento a comparar
            let tuElemento = document.getElementById("tuElemento").value.toLowerCase();
            let elementoComparar = document.getElementById("elementoComparar").value.toLowerCase();
            //se pasan a la función que comprobará si es o no débil

            if (this.comprobarExistenciaTipo(tuElemento, elementoComparar) === true) {
                this.comparar(tuElemento, elementoComparar);
            } else {
                document.getElementById("mostrarDebilidad").innerHTML = 'NO EXISTE';
            }

        }.bind(this));
    },
    /**
     * @param tuElemento es el elemento propio
     * @param elementoComparar es elemento a comparar
     */
    comparar: function (tuElemento, elementoComparar) {
        const mostrarDebilidad = document.getElementById("mostrarDebilidad");
        //si no es débil, se mostrará este mensaje hasta que se vuelva a proceder una comparación
        mostrarDebilidad.innerHTML = `${tuElemento} NO es débil frente a ${elementoComparar}`;
        //se importa el js externo y con la función module.LoQueHayaEnELJS, obtendremos sus propiedades
        import ("./data.js").then(module => {
            for (let i = 0; i < module.TIPOS.length; i++) {
                //si el elemento existe, entra en el if
                if (module.TIPOS[i].tipo === tuElemento) {
                    for (let j = 0; j < module.TIPOS[i].debilidad.length; j++) {
                        //si en el elemento existe la debilidad con la que se compara, entra en el if
                        if (module.TIPOS[i].debilidad[j] === elementoComparar) {
                            mostrarDebilidad.innerHTML = `${tuElemento} es débil frente a ${elementoComparar}`;
                            break;
                        }
                    }
                }
            }
        });
    },
    comprobarExistenciaTipo: function (tuElemento, elementoComparar) {
        let arr = [];

        import ("./data.js").then(module => {
            for (let i = 0; i < module.TIPOS.length; i++) {
                arr.push(module.TIPOS[i].tipo);
            }
        });

        return arr.indexOf(tuElemento) !== -1 && arr.indexOf(elementoComparar) !== -1;
    }
}
APP.inicializarDatos();