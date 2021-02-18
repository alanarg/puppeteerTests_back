const { default: jsPDF } = require('jspdf');
const puppeteer = require('puppeteer');
const {entradas} = require('../CasosDeTeste/GedcorpCasos');
var doc = new jsPDF();
const imageToBase64 = require('image-to-base64');


const PesquisaPublica = async () =>{
    //Instancia o o navegador
    const browser = await puppeteer.launch({headless: false });
    
    const page = await browser.newPage();

    try {

        //variável contadora
        let i=0;

        
        var line = 220 // Começo da linha das Requisições
        var line2= 1000;
        var lineHeight = 20 // tamanho do espaçamento
        var leftMargin = 20
        var wrapWidth = 1000 //Tamanho máximo da string

        //Laço de repetição para rodar todos os casos da respectiva tela
        while (i<=entradas.length){

           
            
            //função de navegação por URL            
            await page.goto('http://localhost:4200/publico/documento/SUFHUk8');


            //Inicia configurção do documento            
            await doc.setFontSize(30);
            //Definindo título no eixo y 25
            await doc.text("Pesquisa pública GEDCORP", 25, 25);
            await doc.setFontSize(14);
            await doc.setTextColor('#000000');

            //Definindo subtítulo no eixo y 200
            await doc.text("REQUISIÇÕES", 25, 200);
            await doc.setFontSize(14);
            await doc.setTextColor('#0000ff');

          
            //Ouvinte de requisições
            await page.on('response', async response => {

                // Ignore OPTIONS requests
                if(response.request().method() !== 'POST'){

                if (response.url().includes('/v1/documento')) {

                    //Função para cortar grandes strings e formar um array
                    //assim sendo possível a oraganização de linhas
                    var spli = await doc.splitTextToSize(response.url(), wrapWidth);
                    


                    //Laço de repetição para imprimir as linhas
                    for (var i = 0, length = spli.length; i < length; i++) {
                        
                        // loop thru each line and increase
                        // console.log(spli[i]);

                        await doc.text(spli[i], leftMargin, line, {maxWidth:180});
                      
                        return line = lineHeight + line;
                        
                    }
                    // return await doc.text(response.url(), 25, 200, {align:'left',maxWidth:180});
                  
                };
            }
            });





           

            
    
            //Ouvinte de logs
            await page.on('console', async (log) => { 
                // return console.log(log);
                var splitTitle = await doc.splitTextToSize(log._text, wrapWidth);
                // console.log(splitTitle);
                for (var i = 0, length = splitTitle.length; i < length; i++) {
                        
                    // loop thru each line and increase

                    await doc.text(splitTitle[i], leftMargin, line2, {maxWidth:180});
                    line2 = lineHeight + line2;
                    if(line2>doc.internal.pageSize.height){
                        doc.addPage();
                        return doc.setPage(2);
                    }

                  
                     
                    
                }

                

            });


            await page.waitForSelector('input[id=Nome]');

            await page.type('#Nome',entradas[i].nome, {delay:100});
            await page.type('input.ng-untouched.ng-pristine.ng-valid','ANEXO', {delay:100});
            await page.type('input#numero.form-control.input-sm.ng-untouched.ng-pristine.ng-valid',entradas[i].numero);
            await page.type('input#data.p-inputmask.form-control.input-sm.p-inputtext.p-component', entradas[i].data,  {delay:300});
            await page.type('input#assunto.form-control.input-sm.ng-untouched.ng-pristine.ng-valid',entradas[i].assunto, {delay:100});
            await page.type('input#resumo.form-control.input-sm.ng-untouched.ng-pristine.ng-valid',entradas[i].resumo, {delay:100});
            await page.type('input#texto.form-control.input-sm.ng-untouched.ng-pristine.ng-valid', entradas[i].texto_do_documento, {delay:100});


            //Clicando botão pesquisar
            await page.evaluate(()=>{ return document.querySelector('a.btn.blue').click();});

            //Espera o carregamento do GRID
            await page.waitForTimeout(2000);

            
          



            //Tirando print assim que o botão pesquisar é acionado
            await page.screenshot({path:'./src/GEDCORP/gedcorp.jpg', fullPage:true});
        
            //Transformação do print para base 64
            let img = await imageToBase64('./src/GEDCORP/gedcorp.jpg');

            //Adiciona imgem do print no PDF
            await doc.addImage(img, "JPEG", 40, 40,130, 150);


            
            //Salva o  documento
            await doc.save(`./src/GEDCORP/relatorios/gedcorp_publico${i}.pdf`);

            //incrementando contador
            i++;
        }

    } catch (error) {
        
    }
    
    
    
}

PesquisaPublica();