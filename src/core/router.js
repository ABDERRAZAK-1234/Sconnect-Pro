const router = require('find-my-way')();

const facilityController = require("../controllers/facilityController");
const familleController = require("../controllers/familleController");
const membreController = require("../controllers/memberController");
const associationController = require("../controllers/associationController");
const activiteController = require("../controllers/activiteController");
const inscriptionController = require("../controllers/inscriptionController");

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

// routes facility's
router.get("/facilities", facilityController.getFacilities);

router.get("/facilities/:id", facilityController.getFacilityById);

router.post("/facilities", facilityController.createFacility);

router.put("/facilities/:id", facilityController.updateFacility);

router.delete("/facilities/:id", facilityController.deleteFacility);

// routes famille

router.get("/familles", familleController.getFamilles);

router.get("/familles/:id", familleController.getFamilleById);

router.post("/familles", familleController.createFamille);

router.put("/familles/:id", familleController.updateFamille);

router.delete("/familles/:id", familleController.deleteFamille);

// routes member's

router.get("/membres", membreController.getMembres);

router.get("/membres/:id", membreController.getMembreById);

router.post("/membres", membreController.createMembre);

router.put("/membres/:id", membreController.updateMembre);

router.delete("/membres/:id", membreController.deleteMembre);

// routes association

router.get("/associations", associationController.getAssociations);

router.get("/associations/:id", associationController.getAssociationById);

router.post("/associations", associationController.createAssociation);

router.put("/associations/:id", associationController.updateAssociation);

router.delete("/associations/:id", associationController.deleteAssociation);

// router activite's

router.get("/activites", activiteController.getActivites);

router.get("/activites/:id", activiteController.getActiviteById);

router.post("/activites", activiteController.createActivite);

router.put("/activites/:id", activiteController.updateActivite);

router.delete("/activites/:id", activiteController.deleteActivite);

// routes inscription

router.get("/inscriptions", inscriptionController.getInscriptions);

router.get("/inscriptions/:id", inscriptionController.getInscriptionById);

router.post("/inscriptions", inscriptionController.createInscription);

router.put("/inscriptions/:id", inscriptionController.updateInscription);

router.delete("/inscriptions/:id", inscriptionController.deleteInscription);




module.exports = router;