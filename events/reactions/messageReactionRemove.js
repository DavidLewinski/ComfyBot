const Store = require('storage-to-json');
let emojiRoleStore = new Store('roleReactions')

module.exports = async (bot, reaction) => {
  let removeMemberRole = (emojiRoleMappings) => {
    if (emojiRoleMappings.hasOwnProperty(reaction.emoji.id)) {
      let role = reaction.message.guild.roles.cache.get(emojiRoleMappings[reaction.emoji.id]);
      let member = reaction.message.guild.members.cache.get(reaction.message.member.id);
      if (role && member) {
        member.roles.remove(role);
      }
    }
  }

  if (reaction.message.partial) {
    await reaction.message.fetch();
    let emojiRoleMappings = await emojiRoleStore.get(reaction.message.id);
    if (emojiRoleMappings) {
      bot.cachedMessageReactions.set(reaction.message.id, emojiRoleMappings);
      removeMemberRole(emojiRoleMappings);
    }
  } else {
    let emojiRoleMappings = bot.cachedMessageReactions.get(reaction.message.id);
    removeMemberRole(emojiRoleMappings);
  }
}