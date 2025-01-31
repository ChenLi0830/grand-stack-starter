import { neo4jgraphql } from "neo4j-graphql-js";
import fs from "fs";
import path from "path";
import {
  appendSearchHistory,
  calcSquare,
  resolveDescription
} from "./mutations";
/*
 * Check for GRAPHQL_SCHEMA environment variable to specify schema file
 * fallback to schema.graphql if GRAPHQL_SCHEMA environment variable is not set
 */
export const resolvers = {
  Mutation: {
    Square: calcSquare,
    AppendSearchHistory: appendSearchHistory
  },
  Address: {
    description: resolveDescription
  }
};

export const typeDefs = fs
  .readFileSync(
    process.env.GRAPHQL_SCHEMA || path.join(__dirname, "schema.graphql")
  )
  .toString("utf-8");
