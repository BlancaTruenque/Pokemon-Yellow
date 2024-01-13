class Player {
  // name;
  // pokemon;

  constructor(name, species, pokeName, level) {
    // asignar name a un atributo con el mismo nombre
    this.name = name;
    // crear un Pokemon con el resto de parametros y asignarlo al atributo pokemon
    this.pokemon = new Pokemon(species, pokeName, level);
  }

  selectMove() {
    // mostrar al usuario los movimientos disponibles
    console.table(this.pokemon.moves);
    const selectMove = prompt("choose a move");

    // retornar 'true' en caso el usuario apreta Cancel
    if (selectMove === null) {
      return true;
    }

    let isIncorrect = true;
    for (let i = 0; i < this.pokemon.moves.length; i++) {
      console.log(this.pokemon.moves[i]);
      if (selectMove === this.pokemon.moves[i]) {
        isIncorrect = false;
      }
    }

    // Volver a pedir si ingresa un movimiento invalido
    if (isIncorrect) {
      this.selectMove();
    }

    // Asigna el movimiento con 'setCurrentMove'
    this.pokemon.setCurrentMove(selectMove);
  }
}

class Bot extends Player {
  selectMove() {
    // selecciona un movimiento de maner aleatoria
    // los asigna con 'setCurrentMove'
    //this.pokemon[ramdonNum]
  }
}
