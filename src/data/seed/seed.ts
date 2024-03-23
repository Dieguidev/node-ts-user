
import { envs } from "../../config";
import { CategoryModel } from "../mongo/models/category.model";
import { ProductModel } from "../mongo/models/product.model";
import { UserModel } from "../mongo/models/user.model";
import { MongoDatabase } from "../mongo/mongo-database";
import { seedData } from "./data";


(async () => {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  })

  await main();


  await MongoDatabase.disconnect();
})();


const randomBetween0AndX = (x: number) => {
  return Math.floor(Math.random() * x);
}

async function main() {

  //eliminar todo de la base de datos - warning
  await Promise.all([
    UserModel.deleteMany(),
    CategoryModel.deleteMany(),
    ProductModel.deleteMany()
  ])

  //crear usuarios del seed.ts
  const users = await UserModel.insertMany(seedData.users)

  //crear categorias del seed.ts
  const categories = await CategoryModel.insertMany(
    seedData.categories.map(category => ({ ...category, user: users[randomBetween0AndX(users.length)].id }))
  )

  //crear productos del seed.ts
  const products = await ProductModel.insertMany(
    seedData.products.map(product => ({
      ...product, user: users[randomBetween0AndX(users.length)].id,
      category: categories[randomBetween0AndX(categories.length)].id
    }))
  )

  console.log('seed ok');

}
