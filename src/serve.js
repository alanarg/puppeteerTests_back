const express = require('express');
const puppeteer = require('puppeteer');
const PesquisaPublica = require('./GEDCORP/gedcorp');
const loginPesquisaAdm = require('./PESQUISAMS/login');
const PesquisarAdm = require('./PESQUISAMS/pesquisar');
const Categoria = require('./PESQUISAMS/categorias');
const criarBanner = require('./PESQUISAMS/novoBanner');
const criarPesquisa = require('./PESQUISAMS/novaPesquisa');
const criarCategoria = require('./PESQUISAMS/novaCategoria');
const criarPergunta = require('./PESQUISAMS/criarPerguntas');
const criarSecao = require('./PESQUISAMS/criarSecao');
const editarPesquisa = require('./PESQUISAMS/editarPesquisa');

const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require('cors');
const { Console } = require('console');



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
    let ambiente = req.body.ambiente;

        
    const browser = await puppeteer.launch({headless:!req.body.visualizarTeste});
    
    const page = await browser.newPage();


    const casosFinais = [];

    try {
        
        //função de navegação por URL            
        await page.goto(`http://${ambiente}/publico/documento/SUFHUk8`);

        console.log(req.body.casos);
        while  (i<req.body.casos.length) {
            await PesquisaPublica(req.body.casos[i],page,i,casosFinais);

            await page.evaluate(()=>{ return document.querySelector('a.btn.red').click();});

            i++;
        }
        // let v  = await PesquisaPublica(req.body);       
         res.json({result:'success', data:casosFinais})

        
    } catch (error) {
        console.log(error);
    
    }        
    



});

app.post('/pesquisams_admin_login', async (req,res)=>{
    let i = 0;
    let k =0;
    let y = 0;
    let j = 0;
    let z = 0;
    let w = 0 ;
    let h = 0;
    let l = 0;

    let ambiente = req.body.ambiente;


    
    const browser = await puppeteer.launch({headless:!req.body.visualizarTeste});
    
    const page = await browser.newPage();


    const casosFinais = [];

    try{

    
    //logar
    try {

        await loginPesquisaAdm(req.body.login,page,ambiente);
    } catch (error) {
        console.log(error);
   
    }

    //Categorias
    try {
        await page.waitForTimeout(3000);

        await page.goto(`http://${ambiente}/admin/categoria`);

        //vai para area pesquisa
        while  (k<req.body.categoriaPesquisar.length) {
            

            // function logRequestCategoria(interceptedRequest) {
            //     return respostas.push('Requests do pesquisar categoria:' + interceptedRequest.url());
            // }

            // page.on('request', logRequestCategoria);

        
            //limpa o formulário
            await page.evaluate(()=>{ return document.querySelector('a.btn.red').click();});

            //Injeta pesquisa categoria
            await Categoria(req.body.categoriaPesquisar[k],page,k,casosFinais);


            // page.off('request', logRequestCategoria);


            k++;
        }        
    } catch (error) {
        console.log(error);


    }

    try {
        
        await page.waitForTimeout(3000);

        await page.goto(`http://${ambiente}/admin/pesquisa`);

        //vai para area pesquisa

        while  (i<req.body.pesquisar.length) {


            //limpa o formulário
            await page.evaluate(()=>{ return document.querySelector('a.btn.red').click();});


            await PesquisarAdm(req.body.pesquisar[i],page,i,casosFinais);

            i++;
        }

    } catch (error) {
        console.log(error);

    
    } 


    //Cadastrar nova pesquisa 
    try {

        await page.goto(`http://${ambiente}/admin/pesquisa/cadastrar`);


        while  (y<req.body.cadastrarPesquisa.length) {

            //limpa o formulário
            await criarPesquisa(req.body.cadastrarPesquisa[y],page,y,casosFinais);
            //  casosFinais.push();

            y++;
        }

    } catch (error) {
        console.log(error);

    }

    
    try {
        //cadastrar categoria
        await page.goto(`http://${ambiente}/admin/categoria/cadastrar`);

        
        while  (j<req.body.cadastrarCategoria.length) {
                
            console.log(req.body.cadastrarCategoria[j]);

            //limpa o formulário
            await criarCategoria(req.body.cadastrarCategoria[j],page,j,casosFinais);

            //  casosFinais.push();

            j++;
        }

    } catch (error) {
        console.log(error);
    }

    try {
        
        //cadastrar novo banner
        await page.goto(`http://${ambiente}/admin/banner/cadastrar`);


        while  (z<req.body.cadastrarBanner.length) {

            await criarBanner(req.body.cadastrarBanner[z],page,z,casosFinais);


            z++;
        }


    } catch (error) {
        console.log(error);
        
    }
    try {
       
        let id_edit = req.body.editarPesquisa.id;

        
        //Editar Pesquisa 
        await page.goto(`http://${ambiente}/admin/pesquisa/editar/${id_edit}`);

        

        await editarPesquisa(req.body.editarPesquisa,page,w,casosFinais);


        
        

        //Criar Seção 
        await page.goto(`http://${ambiente}/admin/pesquisa/editar/${id_edit}/consultar-secao/${id_edit}`);
            
        while  (l<req.body.criarSecao.secoes.length) {

            await criarSecao(req.body.criarSecao.secoes[l],page,l,casosFinais);


            l++;
        }

        //Criar Pergunta
        await page.goto(`http://${ambiente}/admin/pesquisa/editar/${id_edit}/consultar-pergunta/${id_edit}`);
            
        while  (h<req.body.criarPergunta.perguntas.length) {

            await criarPergunta(req.body.criarPergunta.perguntas[h],page,h,casosFinais);


            h++;
        }

        


    } catch (error) {
        console.log(error);
    }
    await res.json({status:"ok"});
    

}catch(error){
    res.json({error:error});
}
    
});


app.post('/vale_universidade', async (req,res)=>{

    
    const browser = await puppeteer.launch({headless:req.body.visualizarTeste});
    
    const page = await browser.newPage();

    const respostas = [];

    function logRequest(interceptedRequest) {
        return respostas.push('A request was made:' + interceptedRequest.url());
    }

    page.waitForTimeout(3000);

    page.on('request', logRequest);

    await loginPesquisaAdm(req.body.login,page);
    
      // Sometime later...
    page.off('request', logRequest);

        

    console.log(respostas);
    
});



app.listen(8080);

