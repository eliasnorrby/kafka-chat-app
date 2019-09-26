const uuidv4 = require("uuid/v4");

const avatarUrl = name =>
  `https://react.semantic-ui.com/images/avatar/small/${name.toLowerCase()}.jpg`;

export const randomAvatar = () =>
  avatarUrl(namelist[Math.floor(Math.random() * namelist.length)]);

export const newUser = name => {
  return {
    name,
    avatar: randomAvatar(),
    id: uuidv4(),
  };
};

const namelist = ["Joe", "Jenny", "Elliot", "Matt"];
export const userlist = namelist.map(name => {
  return {
    name,
    avatar: avatarUrl(name),
    id: uuidv4(),
  };
});
