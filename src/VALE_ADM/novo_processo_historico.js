const { default: jsPDF } = require('jspdf');
fs = require('fs');


const ProcessoHistorico = async (page,c) =>{
 
    const j = 0;

            //criando resultado
            let obj = { tipoDoTeste:"Hisotiroco do Processo", print:''}
        

            await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/novo_processo_cursos_historico.jpg`, fullPage:true}).then(t=>{
                obj.print = `${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/novo_processo_cursos_historico.jpg`;
            });


    return c.push(obj);
    
}

module.exports = ProcessoHistorico;