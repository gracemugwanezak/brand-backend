import nodemailer from "nodemailer";

async function sendResponse() {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "gracemugwaneza018@gmail.com",
      pass: "ylse pxol avyr fagq",
    },
  });

  const info = await transporter.sendMail({
    from: "gracemugwaneza018@gmail.com",
    to: "jado.milton@gmail.com",
    subject: "sending email",
    text: "hello there",
  });

  console.log(info.messageId);
}
sendResponse();
