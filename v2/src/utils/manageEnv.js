import dotenv from "dotenv";
dotenv.config();
const setPort = (environment) => {
  if (environment === "development") {
    return process.env.DEV_PORT || 5000;
  } else if (environment === "test") {
    return process.env.TEST_PORT || 5001;
  } else {
    return process.env.PORT || 5002;
  }
};

export default setPort;
