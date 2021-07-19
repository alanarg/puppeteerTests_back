const { default: jsPDF } = require('jspdf');
fs = require('fs');
const request = require('request-promise');

const Entrevista = async (req,page,i,c, ambiente) =>{
  
    const entradas = req;
    const j = 0;

    console.log(entradas.modalidade);

  

            //criando resultado
            let obj = { tipoDoTeste:"Entrevista", urlsRequest:[],urlsResponse:[],logs:[], print:'', otherImages:[]}
        
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
           
            
            await page.type('input#nomeAcademico', entradas.nome, {delay:100});
                       
            await page.type('p-inputmask#CPF > input', entradas.cpf, {delay:100});

            await page.select('select#documentacaoCompleta', entradas.documentacao);

            await page.select('select#municipioAcademico', entradas.municipio);

            // await page.select('select#modalidadeAcademico', entradas.modalidade, {delay:100});

            await page.type('p-inputmask#NumeroInscricao > input', entradas.numeroProtocolo, {delay:100});

            await page.type('p-inputmask#anoReferencia > input', entradas.anoReferencia,{delay:100});

            await page.type('input#numeroProcesso', entradas.numeroProcesso, {delay:100});

            await page.select('select#situacao', entradas.situacao);

            await page.select('select#modalidadeProcessoSeletivo', entradas.modalidadeProcesso);

            await page.evaluate(()=>{ return document.querySelector('div.col-md-12 > button[type=\"submit\"]').click()});
            
            await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/entrevista.jpg`, fullPage:true}).then(async t=>{

                obj.print = `${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/entrevista.jpg`;


             
                if(entradas.realizarEntrevista){

                    await page.waitForTimeout(4000);

                    await page.evaluate(()=>{ return document.querySelector('td:nth-child(6) > a').click()});

                    await page.waitForTimeout(2000);

                    let url = await page.url();

                    let paths = await url.split('/');
    
                    console.log(paths);    

                    await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/entrevista_ficha_academico.jpg`, fullPage:true}).then(async t=>{

                        await obj.otherImages.push(`${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/entrevista_ficha_academico.jpg`);

                        await page.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/admin/entrevista/cadastro/${paths[6]}/ficha-historico-entrevista`);

                        await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/entrevista_historico.jpg`, fullPage:true}).then(async t=>{

                            await obj.otherImages.push(`${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/entrevista_historico.jpg`);

                            await page.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/admin/entrevista/cadastro/${paths[6]}/ficha-entrevista`);

                            await page.waitForTimeout(2000);

                            await page.type('textarea#motivoVisita', entradas.realizarEntrevista.motivo, {delay:100});

                            await page.type('textarea#relatorio', entradas.realizarEntrevista.relatorio, {delay:100});

                            if(entradas.realizarEntrevista.rendaIndiviDurante!==""){

                                await page.type('div:nth-child(2) > div > div:nth-child(1) > div > input', entradas.realizarEntrevista.rendaIndiviDurante, {delay:100});

                            }

                            if(entradas.realizarEntrevista.rendaFamiliDurante!==""){

                                await page.type('div:nth-child(2) > div > div:nth-child(2) > div > input', entradas.realizarEntrevista.rendaFamiliDurante, {delay:100});

                            }

                            await page.select('select#novaSitucao', entradas.realizarEntrevista.novaSituacao);

                            if(entradas.realizarEntrevista.novaSituacao === "1: InabilitadoAposEntrevista"){
                                
                                
                                await page.evaluate(()=>{document.querySelector('li:nth-child(2) > div > div.ui-chkbox-box.ui-widget.ui-corner-all.ui-state-default').click()});

                            }


                            await page.waitForTimeout(2000);


                                if(entradas.realizarEntrevista.salvar){

                                await page.evaluate(()=>{document.querySelector('div > button[type=\"button\"].btn.blue.default').click();})

                                }
                                if(entradas.realizarEntrevista.finalizarEntrevista){

                                    await page.evaluate(()=>{document.querySelector('div > button[type=\"button\"].btn.green.default').click();});

                                }
                                if(entradas.realizarEntrevista.downloadFichaInscricao){

                                    await page.evaluate(()=>{document.querySelector('div > button[type=\"button\"]:nth-child(3)').click();});

                                }
                                

                            await page.waitForTimeout(2000);


                            await page.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/admin/entrevista/cadastro/${paths[6]}/ficha-entrevista`);
    

                        });


                        
                        

                                     
                    });

                }

            });





            // let button = await page.$('');
            // await button.click();
            await page.off('request');
            await page.off('response');
            await page.off('console');
 

    return c.push(obj);
    
}

module.exports = Entrevista;