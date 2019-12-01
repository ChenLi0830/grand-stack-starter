export async function addNewHistoryToDB(userId, searchTerm) {
  // wait for async call mimicing the delay of saving record to DB
  await new Promise(resolve => setTimeout(() => resolve(), 1000));
  // return fake user mimicing the response from DB
  return {
    id: userId,
    username: "Garfield",
    lastVisitedAt: new Date().toISOString(),
    searchHistory: ["apple", "fish", searchTerm]
  };
}
