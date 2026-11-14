import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      email
    }
  }
`;

export const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      id
      name
      color
      createdAt
    }
  }
`;

export const TRANSACTIONS_QUERY = gql`
  query Transactions {
    transactions {
      id
      title
      amount
      type
      date
      category {
        id
        name
        color
      }
    }
  }
`;

export const TRANSACTIONS_SUMMARY_QUERY = gql`
  query TransactionsSummary {
    transactionsSummary {
      income
      expense
      balance
    }
  }
`;
