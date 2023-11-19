require('dotenv').config();

module.exports = {

    backend_server: {
        port:process.env.backend_server,
        base_url:process.env.Backend_Server_Url
    },
    client_server:{
        base_url:process.env.Client_Server_Url
    },
    database: {
      dbURI: process.env.Mongodb
    },
    google: {
      clientId: process.env.Google_Id_Passport ,
      clientSecret: process.env.Googe_code_Passport
    },
    facebook:{
        clientId: process.env.Facebook_Id_Passport ,
        clientSecret: process.env.Facebook_code_Passport
    }
  
  }
  