// backend/devDb.js
// Démarre une instance MongoDB en mémoire, pour test local uniquement.
// Usage : node devDb.js  (affiche l'URI puis reste actif)

const { MongoMemoryServer } = require('mongodb-memory-server');

(async () => {
  const mongod = await MongoMemoryServer.create({ instance: { port: 27117 } });
  const uri = mongod.getUri();
  console.log('DEV_MONGO_URI=' + uri);

  process.on('SIGINT', async () => {
    await mongod.stop();
    process.exit(0);
  });
})();
