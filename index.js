import { Command } from "commander";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from "./contacts.js";

function invokeAction({
  action,
  id,
  name = "John Doe",
  email = "",
  phone = "",
}) {
  const parsedID = parseInt(id);

  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      if (!id)
        console.log(
          "Please provide '--id' parameter with value for this action"
        );
      console.log(getContactById(parsedID));
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      if (!id)
        console.log(
          "Please provide '--id' parameter with value for this action"
        );
      removeContact(parsedID);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

invokeAction(argv);
