const mongoose = require('mongoose');


mongoose
    // .connect('mongodb+srv://florimond:11b5wpgeZT7A1Acm@cluster0.p85mau9.mongodb.net/r18jwt?retryWrites=true&w=majority')
    .connect('mongodb+srv://florimond:11b5wpgeZT7A1Acm@cluster0.p85mau9.mongodb.net/r18jwt')
    
    .then(()=>{
        console.log('CONNEXION DB OK !');
    })
    .catch((e)=>{
        console.log('CONNEXION KO !',e);
    })