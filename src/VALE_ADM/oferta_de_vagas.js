

const OfertaVagas = async (req,page,i,c,ambiente) =>{
    const j = 0;
    const entradas = req;

            console.log(entradas);
            //criando resultado
            let obj = { tipoDoTeste:"Oferta Vagas", urlsRequest:[],urlsResponse:[],logs:[], print:''}
        
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


            await page.type('p-inputmask#numeroprocessoseletivo > input', entradas.numeroProcesso, {delay:100});

            await page.select('select#TipoOrdenacao', entradas.tipoFiltro);

            await page.select('select#Municipio', entradas.municipio);

            await page.waitForTimeout(5000);

            await page.select('select#InstituicaoEnsino', entradas.instituicaoEnsino);

            await page.evaluate(()=>{
                document.querySelector('form > div > div:nth-child(2) > div > button[type=\"button\"]').click();
            });

            await page.waitForSelector('tbody > tr:nth-child(1)');

            await page.type('div:nth-child(1) > div > div > input', entradas.quantidadeVagas, {delay:100});

            await page.waitForTimeout(2000);

            await page.evaluate(()=>{

                document.querySelector('div:nth-child(2) > div > div > div:nth-child(1) > div > div > div > button[type=\"button\"]').click();
                // await document.querySelector('button[type=\"button\"]:nth-child(1) > span.ui-button-text.ui-clickable').click();

            });

            if(entradas.salvar){

                await page.evaluate(()=>{
                    document.querySelector('div > button[type=\"button\"].btn.green.btn-sm').click();
                }); 

                await page.waitForTimeout(2000);

                await page.evaluate( ()=>{
                     document.querySelector('button[type=\"button\"]:nth-child(1) > span.ui-button-text.ui-clickable').click();
                    // await document.querySelector('button[type=\"button\"]:nth-child(1) > span.ui-button-text.ui-clickable').click();
                });
            }
            if(entradas.limparVagas){
                await page.evaluate(()=>{
                    document.querySelector('div > button[type=\"button\"].btn.red.btn-sm').click();
                }); 

                await page.waitForTimeout(2000);

                await page.evaluate( ()=>{
                     document.querySelector('button[type=\"button\"]:nth-child(1) > span.ui-button-text.ui-clickable').click();
                    // await document.querySelector('button[type=\"button\"]:nth-child(1) > span.ui-button-text.ui-clickable').click();
                });

                          
            }
            
            if(entradas.exportarPorMunicipio){
                await page.evaluate(()=>{
                    document.querySelector('div > button[type=\"button\"]:nth-child(4)').click();
                }); 
            }
            if(entradas.exportarPorIE){
                await page.evaluate(()=>{
                    document.querySelector('div > button[type=\"button\"]:nth-child(5)').click();   
                }); 
            }
            if(entradas.finalizarOfertaVagas){
                await page.evaluate(()=>{
                    document.querySelector('div:nth-child(4) > button[type=\"button\"]').click();   
                }); 

                await page.waitForTimeout(2000);

                await page.evaluate( ()=>{
                     document.querySelector('button[type=\"button\"]:nth-child(1) > span.ui-button-text.ui-clickable').click();
                    // await document.querySelector('button[type=\"button\"]:nth-child(1) > span.ui-button-text.ui-clickable').click();
                });


                
            }
 

            await page.waitForTimeout(3000);

            await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/oferta_vagas_${i}.jpg`, fullPage:true}).then(t=>{
                obj.print = `${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/oferta_vagas_${i}.jpg`;
            });



            // let button = await page.$('');
            // await button.click();
            await page.off('request');
            await page.off('response');
            await page.off('console');
 

    return c.push(obj);
    
}

module.exports = OfertaVagas;