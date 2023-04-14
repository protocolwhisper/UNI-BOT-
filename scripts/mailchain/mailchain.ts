import { Mailchain } from "@mailchain/sdk";
import { load } from "ts-dotenv";
const env = load({
  RecoveryPhrasemailchain: String,
});

export async function sendMailChain(gas: number, balanceout: string) {
  const secretRecoveryPhrase = env.RecoveryPhrasemailchain;
  const mailchain = Mailchain.fromSecretRecoveryPhrase(secretRecoveryPhrase);
  const { data, error } = await mailchain.sendMail({
    from: `uni-bot@mailchain.com`, // sender address
    to: [`0xB5a962a4b79880796781BF0F347fFDcbA9d21c41@ethereum.mailchain.com`], // solve this by changing list of recipients (blockchain or mailchain addresses)
    subject: "Your's token have been swapped :)", // subject line
    content: {
      text: "Hello from UNI-BOT  , your swap has already been done",
      html:
        "<p>Hello  " +
        "0xbb56FbD7A2caC3e4C17936027102344127b7a112@ethereum.mailchain.com" +
        +"You have swapped 1 WETH" +
        "for " +
        balanceout +
        " with this gas price" +
        gas.toString() +
        "  👋</p>", // Fix this with analytical
    },
  });
  if (error) {
    // handle error
    console.warn("Mailchain error", error);
    return;
  }
  console.log(
    "Notification send through mailchain  " +
      data.sentMailDeliveryRequests[0].deliveryRequestId +
      "✉️"
  );
}
// handle success send mail result
