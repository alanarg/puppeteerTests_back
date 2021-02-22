const { default: jsPDF } = require('jspdf');
const fs = require('fs');
const request = require('request-promise');


const criarCategoria = async (req,page,i,c) =>{

    const entradas = req;
    
        
            const fileData = await request({
                uri: 'http://localhost:8080/filetest.png',
                encoding: null
            }); 
            
            await fs.writeFileSync('./src/public/file.png', fileData); 

            const fileInput = await page.$('input[type=file]');

            await fileInput.uploadFile('./src/public/file.png');

            //criando resultado
            let obj = {id:i, tipoDoTeste:"Criar categoria", urls:[],logs:[], print:''}

            //Ouvinte de requisições
            page.on('request', async req => {
                // Ignore OPTIONS requests
                // if (req.url().includes('/pesquisams/v1/')) {
                    return  obj.urls.push(req.url());
                  
                // };
            });

            //Ouvinte de logs
            page.on('console', async log => { 
                return  obj.logs.push(`Logs do caso ${i} `+log._text);
                
            });
           
            await page.waitForTimeout(3000);

           
            await page.type('input[id=Descricao]',entradas.descricao, {delay:100});

            await page.screenshot({path:`./src/public/PESQUISAMS_IMAGES/criarpesquisa_${i}.jpg`, fullPage:true}).then(t=>{
                obj.print = `http://localhost:8080/PESQUISAMS_IMAGES/criarpesquisa_${i}.jpg`;
            });

            await page.evaluate(t=>{
                document.querySelector('button.btn.green.default').click();            
            });

            page.off('request');
            page.off('console');
            page.off('filedialog');


            
    return c.push(obj);
    
    
    
}

module.exports = criarCategoria;