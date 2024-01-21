import * as dotenv from 'dotenv';

dotenv.config();

export default () => ({
    port: process.env.APP_PORT || 3000,
    database: {
        type: process.env.DB_TYPE || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'postgres',
    },
    rabbitmq: {
        url: process.env.CLOUDAMQP_URL || 'amqp://rabbitmq:5672',
        queue: process.env.RABBIT_MQ_QUEUE || 'test',
        exchange: process.env.RABBIT_MQ_EXCHANGE || 'exchange1',
        topic: process.env.RABBIT_MQ_EXCHANGE_TYPE || 'topic',
        routing_key: process.env.RABBIT_MQ_ROUTING_KEY || 'routing-key',
    },

})