// // Versión síncrona:
// function syncVersion(){
//     const game = new Game()
//     // Crear un nuevo Game y llamar al método start
//     game.start()
// }


// // Versión asíncrona:
// function asyncVersion() {
// // Iniciar un contador de 10 segundos antes de empezar el juego    
//     let seconds = 10;
// // Inciar un intervalo para mostras los segundos restantes en la consola    
//     const intervalId = setInterval(() => {
//         if (seconds >= 0) {
//             console.clear()
//             console.log(`El juego empezará en ... ${seconds}`);
//             seconds--; 
// // Recuerda 'cancelar' el intervalo cuando llegue a 0 segundos               
//         } else {
//             clearInterval(intervalId)
//         }
//     },1100);
// }
// asyncVersion()
