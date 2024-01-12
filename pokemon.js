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
    this.experiencePoints = level === 1 
    ? 0 
    : ExperienceCurves[this.growthRate](this.level)
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

  expForLevel(actualExperience) {
    let calculating = true
    let sumLevel = 0
    while(calculating){
      let expReq = ExperienceCurves[this.growthRate](this.level + sumLevel)
      if(actualExperience > expReq){
        sumLevel++
      }else{
        this.level += sumLevel
        calculating = false
      } 

    }
    return sumLevel > 0 ? true : false
  }

  prepareForBattle() {
    this.currentHp = this.stats.HP
    this.currentMove = null
    // asignar al atributo currentHp la estadistica HP 
    // resetear el atributo currentMove a null
  }

  receiveDamage(damage) {
    damage > this.currentHp 
    ? this.currentHp = 0 
    : this.currentHp -= damage
  }

  setCurrentMove(move) {
    this.currentMove = Moves.find(e => e.name === move)
  }

  isFainted() {
    return this.currentHp === 0 ? true : false
  }

  attack(target) {
    console.log(`${this.name} used ${this.currentMove}`)
    if(this.moveHits()){
      let hit = this.calculateBaseDamage(target)
      if(this.isCritical()){
        hit *= 1.5
        console.log("it's a critic hit")
      }

      let effectivity = this.calculateEffectiveness(target)
      if(effectivity > 1){
        console.log("and it's very effective")
      }else if(effectivity < 1){
        console.log("It's not very effective...")
      }
      hit *= effectivity
      
      target.receiveDamage(hit)
    }else{
      console.log("But it MISSED!")
    }
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
    return randomBetween(0, 100) > this.currentMove.accuracy 
    ? true 
    : false 
  }

  isCritical() {
    // 1/16 de probabilidad que sea critico
    return randomBetween(1, 16) === 1 
    ? true 
    : false
  }

  calculateBaseDamage(target) {
    
    let sMove = SpecialMoveTypes.find(sM === this.currentMove.type)
    let offensiveStat = sMove ? this.specialAttack : this.attack
    let targetDefensiveStat = sMove ? target.specialDefense : target.defense 

    return Math.floor(Math.floor(Math.floor(2 * this.level / 5.0 + 2) * offensiveStat * this.currentMove.power / targetDefensiveStat) / 50) + 2
  }

  calculateEffectiveness(target) {
    let res = 1
    target.type.forEach(type =>{
      res *= TypeMultiplier[this.currentMove.type][type] || 1
    })
    return res
    // caluclar el multiplicador de efectividad tomando el tipo del currentMove y el tipo de pokemon del oponente
  }

  processVictory(target) {
    let gainedExp = Math.floor(target.baseExp * target.level / 7)
    this.experiencePoints += gainedExp
    this.effortValues[target.effortPoints.type] += target.effortPoints.amount

    console.log(`${this.name} gained ${gainedExp} experience points`)
    
    let levelUp = this.expForLevel(this.experiencePoints)
    
    if(levelUp){
      console.log(`${this.name} reached level ${this.level}`)
    }
    // calcular la experiencia ganada e incrementarla a tus experiencePoints
    // incrementar los effortValues en la estadística correspondiente con la información de effortPoints del oponente
    // anunciar "[nombre] gained [cantidad] experience points"
    // verificar si los nuevos experiencePoints te llevan a subir de nivel
    // si se sube de nivel
    // incrementar nivel y Anunciar "[nombre] reached level [nivel]!"
  } 
}
