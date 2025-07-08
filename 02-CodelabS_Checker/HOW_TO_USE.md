# Como rodar o projeto

Primeiro, baixe as dependências do projeto:

```bash
npm install --prod

# ou

yarn --prod
```

Depois, crie o arquivo que servirá de banco de dados `index.json` renomeando o arquivo `index_model.json`:

```bash
cp src/database/index_model.json src/database/index.json
```

Agora, você pode rodar o projeto com o comando:

```bash
npm run start

# ou

yarn start
```

Por padrão, o projeto estará rodando na porta `3000`. Você pode acessar a aplicação no navegador através do endereço `http://localhost:3000`.
