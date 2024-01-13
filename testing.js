const player = new Player("Blanca", "Ratata", "Pericote", 3);
const bot = new Bot("random", "Ratata", "loca", 4)
console.dir(bot)
bot.selectMove()
let battle = new Battle(player, new Bot("ramdon person", Pokemons[randomBetween(0,6)].species, undefined , randomBetween(1, 5)))
battle.start()