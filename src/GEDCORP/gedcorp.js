fs = require('fs');


const PesquisaPublica = async (entradas,page,i, c) =>{
    
            let obj = {id:i, urlsRequest:[],urlsResponse:[],logs:[], print:''}
        
            //Ouvinte de logs
            await page.on('console', (log) => { 
                
                return  obj.logs.push(log._text);      
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

            await page.type('input[id=Nome]',entradas.nome, {delay:100});
            await page.type('input.ng-untouched.ng-pristine.ng-valid',entradas.tipo_documento, {delay:100});
            await page.type('input[id=numero]',entradas.numero);
            await page.type('input[id=data]', entradas.data,  {delay:100});
            await page.type('input[id=assunto]',entradas.assunto, {delay:100});
            await page.type('input[id=resumo]',entradas.resumo, {delay:100});
            await page.type('input[id=texto]', entradas.texto_do_documento, {delay:100});


            //Clicando botão pesquisar
            await page.evaluate(()=>{ return document.querySelector('a.btn.blue').click();});

            //Espera o carregamento do GRID
            await page.waitForTimeout(2000);



            //Tirando print assim que o botão pesquisar é acionado
            await page.screenshot({path:`./src/public/GEDCORP_IMAGES/gedcorp_${i}.jpg`, fullPage:true}).then(t=>{
                obj.print = `http://localhost:8080/GEDCORP_IMAGES/gedcorp_${i}.jpg`;
            }); 

            page.off('response');
            page.off('request');
            page.off('console');
            
            //incrementando contador
        //     i++;
        // }

    // } catch (error) {
        
    // }
    return c.push(obj);
    
    
    
}

module.exports = PesquisaPublica;