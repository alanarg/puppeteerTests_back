const { default: jsPDF } = require('jspdf');
fs = require('fs');


const criarPergunta = async (req,page,i,c) =>{
    const entradas = req;
    const j = 0;

    const alterna = entradas.alternativas;



                console.log(alterna);
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
            
            await page.type('input#Descricao.form-control.input-sm.ng-untouched.ng-pristine.ng-invalid',entradas.pergunta.descricao , {delay:100});
            await page.type('select#TipoPergunta.form-control.input-sm.ng-untouched.ng-pristine.ng-valid',entradas.pergunta.tipoPergunta, {delay:100});
            await page.type('input[id=Ordem]',entradas.pergunta.ordem, {delay:100});

            await page.keyboard.press('Tab');

            if(entradas.pergunta.obrigatorio==="true"){
                await page.keyboard.press("Space");
            }
          
             
                await page.keyboard.press('Tab');
                await page.keyboard.press('Tab');
                await page.keyboard.press('Space');
                await page.waitForTimeout(1000);
        
            if(entradas.pergunta.tipoPergunta==="Intensidade"||entradas.pergunta.tipoPergunta==="Múltipla Escolha"||entradas.pergunta.tipoPergunta==="Caixa de Seleção"){
                await page.keyboard.press('Tab');
                await page.keyboard.type(alterna.descricao);
                await page.keyboard.press('Tab');
                await page.keyboard.type(alterna.ordem);
                await page.keyboard.press('Tab');
                await page.keyboard.press('Tab');
                await page.keyboard.press('Tab');
                await page.keyboard.press('Tab');
                await page.keyboard.press('Space');




            
            }

        




            await page.waitForTimeout(3000);

            await page.screenshot({path:`./src/public/PESQUISAMS_IMAGES/criarpergunta_${i}.jpg`, fullPage:true}).then(t=>{
                obj.print = `${process.env.URL_SYSTEM}/PESQUISAMS_IMAGES/criarpergunta_${i}.jpg`;
            });

           

            await page.off('request');
            await page.off('response');
            await page.off('console');
 
            
    return c.push(obj);
    
}

module.exports = criarPergunta;