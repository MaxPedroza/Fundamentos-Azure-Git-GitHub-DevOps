# Clonando um Repositório

Clonar (`git clone`) é o ato de baixar uma cópia completa de um repositório remoto para o seu computador local.

---

## 📥 O Comando

```bash
git clone <URL_DO_REPOSITORIO>
```

Exemplo:

```bash
git clone https://github.com/balta-io/curso-git.git
```

Isso criará uma pasta chamada `curso-git` no local onde você executou o comando, contendo todos os arquivos e o histórico do projeto.

---

## 🔑 HTTPS vs SSH

Ao clicar no botão verde **Code** no GitHub, você verá duas opções principais de URL:

### 1. HTTPS (Recomendado para iniciantes)

- URL parece um site: `https://github.com/...`
- Fácil de usar.
- Pede usuário e senha (ou Token) na hora de enviar alterações (push).

### 2. SSH (Recomendado para uso frequente)

- URL começa com git: `git@github.com:...`
- Requer que você gere chaves SSH no seu computador e cadastre a chave pública nas configurações do seu GitHub.
- **Vantagem:** Não pede senha toda vez que você faz um push, pois usa a chave criptográfica para autenticação.

---

## ⚠️ Dica Importante

Você só precisa clonar um repositório **uma vez**. Depois disso, para manter seu computador atualizado com as novidades do servidor, você usa:

```bash
git pull
```
