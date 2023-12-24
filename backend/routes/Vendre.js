const express = require("express");
const objet = require('../models/Objet');
const {testObjetStatus}= require('../middleware/verifyObjets');
const Vendrerouter = express.Router();

Vendrerouter.post('/',testObjetStatus,(req,res)=>{
    return res.status(201).json({
        message:"mriguel",
        ids:req.body.ids
    })
});

Vendrerouter.put("/achats",testObjetStatus,(req,res)=>{
    /*
        const idsToUpdate = req.body.ids;

  try {
    const promises = idsToUpdate.map(async (id) => {
      const testResult = await testObjetStatus(id);

      // L'objet est disponible à la vente
      const objet = await Objet.findById(id);
      objet.vendu = true;
      await objet.save();

      // Envoyez un e-mail au fondateur de l'objet
      await sendEmail(objet.useremail, 'Objet vendu', `Votre objet ${objet.name} a été vendu.`);

      // Envoyez un e-mail à l'acheteur
      await sendEmail('email_acheteur@example.com', 'Achat réussi', `Vous avez acheté ${objet.name}.`);

      // Créez une "livraison" ici si nécessaire

      return { message: `Objet ${objet.name} vendu avec succès.` };
    });

    const results = await Promise.all(promises);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour des objets.' });
  }
});

async function sendEmail(to, subject, text) {
  // (Le reste du code pour l'envoi d'e-mails reste inchangé)
}
    */
})


module.exports= Vendrerouter;
