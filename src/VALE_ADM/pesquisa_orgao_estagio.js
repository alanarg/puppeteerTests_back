

const PesquisaOrgaoEstagio = async (req,page,i,c,ambiente) =>{
    const j = 0;
    const entradas = req;

            console.log(entradas);
            //criando resultado
            let obj = { tipoDoTeste:"Oferta Vagas", urlsRequest:[],urlsResponse:[],logs:[], print:'', otherImages:[]}
        
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

            await page.select('select#Tipo', entradas.tipo);

            await page.waitForTimeout(2000);

            await page.select('select#Categoria', entradas.categoria);

            await page.waitForTimeout(2000);

            await page.select('select#Esfera', entradas.esfera);

            await page.type('input[name=\"cnpj\"]', entradas.cnpj, {delay:100});

            await page.evaluate(()=>{
                document.querySelector('div > a.btn.blue').click();
            });
            
            await page.waitForTimeout(4000);
            
            await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/pesquisa_orgao_estagio${i}.jpg`, fullPage:true}).then(t=>{
                obj.print = `${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/pesquisa_orgao_estagio${i}.jpg`;
            });

            if(entradas.inativar){

                await page.waitForTimeout(2000);

                await page.evaluate(()=>{
                    document.querySelector('div > a.btn.blue').click();
                });

                await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/inativar_orgao_estagio${i}.jpg`, fullPage:true}).then(t=>{
                    obj.print = `${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/inativar_orgao_estagio${i}.jpg`;
                });

                await page.waitForSelector('form > textarea').then(async ()=>{
                    await page.type('form > textarea', entradas.inativar.motivo);
                });
                

            }

            if(entradas.vincularRH.chave){

                await page.waitForTimeout(4000);

                await page.evaluate(()=>{

                    document.querySelector('tr:nth-child(1) > td.col-sm-3.text-center > a:nth-child(2)').click();
                
                });

                await page.waitForTimeout(2000);

                let url = await page.url();

                let paths = await url.split('/');

                console.log(paths);

                await page.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/admin/orgao-estagio/editar/${paths[6]}/vinculo-orgao-estagio`);

                await page.type('div:nth-child(1) > div > p-autocomplete > span > input', entradas.vincularRH.nome);

                await page.waitForTimeout(2000);

                await page.keyboard.press('Enter');

                await page.evaluate(tipo=>{
                    console.log(tipo);
                    let ops = document.querySelector('div > select').options.length
                    for (let index = 0; index < ops; index++) {
                        if(tipo===document.querySelector('div > select').options[index].innerHTML){
                            document.querySelector('div > select').options[index].selected = true;
                        }                      
                    }
                }, entradas.vincularRH.cargo);

                await page.waitForTimeout(2000);

                await page.evaluate(()=>{
                    document.querySelector('div > button[type=\"submit\"]').click();
                });

                if(entradas.vincularRH.historicoLocalEstagio){

                    await page.waitForTimeout(2000);

                    await page.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/admin/orgao-estagio/editar/${paths[6]}/historico-local-estagio`);

                    await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/historico_local_estagio${i}.jpg`, fullPage:true}).then(t=>{
                        obj.otherImages.push(`${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/historico_local_estagio${i}.jpg`);
                    });
                    
                }

                if(entradas.vincularRH.totaisLocalEstagio){

                    await page.waitForTimeout(2000);

                    await page.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/admin/orgao-estagio/editar/${paths[6]}/totais-local-estagio`);

                    await page.waitForTimeout(2000);

                    await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/totais_local_estagio${i}.jpg`, fullPage:true}).then(t=>{
                        obj.otherImages.push(`${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/totais_local_estagio${i}.jpg`);
                    });
                }


            }

            // let button = await page.$('');
            // await button.click();
            await page.off('request');
            await page.off('response');
            await page.off('console');
 

    return c.push(obj);
    
}

module.exports = PesquisaOrgaoEstagio;