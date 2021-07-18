const app = {
    recibirDatos: function () {

        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        const url = 'https://ergast.com/api/f1/2021/drivers.json';

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => this.mostrarDatos(data))
            .catch(error => console.log(error));
    },

    mostrarDatos: function (data) {
        let pilotos = '';

        for (let i = 0; i < data.MRData.DriverTable.Drivers.length; i++) {
            let datos = data.MRData.DriverTable.Drivers;
            pilotos += `<tr class="active-row">
                        <td><img src="${this.cargarImagenes(datos[i].familyName)}" alt="50"/></td>
                        <td>${datos[i].permanentNumber}</td>
                        <td>${datos[i].code}</td>
                        <td>${datos[i].givenName}</td>
                        <td>${datos[i].familyName}</td>
                        <td>${datos[i].dateOfBirth}</td>
                        <td>${datos[i].nationality}</td>
                       </tr>`;
        }
        document.getElementById("printarPilotos").innerHTML = pilotos;
    },

    cargarImagenes: function (apellido) {
        const removeAccents = (string) => {
            return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }
        let arregloApellido = removeAccents(apellido);

        return `https://soymotor.com/sites/default/files/styles/picture/public/imagenes/piloto/${arregloApellido.toLowerCase()}-soymotor.png`;
    }
}