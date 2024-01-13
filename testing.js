const player = new Player("Blanca", "Ratata", "Pericote", 1);
const bot = new Bot("random", "Ratata", "loca", 4)
console.dir(bot)
bot.selectMove()
bot.pokemon.attack()
let battle = new Battle(player, bot)
battle.start()