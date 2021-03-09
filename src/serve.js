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
const criarPerguntaComSecao = require('./PESQUISAMS/criarPerguntaComSecao');

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
        console.log(casosFinais);
        // let v  = await PesquisaPublica(req.body);       
         res.json({result:'success', data:casosFinais});

        
    } catch (error) {
        res.status(400);
        res.send('error'+error);
    
    }        
    



});

app.post('/pesquisams_admin_login', async (req,res)=>{
    let i = 0;
    let k = 0;
    let y = 0;
    let j = 0;
    let z = 0;
    let w = 0;
    let h = 0;
    let l = 0;
    let q = 0;

    let ambiente = req.body.ambiente;


    
    const browser = await puppeteer.launch({headless:!req.body.visualizarTeste});
    
    const page = await browser.newPage();


    const casosFinais = [];

    try{

    
    //logar
    try {

        await loginPesquisaAdm(req.body.login,page,ambiente);
    } catch (error) {
        res.status(400);
        res.send('error'+error);
   
    }

    //Categorias
    try {
        await page.waitForTimeout(3000);


        //vai para area pesquisa
        while  (k<req.body.categoriaPesquisar.length) {
        await page.goto(`http://${ambiente}/admin/categoria`);

            

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
        res.status(400);
        res.send('error'+error);


    }

    try {
        
        await page.waitForTimeout(3000);


        //vai para area pesquisa

        while  (i<req.body.pesquisar.length) {

            await page.goto(`http://${ambiente}/admin/pesquisa`);

            //limpa o formulário
            await page.evaluate(()=>{ return document.querySelector('a.btn.red').click();});


            await PesquisarAdm(req.body.pesquisar[i],page,i,casosFinais);

            i++;
        }

    } catch (error) {
        res.status(400);
        res.send('error'+error);

    
    } 


    //Cadastrar nova pesquisa 
    try {



        while  (y<req.body.cadastrarPesquisa.length) {
            await page.goto(`http://${ambiente}/admin/pesquisa/cadastrar`);

            //limpa o formulário
            await criarPesquisa(req.body.cadastrarPesquisa[y],page,y,casosFinais);
            //  casosFinais.push();

            y++;
        }

    } catch (error) {
        res.status(400);
        res.send('error'+error);

    }

    
    try {
        //cadastrar categoria

        
        while  (j<req.body.cadastrarCategoria.length) {
        await page.goto(`http://${ambiente}/admin/categoria/cadastrar`);
                
            console.log(req.body.cadastrarCategoria[j]);

            //limpa o formulário
            await criarCategoria(req.body.cadastrarCategoria[j],page,j,casosFinais);

            //  casosFinais.push();

            j++;
        }

    } catch (error) {
        res.status(400);
        res.send('error'+error);
    }

    try {
        
        //cadastrar novo banner


        while  (z<req.body.cadastrarBanner.length) {
            await page.goto(`http://${ambiente}/admin/banner/cadastrar`);

            await criarBanner(req.body.cadastrarBanner[z],page,z,casosFinais);


            z++;
        }


    } catch (error) {
        res.status(400);
        res.send('error'+error);
        
    }
    try {
       

        
        //Editar Pesquisa 
        while(w<req.body.editarPesquisa.length) {

            await page.goto(`http://${ambiente}/admin/pesquisa/editar/${req.body.editarPesquisa[w].id}`);

            await editarPesquisa(req.body.editarPesquisa[w],page,w,casosFinais);
            w++;

        }        
        

        //Criar Seção 
            
        while  (l<req.body.criarSecao.length) {
            await page.goto(`http://${ambiente}/admin/pesquisa/editar/${req.body.criarSecao[l].id}/consultar-secao/${req.body.criarSecao[l].id}`);

            await criarSecao(req.body.criarSecao[l],page,l,casosFinais);


            l++;
        }

        //Criar Pergunta
        while  (h<req.body.criarPergunta.length) {
            await page.goto(`http://${ambiente}/admin/pesquisa/editar/${req.body.criarPergunta[h].pergunta.id}/consultar-pergunta/${req.body.criarPergunta[h].pergunta.id}`);

            await criarPergunta(req.body.criarPergunta[h],page,h,casosFinais);


            h++;
        }

        //Criar Pergunta com seção
        while  (q<req.body.criarPerguntaComSecao.length) {
            await page.goto(`http://${ambiente}/admin/pesquisa/editar/${req.body.criarPerguntaComSecao[q].pergunta.id}/consultar-pergunta/${req.body.criarPerguntaComSecao[q].pergunta.id}`);

            await criarPerguntaComSecao(req.body.criarPerguntaComSecao[q],page,q,casosFinais);


            q++;
        }


    } catch (error) {
        res.status(400);
        res.send('error'+error);
    }

    console.log(casosFinais);
    await res.json({result:'success', data:casosFinais});

    

}catch(error){
    res.status(400);
    res.send('error'+error);
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

