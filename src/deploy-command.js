const { REST, Routes, SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("The input to echo back")
        .setRequired(true)
    )
    .toJSON(),
  new SlashCommandBuilder()
    .setName("export")
    .setDescription("export current pins to pinecone db as embeddings")
    .toJSON(),
  new SlashCommandBuilder()
    .setName("delete")
    .setDescription("deletes the embeddings")
    .toJSON(),
  new SlashCommandBuilder()
    .setName("ask")
    .setDescription("Replies to your questions")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("query to give to AI")
        .setRequired(true)
    )
    .toJSON(),
  new SlashCommandBuilder()
    .setName("chat-with-pin")
    .setDescription("Chat with your pins")
    .addStringOption((option) =>
      option
        .setName("chat")
        .setDescription("query to give to AI")
        .setRequired(true)
    )
    .toJSON(),
];

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: commands,
      }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
