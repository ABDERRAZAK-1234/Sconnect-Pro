const router = require('find-my-way')();

router.get('/', async (req, res)=>{
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });

    res.end(JSON.stringify({
        message : 'Bienvenue dans le SportConnect'
    }));

});

router.get('/test', async (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({
        message: 'Route test fonctionne'
    }));
});


module.exports = router;