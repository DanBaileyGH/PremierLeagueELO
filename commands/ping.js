module.exports = {
    name: 'ping',
    aliases: ["p"],
	description: 'Ping Pong',
	async execute() {
        return new Promise(resolve => {
            resolve({"response": "Pong"});
        })
    }
}