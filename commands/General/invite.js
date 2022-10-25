const Command = require("../../base/Command.js"),
  Discord = require("discord.js");

class Invite extends Command {

  constructor(client) {
    super(client, {
      name: "invite",
      description: "Shows Comfy's links!",
      usage: "(copy)",
      examples: ["{{p}}invite", "{{p}}invite copy"],
      dirname: __dirname,
      enabled: true,
      guildOnly: false,
      aliases: ["i", "add", "vote"],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      nsfw: false,
      ownerOnly: false,
      cooldown: 5000
    });
  }

  async run(message, args, data) {
    const inviteLink = this.client.config.inviteURL || "https://discord.com/oauth2/authorize?client_id=666393146351026176&permissions=8&scope=applications.commands%20bot";
    // const voteURL = this.client.config.voteURL || `https://discordbots.org/bot/${this.client.user.id}/vote`;
    const supportURL = this.client.config.supportURL || await this.client.functions.supportLink(this.client);

    if (args[0] && args[0] === "copy") {
      return message.success(inviteLink);
    }

    const embed = new Discord.MessageEmbed()
      .setAuthor("ComfyBot links")
      .setDescription(`Send \`${data.guild.prefix}invite copy\` to be able to copy the invite link!`)
      .addField("Invite ComfyBot", `[Invite](${inviteLink})`)
      // .addField(message.translate("general/invite:VOTE"), voteURL)
      .addField("Get Support", supportURL)
      .setColor(data.config.embed.color)
      .setFooter(data.config.embed.footer);

    message.channel.send(embed);
  }
}

module.exports = Invite;