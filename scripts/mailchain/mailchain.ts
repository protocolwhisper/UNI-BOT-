import { Mailchain } from "@mailchain/sdk";

const secretRecoveryPhrase =
  "meat leg thrive disease sibling seek saddle visa secret cement lawn napkin tuition crucial room boss unlock stuff gain repair empty nominee fit perfect"; // 25 word mnemonicPhrase

const mailchain = Mailchain.fromSecretRecoveryPhrase(secretRecoveryPhrase);

export async function sendMailChain(
  gas: string,
  tokenin: string,
  tokenout: string
) {
  const secretRecoveryPhrase =
    "meat leg thrive disease sibling seek saddle visa secret cement lawn napkin tuition crucial room boss unlock stuff gain repair empty nominee fit perfect"; // 25 word mnemonicPhrase

  const mailchain = Mailchain.fromSecretRecoveryPhrase(secretRecoveryPhrase);
  const { data, error } = await mailchain.sendMail({
    from: `uni-bot@mailchain.com`, // sender address
    to: [`0xB5a962a4b79880796781BF0F347fFDcbA9d21c41@ethereum.mailchain.com`], // list of recipients (blockchain or mailchain addresses)
    subject: "Tokens Swapped", // subject line
    content: {
      text:
        "Hello from UNI-BOT  , your swap has already been done for" +
        tokenin +
        "to" +
        tokenout +
        "with a spended gas of" +
        gas, // plain text body
      html:
        "<p>Hello" +
        "0xbb56FbD7A2caC3e4C17936027102344127b7a112@ethereum.mailchain.com" +
        "  👋</p>", // Fix this with analytical
    },
  });
  if (error) {
    // handle error
    console.warn("Mailchain error", error);
    return;
  }
  console.log(data);
}
// handle success send mail result
