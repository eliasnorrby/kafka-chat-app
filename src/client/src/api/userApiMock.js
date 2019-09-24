export function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16),
  );
}

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
