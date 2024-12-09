module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{json,png,ico,svg,html,gif,txt,css,js}'
	],
	swDest: 'build/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	navigateFallback: '/zap-app/index.html',
	runtimeCaching: [
		{
		  urlPattern: ({ url }) => url.pathname === '/zap-app/api/sightings',
		  handler: 'NetworkOnly',
		  method: 'POST',
		  options: {
			backgroundSync: {
			  name: 'apiQueue',
			  options: {
				maxRetentionTime: 24 * 60, // Retry for up to 24 hours (in minutes)
			  },
			},
		  },
		},
	  ],
};