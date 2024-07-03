import fs, { mkdir } from 'fs';
import { SaveFile } from './save-file.use-case';

describe( 'SaveFileUseCase' , () => {

    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-file-name'
    };
    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

    afterEach(() => {
        //clean up
        const outputFolderExists = fs.existsSync('outputs');
        if (outputFolderExists) {
            fs.rmSync('outputs', { recursive: true });
        }

        const customOutputFolderExists = fs.existsSync(customOptions.fileDestination);
        if (customOutputFolderExists) {
            fs.rmSync( customOptions.fileDestination , { recursive: true });
        }
    });

    test('should save file with default values', () => { 
        
        const saveFile = new SaveFile();
        const options = {
            fileContent: 'test content'
        };
        const filePath = 'outputs/table.txt';

        const result = saveFile.execute(options);

        // Al ejecutar la prueba, se estara guardando el archivo result. Este archivo voy a querer borrarlo al finalizar la prueba por varios motivos. Uno es para no crear archivos basura cada vez que ejecuto la prueba. Otro es para poder evaluar correctamente la existencia de ese archivo mediante fileExists. Si no lo borrara, esta ultima prueba daria un falso positivo.
        
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8'});
        
        expect( result ).toBeTruthy;
        expect( fileExists ).toBeTruthy;
        expect( fileContent ).toBe( options.fileContent );
    
    });

    test('should save file with custom values', () => { 
        
        
        const saveFile = new SaveFile();
        const result = saveFile.execute(customOptions);
                
        const fileExists = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8'});

        expect( result ).toBeTruthy;
        expect( fileExists ).toBeTruthy;
        expect( fileContent ).toBe( customOptions.fileContent );

    });

    //aqui vamos a testear el catch, es decir que sucede si mkdirSync o writeFileSync fallan. Para eso las voy a hacer fallar yo.
    test('should return false if directory counld not be created', () => { 
        
        const saveFile = new SaveFile();
        //creo un espia de jest  que va a espiar al metodo mkdirSync. Hasta ahi me serviria para saber si la funcion fue llamada y con que argumentos, etc. Pero ademas vamos a aplicarle un .mockImplementacion, lo cual reescribe su funcionalidad. De esta manera, cuando se llame al metodo fs.mkdirSync va a tirar un nuevo error y de esa manera puedo hacer el testing necesario. Los mockImplementations persisten sobre las pruebas siguientes, con lo cual debo borrarlos al terminar este test en caso de no necesitarlo.
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing') }
        );
        //ahora lo ejecuto con cualquier argumento, da igual total va a dar error
        const result = saveFile.execute( customOptions )

        expect( result ).toBe( false );
        //restauro la funcionalidad original de mkdirSync
        mkdirSpy.mockRestore();

    });

    test('should return false if file counld not be created', () => { 
        
        const saveFile = new SaveFile();

        const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom wrinting error message') }
        );

        const result = saveFile.execute( {fileContent: 'Hello'} )

        expect( result ).toBe( false );

    });


})
