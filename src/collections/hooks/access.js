const allRoles = ["admin", "editor"];
const deletRoles = ["admin"];
export const checkCreateAccess = (user) => {
  if (allRoles.includes(user)) {
    return true;
  }
  return false;
};

export const checkDeleteAccess = (user) => {
  if (deletRoles.includes(user)) {
    return true;
  }
  return false;
};
