import { Client, Databases, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject('65bab19e09973594655f'); 

  /*const account = new Account(client)

  let promise = await account.get()
  console.log(promise)*/

export const databases = new Databases(client);