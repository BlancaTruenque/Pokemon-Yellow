class Pokemon {
  constructor(species, name, level = 1) {
    this.species = species
    this.name = name || species
    this.level = level
    const pokemon = Pokemons.find(pokemon => pokemon.species === species)
    this.type = pokemon.type
    this.moves = pokemon.moves
    this.baseExp = pokemon.baseExp
    this.effortPoints = pokemon.effortPoints
    this.growthRate = pokemon.growthRate
    this.baseStats = pokemon.baseStats
    this.experiencePoints = level === 1 ? 0 : ExperienceCurves[this.growthRate](this.level)
    this.individualValues = {
      hp : randomBetween(0, 31),
      attack : randomBetween(0, 31),
      defense : randomBetween(0, 31),
      specialAttack : randomBetween(0, 31),
      specialDefense : randomBetween(0, 31),
      speed : randomBetween(0, 31)
    }
    this.effortValues = {
      hp : 0,
      attack : 0,
      defense : 0,
      specialAttack : 0,
      specialDefense : 0,
      speed : 0
    }
    
    
  }

  get stats() {
    const stats = {
      Species: this.species,
      level: this.level,
      "experience points": Math.floor(this.experiencePoints),
      type: this.type.join(", "),

      HP : Math.floor((2 * this.baseStats.hp + this.individualValues.hp + (this.effortValues.hp / 4)) * this.level / 100 + this.level + 10),

      Attack :  Math.floor((2 * this.baseStats.attack + this.individualValues.attack + (this.effortValues.attack / 4)) * this.level / 100 + 5),

      Defense :  Math.floor((2 * this.baseStats.defense + this.individualValues.defense + (this.effortValues.defense / 4)) * this.level / 100 + 5),

      SpecialAttack :  Math.floor((2 * this.baseStats.specialAttack + this.individualValues.specialAttack + (this.effortValues.specialAttack / 4)) * this.level / 100 + 5),

      SpecialDefense :  Math.floor((2 * this.baseStats.specialDefense + this.individualValues.specialDefense + (this.effortValues.specialDefense / 4)) * this.level / 100 + 5),

      Speed : Math.floor((2 * this.baseStats.speed + this.individualValues.speed + (this.effortValues.speed / 4)) * this.level / 100 + 5)
      
      
    };
    return stats;
  }

  expForLevel(n) {
    return ExperienceCurves[this.growthRate](n)
  }

  prepareForBattle() {
    this.currentHp = this.stats.HP
    this.setCurrentMove = null
    // asignar al atributo currentHp la estadistica HP 
    // resetear el atributo currentMove a null
  }

  receiveDamage(damage) {
    damage > this.currentHp 
    ? this.currentHp = 0 
    : this.currentHp -= damage
  }

  setCurrentMove(move) {
    // buscar el move (string) en el pokedex y asignarlo al atributo currentMove
    this.currentMove = moves.find(e => e.name === move)
  }

  isFainted() {
    return this.currentHp === 0 ? true : false
  }

  attack(target) {
    // anunciar "[nombre] used [MOVE]!"
    // determinar si el movimiento "pega" con moveHits()
    // si "pega":
    //  calcular daño base con calculateDamage
    //  determinar si es un critical hit con isCritical
    //  si es critico, anunciarlo
    //  calcular el multiplicador de efectividad con calculateEffectiveness
    //  anunciar mensaje según efectividad. Por ejemplo "It's not very effective..."
    //  calcular el daño final usando el daño base, si fue critico o no y la efectividad
    //  Hacer daño al oponente usando su metedo receiveDamage
    //  Anunciar el daño hecho: "And it hit [oponente] with [daño] damage"
    // si no "pega"
    //  anunciar "But it MISSED!"
  }

  moveHits() {
    // calcular si pega en base al accuracy del currentMove
  }

  isCritical() {
    // 1/16 de probabilidad que sea critico
  }

  calculateBaseDamage(target) {
    // determinar si el movimiento es especial comparando el currentMove con la data de Pokedex (SpecialMoveTypes)
    // determinar si se usara el stat attack o specialAttack del atacante
    // determinar si se usara el stat defense o specialDefense del defensor
    // retornar el rsultado de la formula de daño
  }

  calculateEffectiveness(target) {
    // caluclar el multiplicador de efectividad tomando el tipo del currentMove y el tipo de pokemon del oponente
  }

  processVictory(target) {
    // calcular la experiencia ganada e incrementarla a tus experiencePoints
    // incrementar los effortValues en la estadística correspondiente con la información de effortPoints del oponente
    // anunciar "[nombre] gained [cantidad] experience points"
    // verificar si los nuevos experiencePoints te llevan a subir de nivel
    // si se sube de nivel
    // incrementar nivel y Anunciar "[nombre] reached level [nivel]!"
  }
}
