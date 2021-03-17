const { default: jsPDF } = require('jspdf');
fs = require('fs');


const criarPesquisa = async (req,page,i,c) =>{

    const entradas = req;
    
        
            //criando resultado
            let obj = {id:i, tipoDoTeste:"Criar pesquisa", urlsRequest:[],urlsResponse:[],logs:[], print:''}
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
                return  obj.logs.push(`Logs do caso ${i} `+log._text);
                
            });
           
            await page.waitForTimeout(3000);

            await page.type('select[id=Categoria]',entradas.categoria);
            await page.type('input[id=Titulo]',entradas.titulo, {delay:100});
            await page.type('input[id=Descricao]',entradas.descricao, {delay:100});
            await page.type('input[id=DataInicio]',entradas.datainicio, {delay:100});
            await page.type('input[id=DataFim]',entradas.datafim, {delay:100});
            await page.type('input[id=NomeResponsavel]',entradas.nomeresponsavel, {delay:100});
            await page.type('input[id=EmailResponsavel]',entradas.emailresponsavel, {delay:100});

            await page.keyboard.press('Tab');
            await page.keyboard.type(entradas.telefone);

            await page.keyboard.press('Tab');

            if(entradas.autenticacao==="true"){
                await page.keyboard.press("Space");

            }

            await page.keyboard.press('Tab');

            if(entradas.comsecao==="true"){
                await page.keyboard.press("Space");

            }
            
            await page.waitForTimeout(3000);
            await page.screenshot({path:`./src/public/PESQUISAMS_IMAGES/criarpesquisa_${i}.jpg`, fullPage:true}).then(t=>{
                obj.print = `${process.env.URL_SYSTEM}/PESQUISAMS_IMAGES/criarpesquisa_${i}.jpg`;
            });

            await page.evaluate(t=>{
                document.querySelector('button.btn.green.default').click();            
            });

            
            page.off('request');
            page.off('response');
            page.off('console');

            
    return c.push(obj);
    
    
    
}

module.exports = criarPesquisa;