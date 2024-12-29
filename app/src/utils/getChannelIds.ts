export const getChannelIds = async (serverId: string, client: any) => {
  // Fetch the guild by ID
  const guild = await client.guilds.fetch(serverId);
  console.log(guild);
  // Check if the guild exists
  if (!guild) {
    throw new Error("Guild not found");
  }

  // Get all channels in the guild
  const channels = await guild.channels.fetch();

  // Map to extract channel IDs
  const channelIds = channels.map((channel: any) => channel.id);
  console.log(channelIds);

  return channelIds;
};
