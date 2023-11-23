const express = require("express");
const multer = require("multer");
const objet = require('../models/Objet');
const Objetrouter = express.Router();

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
      return;
    }
    cb(null, "backend/images/objets");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "-objet-" + "." + extension;
    cb(null, imgName);
  },
});

// Add objet
Objetrouter.post(
  "/",
  multer({ storage: storage }).single("image"),
  async (req, res) => {
    console.log(req.body);
    let url = req.protocol + "://" + req.get("host");
    const Objet = new objet({
        name: req.body.name,
        categorie: req.body.categorie,
        price: req.body.price,
        description: req.body.description,
        username:req.body.username,
        userphone:req.body.userphone,
        adresse:req.body.adresse,
        image: url + "/images/objets/" + req.file?.filename,
    });

    console.log(Objet);
    Objet.save()
      .then((Objet) => {
        res.status(200).json({ message: "Objet added" });
        return;
      })
      .catch((error) => {
        res.status(500).json({ error: error });
        return;
      });
  }
);
//   trait logique get all objets
Objetrouter.get("/", (req, res) => {
    objet.find().populate().then((findedObject) => {
    res.status(200).json({
        objets: findedObject,
      
    });
    return;
  });
});
//   trait logique delete objet
Objetrouter.delete("/:id", (req, res) => {
  console.log("here into delete", req.params.id);
  objet.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      message: "objet deleted",
    });
    return;
  });
});
//   trait logique get objet by Id
Objetrouter.get("/:id", (req, res) => {
  console.log("here into get objet by id", req.params.id);
  try{
  objet.findOne({ _id: req.params.id }).then((data) => {
    res.status(200).json({
      objet: data,
    });
    return;
  });}catch (error) {
    console.error(error);
    res.status(500).json({
        message: "Something went wrong",
    });
    return;
}
});
//trait update objet

Objetrouter.put("/:id", multer({ storage: storage }).single("image"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const updatedObjet = {
    name: req.body.name,
    categorie: req.body.categorie,
    price: req.body.price,
    description: req.body.description,
    username:req.body.username,
    userphone:req.body.userphone,
    adresse:req.body.adresse,
    image: url + "/images/objets/" + req.file.filename,
  };

  objet.findOneAndUpdate(
    { _id: req.params.id },
    updatedObjet,
    { new: true }
  )
    .then((objet) => {
      if (objet) {
        res.status(200).json({
          message: "objet updated successfully",
          objet: objet,
        });
        return;
      } else {
        res.status(404).json({
          message: "objet not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
      return;
    });
});



module.exports = Objetrouter;
