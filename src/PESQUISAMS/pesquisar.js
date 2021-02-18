const { default: jsPDF } = require('jspdf');
const puppeteer = require('puppeteer');
const {entradas} = require('../CasosDeTeste/GedcorpCasos');
var doc = new jsPDF();
fs = require('fs');

const imageToBase64 = require('image-to-base64');
const { request } = require('http');


const PesquisarAdm = async (req,page,i,c) =>{

    const entradas = req;
    //Instancia o o navegador


    
        
            //criando resultado
            let obj = {id:i, tipoDoTeste:"Pesquisar", urls:[],logs:[], print:''}
            // casosFinais.push(obj);


            //função de navegação por URL            


            
            //   //Ouvinte de logs
              await page.on('console', async log => { 
                return await obj.logs.push({caso:`Logs do caso${i}`,log:log._text});
                
                
            });

            // //Ouvinte de requisições
            await page.on('request', async req => {
                
                // Ignore OPTIONS requests
                // if(req.method() !== 'POST'){

                if (req.url().includes('/pesquisams/v1/')) {
                    
                    return await obj.urls.push({request:`Requisição do caso ${i}`, url:req.url(), errors:req.failure(), headers: req.headers()});                    
                  
                };
                // };
            
            });

            await page.waitForTimeout(3000);

            await page.type('select[id=Categoria]',entradas.categoria);
            await page.type('input[id=Titulo]',entradas.titulo, {delay:100});
            await page.type('input[id=Descricao]',entradas.descricao, {delay:100});
            await page.type('input[id=DataInicio]',entradas.datainicio, {delay:100});
            await page.type('input[id=DataFim]',entradas.datainicio, {delay:100});

            await page.evaluate(()=>{ return document.querySelector('a.btn.blue').click();});



            //Espera o carregamento do GRID

            
            await page.waitForTimeout(3000);


            //Tirando print assim que o botão pesquisar é acionado
            await page.screenshot({path:`./src/public/PESQUISAMS_IMAGES/pesquisar_${i}.jpg`, fullPage:true}).then(t=>{
                obj.print = `http://localhost:8080/PESQUISAMS_IMAGES/pesquisar_${i}.jpg`;
            });
        
            
    return c.push(obj);
    
    
    
}

module.exports = PesquisarAdm;