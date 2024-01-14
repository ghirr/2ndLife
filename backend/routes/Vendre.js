const express = require("express");
const objet = require('../models/Objet');
const livraison=require('../models/Livraison')
const {testObjetStatus}= require('../middleware/verifyObjets');
const {sendEmail}=require('../middleware/sendEmail')
const Vendrerouter = express.Router();


Vendrerouter.post('/',testObjetStatus,(req,res)=>{
    return res.status(201).json({
        message:"mriguel",
        ids:req.body.ids
    })
});
//teste email
Vendrerouter.post('/mail',(req,res)=>{
    console.log(req.body.to);
    return sendEmail(req.body.to,req.body.subject,req.body.text);
})


Vendrerouter.post("/achats",(req,res)=>{
    
        const idsToUpdate = req.body.ids;
        console.log(req);

  try {
    console.log("houni payement");
      idsToUpdate.map(async (id) => {
      const objetAvendre = await objet.findById(id);
      objetAvendre.vendu = true;
      objetAvendre.costumer=req.body.user
      await objetAvendre.save();

      // Envoyez un e-mail au fondateur de l'objet
      await sendEmail(objetAvendre.useremail, 'Objet vendu', `Votre produit ${objetAvendre.name} a été vendu.`);
      if (req.body.livraison){
     // Créez une "livraison" ici 
      const Livraison = new livraison({
        Objectname: objetAvendre.name,
        ObjectUsername: objetAvendre.username,
        ObjectAdresse:objetAvendre.adresse,
        ObjectPhone:objetAvendre.userphone,
        costumername:req.body.user.name,
        costumerphone:req.body.user.phone,
        costumeradresse:req.body.user.adresse,
        adresse:req.body.user.adresse,
    });
    await Livraison.save();
    await sendEmail(req.body.user.email, `Achat d'un produit', Vous avez achetez ${objetAvendre.name} 
    de prix ${objetAvendre.price}  de l'apart de mr/ms ${objetAvendre.username} 
    la livaison sa prend max 72h
    en cas d'echoue veuillez le contacter sur ${objetAvendre.userphone} ou nous contacter  `);
}
else{
    await sendEmail(req.body.user.email, `Achat d'un produit', Vous avez achetez ${objetAvendre.name} 
    de prix ${objetAvendre.price}  de l'apart de mr/ms ${objetAvendre.username} 
    en cas d'echoue veuillez le contacter sur ${objetAvendre.userphone} ou nous contacter  `);
}
    }); return res.status(200).json( { message: 'succeed' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour des objets.' });
  }
});
Vendrerouter.get("/livraisons", async(req, res) => {
    try {
      const livraisons = await livraison.find({livreur: { $exists: false } });
      return res.status(200).json({
        livraison:livraisons
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des livraisons." });
    }
  });

  Vendrerouter.put("/livraisons/:id", async (req, res) => {
    try {
      const livraisons = await livraison.findById(req.params.id);
  
      if (!livraisons) {
        return res.status(404).json({ error: "Livraison not found" });
      }
      console.log(req.body.livreur);
      livraisons.livreur = req.body.livreur;
      console.log(livraisons);
      await livraisons.save();
  
      return res.status(200).json({
        message: "Livraison updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Une erreur s'est produite lors de la mise à jour de la livraison.",
      });
    }
  });
  Vendrerouter.get("/livraisons/:id", async(req, res) => {
    try {
      const livraisons = await livraison.find({livreur: req.params.id,
        terminer: { $exists: false } });
      return res.status(200).json({
        livraison:livraisons
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des livraisons." });
    }
  });
  Vendrerouter.put("/livraisons/terminer/:id", async (req, res) => {
    try {
      const livraisons = await livraison.findById(req.params.id);
  
      if (!livraisons) {
        return res.status(404).json({ error: "Livraison not found" });
      }
      console.log(req.body.livreur);
      livraisons.terminer = true;
      console.log(livraisons);
      await livraisons.save();
  
      return res.status(200).json({
        message: "Livraison updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Une erreur s'est produite lors de la mise à jour de la livraison.",
      });
    }
  });

module.exports= Vendrerouter;
