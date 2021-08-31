const { default: jsPDF } = require('jspdf');
fs = require('fs');


const Cursos = async (page,c) =>{
    const j = 0;

            //criando resultado
            let obj = { tipoDoTeste:"Documentos", urlsRequest:[],urlsResponse:[],logs:[], print:''}
        
            //Ouvinte de requisições
            await page.on('response', res => {
                // Ignore OPTIONS requests
                return  obj.urlsResponse.push({url:res.url(), status:res.status()});  
            });

            await page.on('request', req => {
                // Ignore OPTIONS requests
                return  obj.urlsRequest.push({url:req.url()});  
            });
            //Ouvinte de logs
            page.on('console', log => { 

                return  obj.logs.push(`Logs do caso`+log._text);
                
            });

            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');

             
            //preenchendo checkbox
             for (let index = 0; index < 734; index++) {
                 
                await page.keyboard.press('Space');
                await page.keyboard.press('Tab');

                
            }
            await page.waitForTimeout(3000);

            await page.evaluate(()=>{ return document.querySelector('button.btn.green.default').click()});


            // let button = await page.$('');
            // await button.click();
            await page.off('request');
            await page.off('response');
            await page.off('console');
 

    return c.push(obj);
    
}

module.exports = Cursos;