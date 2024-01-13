class Player {
  constructor(name, species, pokeName, level) {
    // asignar name a un atributo con el mismo nombre
    this.name = name;
    // crear un Pokemon con el resto de parametros y asignarlo al atributo pokemon
    this.pokemon = new Pokemon(species, pokeName, level);
  }

  selectMove() {
    // mostrar al usuario los movimientos disponibles
    console.table(this.pokemon.moves);
    let selectMove = "";
    let moves = "";

    for (let i = 0; i < this.pokemon.moves.length; i++) {
      moves = moves + this.pokemon.moves[i] + "\n";
    }
    console.log(moves);

    while (true) {
      selectMove = prompt(`Choose a move: \n${moves}
      `, this.pokemon.currentMove !== null 
      ? this.pokemon.currentMove.name 
      : this.pokemon.moves[0] );

      // retornar 'true' en caso el usuario apreta Cancel
      if (selectMove === null) {
        return true;
      }

      if (this.pokemon.moves.includes(selectMove)) {
        this.pokemon.setCurrentMove(selectMove);
        return
      }
      alert("Invalid option");
      // Volver a pedir si ingresa un movimiento invalido
    }

    // Asigna el movimiento con 'setCurrentMove'
  }
}

class Bot extends Player {
  constructor(name, species, pokeName, level){
    super(name, species, pokeName, level)
  }
  selectMove() {
    // selecciona un movimiento de maner aleatoria
    let indexRandom = randomBetween(0, this.pokemon.moves.length -1);
    // los asigna con 'setCurrentMove'
    this.pokemon.setCurrentMove(this.pokemon.moves[indexRandom]);
  }
}
