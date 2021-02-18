const { default: jsPDF } = require('jspdf');
const puppeteer = require('puppeteer');
const {entradas} = require('../CasosDeTeste/GedcorpCasos');
var doc = new jsPDF();
fs = require('fs');

const imageToBase64 = require('image-to-base64');
const { request } = require('http');


const criarPesquisa = async (req,page,i,c) =>{

    const entradas = req;
    //Instancia o o navegador


    
        
            //criando resultado
            let obj = {id:i, tipoDoTeste:"Criar pesquisa", urls:[],logs:[], print:''}
            // casosFinais.push(obj);


            //função de navegação por URL            


            
            
           
            await page.waitForTimeout(3000);

            await page.type('select[id=Categoria]',entradas.categoria);
            await page.type('input[id=Titulo]',entradas.titulo, {delay:100});
            await page.type('input[id=Descricao]',entradas.descricao, {delay:100});
            await page.type('input[id=DataInicio]',entradas.datainicio, {delay:100});
            await page.type('input[id=DataFim]',entradas.datafim, {delay:100});
            await page.type('input[id=NomeResponsavel]',entradas.nomeresponsavel, {delay:100});
            await page.type('input[id=EmailResponsavel]',entradas.emailresponsavel, {delay:100});

            await page.keyboard.press('Tab');
            await page.keyboard.type('9999999999');


            // const tele = await page.$x("//p-inputmask[@id='TelefoneResponsavel']");
            // await tele.evaluate(t=>{
            //     console.log(entradas.telefone);
            //     t.innerHTML = entradas.telefone;
            // })
            // await page.type('input[css=form-control.input-sm.ui-inputtext.ui-corner-all.ui-state-default.ui-widgetstate-filled]',entradas.telefone, {delay:100});
            // if(entradas.autenticacao==="true"){

            //     await page.click('input[id=NecessitaIdentificacao]');

            // }  
            
            await page.waitForTimeout(3000);
            await page.screenshot({path:`./src/public/PESQUISAMS_IMAGES/criarpesquisa_${i}.jpg`, fullPage:true}).then(t=>{
                obj.print = `http://localhost:8080/PESQUISAMS_IMAGES/criarpesquisa_${i}.jpg`;
            });

            
            //   //Ouvinte de logs
            await page.on('console', async log => { 
                return await obj.logs.push({caso:`Logs do caso${i}`,log:log._text});
                
                
            });

            // //Ouvinte de requisições
            await page.on('request', async req => {
                
                // Ignore OPTIONS requests
                

                if (req.url().includes('/pesquisams/v1/')) {

                   
                    return await obj.urls.push({request:`Requisição do caso ${i}`, url:req.url(), errors:req.failure(), headers: req.headers()});
                  
                };
                
            
            });

            await page.evaluate(t=>{
                document.querySelector('button.btn.green.default').click();            
            });

            console.log(obj);

            //Espera o carregamento do GRID

            


            //Tirando print assim que o botão pesquisar é acionado
            // await page.screenshot({path:`./src/public/PESQUISAMS_IMAGES/criarpesquisa_${i}.jpg`, fullPage:true}).then(t=>{
            //     obj.print = `http://localhost:8080/PESQUISAMS_IMAGES/criarpesquisa_${i}.jpg`;
            // });
        
            
    return c.push(obj);
    
    
    
}

module.exports = criarPesquisa;