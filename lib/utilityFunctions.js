const stringSimilarity = require("string-similarity");

export default class UtilityFunctions {
  static getUniqueProducts(products) {
    const uniqueProductsMap = new Map();
    const uniqueProducts = [];

    for (const product of products) {
      const productKey = `${product._id}_${product.selectedVariant.value}`;

      if (!uniqueProductsMap.has(productKey)) {
        uniqueProductsMap.set(productKey, true);
        uniqueProducts.push(product);
      }
    }

    return uniqueProducts;
  }

  static capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static getProductUrl({ _id, title, selectedVariant, variantKey }) {
    return `/products/${title.replace(/ /g, "-")}_${variantKey}=${
      selectedVariant.value
    }_id=${_id}`;
  }

  static getCategoryUrl(_id, name) {
    return `/categories/${name.replace(/ /g, "-")}_id=${_id}`;
  }

  static getFullTitle(title, selectedVariant) {
    if (selectedVariant.value) {
      return `${title} - ${selectedVariant.value}`;
    }
    return title;
  }

  static displayOutOfStock(stock) {
    return stock === 0 ? "Agotado" : "Cantidad máxima";
  }

  static handleSortChange(sortedProducts, sortValue) {
    let sorted = [...sortedProducts];

    switch (sortValue) {
      case "newest":
        sorted = [...sortedProducts].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        break;
      case "oldest":
        sorted = [...sortedProducts].sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
        break;
      case "lowest price":
        sorted = [...sortedProducts].sort((a, b) => {
          return a.selectedVariant.price - b.selectedVariant.price;
        });
        break;
      case "highest price":
        sorted = [...sortedProducts].sort((a, b) => {
          return b.selectedVariant.price - a.selectedVariant.price;
        });
        break;
      default:
        sorted = sortedProducts;
        break;
    }

    return sorted;
  }

  static handleSearchChange(products, searchTerm) {
    searchTerm = searchTerm.toLowerCase();

    function propertiesMatchScore(properties) {
      let propertyMatchScore = 0;
      if (Object.keys(properties).length === 0) return propertyMatchScore;
      for (const key in properties) {
        if (properties.hasOwnProperty(key)) {
          const propertyValue = properties[key]?.toLowerCase();
          const score = stringSimilarity.compareTwoStrings(
            propertyValue,
            searchTerm
          );
          if (propertyValue && score > propertyMatchScore) {
            propertyMatchScore = score;
          }
        }
      }
      return propertyMatchScore;
    }

    function variantsMatchScore(variantValues) {
      let variantMatchScore = 0;
      for (const variant of variantValues) {
        const variantValue = variant.value?.toLowerCase();
        const score = stringSimilarity.compareTwoStrings(
          variantValue,
          searchTerm
        );
        if (variantValue && score > variantMatchScore) {
          variantMatchScore = score;
        }
      }
      return variantMatchScore;
    }

    const allProducts = [...products].map((product) => {
      const { title, description } = product;
      const properties = product.properties || {};
      const variantValues = product.variantValues || [];

      const titleMatchScore = stringSimilarity.compareTwoStrings(
        title.toLowerCase(),
        searchTerm
      );

      const descriptionMatchScore = stringSimilarity.compareTwoStrings(
        description.toLowerCase(),
        searchTerm
      );

      const matchScore = Math.max(
        propertiesMatchScore(properties),
        variantsMatchScore(variantValues),
        titleMatchScore,
        descriptionMatchScore
      );

      product.matchScore = matchScore;

      // Check if the product should be included in the sorted list.
      const longSearchTerm = searchTerm.length >= 9;
      const mediumSearchTerm = searchTerm.length >= 3 && searchTerm.length <= 8;
      const shortSearchTerm = searchTerm.length <= 2;
      const highCeiling = matchScore > 0.3;
      const lowCeiling = matchScore > 0.1;
      const letterPresent = title.toLowerCase().includes(searchTerm);
      if (
        (highCeiling && longSearchTerm) ||
        (lowCeiling && mediumSearchTerm) ||
        (letterPresent && shortSearchTerm)
      ) {
        return product;
      } else {
        return null;
      }
    });
    const filteredProducts = allProducts.filter((product) => product !== null);
    return filteredProducts.sort((a, b) => b.matchScore - a.matchScore);
  }
}
