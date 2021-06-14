const { default: jsPDF } = require('jspdf');
fs = require('fs');


const RealizarInscricao = async (page,c) =>{
    const j = 0;

    
            await page.waitForTimeout(3000);


            //criando resultado
            let obj = { tipoDoTeste:"Realizar Inscricao", urlsRequest:[],urlsResponse:[],logs:[], print:''}
        
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
            await page.on('console', log => { 

                return  obj.logs.push(`Logs do caso`+log._text);
                
            });
           
            try{

                await page.waitForSelector('td:nth-child(7) > a');

                await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/ensino_superior.jpg`, fullPage:true}).then(t=>{
                    obj.print = `${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/ensino_superior.jpg`;
                });
    
                await page.evaluate(()=>{ return document.querySelector('td:nth-child(7) > a').click()});
    
                await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/ensino_superior.jpg`, fullPage:true}).then(t=>{
                    obj.print = `${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/ensino_superior.jpg`;
                });

                await page.waitForSelector('div > div.ui-chkbox-box.ui-widget.ui-corner-all.ui-state-default');

                await page.evaluate(()=>{ return document.querySelector('div > div.ui-chkbox-box.ui-widget.ui-corner-all.ui-state-default').click()});

                await page.keyboard.press('Enter');


            }catch(error){

                console.log(error);
            }
            // let button = await page.$('');
            // await button.click();
            
            await page.off('request');
            await page.off('response');
            await page.off('console');
 

    return c.push(obj);
    
}

module.exports = RealizarInscricao;