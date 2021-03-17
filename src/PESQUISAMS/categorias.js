

const Categorias = async (req,page,i,c) =>{

            const entradas = req;

            let obj = {id:i, tipoDoTeste:"Categorias", urlsRequest:[],urlsResponse:[],logs:[], print:''}


           
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
            page.on('console', log => { 

                return obj.logs.push(`Logs do caso ${i} `+log._text);
                
            });
          
           
            await page.waitForTimeout(3000);

            await page.type('input[id=Descricao]',entradas.descricao);

            await page.waitForTimeout(3000);

            await page.screenshot({path:`./src/public/PESQUISAMS_IMAGES/categoria_${i}.jpg`, fullPage:true}).then(t=>{
                obj.print = `${process.env.URL_SYSTEM}/PESQUISAMS_IMAGES/categoria_${i}.jpg`;
            });


            await page.evaluate(t=>{
                document.querySelector('a.btn.blue').click();            
            });

            page.off('request');
            page.off('response');
            page.off('console');

            
    return c.push(obj);
    
}

module.exports = Categorias;