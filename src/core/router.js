const router = require('find-my-way')();

const facilityController = require("../controllers/facilityController");

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

// routes infra
router.get("/facilities", facilityController.getFacilities);

router.get("/facilities/:id", facilityController.getFacilityById);

router.post("/facilities", facilityController.createFacility);

router.put("/facilities/:id", facilityController.updateFacility);

router.delete("/facilities/:id", facilityController.deleteFacility);

module.exports = router;