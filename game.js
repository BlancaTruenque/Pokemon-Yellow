class Game {
  start() {
    // llamar a welcome para el proceso de bienvenida y obtener el arreglo [name, pokemon, pokemonName]
    const [name, pokemon, pokemonName] = Game.welcome()
    // crear un Player con la info obtenida (tu pokemon empieza con nivel 3 por defecto). Asignarlo al atributo 'player'
    const player = new Player(name, pokemon, pokemonName, 3);
    // Empezar el bucle del juego
    while (true) {
    // Usar menu() para pedir al usuario que elija entre Train, Leader o Stats
      const chooseMenu = Game.menu()
      // Ejecutar train(), challengeLeader() o showStats() segun la opción del usuario
        switch (chooseMenu) {
          case "Train":
            this.train(player)
            break;
          case "Leader":
            this.challengeLeader(player)
            break;
          case "Stats":
            this.showStats(player.pokemon)
            break;
          default:
            break;
        }
      // Continuar el bucle hasta que el usuario aprete Cancel
      if (chooseMenu === null){
        break
      }

    }
    // Llamar a goodbye para la despedida
    Game.goodbye()
  }

  train(player) {
    const bot = new Bot("Random Person", Pokemons[randomBetween(0, 6)].species, undefined, randomBetween(1, 5))
    console.log(`${player.name} challenges ${bot.name} for training.`)
    console.log(`${bot.name} has a ${bot.pokemon.species} level ${bot.pokemon.level}.`)
    let fight = confirm("Do you want to fight?")
    if(fight){
      const battle = new Battle(player, bot)
      battle.start()
    }else{
      console.log("You didn't accept the challenge.")
    }
    // Crear un Bot llamado "Random Person", con un Pokemon aleatorio de nivel entre 1 y 5
    // Anunciar "[nombre] challenges [oponente] for training"
    // Anunciar "[oponente] has a [pokemon] level [nivel]"
    // Usar confirm() para preguntar al usuario si quiere pelear "Do you want to fight?"
    // Si, sí quiere pelear
    // Crear una Batalla entre el player y el oponente
    // empezar la batalla con su start
  }

  challengeLeader(player) {
    const bot = new Bot("Brock","Onix", "Champion Onix", 10)
    console.log(`${player.name} challenges ${bot.name} for Gym leadership.`)
    console.log(`${bot.name} has a ${bot.pokemon.species} level ${bot.pokemon.level}.`)
    let fight = confirm("Do you want to continue?")
    if(fight){
      const battle = new Battle(player, bot)
      battle.start()
      bot.pokemon.isFainted() && console.log("Congratulations! You won over Brock. Now, you're the new gym leader.")
    }else{
      console.log("You didn't accept the challenge.")
    }
    // mismo mecanismo que train() pero el Bot se llama Brock y usa un Onix nivel 10
  }

  showStats(pokemon) {
    console.table({
      species: pokemon.species,
      level: pokemon.level,
      type: pokemon.type.join(" "),
      "experience points": pokemon.experiencePoints,
      stats:"",
      HP: pokemon.stats.hp,
      attack: pokemon.stats.attack,
      defense: pokemon.stats.defense,
      "special attack": pokemon.stats.specialAttack,
      "special Defense": pokemon.stats.specialDefense,
      speed: pokemon.stats.speed      
    })
    // usar console.table para presentar las estadisticas de tu pokemon:
    /*
      - species
      - level
      - type
      - experiencePoints
      stats:
      - hp
      - attack
      - defense
      - specialAttack
      - specialDefense
      - speed
    */
  }

  static welcome() {
    alert(`Welcome to Pokemon Yellow

Hello there! Welcome to the world of POKEMON! My name is OAK! People call me the POKEMON PROF!

This world is inhabited by creatures called POKEMON! For some people, POKEMON are pets. Others use them for fights.

Myself... I study POKEMON as a profession.`);

    const name = prompt("First, what is your name?", "Ash");

    alert(`Right! So your name is ${name.toUpperCase()}!

Your very own POKEMON legend is about to unfold! A world of dreams and adventures with POKEMON awaits! Let's go!

Here, ${name.toUpperCase()}! There are 3 POKEMON here!

When I was young, I was a serious POKEMON trainer. In my old age, I have only 3 left, but you can have one!`);

    const options = ["Bulbasaur", "Charmander", "Squirtle"];
    let pokemon;
    while (true) {
      pokemon = prompt(
        `Choose your pokemon:\n${options.join("\n")}`,
        options[0]
      );
      if (options.includes(pokemon)) break;

      alert("Invalid option");
    }

    alert(`You selected ${pokemon.toUpperCase()}. Great choice!`);

    const pokemonName =
      prompt("You can name your pokemon:", pokemon) || pokemon;

    alert(`${name.toUpperCase()}, raise your young ${pokemonName.toUpperCase()} by making it fight!

When you feel ready you can challenge BROCK, the PEWTER's GYM LEADER`);

    return [name, pokemon, pokemonName];
  }

  static menu() {
    let option = ""
    let isValid = ["Train", "Stats", "Leader"]
    while(true){
      option = prompt(`what'd you like to do now? \n
      Train \n
      Stats \n
      Leader
      `, "Train");
      if (option === null) {
        // Si el usuario presiona "Cancelar", retornar null
        return null;
      }
      if (isValid.includes(option)) return option

      console.log("Select a valid option.")
    }
    // pedir al usuario que elija entre "Train", "Stats", "Leader";
    // retornar una opcion valida
  }

  static goodbye() {
    console.log("%cThanks for playing Pokemon Yellow!", "font-weight: bold");
    console.log("This game was created with love by: Alexis, Blanca, Fernando, Hillary and Walter.");
  }
}
