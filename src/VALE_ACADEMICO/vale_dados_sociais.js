const { default: jsPDF } = require('jspdf');
fs = require('fs');


const DadosSociais = async (req,page,c) =>{
    const entradas = req;
    const j = 0;

    const alterna = entradas.alternativas;
    
            await page.waitForTimeout(3000);

            console.log(alterna);

            //criando resultado
            let obj = { tipoDoTeste:"Dados Sociais", urlsRequest:[],urlsResponse:[],logs:[], print:''}
        
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
           
            
            await page.type('input[id=RendaIndividual]', entradas.rendaIndividual, {delay:100});
                       
            await page.type('input[id=RendaFamiliar]', entradas.rendaFamiliar, {delay:100});

            await page.type('input[id=RendaTotal]', entradas.rendaTotal, {delay:100});

            await page.type('select[id=FamiliaBeneficio]', entradas.familiaBeneficio, {delay:100});

            await page.type('select[id=ValeTransporte]', entradas.valeTransporte, {delay:100});

            //preenchendo checkbox
             for (let index = 0; index < 5; index++) {
                await page.keyboard.press('Tab');

                if(entradas.beneficios[index].chave===true){
                    await page.keyboard.press('Space');

                }
            }
           

            await page.type('input#Qual', entradas.outroBeneficio, {delay:100});

            

            await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/dados_sociais.jpg`, fullPage:true}).then(t=>{
                obj.print = `${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/dados_sociais.jpg`;
            });

            await page.evaluate(()=>{ return document.querySelector('div > button[type=\"submit\"]').click()});


            // let button = await page.$('');
            // await button.click();
            await page.off('request');
            await page.off('response');
            await page.off('console');
 

    return c.push(obj);
    
}

module.exports = DadosSociais;