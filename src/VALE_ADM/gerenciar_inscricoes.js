
fs = require('fs');

const imageToBase64 = require('image-to-base64');
const { request } = require('http');


const GerenciarInscricoes = async (req,page,i,c) =>{

    const entradas = req;
    //Instancia o o navegador


            //criando resultado
            let obj = {id:i, tipoDoTeste:"Gerenciar Inscricoes", urlsRequest:[],urlsResponse:[],logs:[], print:'', otherImages:[]}
            // casosFinais.push(obj);        

            
            //Ouvinte de logs
             page.on('console',  log => { 
                return obj.logs.push(`Logs do caso ${i} `+log._text);
            });

             //Ouvinte de requisições
             await page.on('response',  res => {
                // Ignore OPTIONS requests
                return  obj.urlsResponse.push({url:res.url(), status:res.status()});  
            });

            await page.on('request',  req => {
                // Ignore OPTIONS requests
                return  obj.urlsRequest.push({url:req.url()});  
            });

            await page.waitForSelector('input[id=Nome]');


            await page.type('input[id=Nome]', entradas.nome);
            await page.type('input[name=\"cpf\"]', entradas.cpf);
            await page.select('select#sexo', entradas.sexo);
            await page.select('select#Situacao', entradas.situacao);
            await page.select('select#InstituicaoEnsinoMatriz', entradas.instituicaoMatriz);
            await page.select('select#InstituicaoEnsino', entradas.instituicaoEnsino);
            await page.select('select#MunicipioInstituicaoEnsino', entradas.municipioInstituicao);
            await page.select('select#Estagio', entradas.estagio);

             
            await page.evaluate(()=>{ return document.querySelector('button.btn.blue').click();});

             //Espera o carregamento do GRID
             await page.waitForTimeout(10000);

             //Tirando print assim que o botão pesquisar é acionado
             await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/gerenciar_inscricoes_${i}.jpg`, fullPage:true}).then( async t=>{
                 obj.print = `${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/gerenciar_inscricoes_${i}.jpg`;

                await page.waitForTimeout(2000);

                 if(entradas.gerenciar){
            
                    await page.evaluate(()=>{ return document.querySelector('tr:nth-child(1) > td:nth-child(10) > a:nth-child(1)').click();});

                    

                    await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/gerenciar_ficha_academico_${i}.jpg`, fullPage:true}).then( async t=>{
                        obj.otherImages.push(`${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/gerenciar_ficha_academico_${i}.jpg`);

                        await page.waitForTimeout(2000);

                        let url = await page.url();

                        let paths = await url.split('/');

                        console.log(paths);
                        
                        await page.waitForTimeout(2000);

                         await page.goto(`http://hom.valeuniversidade.ms.gov.br/admin/gerenciar-inscricao/manter/${paths[6]}/${paths[7]}/transferir-instituicao`);
                        
                        await page.waitForTimeout(2000);
 
                        await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/gerenciar_transferencia_${i}.jpg`, fullPage:true}).then( async t=>{

                            obj.otherImages.push( `${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/gerenciar_transferencia_${i}.jpg`);
                            
                            await page.waitForTimeout(2000);

                            await page.goto(`http://hom.valeuniversidade.ms.gov.br/admin/gerenciar-inscricao/manter/${paths[6]}/${paths[7]}/vincular-estagio`);
                           
                            await page.waitForTimeout(2000);

                            await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/gerenciar_estagio_${i}.jpg`, fullPage:true}).then( async t=>{
                                obj.otherImages.push(`${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/gerenciar_estagio_${i}.jpg`);

                                 await page.waitForTimeout(2000);

                                 await page.goto(`http://hom.valeuniversidade.ms.gov.br/admin/gerenciar-inscricao/manter/${paths[6]}/${paths[7]}/historico-vinculo`);
                                
                                 await page.waitForTimeout(2000);

                                 await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/gerenciar_hVinculos_${i}.jpg`, fullPage:true}).then( async t=>{
                                    obj.otherImages.push(`${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/gerenciar_hVinculos_${i}.jpg`);
                                    
                                    await page.waitForTimeout(2000);

                                    await page.goto(`http://hom.valeuniversidade.ms.gov.br/admin/gerenciar-inscricao/manter/${paths[6]}/${paths[7]}/historico-transferencia`);
                                   
                                    await page.waitForTimeout(2000);

                                    await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/gerenciar_hTransferencias_${i}.jpg`, fullPage:true}).then( async t=>{
                                        obj.otherImages.push(`${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/gerenciar_hTransferencias_${i}.jpg`);

                                        await page.waitForTimeout(2000);

                                        await page.goto(`http://hom.valeuniversidade.ms.gov.br/admin/gerenciar-inscricao/manter/${paths[6]}/${paths[7]}/historico-desligamento`);
                                   
                                        await page.waitForTimeout(2000);

                                        await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/gerenciar_hDesligamento_${i}.jpg`, fullPage:true}).then( async t=>{
                                            obj.otherImages.push(`${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/gerenciar_hDesligamento_${i}.jpg`);
                                            
                                            
                                             await page.waitForTimeout(2000);

                                            await page.goto(`http://hom.valeuniversidade.ms.gov.br/admin/gerenciar-inscricao`);
                                        });

                                    });


                                });
                            });

                        });
                    

                    });
                   
                    
                 }
             });

            
            await page.off('request');
            await page.off('response');
            await page.off('console');

            
    return c.push(obj);
    
    
    
}

module.exports = GerenciarInscricoes;