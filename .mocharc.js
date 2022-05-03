module.exports = {
  require: 'ts-node/register',
  extensions: ['ts'],
  spec: ['index.test.ts'],
  'watch-files': ['index.ts', 'index.test.ts']
};
