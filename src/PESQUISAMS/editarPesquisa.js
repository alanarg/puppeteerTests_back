const { default: jsPDF } = require('jspdf');
fs = require('fs');


const editarPesquisa = async (req,page,i,c) =>{

    const entradas = req;
    
        
            //criando resultado
            let obj = {id:i, tipoDoTeste:"editar", urlsRequest:[],urlsResponse:[],logs:[], print:''}

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
                return  obj.logs.push(`Logs do caso ${i} `+log._text);
                
            });
            await page.type('select[id=Categoria]',entradas.categoria);
            await page.keyboard.press('Tab');
            await page.keyboard.press("Backspace");
            await page.keyboard.type(entradas.titulo);
            await page.keyboard.press('Tab');
            await page.keyboard.press("Backspace");
            await page.keyboard.type(entradas.objetivo,{delay:1000});
            await page.keyboard.press('Tab');
            await page.keyboard.press("Backspace");
            await page.keyboard.type(entradas.datainicio, {delay:1000});
            await page.keyboard.press('Tab');
            await page.keyboard.press("Backspace");
            await page.keyboard.type(entradas.datafim, {delay:1000});
            await page.keyboard.press('Tab');
            await page.keyboard.press("Backspace");
            await page.keyboard.type(entradas.nomeresponsavel, {delay:100});
            await page.keyboard.press('Tab');
            await page.keyboard.press("Backspace");
            await page.keyboard.type(entradas.emailresponsavel);
            await page.keyboard.press('Tab');
            await page.keyboard.press("Backspace");
            await page.keyboard.type(entradas.telefone);
            
            await page.keyboard.press('Tab');

            if(entradas.autenticacao==="true"){
                await page.keyboard.press("Space");

            }

            await page.waitForTimeout(3000);

            await page.screenshot({path:`./src/public/PESQUISAMS_IMAGES/editarpesquisa_${i}.jpg`, fullPage:true}).then(t=>{
                obj.print = `http://localhost:8080/PESQUISAMS_IMAGES/editarpesquisa_${i}.jpg`;
            });

            await page.evaluate(t=>{
                return document.querySelector('button.btn.green.default').click();            
            });

            
            page.off('request');
            page.off('response');
            page.off('console');

            
    return c.push(obj);
    
    
    
}

module.exports = editarPesquisa;