const { default: jsPDF } = require('jspdf');
fs = require('fs');


const LoginVale = async (req,page,c) =>{
    const entradas = req;
           
            await page.waitForTimeout(1000);
            
            await page.type('input.cpf.ui-inputtext.ui-corner-all.ui-state-default.ui-widget',entradas.cpf , {delay:100});
            await page.type('input#senha.ng-untouched.ng-pristine.ng-valid',entradas.senha, {delay:100});

            await page.waitForTimeout(3000);

            await page.keyboard.press('Enter');

            
            // await page.screenshot({path:`./src/public/VALEUNIVERSIDADE
            // /login.jpg`, fullPage:true}).then(t=>{
            //     obj.print = `${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/login.jpg`;
            // });

    
}

module.exports = LoginVale;