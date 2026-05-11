const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "notification-service",
    brokers: ["kafka:9092"],
    retry: {
        initialRetryTime: 300,
        retries: 10
    }
});

module.exports = kafka;