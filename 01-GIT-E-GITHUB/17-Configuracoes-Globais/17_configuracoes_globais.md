# Configurações Globais

Antes de fazer seu primeiro commit, você **precisa** dizer ao Git quem você é. Isso é importante porque cada alteração no histórico fica assinada com seu nome e e-mail.

---

## 🆔 Identidade

Abra o terminal e execute os dois comandos abaixo (substitua pelos seus dados):

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

- **user.name:** Aparecerá no histórico de commits.
- **user.email:** Deve ser o mesmo e-mail que você usa na sua conta do GitHub (para que ele vincule os commits ao seu perfil).

---

## ⚙️ Outras Configurações Úteis

### Editor Padrão

Quando o Git precisa que você escreva um texto longo (como uma mensagem de merge), ele abre um editor. O padrão costuma ser o Vim (que é difícil para iniciantes). Você pode mudar para o VS Code:

```bash
git config --global core.editor "code --wait"
```

### Branch Padrão

Antigamente, a branch principal chamava-se `master`. Hoje, o padrão da indústria é `main`. Para configurar seu Git para criar `main` por padrão:

```bash
git config --global init.defaultBranch main
```

### Verificando Configurações

Para ver tudo o que está configurado:

```bash
git config --list
```
