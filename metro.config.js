// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Enable Hermes
config.resolver.sourceExts = ['jsx', 'js', 'ts', 'tsx', 'json'];
config.transformer.enableHermes = true;

module.exports = config; 