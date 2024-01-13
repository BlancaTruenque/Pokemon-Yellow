class Pokemon {
  constructor(species, name, level) {
    // Inicializar atributos usando los parámetros
    this.species = species;
    this.name = name || species;
    this.level = level;
    // Inicializar atributos usando la información del Pokedex
    let pokemonInfo = Pokemons.find((pokemon) => pokemon.species === species);
    this.type = pokemonInfo.type;
    this.baseExp = pokemonInfo.baseExp;
    this.effortPoints = pokemonInfo.effortPoints;
    this.growthRate = pokemonInfo.growthRate;
    this.baseStats = pokemonInfo.baseStats;
    this.moves = pokemonInfo.moves;
    // Inicializar atributos según otras indicaciones
    this.experiencePoints =
      level === 1 ? 0 : Math.floor( ExperienceCurves[this.growthRate](this.level));
    this.individualValues = {
      hp: randomBetween(0, 31),
      attack: randomBetween(0, 31),
      defense: randomBetween(0, 31),
      specialAttack: randomBetween(0, 31),
      specialDefense: randomBetween(0, 31),
      speed: randomBetween(0, 31),
    };
    this.effortValues = {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
    };
  }

  get stats() {
    const stats = {};
    const statNames = [
      "hp",
      "attack",
      "defense",
      "specialAttack",
      "specialDefense",
      "speed",
    ];

    for (const statName of statNames) {
      stats[statName] = this.calcularStat(statName);
    }
    return stats;
  }
  // calcular las estadisticas actuales del Pokémon
  calcularStat(statName) {
    const baseStat = this.baseStats[statName];
    const individualValue = this.individualValues[statName];
    const effortValue = this.effortValues[statName];
    const statEffort = Math.floor(effortValue / 4);

    if (statName === "hp") {
      return Math.floor(
        ((2 * baseStat + individualValue + statEffort) * this.level) / 100 +
          this.level +
          10
      );
    } else {
      return Math.floor(
        ((2 * baseStat + individualValue + statEffort) * this.level) / 100 + 5
      );
    }
  }

  expForLevel(actualExperience) {
    let calculating = true;
    let sumLevel = 0;
    while (calculating) {
      let expReq = ExperienceCurves[this.growthRate](this.level + sumLevel);
      if (actualExperience > expReq) {
        sumLevel++;
      } else {
        this.level += sumLevel;
        calculating = false;
      }
    }
    return sumLevel > 0 ? true : false;
  }

  prepareForBattle() {
    this.currentHp = this.stats.hp;
    this.currentMove = null;
    // asignar al atributo currentHp la estadistica HP
    // resetear el atributo currentMove a null
  }

  receiveDamage(damage) {
    damage > this.currentHp ? (this.currentHp = 0) : (this.currentHp -= damage);
  }

  setCurrentMove(move) {
    this.currentMove = Moves.find((e) => e.name === move);
  }

  isFainted() {
    return this.currentHp === 0 ? true : false;
  }

  attack(target) {
    console.log(`${this.name} used ${this.currentMove.name}`);
    if (this.moveHits()) {
      let hit = this.calculateBaseDamage(target);
      
      if (this.isCritical()) {
        hit *= 1.5;
        console.log("it's a critic hit");
      }

      let effectivity = this.calculateEffectiveness(target);
      if (effectivity > 1) {
        console.log("and it's very effective");
      } else if (effectivity < 1) {
        console.log("It's not very effective...");
      }
     
      hit *= effectivity 
      
      target.receiveDamage(hit);
      console.log("it hit "+ target.name +" with "+ hit +" damage")
    } else {
      console.log("But it MISSED!");
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
    return randomBetween(1, 100) < this.currentMove.accuracy ? true : false;
  }

  isCritical() {
    // 1/16 de probabilidad que sea critico
    return randomBetween(1, 16) === 1 ? true : false;
  }

  calculateBaseDamage(target) {
    let sMove = SpecialMoveTypes.find(sM => sM === this.currentMove.type);
    let offensiveStat = sMove ? this.stats.specialAttack : this.stats.attack;
    let targetDefensiveStat = sMove ? target.stats.specialDefense : target.stats.defense;

    return (Math.floor(Math.floor(Math.floor(2 * this.level / 5.0 + 2) * offensiveStat * this.currentMove.power / targetDefensiveStat) / 50) + 2)


  }

  calculateEffectiveness(target) {
    let res = 1;
    target.type.forEach((type) => {
      res *= TypeMultiplier[this.currentMove.type][type] || 1;
    });
    return res;
    // caluclar el multiplicador de efectividad tomando el tipo del currentMove y el tipo de pokemon del oponente
  }

  processVictory(target) {
    let gainedExp = Math.floor((target.baseExp * target.level) / 7);
    this.experiencePoints += gainedExp;
    this.effortValues[target.effortPoints.type] += target.effortPoints.amount;
    console.log(`${target.name} FAINTED`)
    console.log(`${this.name} WON THE BATTLE!`)
    console.log(`${this.name} gained ${gainedExp} experience points`);

    let levelUp = this.expForLevel(this.experiencePoints);

    if (levelUp) {
      console.log(`${this.name} reached level ${this.level}`);
    }
    // calcular la experiencia ganada e incrementarla a tus experiencePoints
    // incrementar los effortValues en la estadística correspondiente con la información de effortPoints del oponente
    // anunciar "[nombre] gained [cantidad] experience points"
    // verificar si los nuevos experiencePoints te llevan a subir de nivel
    // si se sube de nivel
    // incrementar nivel y Anunciar "[nombre] reached level [nivel]!"
  }
}
