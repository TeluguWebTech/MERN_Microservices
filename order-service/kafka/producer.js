const kafka = require("./client")

const producer = kafka.producer();

const connectProducer = async()=>{
    await producer.connect();
    console.log("kafka producer connected")
}

const publishOrderEvent = async(orderData)=>{
    await producer.send({
        topic: "order-created",
        messages: [
            {value: JSON.stringify(orderData)}
        ]
    })
    console.log("Order event published")
}

module.exports = {
    connectProducer,
    publishOrderEvent
}