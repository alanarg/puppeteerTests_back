
fs = require('fs');



const AutenticacaoGSI = async (req,browser,page,c) =>{


    const entradas = req;
    //Instancia o o navegador
       
             
            await page.waitForTimeout(2000);

            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');

            await page.keyboard.type( entradas.user);

            await page.keyboard.press('Tab');

            await page.keyboard.type( 'F');

            await page.keyboard.press('Tab');

            await page.keyboard.type(entradas.senha);


            // await page.type('select[id=ddlDominio]', "F");

            // await page.type('input[id=txtSenha]', entradas.senha);

            await page.waitForSelector('select#ctl00_ContentPlaceHolder1_ddlSistemasAutorizados');

            await page.select('select#ctl00_ContentPlaceHolder1_ddlSistemasAutorizados',entradas.sistema);

            await page.waitForTimeout(2000);

            await page.select('select[id=ctl00_ContentPlaceHolder1_ddlGrupo]',entradas.grupo);

            await page.waitForTimeout(2000);

            //Clicando botão pesquisar
            await page.evaluate(()=>{ return document.querySelector('input#ctl00_ContentPlaceHolder1_gdvUsuarios_ctl02_ImageButton1').click();});

            await page.waitForTimeout(2000);


            let pages = await browser.pages();

            let latestPage = pages[pages.length-1];

            let title = await latestPage.title();

            console.log(title);

                // console.log(latestTab.title());

            // for(let p of pages){
            //     let title = await p.title();

            //     console.log(title);

            // }   
            return latestPage;

           
    
    
}

module.exports = AutenticacaoGSI;