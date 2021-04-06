fs = require('fs');



const dadosCadastrais = async (req,page,c) =>{
    const entradas = req;        
            //criando resultado
            let obj = { urls:[],logs:[], print:''}

            //Ouvinte de logs
            await page.on('console', async (log) => { 
                
                return await obj.logs.push(log._text);
                 
                
            });

            //Ouvinte de requisições
            await page.on('response', async response => {
                 return  await obj.urls.push(response.url());
            
            });

            await page.type('input[id=nome]',entradas.nome, {delay:100});
            await page.type('input[id=sexo]',entradas.sexo, {delay:100});
            await page.type('input[id=estadoCivil]',entradas.estadoCivil, {delay:100});
            await page.type('input[id=idioma]',entradas.idioma, {delay:100});
            await page.type('input[id=dataNascimento]',entradas.nascimento, {delay:100});
            await page.type('input[id=nomePai]',entradas.nomePai, {delay:100});
            await page.type('input[id=nomeMae]',entradas.nomeMae, {delay:100});
            await page.type('input[id=municipioNascimento]',entradas.municipioNascimento, {delay:100});
            await page.type('input[id=estadoProvincia]',entradas.estadoProvincia, {delay:100});
            await page.type('input[id=pais]',entradas.pais, {delay:100});
            await page.type('input[id=escolaridadeID]',entradas.escolaridade, {delay:100});



            

            //Essa função abaixo substitui essa
            // await page.evaluate(()=>{ return document.querySelector('button').click();});
            await page.$eval('button', btn =>{ return btn.click();});


            page.off('console');
            page.off('response');


    return c.push(obj);
    
    
    
}

module.exports = dadosCadastrais;