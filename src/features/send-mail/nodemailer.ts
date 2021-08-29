import NodeMailer from "nodemailer";

export interface INodeMailerData {
    from: string;
    to: string;
    subject: string;
    text: string;
}

export interface INodeMailerResponse {
  isOk: boolean;
  message: string;
}

export default function (emailData: INodeMailerData) {
  var remetente = NodeMailer.createTransport({
    // host: "smtp.gmail.com",
    service: "Gmail",
    port: "587",
    secure: false,
    auth: {
      user: "msom.info@gmail.com",
      pass: "ggmsom1985"
    }
  })

  // var emailASerEnviado = {
  //   from: "msom.info@gmail.com",
  //   to: "marlycarneiro41@gmail.com",
  //   subject: "Oi amor!",
  //   text: "Hi love!",
  // };

  return remetente.sendMail(emailData, function (error): INodeMailerResponse {
    if (error) {
      console.log(error);
      return { isOk: false, message: `Email não enviado` };
    } else {
      console.log(`Email enviado com sucesso\nFrom: ${emailData.from}\nTo: ${emailData.to}`);
      return { isOk: true, message: `Email enviado`};
    }
  });

}