# 🚀 Git e GitHub - Guia Completo

> 💡 **Git** é um sistema de controle de versão distribuído que permite rastrear mudanças em código. **GitHub** é uma plataforma web que hospeda repositórios Git e facilita a colaboração entre desenvolvedores.

---

## ⚙️ 1. Configuração Inicial do Git

### 👤 Configurar nome do usuário
> Este nome aparecerá em todo commit que você fazer.

```bash
git config --global user.name "Seu Nome"
```

### 📧 Configurar email
> Este email aparecerá em todo commit que você fazer.

```bash
git config --global user.email "seu.email@exemplo.com"
```

### ℹ️ Verificar configurações atuais
> Exibe o nome e email configurados.

```bash
git config --list
```

### 📝 Configurar editor padrão _(opcional)_
> Define qual editor será usado quando Git precisar editar algo.

```bash
git config --global core.editor "code"
```

---

## 📦 2. Criando um Novo Repositório Git

### 🎯 Criar novo repositório localmente
> Cria uma pasta oculta `.git` que armazena todo o histórico.

```bash
git init
```

### 🌍 Clonar repositório do GitHub
> Baixa uma cópia completa do repositório remoto.

```bash
git clone https://github.com/usuario/nome-repo.git
```

### 📂 Clonar para uma pasta específica
> Clona o repositório em uma pasta com nome diferente.

```bash
git clone https://github.com/usuario/nome-repo.git meu-projeto
```

---

## 📊 3. Status e Visualização

### 📋 Ver status do repositório
> Mostra arquivos modificados, adicionados ou não rastreados.

```bash
git status
```

### 📌 Ver status resumido
> Mostra status com menos detalhes (mais conciso).

```bash
git status -s
```

### 🔍 Ver diferenças entre arquivos
> Mostra o que foi modificado em cada arquivo.

```bash
git diff
```

### ⏭️ Ver mudanças prontas para commit
> Mostra o que está no staging area.

```bash
git diff --staged
```

### 📜 Ver histórico de commits
> Exibe log dos commits com mensagens, autor e data.

```bash
git log
```

### 📖 Ver histórico detalhado
> Mostra cada linha modificada em cada commit.

```bash
git log -p
```

### 📑 Ver histórico resumido
> Uma linha por commit (muito conciso).

```bash
git log --oneline
```

### 🎨 Ver histórico em forma visual
> Mostra o histórico com branches de forma gráfica.

```bash
git log --oneline --graph --all
```

### 📄 Ver histórico de um arquivo
> Mostra todos os commits que modificaram um arquivo.

```bash
git log -- arquivo.txt
```

### 🔎 Ver detalhes de um commit
> Mostra exatamente o que foi alterado naquele commit.

```bash
git show <hash-do-commit>
```

---

## ✅ 4. Adicionando e Commitando Mudanças

### 📌 Adicionar arquivo específico
> Marca o arquivo para ser incluído no próximo commit.

```bash
git add arquivo.txt
```

### 📌 Adicionar múltiplos arquivos
> Marca vários arquivos para o próximo commit.

```bash
git add arquivo1.txt arquivo2.txt
```

### 📌 Adicionar todos os arquivos
> Marca todos os arquivos alterados para o próximo commit.

```bash
git add .
```

### 📌 Adicionar arquivos por padrão
> Marca apenas arquivos com uma extensão específica.

```bash
git add *.js
```

### 🎯 Adicionar interativamente
> Permite escolher quais partes de cada arquivo adicionar.

```bash
git add -i
```

### 🔍 Ver o que está no staging
> Mostra quais arquivos estão preparados para commit.

```bash
git diff --staged
```

### ↩️ Remover arquivo do staging
> Remove arquivo da área de preparação.

```bash
git reset arquivo.txt
```

### ↩️ Remover todos do staging
> Remove tudo que foi adicionado com git add.

```bash
git reset
```

### 💾 Fazer commit
> Cria um ponto de salvamento com mensagem descritiva.

```bash
git commit -m "Mensagem descritiva do commit"
```

### 💾 Commit com editor
> Abre editor para escrever mensagem mais longa.

```bash
git commit
```

### 💾 Commit com add
> Combina git add . e git commit em um comando.

```bash
git commit -am "Mensagem do commit"
```

### ✏️ Modificar último commit
> Modifica o último commit sem criar um novo.

```bash
git commit --amend -m "Nova mensagem"
```

### ✏️ Adicionar ao commit anterior
> Modifica o último commit sem mudar a mensagem.

```bash
git commit --amend --no-edit
```

---

## 🌿 5. Trabalhando com Branches

### 📋 Listar branches locais
> Lista todas as branches do seu repositório local.

```bash
git branch
```

### 🌍 Listar todas as branches
> Mostra branches locais e remotas.

```bash
git branch -a
```

### 🌐 Listar branches remotas
> Mostra apenas branches do servidor remoto.

```bash
git branch -r
```

### ➕ Criar nova branch
> Cria uma nova branch baseada na branch atual.

```bash
git branch nome-da-branch
```

### ➕ Criar e mudar para nova branch
> Cria a branch e já muda para ela.

```bash
git checkout -b nome-da-branch
```

### ➕ Criar branch a partir de outra
> Cria branch baseada em outra branch específica.

```bash
git checkout -b nome-da-branch nome-da-branch-origem
```

### ↔️ Mudar de branch
> Alterna para outra branch do repositório.

```bash
git checkout nome-da-branch
```

### ⏪ Voltar para branch anterior
> Volta para a branch que você estava antes.

```bash
git checkout -
```

### ✏️ Renomear branch atual
> Renomeia a branch em que você está.

```bash
git branch -m novo-nome
```

### ✏️ Renomear qualquer branch
> Renomeia qualquer branch sem estar nela.

```bash
git branch -m nome-antigo novo-nome
```

### 🗑️ Deletar branch local
> Remove a branch do repositório local.

```bash
git branch -d nome-da-branch
```

### 🗑️ Forçar deletar branch
> Remove branch forçadamente sem verificações.

```bash
git branch -D nome-da-branch
```

### 🗑️ Deletar branch remota
> Remove a branch do GitHub/servidor remoto.

```bash
git push origin --delete nome-da-branch
```

### ℹ️ Ver informações das branches
> Mostra última mensagem de commit de cada branch.

```bash
git branch -v
```

---

## 🔀 6. Fusionando Branches (Merge)

### 🔄 Fazer merge
> Incorpora as mudanças de outra branch na atual.

```bash
git merge nome-da-branch
```

### 🔄 Merge com mensagem customizada
> Faz merge e abre editor para escrever mensagem.

```bash
git merge nome-da-branch -m "Mensagem do merge"
```

### ❌ Cancelar merge
> Desfaz as mudanças do merge se houver conflitos.

```bash
git merge --abort
```

### ✔️ Ver branches mergeadas
> Mostra quais branches já foram incorporadas.

```bash
git branch --merged
```

### ⏳ Ver branches não mergeadas
> Mostra quais branches ainda têm mudanças não incorporadas.

```bash
git branch --no-merged
```

---

## 🌐 7. Trabalhando com Remoto

### 📍 Ver repositórios remotos
> Mostra o nome dos servidores remotos.

```bash
git remote
```

### 📍 Ver detalhes dos remotos
> Mostra URLs dos repositórios remotos.

```bash
git remote -v
```

### ➕ Adicionar repositório remoto
> Conecta seu repositório local com um servidor remoto.

```bash
git remote add <nome> <url>
```

### ➖ Remover repositório remoto
> Remove a conexão com um repositório remoto.

```bash
git remote remove <nome>
```

### ✏️ Renomear repositório remoto
> Muda o nome de um repositório remoto.

```bash
git remote rename <nome-antigo> <nome-novo>
```

### ℹ️ Ver informações do remoto
> Mostra detalhes sobre branches e rastreamento remoto.

```bash
git remote show origin
```

### ⬆️ Fazer push
> Envia seus commits locais para o repositório remoto.

```bash
git push origin <nome-da-branch>
```

### ⬆️ Push da branch atual
> Envia a branch atual para o repositório remoto.

```bash
git push
```

### ⬆️ Push com rastreamento
> Envia branch e configura para rastrear a remota.

```bash
git push -u origin <nome-da-branch>
```

### ⬆️ Push de todas as branches
> Envia todas as branches locais para o servidor.

```bash
git push --all
```

### 🏷️ Push de tags
> Envia tags (versões marcadas) para o servidor.

```bash
git push --tags
```

### ⬆️ Push deletando branch remota
> Remove uma branch do servidor remoto.

```bash
git push origin --delete <nome-da-branch>
```

### ⬇️ Fazer pull
> Baixa mudanças do servidor e as incorpora na branch atual.

```bash
git pull
```

### ⬇️ Pull de branch específica
> Baixa mudanças de uma branch específica.

```bash
git pull origin <nome-da-branch>
```

### 📥 Fazer fetch
> Baixa mudanças do servidor mas não as incorpora automaticamente.

```bash
git fetch
```

### 📥 Fetch de todas as branches
> Atualiza informações de todas as branches do servidor.

```bash
git fetch --all
```

### 🔄 Sincronizar com remoto
> Atualiza referências remotas sem mudar seu código.

```bash
git fetch origin
```

---

## ⚠️ 8. Resolvendo Conflitos

### 🚨 Ver arquivos com conflitos
> Mostra quais arquivos têm conflitos não resolvidos.

```bash
git status
```

### 📄 Ver conteúdo do conflito
> Exibe o arquivo mostrando os conflitos.

```bash
cat arquivo-com-conflito.txt
```

> 🔧 **Após resolver manualmente no editor:**
> Edite o arquivo removendo os marcadores de conflito (`<<<<<<`, `======`, `>>>>>>>`).

### ✔️ Marcar conflito como resolvido
> Marca o conflito como resolvido.

```bash
git add arquivo-com-conflito.txt
```

### ✔️ Finalizar o merge
> Completa o merge com um commit.

```bash
git commit -m "Merge resolvido"
```

### ❌ Cancelar merge
> Desfaz o merge se quiser começar de novo.

```bash
git merge --abort
```

---

## 🔙 9. Desfazendo Mudanças

### ↩️ Descartar mudanças em arquivo
> Reverte o arquivo para a última versão commitada.

```bash
git checkout -- arquivo.txt
```

### ↩️ Descartar mudanças em todos
> Reverte todos os arquivos para a versão commitada.

```bash
git checkout -- .
```

### 🔄 Remover arquivo do staging
> Remove arquivo que foi adicionado com git add.

```bash
git reset arquivo.txt
```

### 🔄 Remover todos do staging
> Remove tudo que foi adicionado para commit.

```bash
git reset
```

### 🔄 Desfazer último commit (mantém mudanças)
> O commit é desfeito mas as mudanças permanecem localmente.

```bash
git reset --soft HEAD~1
```

### 🔄 Desfazer último commit (modificado)
> O commit é desfeito, mudanças estão modificadas mas não staged.

```bash
git reset --mixed HEAD~1
```

### 💣 Desfazer último commit (descarta tudo)
> O commit é completamente desfeito e mudanças são perdidas.

```bash
git reset --hard HEAD~1
```

### 🔄 Desfazer últimos N commits
> Desfaz múltiplos commits (substitua N pelo número).

```bash
git reset --soft HEAD~N
```

### 🔙 Reverter commit específico
> Cria um novo commit que desfaz as mudanças do commit especificado.

```bash
git revert <hash-do-commit>
```

### 🔙 Reverter últimos N commits
> Cria novos commits que desfazem os últimos N commits.

```bash
git revert HEAD~N..HEAD
```

### 🔍 Encontrar hash do commit
> Mostra o hash de cada commit para você escolher qual desfazer.

```bash
git log --oneline
```

---

## 🧹 10. Limpeza e Manutenção

### 🔍 Visualizar arquivos não rastreados
> Mostra quais arquivos seriam removidos.

```bash
git clean -n
```

### 🗑️ Remover arquivos não rastreados
> Deleta arquivos não adicionados ao git.

```bash
git clean -f
```

### 🗑️ Remover pastas não rastreadas
> Deleta pastas e arquivos não rastreados.

```bash
git clean -fd
```

### 🗑️ Remover tudo não rastreado
> Deleta arquivos ignorados também.

```bash
git clean -fdx
```

### ⚡ Compactar banco de dados
> Melhora performance limpando informações redundantes.

```bash
git gc
```

### 🔍 Verificar integridade
> Verifica se não há corrupção nos dados.

```bash
git fsck
```

---

## 📦 11. Stashing (Guardar Mudanças Temporárias)

### 💾 Guardar mudanças temporárias
> Salva mudanças em uma pilha temporária.

```bash
git stash
```

### 💾 Guardar com nome descritivo
> Salva mudanças com um nome para fácil identificação.

```bash
git stash save "nome-descritivo"
```

### 📋 Listar todos os stashes
> Mostra todos os conjuntos de mudanças guardadas.

```bash
git stash list
```

### 📤 Aplicar último stash
> Recupera o conjunto de mudanças mais recente.

```bash
git stash apply
```

### 📤 Aplicar stash específico
> Recupera um conjunto de mudanças específico.

```bash
git stash apply stash@{0}
```

### 📤 Aplicar e remover stash
> Recupera o stash e o remove da lista.

```bash
git stash pop
```

### 🗑️ Remover stash sem aplicar
> Deleta um stash sem recuperar as mudanças.

```bash
git stash drop stash@{0}
```

### 🗑️ Remover todos os stashes
> Deleta todos os stashes armazenados.

```bash
git stash clear
```

### 👀 Ver conteúdo de um stash
> Mostra quais mudanças estão naquele stash.

```bash
git stash show stash@{0}
```

---

## 🏷️ 12. Tags (Marcação de Versões)

### 🎯 Criar tag
> Marca um ponto específico no histórico como versão importante.

```bash
git tag v1.0.0
```

### 🎯 Criar tag anotada
> Cria uma tag com descrição e informações adicionais.

```bash
git tag -a v1.0.0 -m "Versão 1.0.0"
```

### 📋 Ver todas as tags
> Lista todas as tags existentes.

```bash
git tag
```

### ℹ️ Ver informações de uma tag
> Mostra detalhes de uma tag em particular.

```bash
git show v1.0.0
```

### 🗑️ Deletar tag local
> Remove uma tag do repositório local.

```bash
git tag -d v1.0.0
```

### 🗑️ Deletar tag remota
> Remove uma tag do servidor remoto.

```bash
git push origin --delete v1.0.0
```

### ⬆️ Push de uma tag
> Envia uma tag para o servidor.

```bash
git push origin v1.0.0
```

### ⬆️ Push de todas as tags
> Envia todas as tags para o servidor.

```bash
git push origin --tags
```

### 🎯 Criar tag de commit anterior
> Marca um commit que não é o mais recente.

```bash
git tag v1.0.0 <hash-do-commit>
```

---

## 📐 13. Rebase (Reorganizar Commits)

### 🔄 Rebase da branch atual
> Reorganiza commits colocando-os em cima de outra branch.

```bash
git rebase <nome-da-branch>
```

### 🎯 Rebase interativo
> Permite editar, combinar ou reordenar commits.

```bash
git rebase -i HEAD~N
```

### ▶️ Continuar rebase
> Continua o rebase após resolver conflitos.

```bash
git rebase --continue
```

### ❌ Cancelar rebase
> Desfaz o rebase se quiser começar de novo.

```bash
git rebase --abort
```

### ⏭️ Pular commit
> Ignora um commit durante o rebase.

```bash
git rebase --skip
```

---

## 📁 14. Criando e Gerenciando Arquivos

### ➕ Criar arquivo novo
> Cria um arquivo que será rastreado pelo git.

```bash
echo "conteúdo" > novo-arquivo.txt
```

### 📂 Criar pasta
> Cria um diretório para organizar arquivos.

```bash
mkdir nome-da-pasta
```

### ➕ Criar arquivo em pasta
> Cria arquivo em um diretório específico.

```bash
echo "conteúdo" > nome-da-pasta/arquivo.txt
```

### ✏️ Renomear arquivo
> Renuncia o arquivo e git detecta automaticamente.

```bash
git mv arquivo-antigo.txt arquivo-novo.txt
```

### 🚚 Mover arquivo
> Move arquivo mantendo rastreamento do git.

```bash
git mv arquivo.txt pasta/arquivo.txt
```

### 🗑️ Deletar arquivo
> Remove arquivo e git detecta a deleção.

```bash
git rm arquivo.txt
```

### 🗑️ Deletar pasta
> Remove pasta inteira do rastreamento.

```bash
git rm -r pasta-inteira/
```

### 🔚 Parar de rastrear arquivo
> Remove do git mas mantém o arquivo no disco.

```bash
git rm --cached arquivo.txt
```

---

## 🚫 15. Arquivo .gitignore

> O arquivo `.gitignore` especifica quais arquivos **NÃO** devem ser rastreados.

### ➕ Criar arquivo .gitignore

```bash
echo "node_modules/" >> .gitignore
```

### 📋 Exemplos de padrões para .gitignore

**Ignorar uma pasta específica:**
```
node_modules/
```

**Ignorar arquivos de um tipo específico:**
```
*.log
*.tmp
*.obj
```

**Ignorar arquivos de sistema:**
```
.DS_Store
Thumbs.db
```

**Ignorar arquivos de ambiente:**
```
.env
.env.local
```

**Ignorar pastas de build/compilação:**
```
dist/
build/
out/
```

**Ignorar arquivos de IDE:**
```
.vscode/
.idea/
*.swp
```

**Ignorar tudo em uma pasta EXCETO um arquivo:**
```
pasta/*
!pasta/arquivo-importante.txt
```

**Parar de ignorar um arquivo (negação):**
```
!arquivo-importante.log
```

### 🔓 Forçar rastreamento de arquivo ignorado

```bash
git add -f arquivo-ignorado.txt
```

---

## 🗑️ 16. Removendo Arquivo do Rastreamento

### 🧹 Remover tudo que está no .gitignore
> Limpa arquivos que deveriam estar ignorados.

```bash
git rm -r --cached .
```

### ➕ Rerastrear conforme .gitignore
> Rerastreia arquivos respeitando .gitignore.

```bash
git add .
```

### 💾 Fazer commit da limpeza
> Salva as mudanças de rastreamento.

```bash
git commit -m "Remove arquivos ignorados"
```

---

## 🎯 17. Workflow Básico - Resumo Executivo

### 1️⃣ Clonar ou Criar Repositório

```bash
git clone https://github.com/usuario/repo.git
# OU
git init
```

### 2️⃣ Criar Branch de Feature

```bash
git checkout -b feature/nova-funcionalidade
```

### 3️⃣ Fazer Mudanças e Commits

```bash
git add .
git commit -m "Implementa nova funcionalidade"
```

### 4️⃣ Fazer Push para Servidor

```bash
git push -u origin feature/nova-funcionalidade
```

### 5️⃣ Criar Pull Request no GitHub

- 🌐 Vá ao GitHub
- 🆕 Clique em **"New Pull Request"**
- 🔀 Selecione branches para comparar
- 📝 Adicione descrição e clique **"Create PR"**

### 6️⃣ Após Aprovação, Merge no GitHub

- ✅ Clique em **"Merge Pull Request"**
- 🗑️ Delete a branch remota (opcional)

### 7️⃣ Atualizar Repositório Local

```bash
git checkout main
git pull origin main
git branch -d feature/nova-funcionalidade
```

---

## ✨ 18. Boas Práticas Git

### ✅ SEMPRE:

- ✔️ Usar commits com **mensagens descritivas**
- ✔️ Fazer commits **pequenos e frequentes** (não mega-commits)
- ✔️ Sempre fazer **pull antes de push**
- ✔️ Criar **branches para novas features**
- ✔️ Usar **nomes significativos** para branches

### ❌ NUNCA:

- ❌ Fazer commit em **main/master sem revisar**
- ❌ Usar apenas **"fix" ou "update"** como mensagem
- ❌ Fazer **força push em repositório compartilhado** (`git push -f`)
- ❌ **Commitar credenciais ou senhas**
- ❌ **Ignorar conflitos de merge**

### 📋 Estrutura de Commits

```
[tipo]: descrição breve (até 50 caracteres)
```

**Tipos comuns:**

| Tipo | Descrição |
|------|-----------|
| `feat` | 🆕 Nova funcionalidade |
| `fix` | 🐛 Correção de bug |
| `docs` | 📚 Alterações em documentação |
| `style` | 🎨 Mudanças de formatação |
| `refactor` | ♻️ Refatoração de código |
| `test` | ✅ Adição ou alteração de testes |
| `chore` | 🔧 Tarefas de manutenção |

**Exemplos:**

```bash
git commit -m "feat: adiciona autenticação de dois fatores"
git commit -m "fix: corrige erro de validação de email"
git commit -m "docs: atualiza README com instruções"
```

---

## 🔧 19. Troubleshooting (Resolvendo Problemas)

### ❓ PROBLEMA: Esqueci o que mudei

**✅ SOLUÇÃO:**
```bash
git diff
```

---

### ❓ PROBLEMA: Cometi erro no último commit

**✅ SOLUÇÃO:**
```bash
git commit --amend -m "Nova mensagem"
```

---

### ❓ PROBLEMA: Fiz mudanças em branch errada

**✅ SOLUÇÃO:**
```bash
git stash
git checkout branch-correta
git stash pop
```

---

### ❓ PROBLEMA: Deletei uma branch importante

**✅ SOLUÇÃO:**
```bash
git reflog  # encontra commits órfãos
```

---

### ❓ PROBLEMA: Fiz push com erro na mensagem

**✅ SOLUÇÃO:**
```bash
git push --force-with-lease  # reescreve com cuidado
```

---

### ❓ PROBLEMA: Tenho conflitos ao fazer pull

**✅ SOLUÇÃO:**
```bash
git pull
# (resolver conflitos nos arquivos)
git add .
git commit -m "Resolve conflitos"
```

---

### ❓ PROBLEMA: Quero voltar para um commit anterior

**✅ SOLUÇÃO:**
```bash
git revert <hash>  # cria novo commit desfazendo
```

---

## 💡 20. Comandos Git Úteis e Avançados

### 🔎 Procurar em qual commit uma linha foi adicionada

```bash
git blame arquivo.txt
```

### 📊 Ver mudanças entre duas branches

```bash
git diff branch1 branch2
```

### 📊 Ver mudanças entre dois commits

```bash
git diff <hash1> <hash2>
```

### 🔍 Procurar por padrão no histórico

```bash
git log -S "padrão"
```

### 🔍 Procurar por mensagem de commit

```bash
git log --grep="palavra-chave"
```

### 👤 Procurar commit por autor

```bash
git log --author="Nome Autor"
```

### 📅 Ver commits em um período

```bash
git log --since="2 weeks ago"
git log --until="2023-01-01"
```

### 📦 Criar arquivo pátch para compartilhar

```bash
git format-patch main..feature
```

### 📦 Aplicar arquivo pátch

```bash
git apply arquivo.patch
```

### 🔄 Buscar mudanças de branches remotas

```bash
git fetch origin
```

### 🔄 Atualizar branch local com remoto (sem merge)

```bash
git pull --rebase
```

### 🔗 Combinar múltiplos commits em um

```bash
git rebase -i HEAD~3
```

### 📋 Listar todos os branches com último commit

```bash
git branch -v
```

---

## 📋 Resumo Rápido

### ⚙️ Configuração

```bash
git config --global user.name "Nome"
git config --global user.email "email@example.com"
```

### 📦 Criar/Clonar

```bash
git init                  # Criar novo repositório
git clone <url>          # Clonar repositório existente
```

### ✏️ Mudanças

```bash
git status               # Ver status
git add .                # Adicionar tudo
git commit -m "msg"      # Fazer commit
git push                 # Enviar para servidor
```

### 🌿 Branches

```bash
git branch               # Listar branches
git checkout -b novo     # Criar e mudar para branch
git checkout nome        # Mudar de branch
git merge nome           # Fazer merge de branch
git branch -d nome       # Deletar branch
```

### 🌐 Remoto

```bash
git pull                 # Atualizar com servidor
git push                 # Enviar para servidor
git fetch                # Baixar do servidor (sem merge)
```

### 📜 Histórico

```bash
git log                  # Ver histórico
git log --oneline        # Ver histórico resumido
git show <hash>          # Ver detalhes do commit
```

---

## 🎓 Dicas Extras

> 💡 **Personalize seus aliases Git para trabalhar mais rápido:**

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual 'log --oneline --graph --all'
```

Depois você pode usar:
```bash
git st          # ao invés de git status
git co -b novo  # ao invés de git checkout -b novo
git br -a       # ao invés de git branch -a
```

---

<div align="center">

### 🎉 Fim do Guia

**Parabéns! Você agora domina os principais comandos do Git e GitHub!**

Boa codificação! 🚀

</div>