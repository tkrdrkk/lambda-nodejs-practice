const axios = require("axios");

exports.handler = async (event) => {
  console.log(event);

  const response = await axios.get("https://api.publicapis.org/entries");

  if (response && response.data) {
    console.log(response.data);
    return {
      status: 200,
      body: response.data,
    };
  } else {
    return {
      status: 500,
      body: JSON.stringify("failed."),
    };
  }
};
