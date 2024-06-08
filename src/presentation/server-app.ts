//voy a pasarle la informacion de yarg a la funcion run() con el fin de solo usar yarg en un solo archivo. Es innecesario para esta app pero ayuda en el sentido de arquitectura clean code.

import { CreateTable } from "../domain/use-cases/create-table.use-cases";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
    base            : number,
    limit           : number;
    showTable       : boolean;
    fileName        : string;
    fileDestination : string;
}

//voy a crear una clase que me permita mantener estructurada mi app. Le voy a pasar argumentos de tipo RunOptions que seran obligatorios.
export class ServerApp {

    static run ({base, limit, showTable, fileName, fileDestination }: RunOptions) {
        console.log('App running');

        const table = new CreateTable().execute({ base, limit });
        const wasCreated = new SaveFile().execute({ 
            fileContent: table,
            fileDestination,
            fileName
        });
        
        if (showTable) console.log(table) ;
        
        (wasCreated)? console.log('File created') : console.error(Error);
    }

}