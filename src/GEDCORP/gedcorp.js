const { default: jsPDF } = require('jspdf');
const puppeteer = require('puppeteer');
const {entradas} = require('../CasosDeTeste/GedcorpCasos');
var doc = new jsPDF();
fs = require('fs');

const imageToBase64 = require('image-to-base64');


const PesquisaPublica = async (req,i) =>{

    const casosFinais = [];

    const entradas = req;
    //Instancia o o navegador
    const browser = await puppeteer.launch();
    
    const page = await browser.newPage();

    // try {

    //     //variável contadora
    //     let i=0;
      
    

    //     //Laço de repetição para rodar todos os casos da respectiva tela
    //     while (i<req.length){
        
    //         //criando resultado
            let obj = {id:i, urls:[],logs:[], print:''}
            // casosFinais.push(obj);


            
            //função de navegação por URL            
            await page.goto('http://hom.gedcorp.ms.gov.br/publico/documento/SUFHUk8');


            
              //Ouvinte de logs
              await page.on('console', async (log) => { 
                
                return await obj.logs.push(log._text);
                
                // await fs.writeFile(`./GEDCORP_${i}/logs_${i}.txt`, log._text, function (err) {
                //     if (err) return console.log(err);
                    
                //  });

            });

            //Ouvinte de requisições
            await page.on('response', async response => {

                // Ignore OPTIONS requests
                if(response.request().method() !== 'POST'){

                if (response.url().includes('/v1/documento')) {

                   
                    return  await obj.urls.push(JSON.stringify({url:response.url(), status:response.status()}));
                  
                };
            }
            });

        

            await page.waitForSelector('input[id=Nome]');

            await page.type('#Nome',entradas.nome, {delay:100});
            await page.type('input.ng-untouched.ng-pristine.ng-valid','ANEXO', {delay:100});
            await page.type('input#numero.form-control.input-sm.ng-untouched.ng-pristine.ng-valid',entradas.numero);
            await page.type('input#data.p-inputmask.form-control.input-sm.p-inputtext.p-component', entradas.data,  {delay:100});
            await page.type('input#assunto.form-control.input-sm.ng-untouched.ng-pristine.ng-valid',entradas.assunto, {delay:100});
            await page.type('input#resumo.form-control.input-sm.ng-untouched.ng-pristine.ng-valid',entradas.resumo, {delay:100});
            await page.type('input#texto.form-control.input-sm.ng-untouched.ng-pristine.ng-valid', entradas.texto_do_documento, {delay:100});


            //Clicando botão pesquisar
            await page.evaluate(()=>{ return document.querySelector('a.btn.blue').click();});

            //Espera o carregamento do GRID
            await page.waitForTimeout(2000);



            //Tirando print assim que o botão pesquisar é acionado
            await page.screenshot({path:`./src/public/GEDCORP_IMAGES/gedcorp_${i}.jpg`, fullPage:true}).then(t=>{
                obj.print = `http://localhost:8080/GEDCORP_IMAGES/gedcorp_${i}.jpg`;
            }); 
            
            //incrementando contador
        //     i++;
        // }

    // } catch (error) {
        
    // }
    return obj;
    
    
    
}

module.exports = PesquisaPublica;