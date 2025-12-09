# Utilizando o comando Git Push

Depois de fazer seus commits locais, eles ainda estão apenas no seu computador. Para enviá-los para o GitHub (ou outro servidor), usamos o `git push`.

---

## 🚀 O Comando

```bash
git push origin main
```

- **push:** Empurrar/Enviar.
- **origin:** O apelido padrão para o endereço do repositório remoto.
- **main:** O nome da branch que você quer enviar.

---

## 🔗 Conectando ao Remoto

Se você criou o repositório localmente (`git init`), o Git ainda não sabe para onde enviar. Você precisa adicionar o remoto primeiro:

```bash
git remote add origin https://github.com/seu-usuario/seu-repo.git
```

Depois disso, você pode fazer o push.

---

## 🔐 Autenticação

Na primeira vez, o Git pedirá suas credenciais.

- Se usar HTTPS: Usuário e Senha (ou Personal Access Token).
- Se usar SSH: A senha da sua chave SSH (se tiver).

Depois da primeira vez, o Windows/Mac costuma salvar a senha no "Credential Manager" para não pedir novamente.
