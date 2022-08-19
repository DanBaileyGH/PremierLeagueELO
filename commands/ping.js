module.exports = {
    name: 'ping',
    aliases: ["p"],
	description: 'Ping Pong',
	async execute() {
        return("pong.");
    }
}