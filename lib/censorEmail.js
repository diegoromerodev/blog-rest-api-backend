module.exports = (user) => {
  console.log(user);
  // CENSOR EMAILS FOR PRIVACY
  const emailSplit = user.email.split("@");
  let username = emailSplit[0].split("");
  username.splice(1, 6, ["..."]);
  username = username.join("");
  user.email = username + "@" + emailSplit[1];
  return user;
};
