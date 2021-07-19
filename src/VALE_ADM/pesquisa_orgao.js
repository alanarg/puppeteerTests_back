

const PesquisaOrgao = async (req,page,i,c,ambiente) =>{
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


            await page.waitForTimeout(4000);

            await page.select('select#Tipo', entradas.tipo);

            await page.waitForTimeout(2000);

            await page.select('select#Categoria', entradas.categoria);

            await page.waitForTimeout(2000);

            await page.select('select#Esfera', entradas.esfera);

            await page.type('input[name=\"cnpj\"]', entradas.cnpj, {delay:100});

            await page.evaluate(()=>{
                document.querySelector('div > a.btn.blue').click();
            });
        

            await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/pesquisa_orgao${i}.jpg`, fullPage:true}).then(t=>{
                obj.print = `${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/pesquisa_orgao${i}.jpg`;
            });



            // let button = await page.$('');
            // await button.click();
            await page.off('request');
            await page.off('response');
            await page.off('console');
 

    return c.push(obj);
    
}

module.exports = PesquisaOrgao;