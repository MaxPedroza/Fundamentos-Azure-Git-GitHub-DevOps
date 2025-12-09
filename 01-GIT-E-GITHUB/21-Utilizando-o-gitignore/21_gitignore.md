# Utilizando o .gitignore

Nem tudo deve ir para o GitHub. Arquivos temporários, pastas de build, dependências pesadas e, principalmente, **senhas** devem ser ignorados.

---

## 🙈 O Arquivo .gitignore

O `.gitignore` é um arquivo de texto simples que fica na raiz do seu projeto. Nele, você lista os nomes de arquivos ou pastas que o Git deve **ignorar completamente**.

### Exemplo de conteúdo:

```text
# Ignorar pasta de dependências do Node.js
node_modules/

# Ignorar arquivos de build do C#
bin/
obj/

# Ignorar arquivos de ambiente (SENHAS!)
.env
appsettings.Development.json

# Ignorar arquivos de sistema
.DS_Store
Thumbs.db
```

---

## 💡 Como funciona

1.  Crie um arquivo chamado `.gitignore`.
2.  Escreva os padrões que quer ignorar.
3.  Salve.
4.  Rode `git status`. Os arquivos ignorados não aparecerão mais na lista de pendências.

**Importante:** Se você já commitou um arquivo antes de adicioná-lo ao `.gitignore`, ele continuará sendo rastreado. Você precisará removê-lo do Git manualmente (`git rm --cached`).
