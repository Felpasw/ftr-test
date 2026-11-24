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
      description
      icon
      color
      createdAt
    }
  }
`;

export const CATEGORY_STATS_QUERY = gql`
  query CategoryStats {
    categoryStats {
      category {
        id
        name
        description
        icon
        color
      }
      transactionCount
      totalAmount
    }
  }
`;

export const CATEGORIES_OVERVIEW_QUERY = gql`
  query CategoriesOverview {
    categoriesOverview {
      totalCategories
      totalTransactions
      mostUsed {
        id
        name
        icon
        color
      }
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
        icon
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
