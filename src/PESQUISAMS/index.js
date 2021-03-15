
fs = require('fs');

const imageToBase64 = require('image-to-base64');


const PesquisaPublica = async (req,i) =>{

    const casosFinais = [];

    const entradas = req;
    //Instancia o o navegador
   
    
        
    //         //criando resultado
            let obj = {id:i, urls:[],logs:[], print:''}
            // casosFinais.push(obj);


            
            //função de navegação por URL            
            await page.goto('http://localhost:4200/publico/documento/SUFHUk8');


            
              //Ouvinte de logs
              await page.on('console', async (log) => { 
                
                return await obj.logs.push(log._text);
                
                
            });

            //Ouvinte de requisições
            await page.on('response', async r => {

                console.log("oie");
                // Ignore OPTIONS requests
                // if(response.request().method() !== 'POST'){

                // if (response.url().includes('/pesquisams/v1')) {

                   
                //     return  await obj.urls.push(response.url());
                  
                // };
            // }
            });

        

            await page.waitForSelector('input[id=Nome]');

            await page.type('#Nome',entradas.nome, {delay:100});
            await page.type('input.ng-untouched.ng-pristine.ng-valid','ANEXO', {delay:100});
            await page.type('input#numero.form-control.input-sm.ng-untouched.ng-pristine.ng-valid',entradas.numero);
            await page.type('input#data.p-inputmask.form-control.input-sm.p-inputtext.p-component', entradas.data,  {delay:100});
            await page.type('input#assunto.form-control.input-sm.ng-untouched.ng-pristine.ng-valid',entradas.assunto, {delay:100});
            await page.type('input#resumo.form-control.input-sm.ng-untouched.ng-pristine.ng-valid',entradas.resumo, {delay:100});
            await page.type('input#texto.form-control.input-sm.ng-untouched.ng-pristine.ng-valid', entradas.texto_do_documento, {delay:100});


            //Clicando botão pesquisar
            await page.evaluate(()=>{ return document.querySelector('a.btn.blue').click();});

            //Espera o carregamento do GRID
            await page.waitForTimeout(2000);

            
          



            //Tirando print assim que o botão pesquisar é acionado
            await page.screenshot({path:`./src/public/gedcorp_${i}.jpg`, fullPage:true});
        
        
    return obj;
    
    
    
}

module.exports = PesquisaPublica;