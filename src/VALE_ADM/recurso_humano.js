

const RecursoHumano = async (req,page,i,c,ambiente) =>{
    const j = 0;
    const entradas = req;

            console.log(entradas);
            //criando resultado
            let obj = { tipoDoTeste:"Recursos Humanos", urlsRequest:[],urlsResponse:[],logs:[], print:'', otherImages:[]}
        
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


            await page.waitForTimeout(2000);

            await page.type('input#Nome', entradas.nome, {delay:100});

            await page.waitForTimeout(2000);

            await page.type('p-inputmask > input', entradas.cpf,{delay:100});

            await page.waitForTimeout(2000);

            await page.evaluate(()=>{
                document.querySelector('div > a.btn.blue').click();
            });

            await page.waitForTimeout(4000);

            await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/recurso_humano${i}.jpg`, fullPage:true}).then(t=>{
                obj.print = `${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/recurso_humano${i}.jpg`;
            });

            if(entradas.inativar){
                 await page.waitForTimeout(2000);


                await page.evaluate(()=>{
                    document.querySelector('tr:nth-child(1) > td:nth-child(6) > a:nth-child(1)').click();
                });

                await page.waitForTimeout(2000);

                await page.evaluate(()=>{
                    document.querySelector('button[type=\"button\"]:nth-child(1) > span.ui-button-text.ui-clickable').click();
                });

            }
            if(entradas.editar.chave && entradas.visualizar){

                await page.waitForTimeout(2000);

                await page.evaluate(()=>{
                    document.querySelector('tr:nth-child(1) > td:nth-child(6) > a.btn.btn-xs.default.ng-star-inserted').click();
                });

                await page.waitForTimeout(2000);

                await page.type('input#email', entradas.editar.email, {delay:100});

                await page.type('input#rg', entradas.editar.rg, {delay:100});

                await page.type('input#RGOrgaoEmissor', entradas.editar.orgaoEmissor, {delay:100});

                await page.type('input#RGUF', entradas.editar.uf, {delay:100});
                
                await page.type('input#RGDataEmissao', entradas.editar.dataEmissao, {delay:100});
                
                await page.type('p-inputmask#Celular > input', entradas.editar.celular, {delay:100});
                
                await page.type('input#DataNascimento', entradas.editar.dataNascimento, {delay:100});

                await page.waitForTimeout(2000);

                await page.evaluate(()=>{
                    document.querySelector('div > button[type=\"submit\"]').click();
                });
                let url = await page.url();

                let paths = await url.split('/');

                console.log(paths);

                await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/recurso_humano_editar${i}.jpg`, fullPage:true}).then(t=>{
                    obj.otherImages.push(`${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/recurso_humano_editar${i}.jpg`);
                });

                    await page.waitForTimeout(2000);
    
                    await page.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/admin/recurso-humano/detalhes/${paths[6]}/vinculos`);
    
                    await page.waitForTimeout(2000);
    
                    await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/recurso_humano_vinculos${i}.jpg`, fullPage:true}).then(t=>{
                        obj.otherImages.push(`${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/recurso_humano_vinculos${i}.jpg`);
                    });
    
                    
                
    
                
            }else if(entradas.visualizar && !entradas.editar.chave){

                await page.waitForTimeout(2000);

                await page.evaluate(()=>{
                    document.querySelector('tr:nth-child(1) > td:nth-child(6) > a:nth-child(3)').click();
                });

                await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/recurso_humano${i}.jpg`, fullPage:true}).then(t=>{
                    obj.otherImages.push(`${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/recurso_humano${i}.jpg`);
                });

                let url = await page.url();

                let paths = await url.split('/');

                await page.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/admin/recurso-humano/detalhes/${paths[6]}/vinculos`);

                await page.waitForTimeout(2000);

                await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/recurso_humano_vinculos${i}.jpg`, fullPage:true}).then(t=>{
                    obj.otherImages.push(`${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/recurso_humano_vinculos${i}.jpg`);
                });
            }
         
            // let button = await page.$('');
            // await button.click();
            await page.off('request');
            await page.off('response');
            await page.off('console');
 

    return c.push(obj);
    
}

module.exports = RecursoHumano;