# Terminal e Git

Antes de dominar o GitHub, é essencial entender as ferramentas base: o **Terminal** (Linha de Comando) e o **Git** (Sistema de Controle de Versão).

---

## 💻 O Terminal

O terminal é uma interface de texto para interagir com o computador. Ao invés de clicar em botões, você digita comandos.

### Por que usar o terminal?

- **Velocidade:** Tarefas complexas podem ser feitas com poucos comandos.
- **Automação:** Scripts podem executar sequências de comandos.
- **Controle Total:** Acesso a configurações e ferramentas que não possuem interface gráfica.

### Comandos Básicos (Windows/PowerShell)

- `ls` ou `dir`: Lista arquivos e pastas.
- `cd <pasta>`: Entra em uma pasta (Change Directory).
- `cd ..`: Volta para a pasta anterior.
- `mkdir <nome>`: Cria uma nova pasta (Make Directory).
- `clear` ou `cls`: Limpa a tela.

---

## 🌳 O que é Git?

**Git** é um **Sistema de Controle de Versão Distribuído** (DVCS).

Imagine que você está escrevendo um TCC. Você salva: `tcc_final.doc`, `tcc_final_agora_vai.doc`, `tcc_final_v2.doc`. O Git resolve essa bagunça.

### Principais Características:

1.  **Histórico Completo:** O Git salva "fotografias" (snapshots) do seu projeto ao longo do tempo. Você pode voltar para qualquer ponto do passado.
2.  **Trabalho em Equipe:** Permite que várias pessoas trabalhem nos mesmos arquivos sem sobrescrever o trabalho um do outro (merge).
3.  **Ramificação (Branching):** Você pode criar cópias paralelas do projeto para testar novas ideias sem quebrar a versão principal.

### Git vs GitHub

- **Git:** É a ferramenta (software) instalada no seu computador.
- **GitHub:** É um serviço na nuvem que hospeda repositórios Git.

---

## ⚙️ Instalação

Para verificar se você tem o Git instalado, abra o terminal e digite:

```bash
git --version
```

Se não tiver, baixe em [git-scm.com](https://git-scm.com/).
