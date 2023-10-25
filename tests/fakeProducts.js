const fakeProducts = [];
const amountOfFakeProducts = 15;

function createFakeObjectId() {
  const timestamp = (new Date().getTime() / 1000 | 0).toString(16); // 4 bytes
  const machineIdentifier = Math.floor(Math.random() * 16777216).toString(16); // 3 bytes
  const processIdentifier = process.pid.toString(16).substring(0, 4); // 2 bytes
  const counter = Math.floor(Math.random() * 65536).toString(16); // 2 bytes

  return (
    timestamp +
    machineIdentifier +
    processIdentifier +
    counter
  ).padEnd(24, '0');
}


for (let i = 1; i <= amountOfFakeProducts; i++) {
  const timestamp = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
  const fakeProduct = {
    _id: createFakeObjectId()
    ,
    title: `Fake Product ${i}`,
    description: `Sample description for Fake Product ${i}`,
    category: createFakeObjectId(),
    featured: false,
    variantKey: "Color",
    variantValues: [
      {
        value: "Red",
        images: [`https://example.com/${i}/red.jpg`],
        price: i * i + i,
        stock: i,
      },
      {
        value: "Blue",
        images: [`https://example.com/${i}/red.jpg`],
        price: i * i,
        stock: i + i,
      },
    ],
    selectedVariant: {
      value: "Blue",
      images: [`https://example.com/${i}/red.jpg`],
      price: i * i,
      stock: i + i,
    },
    createdAt: timestamp,
    updatedAt: timestamp,
    properties: { brand: "Sample Brand", Size: `${i}ml` },
  };
  fakeProducts.push(fakeProduct);
}

export default fakeProducts;
