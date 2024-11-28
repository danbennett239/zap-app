module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{json,png,ico,svg,html,gif,txt,css,js}'
	],
	swDest: 'build/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};