const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Recipe API",
    description:
      "REST API for managing recipes and recipe categories using MongoDB."
  },

  host: "recipe-api-xrzw.onrender.com",

  schemes: ["https"],

  securityDefinitions: {
    githubOAuth: {
      type: "oauth2",
      authorizationUrl:
        "https://recipe-api-xrzw.onrender.com/auth/github",
      flow: "implicit",
      scopes: {}
    }
  },

  tags: [
    {
      name: "Recipes",
      description: "Recipe management endpoints"
    },
    {
      name: "Categories",
      description: "Recipe category management endpoints"
    },
    {
      name: "Authentication",
      description: "GitHub OAuth authentication endpoints"
    }
  ],

  definitions: {
    // your existing definitions...
  }
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);