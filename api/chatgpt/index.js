const { Configuration, OpenAIApi } = require("azure-openai");

module.exports = async function (context, req) {
  try {
    const endpoint = req.body.endpoint;
    const modelName = req.body.modelName;
    const apiKey = req.body.apiKey;
    const chats = req.body.chats;

    this.openAiApi = new OpenAIApi(
      new Configuration({
        apiKey: this.apiKey,
        // add azure info into configuration
        azure: {
          apiKey: apiKey,
          endpoint: endpoint,
          // deploymentName is optional, if you donot set it, you need to set it in the request parameter
          deploymentName: modelName,
        },
      })
    );

    const chatCompletion = await openAiApi.createChatCompletion({
      //    model: "gpt-3.5-turbo",
      messages: chats,
      temperature: 0.0,
    });

    const answer = chatCompletion.data.choices[0].message.content;

    context.res = {
      status: 200 /* Defaults to 200 */,
      body: { message: answer },
      headers: {
        "Content-Type": "application/json",
      },
    };

  } catch (error) {
    context.res = {
      status: 500 /* Defaults to 200 */,
      body: { message: error.message },
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};
