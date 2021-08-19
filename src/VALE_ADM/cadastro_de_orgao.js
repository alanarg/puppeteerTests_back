

const CadastrarOrgao = async (req,page,i,c,ambiente) =>{
    const j = 0;
    const entradas = req;

            console.log(entradas);
            //criando resultado
            let obj = { tipoDoTeste:"Oferta Vagas", urlsRequest:[],urlsResponse:[],logs:[], print:''}
        
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

            await page.select('select#tipo', entradas.tipo);

            await page.waitForTimeout(2000);

            await page.select('select#Categoria', entradas.categoria);

            await page.waitForTimeout(2000);

            await page.select('select#Esfera', entradas.esfera);

            // let ops = page.$eval('select#tipoOrgaos');

            // console.log(ops);

            await page.waitForTimeout(2000);

            await page.type('input#Nome', entradas.nome);

            await page.type('input[name=\"cnpj\"]', entradas.cnpj, {delay:100});

            await page.type('p-inputmask#cep > input', entradas.cep, {delay:100});

            await page.waitForTimeout(2000);

            await page.evaluate(()=>{
                document.querySelector('div#tab_1_1 button[type=\"button\"]').click();
            });
            
            await page.waitForTimeout(2000);

            await page.type('input#numero', entradas.numero);

            await page.evaluate(()=>{

                document.querySelector('div#tab_1_1 button[type=\"submit\"]').click();

            });

            await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/novo_orgao_de_estagio_${i}.jpg`, fullPage:true}).then(t=>{
                obj.print = `${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/novo_orgao_de_estagio${i}.jpg`;
            });

            // let button = await page.$('');
            // await button.click();
            await page.off('request');
            await page.off('response');
            await page.off('console');
 

    return c.push(obj);
    
}

module.exports = CadastrarOrgao;