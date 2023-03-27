const { Model } = require("objection");
const db = require("../config/database");
Model.knex(db);

class Users extends Model {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email", "password"],
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        email: { type: "string", minLength: 1, maxLength: 255 },
        password: { type: "string" },
      },
    };
  }
}

module.exports = Users;
