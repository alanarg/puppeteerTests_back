const { default: jsPDF } = require('jspdf');
fs = require('fs');


const editarPesquisa = async (req,page,i,c) =>{

    const entradas = req;
    
        
            //criando resultado
            let obj = {id:i, tipoDoTeste:"editar", urls:[],logs:[], print:''}

            //Ouvinte de requisições
            page.on('request',  req => {
                // Ignore OPTIONS requests
                // if (req.url().includes('/pesquisams/v1/')) {
                    return  obj.urls.push(req.url());
                  
                // };
            });

            //Ouvinte de logs
            page.on('console',  log => { 
                return  obj.logs.push(`Logs do caso ${i} `+log._text);
                
            });
           //Substituindo campo clicando ttres vezes no input e digitado
            // await page.waitForTimeout(3000);
            // const input1 = await page.$('select[id=Categoria]');
            // await input1.click({ clickCount: 2 });
            // await input1.type(entradas.categoria,{delay:100});
            // await page.waitForTimeout(3000);
            // const input2 = await page.$('input[id=Titulo]');
            // await input2.click({ clickCount: 2 });
            // await input2.type(entradas.titulo,{delay:100});
            // const input3 = await page.$('input[id=Descricao]');
            // await input3.click({ clickCount: 2 });
            // await input3.type(entradas.objetivo,{delay:100});
            // const input4 = await page.$('input[id=datainicio]');
            // await input4.click({ clickCount: 2 });
            // await input4.type(entradas.datainicio);
            // const input5 = await page.$('input[id=datafim]');
            // await input5.click({ clickCount: 2 });
            // await input5.type(entradas.datafim);
            // const input6 = await page.$('input[id=nomeresponsavel]');
            // await input6.click({ clickCount: 2 });
            // await input6.type(entradas.nomeresponsavel);
            // const input7 = await page.$('input[id=emailresponsavel]');
            // await input7.click({ clickCount: 2 });
            // await input7.type(entradas.emailresponsavel);
            // const input8 = await page.$('input[id=telefoneresponsavel]');
            // await input8.click({ clickCount: 2 });
            // await input8.type(entradas.telefoneresponsavel);
            await page.type('select[id=Categoria]',entradas.categoria);
            await page.keyboard.press('Tab');
            await page.keyboard.press("Backspace");
            await page.keyboard.type(entradas.titulo);
            await page.keyboard.press('Tab');
            await page.keyboard.press("Backspace");
            await page.keyboard.type(entradas.objetivo,{delay:100});
            await page.keyboard.press('Tab');
            await page.keyboard.press("Backspace");
            await page.keyboard.type(entradas.datainicio, {delay:100});
            await page.keyboard.press('Tab');
            await page.keyboard.press("Backspace");
            await page.keyboard.type(entradas.datafim, {delay:100});
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
                return document.querySelector('button.btn.green.default.ng-star-inserted').click();            
            });

            
            page.off('request');
            page.off('console');

            
    return c.push(obj);
    
    
    
}

module.exports = editarPesquisa;