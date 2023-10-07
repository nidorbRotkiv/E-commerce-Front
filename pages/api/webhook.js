import { mongooseConnect } from "ecommerce-shared/mongoDB/mongoose";
import { Order } from "ecommerce-shared/models/Order";
import { Product } from "ecommerce-shared/models/Product";
import { buffer } from "micro";
import Stripe from "stripe";
import { constructLineItemsFromString } from "./serverUtils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.WEBHOOK_SIGNING_SECRET;

export default async function handler(req, res) {
  await mongooseConnect();
  try {
    const sig = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );

    if (event.type === "checkout.session.completed") {
      const data = event.data.object;
      const {
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        phoneNumber,
        idNumber,
        productsInfoAsString,
      } = data.metadata;
      const customerInfo = {
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        phoneNumber,
        idNumber,
      };
      const lineItems = await constructLineItemsFromString(
        productsInfoAsString
      );

      if (data.payment_status === "paid") {
        await createOrderAndUpdateProductStock(lineItems, customerInfo);
        res.status(200).end();
      }
    } else {
      res.status(402).json({ message: `Unhandled event type ${event.type}` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }

  async function createOrderAndUpdateProductStock(lineItems, customerInfo) {
    try {
      await Order.create({ ...customerInfo, line_items: lineItems });

      for (const product of lineItems) {
        const databaseProduct = await Product.findById(
          product.price_data.product_data.id
        ).lean();

        let defaultSelectedVariant = databaseProduct.selectedVariant;

        const databaseSelectedVariant = databaseProduct.variantValues.find(
          (variant) =>
            variant.value ===
            product.price_data.product_data.selectedVariantValue
        );

        databaseSelectedVariant.stock -= product.quantity;

        if (databaseSelectedVariant.value === defaultSelectedVariant.value) {
          defaultSelectedVariant = databaseSelectedVariant;
        }

        await Product.findByIdAndUpdate(
          product.price_data.product_data.id,
          {
            $set: {
              variantValues: databaseProduct.variantValues,
              selectedVariant: defaultSelectedVariant,
            },
          },
          { new: true }
        );
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating order, contact support for help." });
      console.error(error);
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
