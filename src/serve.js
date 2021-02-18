const express = require('express');
const puppeteer = require('puppeteer');
const PesquisaPublica = require('./GEDCORP/gedcorp');
const loginPesquisaAdm = require('./PESQUISAMS/login');
const PesquisarAdm = require('./PESQUISAMS/pesquisar');
const criarPesquisa = require('./PESQUISAMS/novaPesquisa');
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require('cors');



const app = express();

app.use(cors());

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('Hello world');

});

app.post('/gedcorp_publico', async (req,res,next)=>{
    let i =0;
    const casosFinais = [];
    console.log(req.body);


    try {

        while  (i<req.body.length) {
            console.log("laço");
            casosFinais.push(await PesquisaPublica(req.body[i],i));
            i++;
        }
        // let v  = await PesquisaPublica(req.body);       
        console.log(casosFinais);
         res.json({result:'success', data:casosFinais})

        
    } catch (error) {
        console.log(error);
    
    }        
    



});

app.post('/pesquisams_admin_login', async (req,res)=>{
    let i = 0;
    let y = 0;

    
    const browser = await puppeteer.launch({headless:false});
    
    const page = await browser.newPage();


    const casosFinais = [];


    try {
        //logar
        await loginPesquisaAdm(req.body.login,page);


        await page.waitForTimeout(3000);

        await page.goto('http://hom.adm.pesquisa.ms.gov.br/admin/pesquisa');

        //vai para area pesquisa

        while  (i<req.body.pesquisar.length) {


            //limpa o formulário
            await page.evaluate(()=>{ return document.querySelector('a.btn.red').click();});


            await PesquisarAdm(req.body.pesquisar[i],page,i,casosFinais);

            i++;
        }

        //Cadastrar nova pesquisa 
        try {


            await page.waitForTimeout(3000);

            await page.goto('http://hom.adm.pesquisa.ms.gov.br/admin/pesquisa/cadastrar');


        while  (y<req.body.cadastrar.length) {

            //limpa o formulário

            await criarPesquisa(req.body.cadastrar[y],page,y,casosFinais);
            //  casosFinais.push();

            y++;
        }

        } catch (error) {
            
        }
        res.json({result:'success', data:casosFinais})

        
    } catch (error) {
        res.json({erro:error});
    
    }        
    
});

app.listen(8080);

