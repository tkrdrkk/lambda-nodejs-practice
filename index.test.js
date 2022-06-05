const { handler } = require("./index");

test("handler", async () => {
  const response = await handler();
  console.log(response.body.entries[0]);
  expect(response).toBeDefined();
});
