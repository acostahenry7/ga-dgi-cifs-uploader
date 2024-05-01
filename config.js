module.exports = {
  app: {
    port: process.env.PORT || 3001,
  },
  db: {
    postgres: {
      config: {
        host: "localhost",
        user: "postgres",
        password: "postgres",
        db: "ktmrecall",
        dialect: "postgres",
        pool: {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      },
    },
    hanadb: {
      config: {
        serverNode: "gaophana:30015",
        UID: "B1ADMIN",
        PWD: "MC6vsaGz",
        sslValidateCertificate: "false",
      },
    },
  },
  externalSources: {
    sapServer: "http://172.16.100.146:50001/b1s/v1",
  },
};
