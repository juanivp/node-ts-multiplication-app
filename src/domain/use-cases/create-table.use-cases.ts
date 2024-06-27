//el objetivo de este use case es crear la data del archivo. Es su unica responsabilidad

//estas son las reglas de negocio que quiero obligatoriamente forzar en la clase CreateTable  en el metodo execute. Defino que su nombre sera CreateTableOptions
export interface CreateTableUseCase {
    execute: ( options: CreateTableOptions ) => string;
};
// Y ahora defino de que se tratan esas reglas o interface CreateTableOptions
export interface CreateTableOptions {
    base: number;
    limit?: number;
};

export class CreateTable implements CreateTableUseCase {

    constructor(){
        /**
         * DI - Dependency Injection
         */
    }

    execute({ base, limit = 10 } : CreateTableOptions) {

        let outputMessage = '';
        for (let i = 1; i <= limit; i++) {
            outputMessage += `${ base } x ${ i } = ${ base * i}`;
            //agrego un salto de linea en todas menos en la ultima
            if ( i < limit ) outputMessage += '\n';
        };

        return outputMessage;
    }


}

