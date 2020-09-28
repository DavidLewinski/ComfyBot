const storage = require('storage-to-json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		name: 'rpsleaderboards',
		description: 'Find out your ranking!',
		category: 'miscellaneous',
		aliases: ['rpsl'],
	},
	run: async (bot, message, args) => {
		const leaderboards = new storage(`rpsLeaderboards`);

		const embed = new MessageEmbed()
			.setTitle('Leaderboards of Rock, Paper, Scissors!')
			.setColor('GREEN')
			.setFooter(
				`© ${message.guild.me.displayName} | Developed By DistroByte`,
				bot.user.displayAvatarURL()
			);

		leaderboards.each(function (value, key) {
			let user = bot.users.cache.get(key);
			embed.addField(
				`${user.username}`,
				`Won | Drawn | Lost 	\`${value}\``,
				true
			);
		});

		message.channel.send(embed);
	},
};
