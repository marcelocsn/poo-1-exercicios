import express, { Request, Response } from 'express'
import cors from 'cors'
import { TAccountDB, TAccountDBPost, TUserDB, TUserDBPost } from './types'
import { db } from './database/knex'
import { User } from './models/User'
import { Account } from './models/Account'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
});

app.get("/ping", async (req: Request, res: Response) => {
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

app.get("/users", async (req: Request, res: Response) => {
   
    // Agora vamos refatorar o código no src/index.ts para
    // utilizar o modelo implementado de User
    // Refatore o endpoint GET /users
    // a resposta deve ser uma lista de instâncias User
      
   
    try {
        const q = req.query.q

        let usersDB

        if (q) {
            const result: TUserDB[] = await db("users").where("name", "LIKE", `%${q}%`)
            usersDB = result
        } else {
            const result: TUserDB[] = await db("users")
            usersDB = result
        }
        //prática 02: 
        // Agora vamos refatorar o código no src/index.ts para
        // utilizar o modelo implementado de User
        // Refatore o endpoint GET /users
        // a resposta deve ser uma lista de --->instâncias<--- User

        // aqui mapeamos o array de usertsDB (resultado na nossa busca)
        // para cada item do array usersDB instanciamos um ojbeto User (new User(propriedades))
        // passando o valor do item do banco de dados como propriedade do novo objeto
        // assim, 
        // 
        // new User (
        //     id: usersDB.id
        //     ... cada propriedade do objeto recebe o mesmo valor do DB ... 
        // )
        // por fim, enviamos uma lista de instancias 'users' para o postman;

        const users: User[] = usersDB.map((userDB)=>
            new User(
                userDB.id,
                userDB.name,
                userDB.email,
                userDB.password,
                userDB.created_at
            ))


        res.status(200).send(users)
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

app.post("/users", async (req: Request, res: Response) => {
    try {
        const { id, name, email, password } = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("'name' deve ser string")
        }

        if (typeof email !== "string") {
            res.status(400)
            throw new Error("'email' deve ser string")
        }

        if (typeof password !== "string") {
            res.status(400)
            throw new Error("'password' deve ser string")
        }

        const [ userDBExists ]: TUserDB[] | undefined[] = await db("users").where({ id })

        if (userDBExists) {
            res.status(400)
            throw new Error("'id' já existe")
        }
// Refatore o endpoint POST /users
// agora a API será responsável por criar 
// as datas para facilitar o instanciamento de User

// a resposta deve ser uma instância de User

        const newUser = new User ( 
            id,
            name,
            email,
            password,
            new Date().toISOString()
            ) 
        
        const newUserDB: TUserDB ={

            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            created_at: newUser.getCreatedAt()
        }

        await db("users").insert(newUserDB)
        const [ userDB ]: TUserDB[] = await db("users").where({ id })

        res.status(201).send(newUser)
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

// Implementar uma instância é garantir que a
// regra de negócio está sendo aplicada

//Crie e exporte a classe Account de src/models/Account.ts

//Refatore os endpoints relacionados a 
///accounts para utilizarem instâncias da classe Account

app.get("/accounts", async (req: Request, res: Response) => {
    try {
        const accountsDB: TAccountDB[] = await db("accounts")

        const accounts :Account[] = accountsDB.map((account)=> new Account(
                account.id,
                account.balance,
                account.owner_id,
                account.created_at,              
        ))

        res.status(200).send( accounts)
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

app.get("/accounts/:id/balance", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [ accountDB ]: TAccountDB[] | undefined[] = await db("accounts").where({ id })

        if (!accountDB) {
            res.status(404)
            throw new Error("'id' não encontrado")
        }
       const account = new Account(
            accountDB.id,
            accountDB.balance,
            accountDB.owner_id,
            accountDB.created_at)

        res.status(200).send({ balance: account.getBalance() })
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

app.post("/accounts", async (req: Request, res: Response) => {
    try {
        const { id, ownerId } = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string")
        }

        if (typeof ownerId !== "string") {
            res.status(400)
            throw new Error("'ownerId' deve ser string")
        }

        const [ accountDBExists ]: TAccountDB[] | undefined[] = await db("accounts").where({ id })

        if (accountDBExists) {
            res.status(400)
            throw new Error("'id' já existe")
        }

        const newAccount = new Account(
            id,
            0,
            ownerId,
            new Date().toISOString()
            )
        
           
            const newAccountDB: TAccountDB ={

                id: newAccount.getId(),
                balance: newAccount.getBalance(),
                owner_id: newAccount.getOwnerId(),
                created_at: newAccount.getCreatedAt()
            }

        await db("accounts").insert(newAccountDB)
        const [ accountDB ]: TAccountDB[] = await db("accounts").where({ id })

        res.status(201).send(newAccount)
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

app.put("/accounts/:id/balance", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const value = req.body.value

        if (typeof value !== "number") {
            res.status(400)
            throw new Error("'value' deve ser number")
        }

        const [ accountDB ]: TAccountDB[] | undefined[] = await db("accounts").where({ id })

        if (!accountDB) {
            res.status(404)
            throw new Error("'id' não encontrado")
        }

        const accoutToEdit = new Account(
            accountDB.id,
            accountDB.balance += value ,
            accountDB.owner_id,
            accountDB.created_at
            )
            console.log(accoutToEdit)

        await db("accounts").update({ balance: accoutToEdit.getBalance() }).where({ id })
        
        res.status(200).send(accountDB)
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