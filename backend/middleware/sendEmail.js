const nodemailer = require('nodemailer');

const sendEmail=async(to,subject,text)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'islem24762048@gmail.com',
          pass: 'cryk iibw tofj qjzn',
        },
      });
    
      const mailOptions = {
        from: '2ndlife@commerce.com',
        to,
        subject,
        text,
      };
    
      try {
        await transporter.sendMail(mailOptions);
        console.log(`E-mail envoyé à ${to} avec succès.`);
      } catch (error) {
        console.error(`Erreur lors de l'envoi de l'e-mail à ${to}. Erreur : ${error.message}`);
        throw(error)
      }

}

module.exports={sendEmail};