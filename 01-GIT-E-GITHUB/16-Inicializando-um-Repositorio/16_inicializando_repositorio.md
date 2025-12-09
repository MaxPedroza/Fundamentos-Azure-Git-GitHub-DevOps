# Inicializando um Repositório

Se você já tem uma pasta com código no seu computador e quer começar a versioná-la com Git, você precisa inicializá-la.

---

## 🏁 O Comando `git init`

1.  Abra o terminal.
2.  Navegue até a pasta do projeto (`cd minha-pasta`).
3.  Execute:

```bash
git init
```

### O que acontece?

O Git cria uma subpasta oculta chamada `.git`.

- Antes do comando: É apenas uma pasta comum.
- Depois do comando: É um **Repositório Git**.

---

## ⚠️ Cuidado Comum

Não execute `git init` na sua pasta de usuário (`C:\Users\Voce` ou `/home/voce`) ou no Desktop. Isso faria com que o Git tentasse monitorar **todos** os arquivos do seu computador, o que deixaria tudo lento e bagunçado.

Sempre crie uma pasta específica para o projeto antes de inicializar.

```bash
mkdir meu-projeto
cd meu-projeto
git init
```
