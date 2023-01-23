// import { TUsers, TProducts, TPurchases } from "./database"
import { createUser, getAllUsers, createProduct, getAllProduct } from "./database"
import { Category, TProduct, TPurchase, TUser } from "./types"
import express, { Request, Response } from 'express'
import cors from 'cors';
import { users, products, purchases } from "./database";
import { db } from "./database/knex";

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`);
});

app.get('/ping', async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "Pong!" })

  } catch (error) {


    console.log(error)

    if (req.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
});

// =================================================================

app.get('/users', async (req: Request, res: Response) => {

  try {
    const result = await db.raw(`SELECT * FROM users`)

    res.status(200).send(result)

  } catch (error) {
    console.log(error)

    if (req.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }

})

// =================================================================

app.get('/products', async (req: Request, res: Response) => {

  try {
    const result = await db.raw(`SELECT * FROM products`)
    res.status(200).send(result)

  } catch (error) {
    console.log(error)

    if (req.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }

})

// =================================================================

app.get('/products/search', async (req: Request, res: Response) => {

  try {
    const name = req.query.name
    const [result] = await db.raw(`SELECT * FROM products WHERE name = "${name}";`)

    if (!result) {
      res.status(404)
      throw new Error(" produto inexistente")
    }
    if (name !== undefined) {
      if (name.length > 1) {

      } else {
        res.status(400)
        throw new Error("O `name` deve ter mais de 1 caacter")
      }
    }
    res.status(200).send(result)

  // const result = products.filter((product) => {
  //   return product.name.toLowerCase().includes(q.toLowerCase())
  // })

} catch (error) {
  console.log(error)

  if (req.statusCode === 200) {
    res.status(500)
  }

  if (error instanceof Error) {
    res.send(error.message)
  } else {
    res.send("Erro inesperado")
  }
}

})

// =================================================================

app.post("/user", async (req: Request, res: Response) => {

  try {
    const id = req.body.id
    const email = req.body.email
    const password = req.body.password

    // const newUser: TUser = {
    //   id,
    //   email,
    //   password
    // }
    const idExiste = users.find((users) => users.id === id)

    if (idExiste) {
      res.status(404)
      throw new Error("'ID' já cadastrado")

    }

    const emailExiste = users.find((users) => users.email === email)

    if (emailExiste) {
      res.status(404)
      throw new Error("'email' já cadastrado")
    }

    // users.push(newUser)
    await db.raw(`
    INSERT INTO user(id, email, password)
    VALUES("${id}", "${email}","${password}");
`)
    res.status(201).send("Cadastro realizado com sucesso")

  } catch (error) {
    console.log(error)

    if (req.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }

})

// =================================================================

app.post("/product", async (req: Request, res: Response) => {

  try {

    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const category = req.body.category

    // const newProduct: TProduct = {
    //   id,
    //   name,
    //   price,
    //   category
    // }
    const idExiste = products.find((products) => products.id === id)

    if (idExiste) {
      throw new Error("'ID' já cadastrado")

    }

    // products.push(newProduct)
    await db.raw(`
    INSERT INTO product(id, name, price, category)
    VALUES("${id}", "${name}", "${price}","${category}");
`)
    res.status(201).send("Produto Cadastrado com sucesso")

  } catch (error) {
    console.log(error)

    if (req.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
})

// =================================================================

app.post("/purchase", async (req: Request, res: Response) => {

  try {
    const userId = req.body.userId
    const productId = req.body.productId
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice

    // const newPurchase: TPurchase = {
    //   userId,
    //   productId,
    //   quantity,
    //   totalPrice
    // }
    // purchases.push(newPurchase)
    await db.raw(`
    INSERT INTO purchase(userId, productId, quantity, totalPrice)
    VALUES("${userId}", "${productId}", "${quantity}","${totalPrice}");
`)
    res.status(201).send("Compra cadastrada com sucesso")

  } catch (error) {
    console.log(error)

    if (req.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }

})

// =================================================================

app.get("/products/:id", async (req: Request, res: Response) => {

  try {
    const id = req.params.id
    // const result = products.find((product) => product.id === id)
    const result = await db.raw(`SELECT * FROM bands`)

    if (!result) {
      res.status(404)
      throw new Error("Conta não encontrada, verifique o ID")
    }
    res.status(200).send(result)

  } catch (error) {
    console.log(error)

    if (req.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }

})

// =================================================================

app.get("/users/:id/purchases", (req: Request, res: Response) => {

  const id = req.params.id

  const result = purchases.find((purchase) => {
    return purchase.userId === id
  })
  res.status(200).send(result)
})

// =================================================================

app.delete("/user/:id", (req: Request, res: Response) => {
  const id = req.params.id as string
  const userIndex = users.findIndex((user) => {
    return user.id === id
  })

  console.log("Index:", userIndex)

  if (userIndex >= 0) {
    users.splice(userIndex, 1)
    res.status(200).send("Item deletado com sucesso")
  } else {
    res.status(404).send("Item não encontrado")

  }
})

// =================================================================

app.delete("/product/:id", (req: Request, res: Response) => {
  const id = req.params.id as string
  const productIndex = products.findIndex((product) => {
    return product.id === id
  })

  console.log("Index:", productIndex)

  if (productIndex >= 0) {
    products.splice(productIndex, 1)
    res.status(200).send("Item deletado com sucesso")
  } else {
    res.status(404).send("Item não encontrado")

  }
})

// =================================================================

app.put("/user/:id", async (req: Request, res: Response) => {
  const id = req.params.id
  const newEmail = req.body.email
  const newPassword = req.body.password
  const user = users.find((user) => {
    return user.id === id
  })
  if (user) {
    user.id = newEmail || user.id
    user.password = newPassword || user.password
    user.email = isNaN(newEmail) ? user.email : newEmail

    res.status(200).send("Item atualizado com sucesso")
  } else {
    res.status(404).send("Item não encontrado")
  }

})

// =================================================================

app.put("/product/:id", (req: Request, res: Response) => {
  const id = req.params.id
  const newName = req.body.name
  const newPrice = req.body.price
  const newCategory = req.body.category
  const product = products.find((product) => {
    return product.id === id
  })
  if (product) {
    product.id = newName || product.id
    product.price = newPrice || product.price
    product.category = newCategory || product.category
    product.price = isNaN(newPrice) ? product.price : newPrice

    res.status(200).send("Item atualizado com sucesso")
  } else {
    res.status(404).send("Item não encontrado")
  }

})


createUser("23", "beltrano@email.com", "beltrano99")
getAllUsers()

createProduct("26", "Monitor HD", 800, Category.ELECTRONICS)

getAllProduct()

// console.table(TUsers)
// console.table(TProducts)
// console.table(TPurchases)


