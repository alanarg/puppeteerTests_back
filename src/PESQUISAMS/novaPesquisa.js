const { default: jsPDF } = require('jspdf');
const puppeteer = require('puppeteer');
const {entradas} = require('../CasosDeTeste/GedcorpCasos');
var doc = new jsPDF();
fs = require('fs');

const imageToBase64 = require('image-to-base64');
const { request } = require('http');


const criarPesquisa = async (req,page,i,c) =>{

    const entradas = req;
    
        
            //criando resultado
            let obj = {id:i, tipoDoTeste:"Criar pesquisa", urls:[],logs:[], print:''}

            //Ouvinte de requisições
            page.on('request', async req => {
                // Ignore OPTIONS requests
                // if (req.url().includes('/pesquisams/v1/')) {
                    return  obj.urls.push(req.url());
                  
                // };
            });

            //Ouvinte de logs
            page.on('console', async log => { 
                return  obj.logs.push(`Logs do caso ${i} `+log._text);
                
            });
           
            await page.waitForTimeout(3000);

            await page.type('select[id=Categoria]',entradas.categoria);
            await page.type('input[id=Titulo]',entradas.titulo, {delay:100});
            await page.type('input[id=Descricao]',entradas.descricao, {delay:100});
            await page.type('input[id=DataInicio]',entradas.datainicio, {delay:100});
            await page.type('input[id=DataFim]',entradas.datafim, {delay:100});
            await page.type('input[id=NomeResponsavel]',entradas.nomeresponsavel, {delay:100});
            await page.type('input[id=EmailResponsavel]',entradas.emailresponsavel, {delay:100});

            await page.keyboard.press('Tab');
            await page.keyboard.type(entradas.telefone);
            
            await page.waitForTimeout(3000);
            await page.screenshot({path:`./src/public/PESQUISAMS_IMAGES/criarpesquisa_${i}.jpg`, fullPage:true}).then(t=>{
                obj.print = `http://localhost:8080/PESQUISAMS_IMAGES/criarpesquisa_${i}.jpg`;
            });

            await page.evaluate(t=>{
                document.querySelector('button.btn.green.default').click();            
            });

            
            page.off('request');
            page.off('console');

            
    return c.push(obj);
    
    
    
}

module.exports = criarPesquisa;