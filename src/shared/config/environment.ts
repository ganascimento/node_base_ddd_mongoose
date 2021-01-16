const environment = {
    port: process.env.PORT,
    security: {
        secret: process.env.TOKEN_SECRET as string,
        audience: process.env.TOKEN_AUDIENCE as string,
        issuer: process.env.TOKEN_ISSUER as string,
        expiration: process.env.TOKEN_EXPIRATION as string
    },
    database: {
        connectionString: process.env.CONNECTION_STRING as string
    }
};

export default environment;