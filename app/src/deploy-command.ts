import { REST, Routes, SlashCommandBuilder } from "discord.js";
import { CommandList } from "./commands/_CommandList";
import "dotenv/config.js";

const rest = new REST({ version: "10" }).setToken(
  process.env.BOT_TOKEN as string
);

const commands = CommandList.map((item) => item.data.toJSON());
(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID as string,
        process.env.GUILD_ID as string
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
