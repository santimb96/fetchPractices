const app = {
    //des: '',
    obtenerValores: function () {
        const button = document.getElementById("button");
        button.addEventListener('click', function () {
            const pokemon = document.getElementById("pokemon").value.toLowerCase();
            this.buscarPokemon(pokemon);
        }.bind(this))
    },

    buscarPokemon: function (pokemon) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(response => response.json())
            .then(data => this.printarPokemon(data, pokemon))
            .catch(error =>
                    console.log(error),
                document.getElementById("printarPokemon").innerHTML = "404 NOT FOUND!"
            );
    },

    printarPokemon: function (data, nombrePokemon) {
        //this.foo(nombrePokemon);
        let habilidad;
        let tipo;



        data.abilities.length > 1 ? habilidad = data.abilities[1].ability.name : habilidad = '';
        data.types.length > 1 ? tipo = data.types[1].type.name : tipo = '';

        let pokeData = `<tr class="active-row">
                        <td><img src="${data.sprites.front_default}" alt="pokemon"/></td>
                        <td>${data.id}</td>
                        <td>${nombrePokemon.toUpperCase()}</td>
                        <td>${data.abilities[0].ability.name}<br><br>${habilidad}</td>
                        <td>${data.types[0].type.name}<br><br>${tipo}</td>
                       </tr>
                       <div>${this.des}</div>
                       `;
        document.getElementById("printarPokemon").innerHTML = pokeData;
    },
/*    foo: function (nombrePokemon) {
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${nombrePokemon}/`)
            .then(res => res.json())
            .then(dat => this.des = dat.flavor_text_entries[language.name='es'].flavor_text)
            .catch(e => console.log(e));
    }*/
}


app.obtenerValores();