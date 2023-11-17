const { Configuration, OpenAIApi } = require("openai");
const config = require("../config/configAdapter").config;

// Open AI Setup
const configuration = new Configuration({
  organization: config.get("openai.orgKey"),
  apiKey: config.get("openai.apiKey"),
});
const openai = new OpenAIApi(configuration);

function generateArticle(user_input) {
  return openai
    .createCompletion({
      model: "text-davinci-003",
      prompt:
        "Write a 500 word article about how to be intentional with " +
        user_input,
      max_tokens: 4000,
    })
    .then((response) => response.data.choices[0].text.trim());
}

module.exports = { generateArticle };
