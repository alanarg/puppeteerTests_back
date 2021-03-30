

fs = require('fs');



const dadosMigracao = async (req,page,c) =>{
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

            await page.type('input[id=ultimoPais]',entradas.ultimoPais, {delay:100});
            await page.type('input[id=entradaNoBrasil]',entradas.entradaNoBrasil, {delay:100});
            await page.type('input[id=municipioEntradaBrasil]',entradas.municipioEntradaBrasil, {delay:100});
            await page.type('input[id=municipioEntradaMs]',entradas.municipioEntradaMs, {delay:100});
            await page.type('input[id=enderecoRua]',entradas.enderecoRua, {delay:100});
            await page.type('input[id=enderecoBairro]',entradas.enderecoBairro, {delay:100});
            await page.type('textarea[id=enderecoComplemento]',entradas.enderecoComplemento, {delay:100});
            await page.type('input[id=enderecoCidade]',entradas.enderecoCidade, {delay:100});
            await page.type('input[id=email]',entradas.email, {delay:100});
            await page.type('input[id=enderecoNumero]',entradas.enderecoNumero, {delay:100});
            await page.type('input[id=cep]',entradas.cep, {delay:100});
            await page.type('input[id=telefone]',entradas.telefone, {delay:100});


            //Essa função abaixo substitui essa
            // await page.evaluate(()=>{ return document.querySelector('button').click();});
            await page.$eval('button', btn =>{ return btn.click();});


            page.off('console');
            page.off('response');


    return c.push(obj);
    
    
    
}

module.exports = dadosMigracao;