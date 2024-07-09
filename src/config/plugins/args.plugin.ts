// al ser una depedencia de terceros, creo un plugin para que el codigo de mi app no quede muy acoplado a yargs
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

//defino banderas de argumentos que puedo llegar a recibir
export const yarg = yargs(hideBin(process.argv))
.option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: 'Multiplication table base'
})
.option('l', {
    alias: 'limit',
    type: 'number',
    default: 10,
    describe: 'Multiplication table limit'
})
.option('n', {
    alias: 'name',
    type: 'string',
    default: 'multiplication-table',
    describe: 'File name'
})
.option('d', {
    alias: 'destination',
    type: 'string',
    default: './outputs',
    describe: 'File destination'
})
.option('s', {
    alias: 'show',
    type: 'boolean',
    default: false,
    describe: 'Show multiplication table'})
    //en un valor booleano que sea por defecto false, solo con llamar al argumento por ventana de comando ya se hace true
.parseSync();

// parse tiene como valor de retorno un objeto o una promesa que me devuelve ese mismo objeto. Para este caso no me conviene ya que este es un proceso sincrono. Si fuera a hacer alguna tarea asincrona con los argumentos que reciba, convendria usar el parse.




