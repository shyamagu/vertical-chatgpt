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

    //return response['choices'][0]['message']['content'],
    //response['usage']['prompt_tokens'], 
    //response['usage']['completion_tokens'], 
    //response['usage']['total_tokens']


    const answer = chatCompletion.data.choices[0].message.content;
    const input_token = chatCompletion.data.usage.prompt_tokens;
    const output_token = chatCompletion.data.usage.completion_tokens;
    const total_token = chatCompletion.data.usage.total_tokens;


    context.res = {
      status: 200 /* Defaults to 200 */,
      body: { message: answer,input_token:input_token,output_token:output_token,total_token:total_token },
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
