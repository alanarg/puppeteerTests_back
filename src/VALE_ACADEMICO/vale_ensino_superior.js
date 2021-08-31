const { default: jsPDF } = require('jspdf');
fs = require('fs');


const EnsinoSuperior = async (req,page,c) =>{
    const entradas = req;
    const j = 0;

    const alterna = entradas.alternativas;

            await page.waitForTimeout(3000);

            console.log(alterna);

            //criando resultado
            let obj = { tipoDoTeste:"Ensino Superior", urlsRequest:[],urlsResponse:[],logs:[], print:''}
        
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
           
            
            await page.type('div:nth-child(1) > div:nth-child(1) > div > div > select', entradas.instituicaoEnsino, {delay:100});
                       
            await page.type('div:nth-child(1) > div:nth-child(2) > div > select', entradas.curso, {delay:100});

            //Auto preenchimento
            // await page.type('div:nth-child(1) > div > input', entradas.grau, {delay:100});

            // await page.type('div:nth-child(2) > div:nth-child(2) > div > input', entradas.periodo, {delay:100});

            // await page.type('div:nth-child(2) > div:nth-child(3) > div > input', entradas.periodicidade, {delay:100});

            // await page.type('div:nth-child(4) > div > input', entradas.modalidade, {delay:100});

            await page.type('div:nth-child(3) > div:nth-child(1) > div > select', entradas.estaMatriculado, {delay:100});

            await page.type('div:nth-child(3) > div:nth-child(2) > div > input', entradas.semestreAnoInscricao, {delay:100});

            await page.type('div:nth-child(3) > div:nth-child(3) > div > input', entradas.semestreAnoAtual, {delay:100});



            await page.type('div:nth-child(4) > div:nth-child(1) > div > select', entradas.periodoEstagio, {delay:100});

            // await page.keyboard.press('Tab');

            // await page.keyboard.type( entradas.possuiSuperior, {delay:100})

            // await page.keyboard.press('Tab');

            // await page.keyboard.type( entradas.possuiDP, {delay:100})


            await page.type('div:nth-child(4) > div:nth-child(2) > div > select', entradas.possuiSuperior, {delay:1000});

            await page.type('div:nth-child(4) > div.col-sm-6 > div > select', entradas.possuiDP, {delay:1000});

            await page.type('div:nth-child(5) > div > pvu-input-date > p-inputmask > input', entradas.terminoCurso, {delay:100});

            await page.type('div:nth-child(4) > div > pvu-input-date > p-inputmask > input', entradas.ingressoCurso, {delay:100});


            await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/ensino_superior.jpg`, fullPage:true}).then(t=>{
                obj.print = `${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/ensino_superior.jpg`;
            });

            await page.waitForTimeout(3000);

            await page.evaluate(()=>{ return document.querySelector('button.btn.btn-md.green.default').click()});

            await page.waitForTimeout(3000);

            // let button = await page.$('');
            // await button.click();
            
            await page.off('request');
            await page.off('response');
            await page.off('console');
 

    return c.push(obj);
    
}

module.exports = EnsinoSuperior;