const PlanoAcao = async (req,page,i,c,ambiente) =>{
    const entradas = req;

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
     
      



}   

module.exports = PlanoAcao;