const { default: jsPDF } = require('jspdf');
const fs = require('fs');
const request = require('request-promise');


const criarCategoria = async (req,page,i,c) =>{

    const entradas = req;
    
        
            const fileData = await request({
                uri: `${process.env.URL_SYSTEM}/IMAGENS_TESTE/bird.jfif`,
                encoding: null
            }); 
            
            await fs.writeFileSync('./src/public/bird.jfif', fileData); 

            const fileInput = await page.$('input[type=file]');

            await fileInput.uploadFile('./src/public/bird.jfif');

            //criando resultado
            let obj = {id:i, tipoDoTeste:"Criar categoria", urlsRequest:[],urlsResponse:[],logs:[], print:''}
             //Ouvinte de requisições
             await page.on('response',  res => {
                // Ignore OPTIONS requests
                return  obj.urlsResponse.push({url:res.url(), status:res.status()});  
            });

            await page.on('request',  req => {
                // Ignore OPTIONS requests
                return  obj.urlsRequest.push({url:req.url()});  
            });
            //Ouvinte de logs
            page.on('console', async log => { 
                return  obj.logs.push(`Logs do caso ${i} `+log._text);
                
            });
           
            await page.waitForTimeout(3000);

           
            await page.type('input[id=Descricao]',entradas.descricao, {delay:100});

            await page.screenshot({path:`./src/public/PESQUISAMS_IMAGES/criarcategoria_${i}.jpg`, fullPage:true}).then(t=>{
                obj.print = `${process.env.URL_SYSTEM}/PESQUISAMS_IMAGES/criarcategoria_${i}.jpg`;
            });

            await page.evaluate(t=>{
                document.querySelector('button.btn.green.default').click();            
            });

            page.off('request');
            page.off('console');
            page.off('response');
            page.off('filedialog');


            
    return c.push(obj);
    
    
    
}

module.exports = criarCategoria;