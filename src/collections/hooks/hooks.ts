import { FieldHook } from "payload/types";
export const setCreatedBy: FieldHook = ({ req, operation }) => {
  if (operation === "create") {
    return req.user?.id || null; // Set createdBy to the current user's ID
  }
};

export const setModifiedBy: FieldHook = ({ req }) => {
  return req.user?.id || null; // Set modifiedBy to the current user's ID
};

// Hook to set the `createdAt` field only during creation
export const setCreatedAt: FieldHook = ({ data, operation }) => {
  if (operation === "create") {
    return new Date(); // Set the current date during creation
  }
  return data?.createdAt; // Keep the existing value during updates
};

// Hook to set the `modifiedAt` field on each modification
export const setModifiedAt: FieldHook = ({ operation }) => {
  if (operation === "update") {
    return new Date(); // Set the current date during update
  }
};

export async function beforeChangeLanguageHook({
  data,
  req,
}: {
  data?: any;
  req?: any;
}): Promise<any> {
  // If the data or req is missing, return early to prevent errors
  if (!data || !req) {
    return data;
  }

  // If the languageId is not provided, fetch and assign the default language
  if (!data.languageId) {
    const defaultLanguageId = await fetchDefaultLanguage(req);

    // Assign the default language ID if found
    if (defaultLanguageId) {
      data.languageId = defaultLanguageId;
    }
  }

  return data.languageId;
}

export async function fetchDefaultLanguage(req) {
  try {
    const defaultLanguage = await req.payload.find({
      collection: "languages",
      where: {
        name: {
          equals: "English", // Adjust this as per your logic
        },
      },
      limit: 1,
    });

    if (defaultLanguage.docs.length > 0) {
      return defaultLanguage.docs[0].id;
    } else {
      return null; // Handle case if no language is found
    }
  } catch (error) {
    console.error("Error fetching default language:", error);
    return null; // Handle error scenario
  }
}
