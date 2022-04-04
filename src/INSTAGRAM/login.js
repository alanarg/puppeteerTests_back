const { default: jsPDF } = require('jspdf');
fs = require('fs');


const login = async (req,page) =>{
    const entradas = req;
    const j = 0;

            // await page.evaluate(t=>{

            //     document.querySelector('a.btn.green.btn-flat.ng-star-inserted');     

            // });           
            
            
            
        
            //Ouvinte de requisições
            // await page.on('response',  res => {
            //     // Ignore OPTIONS requests
            //     return  obj.urlsResponse.push({url:res.url(), status:res.status()});  
            // });

            // await page.on('request',  req => {
            //     // Ignore OPTIONS requests
            //     return  obj.urlsRequest.push({url:req.url()});  
            // });
            // //Ouvinte de logs
            // page.on('console',  log => { 

            //     return  obj.logs.push(`Logs do caso ${i} `+log._text);
                
            // });
           
            await page.waitForTimeout(3000);
            
            await page.type('input[name=\"username\"]',entradas.user , {delay:100});
            await page.type('input[name=\"password\"]',entradas.senha, {delay:100});
            // await page.type('input[id=Ordem]',entradas.pergunta.ordem, {delay:100});

            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press("Space");

            await page.waitForTimeout(3000);




            // if(entradas.pergunta.obrigatorio==="true"){
            //     await page.keyboard.press("Space");
            // }
          
            //     await page.keyboard.press('Tab');
            //     await page.keyboard.press('Space');
            //     await page.keyboard.press('ArrowDown');     
            //     await page.keyboard.press('Enter');
            //     await page.keyboard.press('Tab');
            //     await page.keyboard.press('Tab');
            //     await page.keyboard.press('Space');
            // await page.waitForTimeout(3000);
        
            // await page.screenshot({path:`./src/public/PESQUISAMS_IMAGES/criarpergunta_${i}.jpg`, fullPage:true}).then(t=>{
            //     obj.print = `${process.env.URL_SYSTEM}/PESQUISAMS_IMAGES/criarpergunta_${i}.jpg`;
            // });

           

            await page.off('request');
            await page.off('response');
            await page.off('console');
 
            
    // return c.push(obj);
    
}

module.exports = login;