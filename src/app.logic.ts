import fs from 'fs';
import { yarg } from './config/plugins/yargs.plugin';


const { b:base, l:limit, s:showTable} = yarg;
let outputMessage = '';
const headerMessage = `
===============================
        Tabla del ${ base }
===============================
\n`;

for (let i = 1; i <= limit; i++) {
    outputMessage += `${ base } x ${ i } = ${ base * i}\n`;
};

outputMessage = headerMessage + outputMessage;
if (showTable) {
    console.log(outputMessage);
}
// esta es una manera de guardar el archivo de salida en un file de nombre `outputs/tabla-${ base }.txt`. En caso de que la carpeta no exista me va a crashear el sistema
// fs.writeFileSync(`outputs/tabla-${ base }.txt`, outputMessage);

// otra manera de guardar el archivo de salida es de la siguiente forma. Lo que logro, a diferencia de la forma que esta mas arriba, es crear el directorio o carpeta en donde quiero que se almacene el archivo en caso de que esta no exista.
const outputPath = `ouputs`;

fs.mkdirSync(outputPath, {recursive: true});

fs.writeFileSync(`${ outputPath }/tabla-${ base }.txt`, outputMessage);

console.log('File created');
