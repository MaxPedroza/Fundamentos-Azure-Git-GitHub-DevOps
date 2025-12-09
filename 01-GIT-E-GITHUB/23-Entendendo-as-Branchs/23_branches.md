# Entendendo as Branches (Ramificações)

Branches são linhas do tempo paralelas no seu projeto. Elas permitem que você trabalhe em novas funcionalidades ou correções de bugs sem afetar o código principal (produção).

---

## 🌳 O Conceito

Imagine o seu projeto como uma árvore.

- **main (tronco):** É a versão estável, que está no ar.
- **feature/login (galho):** É onde você está criando a tela de login.
- **fix/botao (galho):** É onde seu colega está arrumando um botão torto.

Enquanto você trabalha no galho, o tronco continua intacto. Se você quebrar tudo no galho, o tronco não sofre nada.

---

## 🛠️ Comandos Principais

### Criar uma nova branch

```bash
git branch nome-da-branch
```

### Mudar para a branch (Checkout)

```bash
git checkout nome-da-branch
```

Ou (atalho moderno):

```bash
git switch nome-da-branch
```

### Criar e mudar ao mesmo tempo (Mais usado)

```bash
git checkout -b nova-feature
```

### Listar branches

```bash
git branch
```

### Juntar branches (Merge)

Quando terminar o trabalho no galho, você o funde de volta ao tronco.

1.  Volte para a main: `git checkout main`
2.  Faça o merge: `git merge nova-feature`
