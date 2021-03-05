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
            let obj = {id:i, tipoDoTeste:"Pesquisar", urlsRequest:[],urlsResponse:[],logs:[], print:''}
            // casosFinais.push(obj);        

            
            //Ouvinte de logs
             page.on('console',  log => { 
                return obj.logs.push(`Logs do caso ${i} `+log._text);
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

            await page.waitForTimeout(3000);

            await page.type('select[id=Categoria]',entradas.categoria);
            await page.type('input[id=Titulo]',entradas.titulo, {delay:100});
            await page.type('input[id=Descricao]',entradas.descricao, {delay:100});
            await page.type('input[id=DataInicio]',entradas.datainicio, {delay:100});
            await page.type('input[id=DataFim]',entradas.datainicio, {delay:100});

             //Espera o carregamento do GRID
             await page.waitForTimeout(3000);

             //Tirando print assim que o botão pesquisar é acionado
             await page.screenshot({path:`./src/public/PESQUISAMS_IMAGES/pesquisar_${i}.jpg`, fullPage:true}).then(t=>{
                 obj.print = `http://localhost:8080/PESQUISAMS_IMAGES/pesquisar_${i}.jpg`;
             });

            await page.evaluate(()=>{ return document.querySelector('a.btn.blue').click();});

           
            
            page.off('request');
            page.off('response');
            page.off('console');

            
    return c.push(obj);
    
    
    
}

module.exports = PesquisarAdm;