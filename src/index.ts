// import { TUsers, TProducts, TPurchases } from "./database"
import { createUser, getAllUsers, createProduct, getAllProduct } from "./database"
import { Category, TProduct, TPurchase, TUser } from "./types"
import express, { Request, Response } from 'express'
import cors from 'cors';
import { users, products, purchases } from "./database";

const app = express()

app.use(express.json())

app.use(cors())

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get('/ping', (req: Request, res: Response) => {
  res.send('Pong!')
});

// =================================================================

app.get('/users', (req: Request, res: Response) => {

  try {
    res.status(200).send(users)
  } catch (error) {
    console.log(error)
    if (res.statusCode === 200) {
      res.status(500)
    }
    res.send(error.message)
  }

})

// =================================================================

app.get('/products', (req: Request, res: Response) => {

  try {
    res.status(200).send(products)
  } catch (error) {
    console.log(error)
    if (res.statusCode === 200) {
      res.status(500)
    }
    res.send(error.message)
  }

})

// =================================================================

app.get('/products/search', (req: Request, res: Response) => {

  try {
    const q = req.query.q as string
    const result = products.filter((product) => {
      return product.name.toLowerCase().includes(q.toLowerCase())
    })
    if (result.length < 1) {
      throw new Error(" deve possuir no mínimo 1 caractere")
    }
    res.status(200).send(result)
  } catch (error) {

    console.log(error)
    if (res.statusCode === 200) {
      res.status(500)
    }
    res.send(error.message)
  }

})

// =================================================================

app.post("/user", (req: Request, res: Response) => {

  try {
    const id = req.body.id
    const email = req.body.email
    const password = req.body.password

    const newUser: TUser = {
      id,
      email,
      password
    }
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

    users.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso")
  } catch (error) {
    console.log(error)
    if (res.statusCode === 200) {
      res.status(500)
    }
    res.send(error.message)
  }

})

// =================================================================

app.post("/product", (req: Request, res: Response) => {

  try {

    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const category = req.body.category

    const newProduct: TProduct = {
      id,
      name,
      price,
      category
    }
    const idExiste = products.find((products) => products.id === id)

    if (idExiste) {
      throw new Error("'ID' já cadastrado")

    }

    products.push(newProduct)
    res.status(201).send("Produto Cadastrado com sucesso")
  } catch (error) {

    console.log(error)
    if (res.statusCode === 200) {
      res.status(500)
    }
    res.send(error.message)
  }

})

// =================================================================

app.post("/purchase", (req: Request, res: Response) => {

  try {
    const userId = req.body.userId
    const productId = req.body.productId
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice

    const newPurchase: TPurchase = {
      userId,
      productId,
      quantity,
      totalPrice
    }
    purchases.push(newPurchase)
    res.status(201).send("Compra realizada com sucesso")
  } catch (error) {
    console.log(error)
    if (res.statusCode === 200) {
      res.status(500)
    }
    res.send(error.message)
  }

})

// =================================================================

app.get("/products/:id", (req: Request, res: Response) => {

  try {
    const id = req.params.id
    const result = products.find((product) => product.id === id)
  
      if (!result){
        res.status(404)
        throw new Error("Conta não encontrada, verifique o ID")
      }
      res.status(200).send(result)
   
  } catch (error) {
    console.log(error)
    if (res.statusCode === 200) {
      res.status(500)
    }
    res.send(error.message)
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

app.put("/user/:id", (req: Request, res: Response) => {
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