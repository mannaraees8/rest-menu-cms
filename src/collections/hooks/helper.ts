export const saniTizeText = (title) => {
  // Convert title to lowercase, replace spaces with hyphens, and remove special characters
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .trim()
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
};

export async function fetchLanguageById(languageId, payload) {
  try {
    const languageData = await payload.find({
      collection: "languages",
      where: {
        id: {
          equals: languageId,
        },
      },
    });

    return languageData?.docs[0]?.code; // returns the language code if found
  } catch (error) {
    console.error("Error fetching language:", error);
    return null; // Returns null if there's an error fetching the language
  }
}

export function convertToNavProducts(data, rootMenu) {
  const navProducts = [
    {
      label: rootMenu,
      categories: [],
    },
  ];

  const categoryMap = {};

  // Iterate over each product
  data.docs.forEach((product) => {
    const category = product?.subCategoryId?.categoryId;
    const subCategory = product?.subCategoryId;

    // Check if the category exists in the categoryMap
    if (!categoryMap[category?.url]) {
      // Initialize the category
      categoryMap[category?.url] = {
        title: category?.title,
        url: category?.url,
        subcategories: [],
      };
      // Push the category to navProducts
      navProducts[0]?.categories.push(categoryMap[category?.url]);
    }

    // Find the subcategory inside the current category
    let subCategoryEntry = categoryMap[category?.url].subcategories?.find(
      (sub) => sub?.url === subCategory?.url
    );

    // If the subcategory doesn't exist, initialize it
    if (!subCategoryEntry) {
      subCategoryEntry = {
        title: subCategory?.title,
        url: subCategory?.url,
        products: [],
      };
      // Push the new subcategory to the category
      categoryMap[category?.url].subcategories?.push(subCategoryEntry);
    }

    // Add the product to the corresponding subcategory
    subCategoryEntry?.products.push({
      title: product?.title,
      url: product?.url,
      image: product?.image,
    });
  });

  return navProducts;
}

export function convertToNavAllProducts(data) {
  const navProducts = [
    {
      categories: [],
    },
  ];

  const categoryMap = {};

  // Iterate over each product
  data.docs.forEach((product) => {
    const category = product.subCategoryId.categoryId;
    const subCategory = product.subCategoryId;

    // Check if the category exists in the categoryMap
    if (!categoryMap[category.url]) {
      // Initialize the category
      categoryMap[category.url] = {
        title: category.title,
        url: category.url,
        image: category.image,
        root: product.root,
        subcategories: [],
      };
      // Push the category to navProducts
      navProducts[0].categories.push(categoryMap[category.url]);
    }

    // Find the subcategory inside the current category
    let subCategoryEntry = categoryMap[category.url].subcategories.find(
      (sub) => sub.url === subCategory.url
    );

    // If the subcategory doesn't exist, initialize it
    if (!subCategoryEntry) {
      subCategoryEntry = {
        title: subCategory.title,
        url: subCategory.url,
        image: subCategory.image,
        products: [],
      };
      // Push the new subcategory to the category
      categoryMap[category.url].subcategories.push(subCategoryEntry);
    }

    // Add the product to the corresponding subcategory
    subCategoryEntry.products.push({
      title: product.title,
      url: product.url,
      image: product.image,
    });
  });

  return navProducts;
}
export function organizeProductData(data) {
  const organizedData = [];

  const rootMap = {};

  data.docs.forEach((product) => {
    const { root, title, url } = product;
    const { subCategoryId } = root;
    const { categoryId } = subCategoryId;

    // Check if root exists in rootMap
    if (!rootMap[root.title]) {
      rootMap[root.title] = {
        title: root.title,
        categories: [],
      };
      organizedData.push(rootMap[root.title]);
    }

    // Check if category exists under root
    let category = rootMap[root.title].categories.find(
      (cat) => cat.title === categoryId.title
    );

    if (!category) {
      category = {
        title: categoryId.title,
        url: categoryId.url,
        image: categoryId.image,
        subcategories: [],
      };
      rootMap[root.title].categories.push(category);
    }

    // Check if subcategory exists under category
    let subcategory = category.subcategories.find(
      (sub) => sub.title === subCategoryId.title
    );

    if (!subcategory) {
      subcategory = {
        title: subCategoryId.title,
        url: subCategoryId.url,
        products: [],
      };
      category.subcategories.push(subcategory);
    }

    // Add product to the subcategory
    subcategory.products.push({
      title: title,
      url: url,
    });
  });

  return organizedData;
}
