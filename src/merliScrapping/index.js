const puppeteer = require('puppeteer');
const https = require('https');
const fs = require('fs');
const path = require('path');
const fetch = require("node-fetch");

(async () => {
    const navegador = await puppeteer.launch();
    const pagina = await navegador.newPage();

    //sustituir /temporada-x/ por la temporada que quieras bajar
    await pagina.goto('https://www.ccma.cat/tv3/merli/temporada-3/');
    await pagina.waitForTimeout(3000);

    const enlaces = await pagina.evaluate(() => {
        const elements = document.querySelectorAll('.F-capsaImatge');
        let arr = [];
        for (let element of elements) {
            arr.push(element.href);
        }
        return arr;
    })
    console.log(enlaces);


    for (let i = 0; i < enlaces.length; i++) {
        let posicion = enlaces[i].indexOf('/5');
        let numero = enlaces[i].substring(posicion + 1, enlaces[i].length - 1);

        fetch(`https://api-media.ccma.cat/pvideo/media.jsp?media=video&versio=googima&idint=${numero}&profile=pc&broadcast=false&format=dm`)
            .then(res => res.json())
            .then(data => {
                descargar(data.media.url[0].file, data.informacio.titol)
            })
            .catch(error => console.log(error));
    }


    function descargar(url, titulo) {

        const nombreFichero = path.basename(url)

        //sustituir la ruta en donde quieras guardar los ficheros de video
        const request = https.get(url, (res) => {
            const fichero = fs.createWriteStream(`E:\\Descargas1\\merliS3\\${titulo}.mp4`)
            res.pipe(fichero)

            fichero.on("error", (error) => {
                console.log(`Ha ocurrido un error al escribir el archivo. Detalles: ${error}`)
            })

            fichero.on("close", () => {
                return nombreFichero;
            })

            fichero.on('finish', () => {
                fichero.close()
                console.log(`Se ha descargado completamente ${titulo}`)
            })
        })

        request.on("error", (error) => {
            console.log(`Error descargando el archivo. Detalles: ${error}`)
        })
    }

    await navegador.close();
})();



