let appConfig = {};

appConfig.port = process.env.PORT || 3000;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
  /* uri: "mongodb+srv://vivek721:Gnxo4cAXhNC1DAom@todoapp-rzyr9.mongodb.net/test?retryWrites=true" */
  uri: "mongodb://vivek721:Gnxo4cAXhNC1DAom@todoapp-shard-00-00-rzyr9.mongodb.net:27017,todoapp-shard-00-01-rzyr9.mongodb.net:27017,todoapp-shard-00-02-rzyr9.mongodb.net:27017/test?ssl=true&replicaSet=todoapp-shard-0&authSource=admin&retryWrites=true"

};
appConfig.apiVersion = "/api/v1";

module.exports = {
  port: appConfig.port,
  allowedCorsOrigin: appConfig.allowedCorsOrigin,
  environment: appConfig.env,
  db: appConfig.db,
  apiVersion: appConfig.apiVersion
};