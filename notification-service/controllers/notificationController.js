const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",

    port: 587,

    secure: false,

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});


exports.sendOrderEmail = async (order) => {

    try {
        const totalAmount =
            order.productPrice * order.quantity;


        const mailOptions = {

            from: process.env.EMAIL_USER,

            to: order.email,

            subject: "Order Placed Successfully",

            html: `

                <div style="font-family: Arial; padding:20px;">

                    <h2 style="color:green;">
                        Order Confirmation
                    </h2>

                    <p>
                        Your order has been placed successfully.
                    </p>

                    <hr>

                    <h3>Order Details</h3>

                    <p>
                        <b>Product:</b>
                        ${order.productName}
                    </p>

                    <p>
                        <b>Price:</b>
                        ₹${order.productPrice}
                    </p>

                    <p>
                        <b>Quantity:</b>
                        ${order.quantity}
                    </p>

                    <p>
                        <b>Total Amount:</b>
                        ₹${totalAmount}
                    </p>

                    <p>
                        <b>Status:</b>
                        ${order.orderStatus}
                    </p>

                    <hr>

                    <p>
                        Thank you for shopping with us.
                    </p>

                </div>

            `
        };

        await transporter.sendMail(mailOptions);

        console.log("Order Email Sent Successfully");

    } catch (error) {

        console.log("Email Sending Failed :", error);

    }

};