# Adicionando Arquivos (Staging Area)

No Git, salvar uma alteração é um processo de dois passos:

1.  **Adicionar** o arquivo à área de preparação (Staging Area).
2.  **Commitar** (Salvar) a preparação no histórico.

---

## ➕ O Comando `git add`

Imagine que você está fazendo uma mudança de casa.

- **Working Directory:** É a sua casa bagunçada.
- **Staging Area:** É a caixa onde você coloca os objetos que vai levar.
- **Commit:** É fechar e lacrar a caixa.

Para colocar um arquivo na caixa:

```bash
git add nome-do-arquivo.txt
```

---

## 📝 O Comando `git commit`

Depois de adicionar o que queria, você salva definitivamente:

```bash
git commit -m "Mensagem descrevendo o que fiz"
```

A mensagem `-m` é obrigatória e deve ser descritiva (ex: "Adiciona tela de login" é melhor que "alterações").

---

## 🔍 Verificando o Status

Para saber o que está na caixa e o que está fora:

```bash
git status
```

- **Vermelho:** Arquivo modificado mas não adicionado (fora da caixa).
- **Verde:** Arquivo adicionado e pronto para commit (dentro da caixa).
