const RepasseFinanceiro = async (req,page,i,c,ambiente) =>{
    const entradas = req;

    console.log(entradas);
      //criando resultado
      let obj = { tipoDoTeste:"Documentos", urlsRequest:[],urlsResponse:[],logs:[], print:''}
        
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
     
      await page.waitForSelector('input#AnoReferencia.form-control.input-sm.numeric');

      await page.keyboard.type(req.ano);

      await page.evaluate(()=>{
          document.querySelector('input#btnPesquisar.btn.btn-flat.btn-primary');
      });

      
    await page.waitForTimeout(3000);

    await page.screenshot({path:`./src/public/REDESUAS/repasse_financeiro_${i}.jpg`, fullPage:true}).then(async t=>{
        obj.print = `${process.env.URL_SYSTEM}/REDESUAS/repasse_financeiro_${i}.jpg`
        
    });


    await page.off('request');
    await page.off('response');
    await page.off('console');


    return c.push(obj);
      



}   

module.exports = RepasseFinanceiro;