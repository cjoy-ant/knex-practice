const ShoppingListService = require("../src/shopping-list-service");
const knex = require("knex");

describe.only(`Shopping List service object`, function () {
  let db;
  let testItems = [
    {
      id: 1,
      name: "Eggs",
      price: "1.00",
      category: "Breakfast",
      checked: true,
      date_added: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 2,
      name: "Bread",
      price: "2.00",
      category: "Main",
      checked: false,
      date_added: new Date("2100-05-22T16:28:32.615Z"),
    },
    {
      id: 3,
      name: "Ham",
      price: "3.00",
      category: "Lunch",
      checked: false,
      date_added: new Date("1919-12-22T16:28:32.615Z"),
    },
  ];

  before(() => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
  });

  // Before all tests run and after each individual test,
  // empty the shopping_list table
  before(() => db("shopping_list").truncate());
  afterEach(() => db("shopping_list").truncate());

  // After all tests run, let go of the db connection
  after(() => db.destroy());

  context(`Given 'shopping_list' has data`, () => {
    beforeEach(() => {
      return db.into("shopping_list").insert(testItems);
    });

    it(`getAllItems() resolves all items from 'shopping_list' table`, () => {
      return ShoppingListService.getAllItems(db).then((actual) => {
        expect(actual).to.eql(
          testItems.map((item) => ({
            ...item,
            checked: false,
            //date_added: new Date(item.date_added),
          }))
        );
      });
    });

    it(`getById() resolves an item by id from 'shopping_list' table`, () => {
      const idToGet = 3;
      const thirdTestItem = testItems[idToGet - 1];
      return ShoppingListService.getById(db, idToGet).then((actual) => {
        expect(actual).to.eql({
          id: idToGet,
          name: thirdTestItem.name,
          price: thirdTestItem.price,
          category: thirdTestItem.category,
          checked: thirdTestItem.checked,
          date_added: thirdTestItem.date_added,
        });
      });
    });

    it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
      const idToDelete = 3;
      return ShoppingListService.deleteItem(db, idToDelete)
        .then(() => ShoppingListService.getAllItems(db))
        .then((allItems) => {
          // copy the test items array without the "deleted" item
          const expected = testItems
            .filter((item) => item.id !== idToDelete)
            .map((item) => ({
              ...item,
              checked: false,
            }));
          expect(allItems).to.eql(expected);
        });
    });

    it(`updateItem() updates an item from the 'shopping_list' table`, () => {
      const idToUpdate = 3;
      const newItemData = {
        name: "updated name",
        price: "updated price",
        category: "updated category",
        checked: false,
        date_added: new Date(),
      };
      const originalItem = testItems[idToUpdate - 1];
      return ShoppingListService.updateItem(db, idToUpdate, newItemData)
        .then(() => ShoppingListService.getById(db, idToUpdate))
        .then((item) => {
          expect(item).to.eql({
            id: idToUpdate,
            ...originalItem,
            ...newItemData,
          });
        });
    });
  });

  context(`Given 'shopping_list' has no data`, () => {
    it(`getAllItems() resolves an empty array`, () => {
      return ShoppingListService.getAllItems(db).then((actual) => {
        expect(actual).to.eql([]);
      });
    });

    it(`insertItem() inserts a new item and resolves the new item with an 'id'`, () => {
      const newItem = {
        name: "Test new name",
        price: "Test new price",
        category: "Test new category",
        checked,
        date_added: new Date("2020-01-01T00:00:00.000Z"),
      };
      return ShoppingListService.insertItem(db, newItem).then((actual) => {
        expect(actual).to.eql({
          id: 1,
          name: newItem.name,
          price: newItem.price,
          category: newItem.category,
          checked: newItem.checked,
          date_added: new Date(newItem.date_added),
        });
      });
    });
  });
});
