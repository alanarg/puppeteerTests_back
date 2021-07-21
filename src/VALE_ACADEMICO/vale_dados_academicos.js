const { default: jsPDF } = require('jspdf');
fs = require('fs');


const DadosAcademico = async (req,page,c) =>{
    const entradas = req;
    const j = 0;

    const alterna = entradas.alternativas;



                console.log(alterna);
            //criando resultado
            let obj = { tipoDoTeste:"Dados do Acadêmico", urlsRequest:[],urlsResponse:[],logs:[], print:''}
       
            
        
            //Ouvinte de requisições
            await page.on('response',  res => {
                // Ignore OPTIONS requests
                return  obj.urlsResponse.push({url:res.url(), status:res.status()});  
            });

            await page.on('request',  req => {
                // Ignore OPTIONS requests
                return  obj.urlsRequest.push({url:req.url()});  
            });
            //Ouvinte de logs
            page.on('console',  log => { 

                return  obj.logs.push(`Logs do caso`+log._text);
                
            });
           
            await page.waitForTimeout(1000);
            
            await page.type('input[id=nomeSocial]',entradas.nomeSocial , {delay:100});
            await page.type('select[id=sexo]',entradas.sexo, {delay:100});
            await page.type('input[id=dataNascimento]',entradas.dataNascimento, {delay:100});
            await page.type('select[id=nacionalidade]',entradas.nacionalidade, {delay:100});

            await page.type('select[id=estadoCivil]',entradas.estadoCivil, {delay:100});
            await page.type('input[id=nis]',entradas.nis, {delay:100});
            await page.type('input[id=rg]',entradas.rg, {delay:100});

            await page.type('input[id=orgaoEmissor]', entradas.orgaoEmissor,{delay:100});

            await page.keyboard.press('Tab');

            await page.keyboard.type(entradas.uf, {delay:1000});

            await page.type('input[id=dataEmissaoRG]', entradas.dataEmissaoRG,{delay:100});

            await page.type('input[id=carteiraTrabalho]', entradas.carteiraTrabalho,{delay:100});

            await page.keyboard.press('Tab');
            
            await page.keyboard.type(entradas.telefoneResidencial,{delay:100});

            await page.keyboard.press('Tab');
            
            await page.keyboard.type(entradas.celular,{delay:100});

            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');

            await page.keyboard.type(entradas.necessidadeEspecial,{delay:100});

            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');

            await page.select('select#ensinoMedio',entradas.ensinoMedio);


            // await page.type('select[id=necessidadeEspecial]',entradas.necessidadeEspecial, {delay:100});

            // await page.type('select[id=ensinoMedio]',entradas.ensinoMedio, {delay:100});


            await page.keyboard.type(entradas.nomeEscola,{delay:100});

            await page.keyboard.press('Tab');


             if(entradas.semMae = 'Sim'){
                await page.keyboard.press('Space');
            }else{
                await page.keyboard.press('Tab');
            }

            await page.type('select[id=racacor]', entradas.racacor, {delay:100});

            await page.type('select[id=resideFamilia]', entradas.resideFamilia, {delay:100});

            await page.type('input[id=ano]', entradas.ano,{delay:100});

            await page.type('input[id=mes]', entradas.mes ,{delay:100});

            //PVUI
            // await page.keyboard.press('Tab');
           
            // await page.keyboard.type(entradas.etnia,{delay:100});

            // await page.keyboard.press('Tab');
            // await page.keyboard.press('Tab');


            // await page.keyboard.type(entradas.municipio,{delay:100});

            // await page.keyboard.press('Tab');
            // await page.keyboard.press('Tab');

            // await page.keyboard.type(entradas.localReside,{delay:100});

            // await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');

            await page.keyboard.type(entradas.cep,{delay:100});

            await page.keyboard.press('Tab');
            await page.keyboard.press('Enter');

            await page.waitForTimeout(3000);

            await page.type('input#numero', entradas.numero, {delay:100});
            
            await page.type('input[id=complemento]', entradas.complemento ,{delay:100});

            await page.type('input[id=referencia]', entradas.referencia ,{delay:100});

            await page.evaluate(()=>{ return document.querySelector('button.btn.green.default').click()});

            await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/dados_academico.jpg`, fullPage:true}).then(t=>{
                obj.print = `${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/dados_academico.jpg`;
            });

           

            await page.off('request');
            await page.off('response');
            await page.off('console');
 
            
    return c.push(obj);
    
}

module.exports = DadosAcademico;