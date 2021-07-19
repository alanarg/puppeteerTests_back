
fs = require('fs');

const imageToBase64 = require('image-to-base64');


const loginPesquisaAdm = async (req,page, ambiente) =>{

    const casosFinais = [];

    const entradas = req;
    //Instancia o o navegador
       
        
            //criando resultado
            // let obj = {id:i, urls:[],logs:[], print:''}
            // casosFinais.push(obj);


            
            //função de navegação por URL            
            await page.goto(`http://${ambiente}.adm.pesquisa.ms.gov.br/portal/login`);


            
            //   //Ouvinte de logs
            //   await page.on('console', async (log) => { 
                
            //     return await obj.logs.push(log._text);
                
                
            // });

            // //Ouvinte de requisições
            // await page.on('response', async response => {

            //     // Ignore OPTIONS requests
            //     if(response.request().method() !== 'POST'){

            //     if (response.url().includes('/v1/documento')) {

                   
            //         return  await obj.urls.push(response.url());
                  
            //     };
            // }
            // });

        

            await page.waitForTimeout(5000);

            await page.type('input[id=usuario]',entradas.user, );
            await page.type('select[id=dominio]',entradas.dominio, );
            await page.type('input[id=senha]',entradas.senha, );
            await page.evaluate(()=>{ return document.querySelector('button').click();});

            await page.waitForSelector('select[id=perfil]');

            await page.type('select[id=perfil]',entradas.perfil, {delay:100});
            await page.evaluate(()=>{ return document.querySelector('button#btn_acessar_perfil').click();});

                   
    return "logado";
    
    
    
}

module.exports = loginPesquisaAdm;