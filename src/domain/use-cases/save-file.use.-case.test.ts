import fs from 'fs';
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



     })

})

