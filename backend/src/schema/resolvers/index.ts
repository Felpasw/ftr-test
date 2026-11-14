import { GraphQLScalarType, Kind } from "graphql";
import { userResolvers } from "./user.js";
import { categoryResolvers } from "./category.js";
import { transactionResolvers } from "./transaction.js";

const DateTime = new GraphQLScalarType({
  name: "DateTime",
  description: "ISO-8601 encoded UTC date string",
  serialize(value) {
    if (value instanceof Date) return value.toISOString();
    if (typeof value === "string") return new Date(value).toISOString();
    throw new Error("DateTime deve ser Date ou string ISO");
  },
  parseValue(value) {
    if (typeof value !== "string") throw new Error("DateTime deve ser string");
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) throw new Error("DateTime deve ser string");
    return new Date(ast.value);
  },
});

export const resolvers = {
  DateTime,
  Query: {
    ...userResolvers.Query,
    ...categoryResolvers.Query,
    ...transactionResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...transactionResolvers.Mutation,
  },
};
