const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Recipe API",
    description:
      "REST API for managing recipes and recipe categories using MongoDB."
  },

  host: "localhost:8080",

  schemes: ["http"],

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
    RecipeInput: {
      name: "Chicken Alfredo",
      description: "Creamy chicken pasta",
      category: "Dinner",
      ingredients: [
        "chicken",
        "pasta",
        "cream",
        "parmesan"
      ],
      instructions:
        "Cook the pasta, prepare the sauce, and combine all ingredients.",
      prepTime: 15,
      cookTime: 25,
      servings: 4,
      difficulty: "Easy"
    },

    RecipeResponse: {
      _id: "64c285a87db761333e18d1d5",
      name: "Chicken Alfredo",
      description: "Creamy chicken pasta",
      category: "Dinner",
      ingredients: [
        "chicken",
        "pasta",
        "cream",
        "parmesan"
      ],
      instructions:
        "Cook the pasta, prepare the sauce, and combine all ingredients.",
      prepTime: 15,
      cookTime: 25,
      servings: 4,
      difficulty: "Easy",
      createdBy: "github-user"
    },

    CategoryInput: {
      name: "Dinner",
      description: "Evening main dishes",
      color: "Blue"
    },

    CategoryResponse: {
      _id: "64c285a87db761333e18d1d6",
      name: "Dinner",
      description: "Evening main dishes",
      color: "Blue"
    },

    ValidationError: {
      error: "Validation failed.",
      details: [
        "A required field is missing."
      ]
    },

    ServerError: {
      error: "An unexpected server error occurred."
    }
  }
};

const outputFile = "./swagger-output.json";

/*
  Because server.js is the root file where the Express routes
  are mounted, Swagger Autogen should scan server.js.
*/
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);