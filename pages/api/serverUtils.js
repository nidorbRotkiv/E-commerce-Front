import { mongooseConnect } from "ecommerce-shared/mongoDB/mongoose";
import { Product } from "ecommerce-shared/models/Product";
import UtilityFunctions from "@/lib/utilityFunctions";

function getQuantity(cartProducts, _id, selectedVariant) {
  return (
    cartProducts.filter(
      (p) => p._id === _id && p.selectedVariant.value === selectedVariant.value).length || 0
  );
}

export async function constructLineItems(cartProducts) {
  await mongooseConnect();
  const line_items = [];
  const errors = [];
  const uniqeProducts = UtilityFunctions.getUniqueProducts(cartProducts);
  for (const product of uniqeProducts) {
    const { _id, selectedVariant, title } = product;
    const getTitle = () => UtilityFunctions.getFullTitle(title, selectedVariant);
    const quantity = getQuantity(cartProducts, _id, selectedVariant);
    const databaseProduct = await Product.findById(_id).lean();
    if (!databaseProduct) {
      errors.push(
        `"${getTitle()}" is not found in the database. Remove it from the cart and try again.`
      );
      continue;
    }
    const databaseSelectedVariant = databaseProduct.variantValues.find(
      (variant) => variant.value === selectedVariant.value
    );
    if (selectedVariant.price !== databaseSelectedVariant.price) {
      errors.push(
        `The price of "${getTitle()}" is not updated, refresh the page and try again.`
      );
    }
    if (databaseSelectedVariant.stock < quantity) {
      errors.push(
        `Insufficient stock of "${getTitle()}". You can by a maximum of ${
          databaseSelectedVariant.stock
        }.`
      );
    }
    if (quantity > 0 && Number.isInteger(quantity)) {
      line_items.push({
        quantity,
        price_data: {
          currency: "pen",
          product_data: {
            name: getTitle(),
          },
          unit_amount: selectedVariant.price * 100,
        },
      });
    } else {
      errors.push(
        `Invalid quantity of "${getTitle()}". Please refresh the page and try again.`
      );
    }
  }
  return { line_items, errors };
}

export async function constructLineItemsFromString(productsInfoAsString) {
  await mongooseConnect();
  const line_items = [];
  const productInfoAsArray = productsInfoAsString.split(",");
  const numOfFields = 3;
  for (let i = 0; i < productInfoAsArray.length; i += numOfFields) {
    if (productInfoAsArray[i] === "") break;
    const productId = productInfoAsArray[i];
    const quantity = parseInt(productInfoAsArray[i + 1]);
    const selectedVariantValue = productInfoAsArray[i + 2];
    const product = await Product.findById(productId);
    const selectedVariant = product?.variantValues.find(
      (variant) => variant.value === selectedVariantValue
    );
    if (product) {
      line_items.push({
        quantity,
        price_data: {
          currency: "pen",
          product_data: {
            name: UtilityFunctions.getFullTitle(product.title, selectedVariant),
            id: product._id.toString(),
            selectedVariantValue: selectedVariantValue,
          },
          unit_amount: selectedVariant.price * 100,
        },
      });
    }
  }
  return line_items;
}

export function getproductsInfoAsString(cartProducts) {
  const uniqueProducts = UtilityFunctions.getUniqueProducts(cartProducts);
  let productsInfoAsString = "";
  for (const product of uniqueProducts) {
    const { _id, selectedVariant } = product;
    const quantity = getQuantity(cartProducts, _id, selectedVariant);
    productsInfoAsString += _id + "," + quantity + "," + selectedVariant.value + ",";
  }
  return productsInfoAsString;
}
