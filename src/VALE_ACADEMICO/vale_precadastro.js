
fs = require('fs');



const PreCadastroVale = async (req,page,i,c) =>{


    const entradas = req;
 
    //Instancia o o navegador
       
             //criando resultado
            let obj = { urls:[],logs:[], print:''}
            // casosFinais.push(obj);
            
            //função de navegação por URL            
            // await page.goto('https://localhost:4200/portal/pre-cadastro');

            //Ouvinte de logs
            await page.on('console', async (log) => { 
                
                return await obj.logs.push(log._text);
                    
            });

            //Ouvinte de requisições
            await page.on('response', async r => {

                // Ignore OPTIONS requests
                if(response.request().method() !== 'POST'){

                if (response.url().includes('/pesquisams/v1')) {

                   
                    return  await obj.urls.push(response.url());
                  
                };
            }
            });

            await page.waitForSelector('input.form-control.input-sm.ng-untouched.ng-pristine.ng-invalid');

            await page.type('input.form-control.input-sm.ng-untouched.ng-pristine.ng-invalid',entradas.nome_completo);

            await page.keyboard.press('Tab');

            await page.keyboard.type(entradas.cpf,{delay:100});


            await page.type('input.form-control.ng-untouched.ng-pristine.ng-invalid',entradas.email);

            await page.keyboard.press('Tab');

            await page.keyboard.type(entradas.confirma_email,{delay:100});

            await page.keyboard.press('Tab');

            await page.keyboard.type(entradas.senha,{delay:100});

            
            await page.keyboard.press('Tab');

            await page.keyboard.type(entradas.confirma_senha,{delay:100});



            await page.type('select.form-control.input-sm.ng-untouched.ng-pristine.ng-invalid',entradas.indigena);


            // //Clicando botão pesquisar
            await page.evaluate(()=>{ return document.querySelector('button.btn.btn-md.btn-block').click();});

            //Espera o carregamento do GRID
            await page.waitForTimeout(2000);

            //Tirando print assim que o botão pesquisar é acionado
            // await page.screenshot({path:`./src/public/gedcorp_${i}.jpg`, fullPage:true});
        
        
    return c.push(obj);
    
    
    
}

module.exports = PreCadastroVale;