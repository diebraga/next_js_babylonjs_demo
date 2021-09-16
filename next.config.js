const withTM = require('next-transpile-modules')(['@babylonjs/core']); // As per comment.
const withPlugins = require('next-compose-plugins');

const nextConfig = {
    target: 'serverless',
    webpack: function (config) {
        /// below is not required for the problem described. Just for reference.(es6)
        config.module.rules.push({test: /\.yml$/, use: 'raw-loader'})
        return config
    }
}

module.exports = {
  reactStrictMode: true,
}
module.exports = withPlugins([withTM], nextConfig);
