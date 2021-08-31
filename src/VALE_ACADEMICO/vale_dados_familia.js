const { default: jsPDF } = require('jspdf');
fs = require('fs');


const DadosFamilia = async (req,page,i,c) =>{
    const entradas = req;
    const j = 0;

    const alterna = entradas.alternativas;
            console.log(alterna);

            //criando resultado
            let obj = { id:i, tipoDoTeste:"Dados do Acadêmico", urlsRequest:[],urlsResponse:[],logs:[], print:''}
        
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
            page.on('console',  log => { 

                return  obj.logs.push(`Logs do caso`+log._text);
                
            });
           
            await page.waitForTimeout(1000);
            
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');

           

            await page.keyboard.type(entradas.nomeCompleto, {delay:100});

            await page.keyboard.press('Tab');

            await page.keyboard.type(entradas.grauParentesco, {delay:100});

            await page.keyboard.press('Tab');

            await page.keyboard.type(entradas.cpf, {delay:100});

            await page.keyboard.press('Tab');

            await page.keyboard.type(entradas.rendaMensal, {delay:1000});

            await page.type('div:nth-child(1) > div > select', entradas.escolaridade, {delay:100});
            
            await page.type('div.col-md-2 > div > select', entradas.estadoCivil, {delay:100});
            
            await page.waitForTimeout(1000);
         
            await page.keyboard.press('Tab');
            
            await page.keyboard.type(entradas.dataNascimento, {delay:100});

            await page.evaluate(()=>{ return document.querySelector('button.btn.green.default').click()});

            await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/dados_familia_${i}.jpg`, fullPage:true}).then(async t=>{
                obj.print = `${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/dados_familia_${i}.jpg`
                
            });

            await page.waitForTimeout(3000);

            await page.off('request');
            await page.off('response');
            await page.off('console');
 

    return c.push(obj);
    
}

module.exports = DadosFamilia;