import {
  Client,
  Events,
  GatewayIntentBits,
  Interaction,
  MessageFlags,
} from "discord.js";
import "dotenv/config.js";
import { createEmbedAndPushToDB, deleteEmbedings } from "./utils/embed";
import { getAIResponse } from "./utils/askGemini";
import { chat } from "./utils/chat-with-pins";

(async () => {
  const Bot = new Client({ intents: [GatewayIntentBits.Guilds] });
  Bot.on("ready", (client) => console.log(`Logged in as ${client.user.tag}!`));
  Bot.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction.options);
    console.log(interaction.commandName);
    const messages = await interaction.channel?.messages.fetchPinned();

    if (interaction.commandName === "ping") {
      const name = interaction.options.getString("input");
      await interaction.reply(`Pong! ${name}`);

      messages?.forEach((pinnedMessage) => {
        console.log(`ID: ${pinnedMessage.id}`);
        console.log(`Content: ${pinnedMessage.content}`); // Might be empty for certain types of messages
        console.log(`Embeds: ${pinnedMessage.embeds.length}`); // Check for embeds
        console.log(`Attachments: ${pinnedMessage.attachments.size}`); // Check for attachments
        console.log(`Components: ${pinnedMessage.components.length}`);
      });
    }
    if (interaction.commandName === "export") {
      console.log("------------------------------");
      console.log("GUILD ID :", interaction.guildId);
      messages?.forEach((pinnedMessage) => {
        console.log(`ID: ${pinnedMessage.id}`);
        console.log(`Content: ${pinnedMessage.content}`); // Might be empty for certain types of messages
      });
      console.log("------------------------------");
      const allMessages = messages?.map((item) => ({
        id: item.id,
        content: item.content,
      }));

      try {
        await interaction.deferReply({ ephemeral: true });
        await createEmbedAndPushToDB(
          allMessages as { id: string; content: string }[],
          interaction.channelId,
          String(interaction.guildId)
        );
        await interaction.editReply(
          `Messages have been successfully exported!`
        );
      } catch (error) {
        console.error(error);
        await interaction.editReply(
          `An error occurred while exporting messages: ${error}`
        );
      }
    }

    if (interaction.commandName === "delete") {
      try {
        await interaction.deferReply({ ephemeral: true });
        await deleteEmbedings(
          interaction.channelId,
          String(interaction.guildId)
        );
        await interaction.reply("Deleted successfully");
      } catch (error) {
        await interaction.reply(`${error}`);
      }
    }

    if (interaction.commandName === "ask") {
      try {
        await interaction.deferReply();
        const query = interaction.options.getString("query");
        let response;
        response = await getAIResponse(query as string);
        await interaction.editReply(response as string);
      } catch (error) {
        await interaction.editReply(
          `An error occurred while exporting messages: ${error}`
        );
      }
    }

    if (interaction.commandName === "chat-with-pin") {
      try {
        await interaction.deferReply();
        const query = interaction.options.getString("chat");
        let response;
        response = await chat(
          query as string,
          interaction.guildId as string,
          interaction.channelId,
          messages
        );
        await interaction.editReply(response);
      } catch (error) {
        await interaction.editReply(
          `An error occurred while exporting messages: ${error}`
        );
      }
    }
  });

  // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // const prompt = "Explain how AI works";

  // const result = await model.generateContent(prompt);
  // console.log(result.response.text());

  await Bot.login(process.env.BOT_TOKEN);
})();
