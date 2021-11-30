module.exports = {
	apps: [{
		name: "webhook_server",
		script: "./server.js",
		env: {
			WEBHOOK_SECRET: "{github_webhook_secret_here}"
		}
	}]
};
