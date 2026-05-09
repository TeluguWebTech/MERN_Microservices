const {Kafka} = require("kafkajs")

const kafka = new Kafka({
    clientId: "order-service",
    brokers:["127.0.0.1:9092"]
})

module.exports = kafka