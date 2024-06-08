// argv significa argument values, que son los diferentes argumentos con los cuales estoy llamando a la aplicacion por ejemplo: node dist/app.js --base 10 -l=100 --file=hola.txt --s

//yargs es un paquete que sive para procesar los argument values
// console.log(process.argv)   

import { yarg } from '../src/config/plugins/yargs.plugin';
import { ServerApp } from './presentation/server-app';
// Por defecto en Node todo lo que se ejecuta en nuestro archivo principal es sincrono. Si necesito ejecutar tarea asincrona en el root de nuestra aplicacion debo ejecutar una funcion anonima autoinvocada asincrona como la siguiente:
(async() => {
    await main();
})();
//esto genera que todo nuestro codigo sea asincrono

async function main() {

    const {b:base, l:limit, s:showTable, n:fileName, d:fileDestination} = yarg;

    ServerApp.run({base, limit, showTable, fileName, fileDestination});
};


