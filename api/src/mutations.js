import { addNewHistoryToDB } from "./helpers";

export function calcSquare(parent, args, context, info) {
  const { number } = args;
  return number * number;
}

export async function appendSearchHistory(parent, args, context, info) {
  const { userId, searchTerm } = args;
  return addNewHistoryToDB(userId, searchTerm);
}

export function resolveDescription(fetchedObj, params, ctx, resolveInfo) {
  const { address, amount_received } = fetchedObj;
  let description;
  if (!!address && !!amount_received) {
    description = `Address: ${address}, BTC received: ${amount_received}`;
  } else {
    description = "N/A";
  }
  return description;
}
