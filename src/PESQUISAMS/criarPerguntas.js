const { default: jsPDF } = require('jspdf');
fs = require('fs');


const criarPergunta = async (req,page,i,c) =>{

    const entradas = req;

            //criando resultado
            let obj = {id:i, tipoDoTeste:"criarPergunta", urlsRequest:[],urlsResponse:[],logs:[], print:''}


            await page.evaluate(t=>{

                document.querySelector('a.btn.green.btn-flat.ng-star-inserted').click();            

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
            //Ouvinte de logs
            page.on('console',  log => { 

                return  obj.logs.push(`Logs do caso ${i} `+log._text);
                
            });
           
            await page.waitForTimeout(3000);
            
            await page.type('input#Descricao.form-control.input-sm.ng-untouched.ng-pristine.ng-invalid',entradas.descricao , {delay:100});
            await page.type('select#TipoPergunta.form-control.input-sm.ng-untouched.ng-pristine.ng-valid',entradas.tipoPergunta, {delay:100});
            await page.type('input[id=Ordem]',entradas.ordem, {delay:100});

            await page.keyboard.press('Tab');

            if(entradas.obrigatorio==="true"){

                await page.keyboard.press("Space");

            }

            await page.waitForTimeout(3000);

            await page.screenshot({path:`./src/public/PESQUISAMS_IMAGES/criarpergunta_${i}.jpg`, fullPage:true}).then(t=>{
                obj.print = `http://localhost:8080/PESQUISAMS_IMAGES/criarpergunta_${i}.jpg`;
            });

            await page.evaluate(t=>{

                document.querySelector('button.btn.green.default.ng-star-inserted').click();

            });

            page.off('request');
            page.off('response');
            page.off('console');

            
    return c.push(obj);
    
}

module.exports = criarPergunta;