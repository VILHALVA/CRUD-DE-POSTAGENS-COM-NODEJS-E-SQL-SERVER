const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const { sequelize, Post } = require('./models/db');

const app = express();

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  Post.findAll({ order: [['id', 'DESC']] })
    .then(posts => {
      res.render('home', { posts: posts });
    })
    .catch(error => {
      res.send("OCORREU UM ERRO: " + error);
    });
});

app.get('/cad', (req, res) => {
  res.render("formulario");
});

app.post('/cad', (req, res) => {
  Post.create({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo
  })
  .then(() => {
    res.redirect('/');
  })
  .catch(error => {
    res.send("OCORREU UM ERRO: " + error);
  });
});

app.get('/deletar/:id', (req, res) => {
  const postId = req.params.id;

  Post.destroy({
    where: {
      id: postId
    }
  })
  .then(() => {
    res.send("POSTAGEM DELETADA COM SUCESSO!");
  })
  .catch(error => {
    res.send("OCORREU UM ERRO: " + error);
  });
});

app.get('/edit/:id', (req, res) => {
  Post.findByPk(req.params.id)
    .then(post => {
      if (post) {
        res.render('form-edit', {
          id: req.params.id,
          titulo: post.titulo,
          conteudo: post.conteudo
        });
      } else {
        res.send('POST NÃO ENCONTRADO!');
      }
    })
    .catch(error => {
      res.send('OCORREU UM ERRO: ' + error);
    });
});

app.post('/editado/:id', (req, res) => {
  Post.update({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo
  },
  {
    where: { id: req.params.id }
  })
  .then(() => {
    res.redirect('/');
  })
  .catch(error => {
    console.log(error);
    res.send('OCORREU UM ERRO: ' + error);
  });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
