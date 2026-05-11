const {Kafka} = require("kafkajs")

const kafka = new Kafka({
    clientId:"notification-service",
    // brokers: ["127.0.0.1:9092"]
    brokers:["kafka:9092"]
});

module.exports = kafka;