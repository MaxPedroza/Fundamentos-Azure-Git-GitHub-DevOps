# Criando o Primeiro Repositório

Existem duas maneiras principais de começar um repositório Git: criando um do zero no seu computador ou copiando um existente.

---

## 1. Inicializando um Repositório (git init)

Use este método quando você tem uma pasta no seu computador e quer transformá-la em um projeto Git.

**Passo a passo:**

1.  Abra o terminal.
2.  Navegue até a pasta do seu projeto: `cd minha-pasta`.
3.  Execute o comando:
    ```bash
    git init
    ```
4.  Pronto! O Git criou a subpasta oculta `.git` e agora está monitorando seus arquivos.

---

## 2. Clonando um Repositório (git clone)

Use este método quando o projeto já existe no GitHub e você quer baixá-lo para o seu computador.

**Passo a passo:**

1.  Vá até a página do repositório no GitHub.
2.  Clique no botão verde **Code** e copie a URL (HTTPS ou SSH).
3.  No terminal, vá para onde quer salvar a pasta.
4.  Execute:
    ```bash
    git clone https://github.com/usuario/projeto.git
    ```
5.  O Git baixará a pasta completa com todo o histórico.

---

## 3. Criando no GitHub (Interface Web)

Você também pode criar o repositório vazio direto no site do GitHub.

**Passo a passo:**

1.  No GitHub, clique no ícone **+** no canto superior direito.
2.  Selecione **New repository**.
3.  Dê um nome (ex: `meu-primeiro-projeto`).
4.  Escolha se é **Public** ou **Private**.
5.  (Opcional) Marque "Add a README file" para iniciar com um arquivo.
6.  Clique em **Create repository**.

Depois de criar no GitHub, você precisará conectá-lo ao seu computador (veremos isso nos próximos tópicos sobre `git remote`).

---

## 📝 Resumo dos Comandos

| Comando           | Descrição                                          |
| :---------------- | :------------------------------------------------- |
| `git init`        | Transforma a pasta atual em um repositório Git.    |
| `git clone <url>` | Baixa um repositório remoto para o seu computador. |
| `git status`      | Mostra o estado atual (quais arquivos mudaram).    |
