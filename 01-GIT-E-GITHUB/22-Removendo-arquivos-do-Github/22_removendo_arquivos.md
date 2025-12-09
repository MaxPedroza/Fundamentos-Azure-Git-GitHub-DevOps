# Removendo Arquivos do GitHub

Às vezes enviamos algo que não devíamos, ou um arquivo simplesmente não é mais necessário.

---

## 🗑️ O Comando `git rm`

Para remover um arquivo do Git e também do seu computador:

```bash
git rm arquivo-inutil.txt
git commit -m "Remove arquivo inútil"
git push
```

---

## 👻 Removendo APENAS do Git (Mantendo Local)

Isso é muito comum quando você commita um arquivo de configuração por engano e depois cria um `.gitignore` para ele. Você quer que ele suma do GitHub, mas continue no seu computador para o projeto rodar.

```bash
git rm --cached arquivo-config.json
```

- **--cached:** Diz ao Git para remover apenas do índice (staging area), sem deletar o arquivo físico do disco.

Depois disso, faça o commit e push. O arquivo sumirá do repositório remoto.
