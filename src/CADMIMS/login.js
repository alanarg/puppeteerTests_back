fs = require('fs');



const loginCadmim = async (req,page,c) =>{
    const entradas = req;        
            //criando resultado
            let obj = {id:i, urls:[],logs:[], print:''}

            //Ouvinte de logs
            await page.on('console', async (log) => { 
                
                return await obj.logs.push(log._text);
                 
                
            });

            //Ouvinte de requisições
            await page.on('response', async response => {
                 return  await obj.urls.push(response.url());
            
            });

            await page.type('input[id=usuario]',entradas.nome, {delay:100});
            await page.type('input[id=senha]',entradas.senha, {delay:100});
            await page.type('select[id=dominio]',entradas.dominio, {delay:100});

            await page.evaluate(()=>{ return document.querySelector('button').click();});

            page.off('console');
            page.off('response');


    return c.push(obj);
    
    
    
}

module.exports = loginCadmim;