const kafka = require("./client")

const producer = kafka.producer();

const connectProducer = async () => {

    let connected = false;

    while (!connected) {

        try {

            await producer.connect();

            console.log("kafka producer connected");

            connected = true;

        } catch (error) {

            console.log("Kafka not ready... retrying in 5 seconds");

            await new Promise((resolve) =>
                setTimeout(resolve, 5000)
            );
        }
    }
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