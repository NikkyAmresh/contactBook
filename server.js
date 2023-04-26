const { app, connectToDatabase } = require("./app");

const PORT = process.env.PORT || 8080;
connectToDatabase(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});
