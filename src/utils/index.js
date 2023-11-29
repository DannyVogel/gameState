export const sliceEmail = (email) => {
  let user = email.slice(0, email.indexOf("@"));
  if (user == "kelevrav") {
    user = user.slice(0, -1);
  }
  return user.charAt(0).toUpperCase() + user.slice(1);
};
