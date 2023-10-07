import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import UtilityFunctions from "@/lib/utilityFunctions";
import {
  constructLineItems,
  getproductsInfoAsString,
} from "pages/api/serverUtils";
import { deliveryInfo } from "@/lib/deliveryInfo";

function getDeliveryFee(city) {
  let deliveryFee = 12; // default delivery fee
  for(const area in deliveryInfo) {
    if (deliveryInfo[area].districts.includes(city)) {
      deliveryFee = deliveryInfo[area].price;
      break;
    }
  }
  return {
    quantity: 1,
    price_data: {
      currency: "pen",
      product_data: {
        name: "Costo de envío",
      },
      unit_amount: deliveryFee * 100,
    },
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST requests allowed" });
    return;
  }

  const { cartProducts, customerInfo } = req.body;
  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    idNumber,
    phoneNumber,
  } = customerInfo;

  if (!Array.isArray(cartProducts) || typeof customerInfo !== "object") {
    res.status(400).json({ message: "Invalid input data" });
    return;
  }

  for (const fieldName in customerInfo) {
    if (typeof customerInfo[fieldName] !== "string") {
      res.status(400).json({ message: "Invalid input data" });
      return;
    }
  }

  if (!UtilityFunctions.isValidEmail(email.trim())) {
    res.status(400).json({ message: "Invalid email address" });
    return;
  }

  try {
    const { line_items, errors } = await constructLineItems(cartProducts);
    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }
    line_items.push(getDeliveryFee(city));
    const productsInfoAsString = await getproductsInfoAsString(cartProducts);
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart?canceled=1`,
      metadata: {
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        phoneNumber,
        idNumber,
        productsInfoAsString,
      },
    });

    res.status(200).json({
      url: session.url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error: " + err });
  }
}
