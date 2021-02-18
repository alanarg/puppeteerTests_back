const { default: jsPDF } = require('jspdf');
const {entradas} = require('../CasosDeTeste/GedcorpCasos');
var doc = new jsPDF();
fs = require('fs');

const imageToBase64 = require('image-to-base64');


const loginPesquisaAdm = async (req,page) =>{

    const casosFinais = [];

    const entradas = req;
    //Instancia o o navegador
       
        
            //criando resultado
            // let obj = {id:i, urls:[],logs:[], print:''}
            // casosFinais.push(obj);


            
            //função de navegação por URL            
            await page.goto('http://hom.adm.pesquisa.ms.gov.br/portal/login');


            
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

            // await page.evaluate(()=>{ return document.querySelector('input#usuario.ng-pristine.ng-valid.ng-touched').click();});

            //await page.$eval('#usuario.ng-pristine.ng-valid.ng-touched', el => el.text())
            await page.type('input[id=usuario]',entradas.nome, {delay:100});
            await page.type('select[id=dominio]',entradas.dominio, {delay:100});
            await page.type('input[id=senha]',entradas.senha, {delay:100});
            await page.evaluate(()=>{ return document.querySelector('button').click();});

            await page.waitForSelector('select[id=perfil]');

            await page.type('select[id=perfil]',entradas.perfil, {delay:100});
            await page.evaluate(()=>{ return document.querySelector('button#btn_acessar_perfil').click();});

            


            // await page.type('','aarguelho', {delay:100});
            // await page.type('input#numero.form-control.input-sm.ng-untouched.ng-pristine.ng-valid',entradas.numero);
            // await page.type('input#data.p-inputmask.form-control.input-sm.p-inputtext.p-component', entradas.data,  {delay:100});
            // await page.type('input#assunto.form-control.input-sm.ng-untouched.ng-pristine.ng-valid',entradas.assunto, {delay:100});
            // await page.type('input#resumo.form-control.input-sm.ng-untouched.ng-pristine.ng-valid',entradas.resumo, {delay:100});
            // await page.type('input#texto.form-control.input-sm.ng-untouched.ng-pristine.ng-valid', entradas.texto_do_documento, {delay:100});


            //Clicando botão pesquisar
            // await page.evaluate(()=>{ return document.querySelector('a.btn.blue').click();});

            //Espera o carregamento do GRID

            
          



            //Tirando print assim que o botão pesquisar é acionado
            // await page.screenshot({path:`./src/public/gedcorp_${i}.jpg`, fullPage:true});
        
        
    return "logado";
    
    
    
}

module.exports = loginPesquisaAdm;