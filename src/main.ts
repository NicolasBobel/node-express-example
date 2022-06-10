import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const port = 3030;

interface UserIterface {
  name: string;
  id: number;
}

type UserType = {
  name: string;
  id: number;
}

class UserClass {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id =id;
  }
}


var users: UserIterface[] =[]

/**
 * 
 * @description
 * Lista os usuários.
 * 
 */
app.get('/user', (req: Request, res: Response) => {
  res.send({
    users,
  });
});

/**
 * 
 * @description
 * Busca usuário pelo id.
 * 
 */
app.get('/user/:id', (req: Request, res: Response) => {
  const { params } = req;

  const userFind = users.find((user) => {
    return user.id === parseInt(params.id)
  })
  
  if (userFind) {
    res.send(userFind);
  } else {
    res.send('User not found')
  }
});

/**
 * 
 * @description
 * Criar usuário.
 * 
 */
app.post('/user', (req: Request, res: Response) => {
  users.push({ name: req.body.name, id: req.body.id })

  res.send(users);
});

/**
 * 
 * @description
 * Atualizar usuário pelo id.
 * 
 */
app.put('/user/:id', (req: Request, res: Response) => {
  const { params, body } = req;

  const usersEdited = users.map((user) => { 
    if (user.id === parseInt(params.id)) {
      return { name: body.name, id: user.id }
    }

    return user;
  });

  users = usersEdited;
  
  res.send('User edited with success');
});

/**
 * 
 * @description
 * Apagar usuário pelo id.
 * 
 */
app.delete('/user/:id', (req: Request, res: Response) => {
  const { params } = req;

  const usersFiltered = users.filter((user) => { 
    return user.id !== parseInt(params.id)
  });

  users = usersFiltered;
  
  res.send('Delete with success');
});



app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});