const venom = require("venom-bot");

venom
  .create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  let idMsg;
  client.onMessage((message) => {
    if (message.body === "Hi" && message.isGroupMsg === false) {
      // Send Messages with Buttons Reply
      const buttons = [
        {
          buttonId: "recusar",
          buttonText: { displayText: "Recusar" },
          type: 1,
        },
        {
          buttonId: "aprovar",
          buttonText: { displayText: "Aprovar" },
          type: 1,
        },
      ];
      setTimeout(async () => {
        client
          .sendButtons(
            message.from,
            `Pagamento pendente ${Math.floor(
              Math.random() * (100000 - 10000) + 10000
            )}`,
            buttons,
            `Fornecedor: Google
Valor: R$ 30.000,00
Vencimento: 10/11/2021
Descrição: Workspace`
          )
          .then((result) => {
            idMsg = result.to._serialized;
            // console.log("Result: ", result); //return object success
          })
          .catch((erro) => {
            console.error("Error when sending: ", erro); //return object error
          });
      }, 30 * 1000);
    }

    if (message.body === "Aprovar" && message.isGroupMsg === false) {
      setTimeout(async () => {
        client
          .reply(message.from, "Aprovação efetuada com sucesso!", idMsg)
          .then((result) => {
            console.log("Result: ", result); //return object success
          })
          .catch((erro) => {
            console.error("Error when sending: ", erro); //return object error
          });
      }, 8 * 1000);

      setTimeout(async () => {
        client
          .reply(message.from, "Pagamento efetuado com sucesso!", idMsg)
          .then((result) => {
            console.log("Result: ", result); //return object success
          })
          .catch((erro) => {
            console.error("Error when sending: ", erro); //return object error
          });
      }, 15 * 1000);
    }
  });
}
