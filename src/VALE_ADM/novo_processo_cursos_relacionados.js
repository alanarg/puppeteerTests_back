const { default: jsPDF } = require('jspdf');
fs = require('fs');


const CursosRelacionados = async (page,c) =>{
 
    const j = 0;

            //criando resultado
            let obj = { tipoDoTeste:"Cursos Relacionados", print:''}
        
         

            await page.screenshot({path:`./src/public/VALEUNIVERSIDADE/novo_processo_cursos_relacionados.jpg`, fullPage:true}).then(t=>{
                obj.print = `${process.env.URL_SYSTEM}/VALEUNIVERSIDADE/novo_processo_cursos_relacionados.jpg`;
            });




    return c.push(obj);
    
}

module.exports = CursosRelacionados;