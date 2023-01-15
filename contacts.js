import { readFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const [, pathToIndexFile] = process.argv;
const contactsPath = path.join(
  path.dirname(pathToIndexFile),
  "db",
  "contacts.json"
);
let contacts = [];
let lastContactIndex;

try {
  contacts = JSON.parse(readFileSync(contactsPath, "utf-8"));
} catch (error) {}
lastContactIndex = contacts.length
  ? contacts[contacts.length - 1]?.id + 1
  : (lastContactIndex = 0);

export function listContacts() {
  console.table(contacts);
}

export function getContactById(contactId) {
  const { name, email, phone } =
    contacts.find(({ id }) => id === contactId) ?? {};

  return !name
    ? `There is no contact with index of ${contactId}`
    : `\nName: ${name} \nEmail: ${email} \nPhone: ${phone}`;
}

export function removeContact(contactId) {
  contacts = contacts.filter(({ id }) => id !== contactId);
  writeContactsToDB();
}

export function addContact(name, email, phone) {
  contacts.push({ name, email, phone, id: lastContactIndex++ });
  writeContactsToDB();
}

async function writeContactsToDB() {
  try {
    await writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf-8");
  } catch (error) {
    console.log("Can't write a contacts data to the database to the disk!");
  }
}
