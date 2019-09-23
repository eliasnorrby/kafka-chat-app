module.exports = {
  extends: ["@eliasnorrby/semantic-release-config"],
  // Override rules here
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/github",
    "@semantic-release/git",
  ],
};
