

const Categorias = async (req,page,i,c) =>{

            const entradas = req;

            let obj = {id:i, tipoDoTeste:"Categorias", urls:[],logs:[], print:''}


            function logRequest(interceptedRequest) {
                return obj.urls.push('A request was made:' + interceptedRequest.url());
            }
          
          
            page.on('request', logRequest);

            
            //Ouvinte de logs
            page.on('console', log => { 

                return obj.logs.push(`Logs do caso ${i} `+log._text);
                
            });
          
           
            await page.waitForTimeout(3000);

            await page.type('input[id=Descricao]',entradas.descricao);

            await page.waitForTimeout(3000);

            await page.screenshot({path:`./src/public/PESQUISAMS_IMAGES/categoria_${i}.jpg`, fullPage:true}).then(t=>{
                obj.print = `http://localhost:8080/PESQUISAMS_IMAGES/categoria_${i}.jpg`;
            });


            await page.evaluate(t=>{
                document.querySelector('a.btn.blue').click();            
            });

            page.off('request', logRequest);
            page.off('console');

            
    return c.push(obj);
    
}

module.exports = Categorias;