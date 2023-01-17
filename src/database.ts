import { TProduct, TUser, TPurchase, Category } from "./types"


export const users: TUser [] = [
    {
        id: "22",
        email: 'teste@teste',
        password: 'teste'
    },
    {
        id: "23",
        email: 'teste@teste',
        password: 'teste'
    }
]
export const products:TProduct[] = [
    {
        id: "24",
        name: 'Amadeu',
        price: 233,
        category: Category.ACCESSORIES
    },
    {
        id: "25",
        name: 'Alex',
        price: 453,
        category: Category.ELECTRONICS
    }
]
export const purchases: TPurchase[] = [
    {
        userId: 'teste',
        productId: 'teste',
        quantity: 43,
        totalPrice: 4533
    },
    {
        userId: 'teste2',
        productId: 'teste',
        quantity: 432,
        totalPrice: 45329
    }


]


export function createUser(id: string, email:string, password:string): void {
    const newUser: TUser = {
        id: id,
        email: email,
        password: password
    }
    users.push(newUser)
    console.log("Cadastro realizado com sucesso")
  }

  export function getAllUsers():TUser[] {
    return users
     
  }

  export function createProduct(id:string, name:string, price:number, category: Category ):void {
    const newProduct: TProduct = {
        id: id,
        name: name,
        price: price,
        category: category
    }
    products.push(newProduct)
    console.log("Produto criado com sucesso")
  }

  export function getAllProduct():TProduct[] {
    return products
     
  }

  export function getProductById (idToSearch: string):TProduct[] {
    return (products.filter((product) => {
       if(product.id === idToSearch){
        return product
    }
  }))
  }

  export const queryProductsByName = (q:string)=> {
    const query= products.filter(
        (product) =>{
    return(product.name.toLowerCase().includes(q.toLowerCase()))

  }
    )
    console.table(query)
}

 export const createPurchase = (userId: string, productId:string, quantity:number, totalPrice: number) =>  {
   const newPurchase: TPurchase ={
    userId: userId,
    productId: productId,
    quantity: quantity,
    totalPrice: totalPrice
   }
   purchases.push(newPurchase)
   console.log("Compra realizada com sucesso!")
   console.table(purchases)
}
   

export const getAllPurchasesFromUserId = (userIdToSearch:string) :TPurchase[]=>{
    return purchases.filter(
        (purchase) => {
            return(purchase.userId.toLowerCase().includes(userIdToSearch.toLowerCase()))
        }
    )
    }
  