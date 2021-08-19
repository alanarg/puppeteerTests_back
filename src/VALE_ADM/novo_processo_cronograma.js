const { default: jsPDF } = require('jspdf');
fs = require('fs');
const request = require('request-promise');

const NovoProcesso = async (req,page,c) =>{
  

    const entradas = req;
    const j = 0;


    await page.goto('http://hom.valeuniversidade.ms.gov.br/admin/processo-seletivo/novo');


    console.log(entradas);


            //criando resultado
            let obj = { tipoDoTeste:"Novo Processo", urlsRequest:[],urlsResponse:[],logs:[], print:''}
        
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
           
            
            const fileData = await request({
                uri: `${process.env.URL_SYSTEM}/ARQUIVO_TESTE/Vale_Universidade_Notes.docx`,
                encoding: null
            }); 
            
            await fs.writeFileSync('./src/public/arquivo.docx', fileData); 

            const fileInput = await page.$('input[type=file]');

            await fileInput.uploadFile('./src/public/arquivo.docx');

            
            await page.type('input#Descricao', entradas.descricao, {delay:100});
                       
            await page.type('input[name=\"anoreferencia\"]', entradas.anoReferencia, {delay:100});

            await page.select('select#Semestre', entradas.semestre);

            await page.select('select#Modalidade', entradas.modalidade );

            await page.type('input#RendaIndividual', entradas.rendaIndividual, {delay:100});

            await page.type('input#RendaFamiliar', entradas.rendaFamiliar, {delay:100});

            await page.select('select#Situacao', entradas.situacao);

            await page.type('input#dataInicioInscricao', entradas.dataInicioInscricao, {delay:100});

            await page.type('input#horaInicioInscricao', entradas.horaInicioInscricao, {delay:100});

            await page.type('input#dataFimInscricao', entradas.dataFimInscricao,{delay:100});

            await page.type('input#horaFimInscricao', entradas.horaFimInscricao,{delay:100});

            await page.type('input#dataInicioEntrevista', entradas.dataInicioEntrevista,{delay:100});

            await page.type('input#horaInicioEntrevista', entradas.horaInicioEntrevista,{delay:100});

            await page.type('input#dataFimEntrevista', entradas.dataFimEntrevista,{delay:100});

            await page.type('input#horaFimEntrevista', entradas.horaFimEntrevista,{delay:100});

            
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

module.exports = NovoProcesso;