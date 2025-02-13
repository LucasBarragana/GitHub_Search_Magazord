# GitHub Explorer

## Descrição
GitHub Explorer é um projeto desenvolvido para a empresa Magazord que permite buscar repositórios de um usuário no GitHub, visualizar seus favoritos e acessar detalhes de cada repositório. O sistema utiliza **Next.js 15, Tailwind CSS, TypeScript, Zustand para gerenciamento de estado e SWR para cache de requisições**.

## Tecnologias Utilizadas
- **Next.js 15** - Framework React para aplicações SSR e SSG
- **Tailwind CSS** - Estilização eficiente
- **TypeScript** - Tipagem estática para segurança do código
- **Zustand** - Gerenciamento de estado global
- **SWR** - Cache de chamadas à API do GitHub

## Funcionalidades
- Busca de repositórios por nome de usuário do GitHub
- Listagem dos repositórios
- Filtro por nome, estrelas e linguagem de programação
- Ordenação por data ou estrelas
- Exibição de detalhes dos repositórios
- Exibição de favoritos (starred repositories)

🔥 Desafios encontrados

Rate Limit da API do GitHub

Como a API pública do GitHub possui um limite de requisições por hora para usuários não autenticados, caso muitas buscas sejam realizadas em pouco tempo, a API pode bloquear temporariamente as requisições.

Uma solução seria implementar autenticação via OAuth para aumentar o limite de requisições.

Gerenciamento de Estado

O Zustand foi utilizado para armazenar os repositórios e facilitar a comunicação entre os componentes.

Foi necessário garantir que os dados persistissem entre as páginas sem precisar refazer chamadas desnecessárias à API.

Otimização das Requisições

Utilizamos SWR para armazenar em cache as respostas da API e melhorar a experiência do usuário.

Isso evita requisições desnecessárias quando o usuário navega entre os detalhes dos repositórios.


📌 Melhorias Futuras

Autenticação com GitHub

Adicionar autenticação via OAuth para aumentar o limite de requisições da API.

Melhor UX/UI

Melhorar a interface com animações e feedbacks visuais ao carregar dados.

Paginação de Repositórios

Implementar paginação para usuários com muitos repositórios, otimizando a experiência e reduzindo a quantidade de dados carregados de uma vez.

Testes Automatizados

Adicionar testes unitários e de integração para garantir maior confiabilidade do código.


## Como Rodar o Projeto
1. Clone este repositório:
```bash
git clone https://github.com/LucasBarragana/github-explorer.git
```

2. Acesse a pasta do projeto:
```bash
cd github-explorer
```

3. Instale as dependências:
```bash
npm install
# ou
yarn install
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

5. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Contato
Projeto desenvolvido por **Lucas Oliveira Barragana**.

