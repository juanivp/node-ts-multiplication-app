import { table } from 'console';
import { CreateTable } from './create-table.use-cases';

describe('CreateTableUseCase', () => {

    test('should create table with default values', () => { 
        
        const createTable = new CreateTable();

        const table = createTable.execute({ base: 2 });

        const rows = table.split('\n').length;

// nos aseguramos que createTable sea una instancia de nuestra clase CreateTable ya que podria  ser interpretado como el pedido de crear una nueva funcion con ese nombre. Ya no es tan comun de ver en JS pero puede ocurrir.
        expect( createTable ).toBeInstanceOf( CreateTable );

        expect( table ).toContain('2 x 1 = 2');
        expect( table ).toContain('2 x 10 = 20');

        expect( rows ).toBe(10);


     });

     test('should create table with default values', () => { 

        const options = {
            base: 3,
            limit: 20
        };
        const createTable = new CreateTable();
        const tableTested = createTable.execute(options);
        console.log(tableTested);
        const rows = tableTested.split('\n').length;

        expect( tableTested ).toContain('3 x 11 = 33');
        expect( rows ).toBe(options.limit);    

// Cuando hago testing, las pruebas EJECUTAN el codigo testeado. Para esto sirven los spys y los mock return value. Estos fingen que la funcion es llamada y regresa informacion. Sirve para probar nuestro codigo de forma aislada.

});
})
