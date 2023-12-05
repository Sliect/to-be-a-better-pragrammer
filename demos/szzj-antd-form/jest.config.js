module.exports = {
  setupFiles: ['./setup.js'],
  snapshotSerializers: [require.resolve('enzyme-to-json/serializer')],
  extraGlobals: [],
};
