# Entendendo os Repositórios

Um **Repositório** (ou "repo") é o local onde o Git armazena todos os arquivos do seu projeto, juntamente com o histórico de alterações de cada arquivo.

---

## 📂 Estrutura de um Repositório

Imagine um repositório como uma pasta "mágica".

- Ela contém seus arquivos normais (código, imagens, texto).
- Ela contém uma pasta oculta chamada `.git`.

### A pasta `.git`

É aqui que a mágica acontece. O Git armazena todo o histórico, configurações, branches e commits dentro dessa pasta oculta. Se você apagar a pasta `.git`, você perde o histórico e o projeto vira uma pasta comum novamente.

---

## 📍 Local vs Remoto

É crucial entender a diferença entre esses dois estados:

### 1. Repositório Local

- Está no **seu computador**.
- Você trabalha nele diretamente.
- Não precisa de internet.
- Comandos: `git add`, `git commit`, `git checkout`.

### 2. Repositório Remoto

- Está em um **servidor** (como o GitHub, GitLab, Azure DevOps).
- Serve como ponto central de sincronização.
- Precisa de internet para atualizar.
- Comandos: `git push` (enviar), `git pull` (baixar), `git clone` (copiar).

---

## 🔄 Fluxo de Trabalho Básico

1.  Você faz alterações no **Local**.
2.  Você salva essas alterações no histórico (**Commit**).
3.  Você envia essas alterações para o **Remoto** (**Push**).
4.  Outra pessoa baixa as alterações do **Remoto** para o **Local** dela (**Pull**).

---

## 🔒 Visibilidade

Os repositórios no GitHub podem ser:

- **Públicos:** Qualquer pessoa na internet pode ver seu código. Ótimo para projetos Open Source e portfólio.
- **Privados:** Apenas você e as pessoas que você convidar podem ver. Usado para projetos de empresas ou pessoais sigilosos.
