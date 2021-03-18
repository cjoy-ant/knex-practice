require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});

// DRILLS

// 1) get all items that contain text
// a function that takes one parameter for searchTerm which will be any string
// the function will query the shopping_list table using Knex methods
// and select the rows which have a name that contains the serachTerm using a case insensitive match

const searchTerm = "";

function searchByItemName(searchTerm) {
  knexInstance
    .select("id", "name", "price", "date_added", "checked", "category")
    .from("shopping_list")
    .where("name", "LIKE", `%${searchTerm}%`)
    .then((result) => {
      console.log("Items that include");
      console.log(searchTerm);
      console.log(result);
    });
}

// searchByItemName("steak");

// 2) get all items paginated
// a function taht takes one paratmeter for pageNumber which will be a number
// the function will query the shopping_list table using Knex methods
// and select the pageNumber page of rows paginated to 6 items per page

const pageNumber = 1;

function paginateItems(pageNumber) {
  const productsPerPage = 6;
  const offset = productsPerPage * (pageNumber - 1);
  knexInstance
    .select("id", "name", "price", "date_added", "checked", "category")
    .from("shopping_list")
    .limit(productsPerPage)
    .offset(offset)
    .then((result) => {
      console.log("Page:");
      console.log(pageNumber);
      console.log(result);
    });
}

// paginateItems(pageNumber);

// 3) get all items added after date
// a function that takes one parameter for daysAgo
// which will be a number representing a number of days
// this function will query the shopping_list table using Knex methods
// and select the rows which have a date_added that is greater than the daysAgo

const daysAgo = 1;

function getItemsAddedSince(daysAgo) {
  knexInstance
    .select("id", "name", "price", "date_added", "checked", "category")
    .from("shopping_list")
    .where(
      "date_added",
      ">",
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .then((result) => {
      console.log("Items added since");
      console.log(daysAgo);
      console.log("day(s) ago:");
      console.log(result);
    });
}

// getItemsAddedSince(daysAgo);

// 4) get total cost for each category
// a function that takes no parameters
// the function will query the shopping_list table using Knex methods
// and select the rows grouped by their category
// and showing the total price for each category

function totalCostPerCategory() {
  knexInstance
    .select("category")
    .sum("price as total")
    .from("shopping_list")
    .groupBy("category")
    .then((result) => {
      console.log("Total cost per category:");
      console.log(result);
    });
}

totalCostPerCategory();
