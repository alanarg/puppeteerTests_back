const { default: jsPDF } = require('jspdf');
fs = require('fs');


const giveLikes = async (req,page) =>{
    const entradas = req;
    const j = 0;
    let c;

            // await page.evaluate(t=>{

            //     document.querySelector('a.btn.green.btn-flat.ng-star-inserted');     

            // });           
            
            
            
        
            // //Ouvinte de requisições
            // await page.on('response',  res => {
            //     // Ignore OPTIONS requests
            //     return  obj.urlsResponse.push({url:res.url(), status:res.status()});  
            // });

            // await page.on('request',  req => {
            //     // Ignore OPTIONS requests
            //     return  obj.urlsRequest.push({url:req.url()});  
            // });
            // //Ouvinte de logs
            // page.on('console',  log => { 

            //     return  obj.logs.push(`Logs do caso ${i} `+log._text);
                
            // });


           //instruções

//           like button instagram selector : "span.fr66n > button[type=\"button\"] > div"

//           arrow button instagram selector :" div.l8mY4.feth3 > button[type=\"button\"]"

//            close post button selector: "div.NOTWr > button[type=\"button\"]"

//            seguir button: div#react-root span.vBF20._1OSdk > button

//           verificar total de posts da primeira linha: let t = document.querySelector('div#react-root article > div > div > div:nth-child(1)').children; console.log(t.length);
            await page.waitForTimeout(3000);
            
            await page.type('div#react-root div.QY4Ed.P0xOK > input',entradas, {delay:100});
            await page.waitForTimeout(3000);

            await page.keyboard.press('Tab');
            await page.keyboard.press('Tab');

            await page.keyboard.press('Enter');

            await page.waitForTimeout(3000);

            try {
                await page.evaluate(()=>{ return document.querySelector('div#react-root span.vBF20._1OSdk > button').click();});
            } catch (error) {
                try {
                    await page.evaluate(()=>{ return document.querySelector('div#react-root div.qF0y9.Igw0E.IwRSH.eGOV_.ybXk5._4EzTm.bPdm3 > div > div > button[type=\"button\"]').click();});
                    
                } catch (error) {
                    
                }
                
            }

           

            const divCount = await page.$$eval('div#react-root article > div > div > div', (divs) => divs.length);
            await page.waitForTimeout(2000);

          
                try {
                    

                for(i=1;i<4;i++){
                    
                     await page.click(`div#react-root div:nth-child(1) > div:nth-child(${i}) > a > div > div._9AhH0`);


                     await page.waitForTimeout(2000);

                     const likeButton = await page.$("span.fr66n > button[type=\"button\"]");

                     const arrowButton = await page.$("div.l8mY4.feth3 > button[type=\"button\"]");

                     const closeButton = await page.$("div.NOTWr > button[type=\"button\"]");
            
                    await page.waitForTimeout(2000);
    
                    await likeButton.click();
                        
                    await closeButton.evaluate(b => b.click());
                    
                    
                }


            } catch (error) {
                return null;    
            }
           
           
            
            await page.waitForTimeout(5000);

    
                 

            await page.off('request');
            await page.off('response');
            await page.off('console');


            return null;
 
            
    
}

module.exports = giveLikes;