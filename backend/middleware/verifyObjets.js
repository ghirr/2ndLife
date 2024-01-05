const Objet = require('../models/Objet');

const testObjetStatus= async(req,res,next)=>{
    console.log(req.body);
    const objetsIds=req.body;
    const notFound=[];

    try{
        
         await Promise.all(objetsIds.map(async (id) => {
            const objet = await Objet.findById(id);
      
            if (!objet || objet.vendu) {
              notFound.push(id)
            }
          }));
      
          if(notFound.length>0){
            return res.status(200).json(
                {
                    message:"objet vendue ou supprimer",
                    objetnotfound:notFound
                }
            )
          }else{
            req.ids=objetsIds
            console.log(req.ids);
            next()
          }
    }catch(err){
        console.log(err);
        return res.status(400).json({
            message: "somthing went wrong"
        })
    }
 /* const objet = await Objet.findById(id);

  if (objet) {
    if (objet.vendu) {
      return { message: `Objet ${objet.name} déjà vendu.` };
    } else {
      return null; // L'objet est disponible à la vente
    }
  } else {
    return { message: `Objet introuvable.` };
  }*/
}

module.exports = { testObjetStatus };
