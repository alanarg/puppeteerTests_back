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

const loginCadmim = require('./CADMIMS/login');
const dadosCadastraisCadmims = require('./CADMIMS/dadosCadastrais');
const dadosMigracao = require('./CADMIMS/dadosMigracao');

const AutenticacaoGSI = require('./GSI/index');

const PreCadastroVale = require('./VALE_ACADEMICO/vale_precadastro');
const LoginVale = require('./VALE_ACADEMICO/vale_login');
const DadosAcademico = require('./VALE_ACADEMICO/vale_dados_academicos');
const DadosFamilia = require('./VALE_ACADEMICO/vale_dados_familia');
const EnsinoSuperior = require('./VALE_ACADEMICO/vale_ensino_superior');
const DadosSociais = require('./VALE_ACADEMICO/vale_dados_sociais');
const RealizarInscricao = require('./VALE_ACADEMICO/vale_inscricao');

const NovoProcesso = require('./VALE_ADM/novo_processo_cronograma');
const ProcessoDocumentos = require('./VALE_ADM/novo_processo_documentos');
const ProcessoCursos = require('./VALE_ADM/novo_processo_cursos');
const ProcessoCursosRelacionados = require('./VALE_ADM/novo_processo_cursos_relacionados');
const GerenciarInscricoes = require('./VALE_ADM/gerenciar_inscricoes');
const ProcessoHistorico = require('./VALE_ADM/novo_processo_historico');
const Entrevista = require('./VALE_ADM/entrevista');
const OfertaVagas = require('./VALE_ADM/oferta_de_vagas');
const NovoOrgaoEstagio = require('./VALE_ADM/novo_orgao_de_estagio');
const PesquisaOrgaoEstagio = require('./VALE_ADM/pesquisa_orgao_estagio');
const PesquisaOrgao = require('./VALE_ADM/pesquisa_orgao');
const RecursoHumano = require('./VALE_ADM/recurso_humano');

const Regra = require('./models/regra');

const mongoose = require( 'mongoose' ); 
var captcha = '';
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require('cors');



const { Console } = require('console');

if(process.env.NODE_ENV !== 'production'){ 
    require('dotenv').config()
}


const app = express();

// app.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE");
//     app.use(cors());
//     next();

// });


// var whitelist = ['https://g08.netlify.app','https://puppeteer-back.herokuapp.com/pesquisams_admin_login','http://localhost:3000','http://localhost:8000','https://puppeteer-back.herokuapp.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

app.use(cors());

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

 
mongoose.connect(
    "mongodb+srv://alanarg:alanzin@cluster0.wrfhn.mongodb.net/PlataformaDeTestes?retryWrites=true&w=majority",
    // "mongodb://localhost/noderest",
    { useUnifiedTopology:true, useNewUrlParser:true },
    () => console.log(" Mongoose is connected")
);


app.get('/',(req,res)=>{
    res.send('Hello world');

});

app.post('/gedcorp_publico', async (req,res,next)=>{
    let i =0;
    let ambiente = req.body.ambiente;

    try {
            
        //Configuração do lauch() para rodar sem problemas no heroku
        const browser = await puppeteer.launch({
          headless: true,
            defaultViewport: null,
            args: [
             "--incognito",
             "--no-sandbox",
             "--single-process",
             "--no-zygote"
        ]
        });
    
        const page = await browser.newPage();


         const casosFinais = [];
   
        
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

app.post('/pesquisams_admin_login',async (req,res,next)=>{
    let i = 0;
    let k = 0;
    let y = 0;
    let j = 0;
    let z = 0;
    let w = 0;
    let h = 0;
    let l = 0;
    let q = 0;

    let ambiente = req.body.entradas.ambiente;

   //Configuração do lauch() para rodar sem problemas no heroku
   const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: [
        "--incognito",
        "--no-sandbox",
        "--single-process",
        "--no-zygote"
    ]
    });

    //localhost
    // const browser = await puppeteer.launch({headless:false,args: ['--start-maximized']});
    const page = await browser.newPage();
    // await page.setViewport({ width: 1366, height: 768});


    const casosFinais = [];

    try{

    //logar  
    await loginPesquisaAdm(req.body.login,page,ambiente);
        //Categorias
        await page.waitForTimeout(3000);

        if(req.body.entradas.categoriaPesquisar.chave){
        //vai para area pesquisa
        while  (k<req.body.entradas.categoriaPesquisar.casos.length) {
        await page.goto(`http://${ambiente}.adm.pesquisa.ms.gov.br/admin/categoria`);
            //limpa o formulário
            await page.evaluate(()=>{ return document.querySelector('a.btn.red').click();});

            //Injeta pesquisa categoria
            await Categoria(req.body.entradas.categoriaPesquisar.casos[k],page,k,casosFinais);

            // page.off('request', logRequestCategoria);
            k++;
        }        
        }
   
        await page.waitForTimeout(2000);

        if(req.body.entradas.pesquisar.chave){
        //vai para area pesquisa
        while  (i<req.body.entradas.pesquisar.casos.length) {
            await page.goto(`http://${ambiente}.adm.pesquisa.ms.gov.br/admin/pesquisa`);

            //limpa o formulário
            await page.evaluate(()=>{ return document.querySelector('a.btn.red').click();});

            await PesquisarAdm(req.body.entradas.pesquisar.casos[i],page,i,casosFinais);

            i++;
        }
        }

        if(req.body.entradas.cadastrarPesquisa.chave){
        //Cadastrar nova pesquisa 
        while  (y<req.body.entradas.cadastrarPesquisa.casos.length) {
            await page.goto(`http://${ambiente}.adm.pesquisa.ms.gov.br/admin/pesquisa/cadastrar`);

            //limpa o formulário
            await criarPesquisa(req.body.entradas.cadastrarPesquisa.casos[y],page,y,casosFinais);
            //  casosFinais.push();

            y++;
        }
        }
        if(req.body.entradas.cadastrarCategoria.chave){
        //cadastrar categoria    
        while  (j<req.body.entradas.cadastrarCategoria.casos.length) {
            await page.goto(`http://${ambiente}.adm.pesquisa.ms.gov.br/admin/categoria/cadastrar`);

            console.log(req.body.cadastrarCategoria.casos[j]);

            //limpa o formulário
            await criarCategoria(req.body.cadastrarCategoria[j],page,j,casosFinais);

            //  casosFinais.push();
            j++;
        }
        }

        if(req.body.entradas.cadastrarBanner.chave){
        //cadastrar novo banner
        while  (z<req.body.entradas.cadastrarBanner.casos.length) {
            await page.goto(`http://${ambiente}.adm.pesquisa.ms.gov.br/admin/banner/cadastrar`);

            await criarBanner(req.body.entradas.cadastrarBanner.casos[z],page,z,casosFinais);

            z++;
        }
        }
        if(req.body.entradas.editarPesquisa.chave){
        //Editar Pesquisa 
        while(w<req.body.entradas.editarPesquisa.casos.length) {

            await page.goto(`http://${ambiente}.adm.pesquisa.ms.gov.br/admin/pesquisa/editar/${req.body.entradas.editarPesquisa.casos[w].id}`);

            await editarPesquisa(req.body.entradas.editarPesquisa.casos[w],page,w,casosFinais);
            w++;

        }        
        }
        if(req.body.entradas.criarSecao.chave){
        //Criar Seção  
        while  (l<req.body.entradas.criarSecao.casos.length) {
            await page.goto(`http://${ambiente}.adm.pesquisa.ms.gov.br/admin/pesquisa/editar/${req.body.entradas.criarSecao.casos[l].id}/consultar-secao/${req.body.entradas.criarSecao.casos[l].id}`);

            await criarSecao(req.body.entradas.criarSecao.casos[l],page,l,casosFinais);

            l++;
        }
        }
        //Criar Pergunta
        if(req.body.entradas.criarPergunta.chave){
        while  (h<req.body.entradas.criarPergunta.casos.length) {
            await page.goto(`http://${ambiente}.adm.pesquisa.ms.gov.br/admin/pesquisa/editar/${req.body.entradas.criarPergunta.casos[h].pergunta.id}/consultar-pergunta/${req.body.entradas.criarPergunta.casos[h].pergunta.id}`);

            await criarPergunta(req.body.entradas.criarPergunta.casos[h],page,h,casosFinais);

            h++;
        }
        }
        if(req.body.entradas.criarPerguntaComSecao.chave){
        //Criar Pergunta com seção
        while  (q<req.body.entradas.criarPerguntaComSecao.casos.length) {
            await page.goto(`http://${ambiente}.adm.pesquisa.ms.gov.br/admin/pesquisa/editar/${req.body.entradas.criarPerguntaComSecao.casos[q].pergunta.id}/consultar-pergunta/${req.body.entradas.criarPerguntaComSecao.casos[q].pergunta.id}`);

            await criarPerguntaComSecao(req.body.entradas.criarPerguntaComSecao.casos[q],page,q,casosFinais);

            q++;
        }
        }
    
            console.log(casosFinais);

            res.json({result:'success', data:casosFinais});

        } catch (error) {
            
            res.json({result:error, data:casosFinais});
      

        }
});

//CADMIM
app.post('/cadmims', async (req,res)=>{

    let q = 0;

    let ambiente = req.body.ambiente;
    //Configuração do lauch() para rodar sem problemas no heroku
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: [
            "--incognito",
            "--no-sandbox",
            "--single-process",
            "--no-zygote"
        ]
    });

    // const browser = await puppeteer.launch({headless:false});
    
    const page = await browser.newPage();

    const casosFinais = [];


    try {

        //fazer login
        await page.goto(`http://${ambiente}/`);
        await loginCadmim(req.body.login,page,casosFinais);

        page.waitForTimeout(3000);

    
        //Dados cadastrais
        await dadosCadastraisCadmims(req.body.dadosCadastrais,page,casosFinais);


        page.waitForTimeout(3000);

        // Dados Migração

        await page.goto(`http://${ambiente}/cadastro/1/2`);

        await dadosMigracao(req.body.dadosMigracao,page,casosFinais);

        
        res.status(200);
        res.send('success');

    } catch (error) {

        res.status(400);
        res.send('error'+error);
    }
    
});


app.post('/vale_academico', async (req,res)=>{
 
    //Configuração do lauch() para rodar sem problemas no heroku
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: [
            "--incognito",
            "--no-sandbox",
            "--single-process",
            "--no-zygote"
        ]
    });

    // const browser = await puppeteer.launch({headless:false});
    const pages = await browser.pages();
    const page = pages[0];
    const casosFinais = [];

    let ambiente = req.body.ambiente;
    let q = 0;
    let j = 0;
    
    

    try{
        
        await page.waitForTimeout(2000);

        console.log(req.body)

        if(req.body.precadastro.chave){

        // Criar Pré-cdastro
        while(q<req.body.precadastro.casos.length) {
            await page.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/portal/pre-cadastro`);

            await PreCadastroVale(req.body.precadastro.casos[q],page,q,casosFinais);

            q++;
        }

        }
        
        //Logar 
        await page.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/portal/login`);

        await LoginVale(req.body.login,page,casosFinais);

        await page.waitForTimeout(2000);

        if(req.body.dadosAcademico.chave){

        
        await page.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/admin/academico/meus-dados/dados-pessoais`);
        
        await DadosAcademico(req.body.dadosAcademico.caso, page, casosFinais);
        
        }

        if(req.body.dadosFamilia.chave){

        
        while(j<req.body.dadosFamilia.casos.length){
            await page.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/admin/academico/meus-dados/familia`);

            await DadosFamilia(req.body.dadosFamilia.casos[j], page, j,casosFinais);

            j++;

        }
        }
       
        if(req.body.ensinoSuperior.chave){

        
        await page.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/admin/academico/meus-dados/instituicao-ensino`);

        await EnsinoSuperior(req.body.ensinoSuperior.caso, page, casosFinais);

        }

        if(req.body.dadosSociais.chave){

        
        await page.goto('http://hom.valeuniversidade.ms.gov.br/admin/academico/meus-dados/dados-sociais');

        await DadosSociais(req.body.dadosSociais.caso, page, casosFinais);

        }

        if(req.body.realizarInscricao.chave){

        
        await page.goto('http://hom.valeuniversidade.ms.gov.br/admin/academico/meus-dados/listar-processo-seletivo/processo-seletivo');

        await RealizarInscricao(page,casosFinais);

        }
    
        res.json({result:'success', data:casosFinais});

    }catch(error){
        return res.json({result:'fail', data:casosFinais});

    }

    
});
function UpdateCapt(c){
    captcha =c;
    return captcha;
}
app.post("/captcha",(req,res)=>{

    try {
        UpdateCapt(req.body.captcha);
        fs.unlinkSync(`./src/public/captcha.jpg`);
        res.json({'resposta':'ok!'});

    } catch (error) {
        res.status(400);
        console.log(error)            
    }
});

app.post("/vale_adm", async (req,res)=>{
    // let ambiente = req.body.ambiente;
    let q = 0;
    let j = 0;
    let k = 0;
    let a = 0;
    let um = 0;
    let dois = 0;
    let tres = 0;

    let ambiente = req.body.entradas.ambiente;


    console.log(captcha);
    
    //Configuração do lauch() para rodar sem problemas no heroku
    const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
            args: [
                "--incognito",
                "--no-sandbox",
                "--single-process",
                "--no-zygote"
            ]
        });
    // const browser = await puppeteer.launch({headless:false,args: ['--start-maximized']});
    const page = await browser.newPage();
    // await page.setViewport({ width: 1366, height: 768});
    
    const casosFinais = [];

    try {

        await page.goto('https://www.gsi.ms.gov.br');

        await page.screenshot({path:`./src/public/captcha.jpg`, fullPage:true});
      
        await page.waitForTimeout(8000);

        let latestPage = await AutenticacaoGSI(req.body.login,browser, page,casosFinais,captcha);  

        await latestPage.waitForTimeout(3000);


        if(req.body.entradas.novoProcesso.chave){
             await NovoProcesso(req.body.entradas.novoProcesso, latestPage, casosFinais);



        await page.waitForTimeout(3000);

        let url = await latestPage.url();

        let paths = await url.split('/');

        console.log(paths);

        await latestPage.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/admin/processo-seletivo/editar/${paths[6]}/documentos`);

        await ProcessoDocumentos(req.body.entradas.novoProcesso.processoDocumento, latestPage, casosFinais);

        await latestPage.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/admin/processo-seletivo/editar/${paths[6]}/cursos`);

        await page.waitForTimeout(2000);

        await ProcessoCursos(latestPage, casosFinais);

        await latestPage.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/admin/processo-seletivo/editar/${paths[6]}/cursos-relacionados`);

        await ProcessoCursosRelacionados(latestPage, casosFinais);

        await latestPage.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/admin/processo-seletivo/editar/${paths[6]}/historico-processo-seletivo`);

        await ProcessoHistorico(latestPage, casosFinais);

        }
        if(req.body.entradas.gerenciarInscricoes.chave){
            while  (q<req.body.entradas.gerenciarInscricoes.casos.length) {
                await latestPage.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/admin/gerenciar-inscricao`);
                //limpa o formulário
                // await latestPage.evaluate(()=>{ return document.querySelector('a.btn.red').click();});
    
                //Injeta pesquisa categoria
                await GerenciarInscricoes(req.body.entradas.gerenciarInscricoes.casos[q],latestPage,q,casosFinais);
    
                // page.off('request', logRequestCategoria);
                q++;
             }

        }
       
        if(req.body.entradas.entrevista.chave){

        
        while  (j<req.body.entradas.entrevista.casos.length) {

            await latestPage.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/admin/entrevista`);

            await page.waitForTimeout(2000);

            // await page.click('div.col-md-12 > a');

            //limpa o formulário
            // await latestPage.evaluate(()=>{ return document.querySelector('a.btn.red').click();});

            //Injeta pesquisa categoria
            await Entrevista(req.body.entradas.entrevista.casos[j],latestPage,j,casosFinais, ambiente);

            // page.off('request', logRequestCategoria);
            j++;
        }
        }
        if(req.body.entradas.ofertaDeVagas.chave){
            while  (k<req.body.entradas.ofertaDeVagas.casos.length) {

                await latestPage.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/admin/oferta-vagas`);
    
                await page.waitForTimeout(2000);
    
                // await page.click('div.col-md-12 > a');
    
                //limpa o formulário
                // await latestPage.evaluate(()=>{ return document.querySelector('a.btn.red').click();});
    
                //Injeta pesquisa categoria
                await OfertaVagas(req.body.entradas.ofertaDeVagas.casos[k],latestPage,k,casosFinais, ambiente);
    
                // page.off('request', logRequestCategoria);
                k++;
            }

        }

        if(req.body.entradas.novoOrgaoEstagio.chave){
            while  (a<req.body.entradas.novoOrgaoEstagio.casos.length) {

                await latestPage.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/admin/orgao-estagio/cadastrar`);
                await page.waitForTimeout(2000);
                // await page.click('div.col-md-12 > a');
                //limpa o formulário
                // await latestPage.evaluate(()=>{ return document.querySelector('a.btn.red').click();});
                //Injeta pesquisa categoria
                await NovoOrgaoEstagio(req.body.entradas.novoOrgaoEstagio.casos[a],latestPage,a,casosFinais, ambiente);
    
                // page.off('request', logRequestCategoria);
                a++;
            }
        }

        if(req.body.entradas.pesquisaOrgao.chave){
            while  (um<req.body.entradas.pesquisaOrgao.casos.length) {

                await latestPage.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/admin/orgao-estagio`);
                await page.waitForTimeout(2000);
                // await page.click('div.col-md-12 > a');
                //limpa o formulário
                // await latestPage.evaluate(()=>{ return document.querySelector('a.btn.red').click();});
                //Injeta pesquisa categoria
                await PesquisaOrgao(req.body.entradas.pesquisaOrgao.casos[um],latestPage,um,casosFinais, ambiente);
    
                // page.off('request', logRequestCategoria);
                um++;
            }
        }

        if(req.body.entradas.pesquisaOrgaoEstagio.chave){
            while  (dois<req.body.entradas.pesquisaOrgaoEstagio.casos.length) {

                await latestPage.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/admin/orgao-estagio`);
                await page.waitForTimeout(2000);
                // await page.click('div.col-md-12 > a');
                //limpa o formulário
                // await latestPage.evaluate(()=>{ return document.querySelector('a.btn.red').click();});
                //Injeta pesquisa categoria
                await PesquisaOrgaoEstagio(req.body.entradas.pesquisaOrgaoEstagio.casos[dois],latestPage,dois,casosFinais, ambiente);
    
                // page.off('request', logRequestCategoria);
                dois++;
            }
        }
        if(req.body.entradas.recursoHumano.chave){
            while  (tres<req.body.recursoHumano.casos.length) {

                await latestPage.goto(`http://${ambiente}.valeuniversidade.ms.gov.br/admin/recurso-humano`);
                await page.waitForTimeout(2000);
                // await page.click('div.col-md-12 > a');
                //limpa o formulário
                // await latestPage.evaluate(()=>{ return document.querySelector('a.btn.red').click();});
                //Injeta pesquisa categoria
                await RecursoHumano(req.body.entradas.recursoHumano.casos[tres],latestPage,tres,casosFinais, ambiente);
    
                // page.off('request', logRequestCategoria);
                tres++;
            }
        }
     
        console.log(casosFinais);

        res.json({result:'success', data:casosFinais});

    } catch (error) {
        console.log(error);

        return res.json({result:'fail', data:casosFinais});

    }

});


// CRUD de regras do sistema
app.post("/regra", async (req, res) => {
    try {
        console.log(req.body.regra)

             const regras = await Regra.create(req.body.regra);
            return res.json(regras);
    
       
        
    } catch (error) {
    
        console.log(err);
         return res.json({ result: "error", message: err });
    }
});

app.get("/regra/:sistema/:funcionalidade", async (req, res) => {
    try {
        await Regra.find({ 'sistema': req.params.sistema, 'funcionalidade':req.params.funcionalidade}, function (err, docs) {
            if(!err){
            
                return res.json(docs);
    
            }else{
    
                return console.log(err);
            }
        });       
        
    } catch (error) {
        console.log(error);
        res.json({"error":error})
        
        
    }
     
});

app.put("/regra/:id", async (req, res) => {
    try{
        const r = await Regra.findByIdAndUpdate(req.params.id, req.body,{new:true});
        return res.json(r);
    }catch(error){
        return res.json(error);
    }
});

app.delete("/regra/:id", async (req, res) => {
    try {
        await Regra.findByIdAndDelete(req.params.id);

        res.json({message:'successes'})
        
    } catch (error) {
        res.json(error)        
    }
});

app.listen(process.env.PORT);

