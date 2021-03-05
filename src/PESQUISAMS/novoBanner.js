const { default: jsPDF } = require('jspdf');
const fs = require('fs');
const request = require('request-promise');


const criarBanner = async (req,page,i,c) =>{

    const entradas = req;
    
        
            const fileData = await request({
                uri: 'http://localhost:8080/IMAGENS_TESTE/imagem_teste1.png',
                encoding: null
            }); 
            
            await fs.writeFileSync('./src/public/file.png', fileData); 

            const fileInput = await page.$('input[type=file]');

            await fileInput.uploadFile('./src/public/file.png');

            //criando resultado
            let obj = {id:i, tipoDoTeste:"Criar banner", urlsRequest:[],urlsResponse:[],logs:[], print:''}

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

           
            await page.type('input[id=Nome]',entradas.nome, {delay:100});
            await page.type('select[id=Ativo]',entradas.ativo, {delay:100});
            await page.type('select[id=Principal]',entradas.principal, {delay:100});



            await page.screenshot({path:`./src/public/PESQUISAMS_IMAGES/criarbanner_${i}.jpg`, fullPage:true}).then(t=>{
                obj.print = `http://localhost:8080/PESQUISAMS_IMAGES/criarbanner_${i}.jpg`;
            });

            await page.evaluate(t=>{
                document.querySelector('button.btn.green.default').click();            
            });

            page.off('request');
            page.off('response');
            page.off('console');
            page.off('filedialog');


            
    return c.push(obj);
    
    
    
}

module.exports = criarBanner;