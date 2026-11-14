export const typeDefs = /* GraphQL */ `
  scalar DateTime

  enum TransactionType {
    INCOME
    EXPENSE
  }

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: DateTime!
  }

  type AuthPayload {
    user: User!
  }

  type Category {
    id: ID!
    name: String!
    color: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Transaction {
    id: ID!
    title: String!
    amount: Float!
    type: TransactionType!
    date: DateTime!
    category: Category
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type TransactionSummary {
    income: Float!
    expense: Float!
    balance: Float!
  }

  input SignUpInput {
    name: String!
    email: String!
    password: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  input CreateCategoryInput {
    name: String!
    color: String
  }

  input UpdateCategoryInput {
    name: String
    color: String
  }

  input CreateTransactionInput {
    title: String!
    amount: Float!
    type: TransactionType!
    date: DateTime!
    categoryId: ID
  }

  input UpdateTransactionInput {
    title: String
    amount: Float
    type: TransactionType
    date: DateTime
    categoryId: ID
  }

  type Query {
    me: User
    categories: [Category!]!
    category(id: ID!): Category
    transactions: [Transaction!]!
    transaction(id: ID!): Transaction
    transactionsSummary: TransactionSummary!
  }

  type Mutation {
    signUp(input: SignUpInput!): AuthPayload!
    signIn(input: SignInInput!): AuthPayload!
    signOut: Boolean!

    createCategory(input: CreateCategoryInput!): Category!
    updateCategory(id: ID!, input: UpdateCategoryInput!): Category!
    deleteCategory(id: ID!): Boolean!

    createTransaction(input: CreateTransactionInput!): Transaction!
    updateTransaction(id: ID!, input: UpdateTransactionInput!): Transaction!
    deleteTransaction(id: ID!): Boolean!
  }
`;
