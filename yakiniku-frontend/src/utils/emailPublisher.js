const Mailjet = require("node-mailjet");

const MJ_APIKEY_PUBLIC = process.env.MJ_APIKEY_PUBLIC;
const MJ_APIKEY_PRIVATE = process.env.MJ_APIKEY_PRIVATE;
const MJ_SENDER_EMAIL = process.env.MJ_SENDER_EMAIL;
const MJ_SENDER_NAME = process.env.MJ_SENDER_NAME;

const mailjet = Mailjet.apiConnect(MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE, {
  config: {},
  options: {},
});

const sendEmail = (receiverEmail, redeemCode) => {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: MJ_SENDER_EMAIL,
          Name: MJ_SENDER_NAME,
        },
        To: [
          {
            Email: receiverEmail,
            Name: "Dear User",
          },
        ],
        Subject: "Receive your new NFT Badge on Block 3!",
        TextPart: `Congratulations! You've been entitled for a NFT Badge!Redeem Code : ${redeemCode.toString()}.Cheers, Block 3 | Yakiniku`,
        HTMLPart: `<h3>Congratulations! You've been entitled for a NFT Badge!</h3><p>Redeem Code : ${redeemCode.toString()}</p><br/><p>Cheers, <p><p>Block 3 | Yakiniku<p>`,
      },
    ],
  });

  return request
    .then((result) => {
      console.log(result.body);
      return "Email sent successfully";
    })
    .catch((err) => {
      console.log("Error sending email: ", err);
      throw new Error("Failed to send email");
    });
};

// export default sendEmail;
const sendEmails = (redeemCodes, receiverEmails) => {
  if (receiverEmails.length !== redeemCodes.length) {
    throw new Error("Number of emails and redeem codes do not match");
  }

  for (let i = 0; i < receiverEmails.length; i++) {
    const emails = receiverEmails[i];
    const redeemCode = redeemCodes[i];
    for (let j = 0; j < emails.length; j++) {
      const email = emails[j];
      sendEmail(email, redeemCode);
    }
  }
};

export default sendEmails;
