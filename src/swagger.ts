import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "API documentation for Todo app",
    },
    components: {
      schemas: {
        Todo: {
          type: "object",
          properties: {
            _id: { type: "string" },
            title: { type: "string" },
            status: { type: "boolean" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/todos.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec, swaggerUi };
