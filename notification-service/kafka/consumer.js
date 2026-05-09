const kafka = require("./client");
const {sendOrderEmail}= require("../controllers/notificationController")


const consumer = kafka.consumer({
    groupId: "notification-group"
});

const connectConsumer = async () => {

    try {

        await consumer.connect();

        console.log("Notification consumer connected");

        await consumer.subscribe({
            topic: "order-created",
            fromBeginning: true
        });

        await consumer.run({

            eachMessage: async ({ topic, partition, message }) => {

                try {

                    const order = JSON.parse(
                        message.value.toString()
                    );

                    console.log("================================");

                    console.log("New Order Received");

                    console.log(order);

                    console.log("Sending Email Notification...");

                    await sendOrderEmail(order);

                } catch (error) {

                    console.log("Message Processing Error :", error);

                }

            }

        });

    } catch (error) {

        console.log("Consumer Connection Error :", error);

    }

};

module.exports = connectConsumer;