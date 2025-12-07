# Git e GitHub - Guia Completo

Git é um sistema de controle de versão distribuído que permite rastrear mudanças em código. GitHub é uma plataforma web que hospeda repositórios Git e facilita a colaboração entre desenvolvedores.

---

## 1. Configuração Inicial do Git

Configurar nome do usuário (usado em commits).
Este nome aparecerá em todo commit que você fazer.

```bash
git config --global user.name "Seu Nome"
```

Configurar email (usado em commits).
Este email aparecerá em todo commit que você fazer.

```bash
git config --global user.email "seu.email@exemplo.com"
```

Verificar configurações atuais.
Exibe o nome e email configurados.

```bash
git config --list
```

Configurar editor padrão (opcional).
Define qual editor será usado quando Git precisar editar algo.

```bash
git config --global core.editor "code"
```

---

## 2. Criando um Novo Repositório Git

Criar um novo repositório Git localmente.
Cria uma pasta oculta .git que armazena todo o histórico.

```bash
git init
```

Clonar um repositório existente do GitHub.
Baixa uma cópia completa do repositório remoto.

```bash
git clone https://github.com/usuario/nome-repo.git
```

Clonar para uma pasta com nome específico.
Clona o repositório em uma pasta com nome diferente.

```bash
git clone https://github.com/usuario/nome-repo.git meu-projeto
```

---

## 3. Status e Visualização

Verificar o status do repositório.
Mostra arquivos modificados, adicionados ou não rastreados.

```bash
git status
```

Verificar o status de forma resumida.
Mostra status com menos detalhes (mais conciso).

```bash
git status -s
```

Ver diferenças entre seu código e a última versão commitada.
Mostra o que foi modificado em cada arquivo.

```bash
git diff
```

Ver diferenças entre staged e uncommitted.
Mostra o que está pronto para ser commitado.

```bash
git diff --staged
```

Ver histórico de commits (últimos 10).
Exibe log dos commits com mensagens, autor e data.

```bash
git log
```

Ver histórico mais detalhado.
Mostra cada linha modificada em cada commit.

```bash
git log -p
```

Ver histórico em uma linha (mais conciso).
Resumido: hash abreviado, mensagem, autor, data.

```bash
git log --oneline
```

Ver histórico de uma forma visual/gráfica.
Mostra o histórico com branches de forma visual.

```bash
git log --oneline --graph --all
```

Ver histórico de um arquivo específico.
Mostra todos os commits que modificaram um arquivo.

```bash
git log -- arquivo.txt
```

Ver mudanças feitas por um commit específico.
Mostra o que foi alterado naquele commit específico.

```bash
git show <hash-do-commit>
```

---

## 4. Adicionando e Commitando Mudanças

Adicionar um arquivo específico para o staging area (preparar).
Marca o arquivo para ser incluído no próximo commit.

```bash
git add arquivo.txt
```

Adicionar múltiplos arquivos específicos.
Marca vários arquivos para serem incluídos no próximo commit.

```bash
git add arquivo1.txt arquivo2.txt
```

Adicionar todos os arquivos modificados.
Marca todos os arquivos alterados para o próximo commit.

```bash
git add .
```

Adicionar apenas arquivos de um tipo específico.
Marca apenas arquivos com extensão específica.

```bash
git add *.js
```

Adicionar interativamente (escolher quais mudanças adicionar).
Permite escolher quais partes de cada arquivo adicionar.

```bash
git add -i
```

Visualizar o que está no staging area.
Mostra quais arquivos estão preparados para commit.

```bash
git diff --staged
```

Remover um arquivo do staging area (desfazer add).
Remove o arquivo da área de preparação sem apagar.

```bash
git reset arquivo.txt
```

Remover todos os arquivos do staging area.
Remove tudo que foi adicionado com git add.

```bash
git reset
```

Fazer um commit (salvar snapshot das mudanças).
Cria um ponto de salvamento com mensagem descritiva.

```bash
git commit -m "Mensagem descritiva do commit"
```

Fazer commit de forma mais interativa (abre editor).
Abre editor para escrever mensagem mais longa.

```bash
git commit
```

Fazer commit e adicionar arquivos ao mesmo tempo.
Combina git add . e git commit em um comando.

```bash
git commit -am "Mensagem do commit"
```

Adicionar mudanças ao último commit (sem criar novo).
Modifica o último commit ao invés de criar um novo.

```bash
git commit --amend -m "Nova mensagem"
```

Adicionar mudanças ao último commit mantendo a mensagem.
Modifica o último commit sem mudar a mensagem.

```bash
git commit --amend --no-edit
```

---

## 5. Trabalhando com Branches

Ver todas as branches (locais).
Lista todas as branches que existem no seu repositório local.

```bash
git branch
```

Ver todas as branches (incluindo remotas).
Mostra branches locais e do servidor remoto.

```bash
git branch -a
```

Ver apenas as branches remotas.
Mostra apenas branches que estão no GitHub/servidor remoto.

```bash
git branch -r
```

Criar uma nova branch.
Cria uma nova branch baseada na branch atual.

```bash
git branch nome-da-branch
```

Criar e mudar para uma nova branch (em um comando).
Cria a branch e já muda para ela.

```bash
git checkout -b nome-da-branch
```

Criar nova branch a partir de uma branch específica.
Cria branch baseada em outra branch que não a atual.

```bash
git checkout -b nome-da-branch nome-da-branch-origem
```

Mudar para uma branch existente.
Alterna para outra branch do repositório.

```bash
git checkout nome-da-branch
```

Mudar para a branch anterior.
Volta para a branch que você estava antes.

```bash
git checkout -
```

Renomear a branch atual.
Renomeia a branch em que você está.

```bash
git branch -m novo-nome
```

Renomear uma branch específica.
Renomeia qualquer branch sem precisar estar nela.

```bash
git branch -m nome-antigo novo-nome
```

Deletar uma branch local.
Remove a branch do repositório local.

```bash
git branch -d nome-da-branch
```

Forçar deletar uma branch local (mesmo se não foi mergeada).
Remove branch forçadamente sem verificações.

```bash
git branch -D nome-da-branch
```

Deletar uma branch remota.
Remove a branch do GitHub/servidor remoto.

```bash
git push origin --delete nome-da-branch
```

Ver informações sobre cada branch.
Mostra última mensagem de commit de cada branch.

```bash
git branch -v
```

---

## 6. Fusionando Branches (Merge)

Fazer merge de uma branch na branch atual.
Incorpora as mudanças de outra branch na atual.

```bash
git merge nome-da-branch
```

Fazer merge com mensagem customizada.
Faz merge e abre editor para escrever mensagem.

```bash
git merge nome-da-branch -m "Mensagem do merge"
```

Cancelar um merge em progresso.
Desfaz as mudanças do merge se houver conflitos.

```bash
git merge --abort
```

Ver branches já mergeadas na branch atual.
Mostra quais branches já foram incorporadas.

```bash
git branch --merged
```

Ver branches ainda não mergeadas.
Mostra quais branches ainda têm mudanças não incorporadas.

```bash
git branch --no-merged
```

---

## 7. Trabalhando com Remoto

Ver repositórios remotos configurados.
Mostra o nome dos servidores remotos (geralmente "origin").

```bash
git remote
```

Ver detalhes dos repositórios remotos.
Mostra URLs dos repositórios remotos.

```bash
git remote -v
```

Adicionar um novo repositório remoto.
Conecta seu repositório local com um servidor remoto.

```bash
git remote add <nome> <url>
```

Remover um repositório remoto.
Remove a conexão com um repositório remoto.

```bash
git remote remove <nome>
```

Renomear um repositório remoto.
Muda o nome de um repositório remoto (geralmente origin).

```bash
git remote rename <nome-antigo> <nome-novo>
```

Ver informações sobre um repositório remoto.
Mostra detalhes sobre branches e rastreamento remoto.

```bash
git remote show origin
```

Fazer push (enviar commits para o servidor).
Envia seus commits locais para o repositório remoto (GitHub).

```bash
git push origin <nome-da-branch>
```

Fazer push da branch atual.
Envia a branch atual para o repositório remoto.

```bash
git push
```

Fazer push e definir rastreamento da branch remota.
Envia branch e configura para rastrear a remota.

```bash
git push -u origin <nome-da-branch>
```

Fazer push de todas as branches.
Envia todas as branches locais para o servidor.

```bash
git push --all
```

Fazer push de tags.
Envia tags (versões marcadas) para o servidor.

```bash
git push --tags
```

Fazer push deletando uma branch remota.
Remove uma branch do servidor remoto.

```bash
git push origin --delete <nome-da-branch>
```

Fazer pull (baixar e mesclar commits do servidor).
Baixa mudanças do servidor e as incorpora na branch atual.

```bash
git pull
```

Fazer pull de uma branch específica.
Baixa mudanças de uma branch específica.

```bash
git pull origin <nome-da-branch>
```

Fazer fetch (apenas baixar sem mesclar).
Baixa mudanças do servidor mas não as incorpora automaticamente.

```bash
git fetch
```

Fazer fetch de todas as branches remotas.
Atualiza informações de todas as branches do servidor.

```bash
git fetch --all
```

Sincronizar com o servidor remoto.
Atualiza referências remotas sem mudar seu código.

```bash
git fetch origin
```

---

## 8. Resolvendo Conflitos

Ver arquivos com conflitos.
Mostra quais arquivos têm conflitos não resolvidos.

```bash
git status
```

Ver o conteúdo do arquivo com conflito.
Exibe o arquivo mostrando os conflitos.

```bash
cat arquivo-com-conflito.txt
```

Após resolver o conflito manualmente no editor.
Edite o arquivo removendo os marcadores de conflito (`<<<<<<`, `======`, `>>>>>>>`).

Adicionar o arquivo resolvido.
Marca o conflito como resolvido.

```bash
git add arquivo-com-conflito.txt
```

Finalizar o merge.
Completa o merge com um commit.

```bash
git commit -m "Merge resolvido"
```

Cancelar um merge em caso de conflitos.
Desfaz o merge se quiser começar de novo.

```bash
git merge --abort
```

---

## 9. Desfazendo Mudanças

Descartar mudanças em um arquivo não adicionado.
Reverte o arquivo para a última versão commitada.

```bash
git checkout -- arquivo.txt
```

Descartar mudanças em todos os arquivos não adicionados.
Reverte todos os arquivos para a versão commitada.

```bash
git checkout -- .
```

Remover um arquivo do staging area.
Remove arquivo que foi adicionado com git add.

```bash
git reset arquivo.txt
```

Remover todos os arquivos do staging area.
Remove tudo que foi adicionado para commit.

```bash
git reset
```

Desfazer o último commit (mantém as mudanças).
O commit é desfeito mas as mudanças permanecem localmente.

```bash
git reset --soft HEAD~1
```

Desfazer o último commit (mantém as mudanças no disco).
O commit é desfeito, mudanças estão modificadas mas não staged.

```bash
git reset --mixed HEAD~1
```

Desfazer o último commit (descarta tudo).
O commit é completamente desfeito e mudanças são perdidas.

```bash
git reset --hard HEAD~1
```

Desfazer os últimos N commits.
Desfaz múltiplos commits (substitua N pelo número).

```bash
git reset --soft HEAD~N
```

Reverter um commit específico (cria novo commit).
Cria um novo commit que desfaz as mudanças do commit especificado.

```bash
git revert <hash-do-commit>
```

Reverter os últimos N commits.
Cria novos commits que desfazem os últimos N commits.

```bash
git revert HEAD~N..HEAD
```

Listar commits para encontrar qual descartar.
Mostra o hash de cada commit para você escolher qual desfazer.

```bash
git log --oneline
```

---

## 10. Limpeza e Manutenção

Remover arquivos não rastreados (dry-run, apenas visualizar).
Mostra quais arquivos seriam removidos.

```bash
git clean -n
```

Remover arquivos não rastreados.
Deleta arquivos não adicionados ao git.

```bash
git clean -f
```

Remover pastas não rastreadas também.
Deleta pastas e arquivos não rastreados.

```bash
git clean -fd
```

Remover arquivos ignorados também.
Deleta arquivos ignorados no .gitignore.

```bash
git clean -fdx
```

Compactar o banco de dados do git (otimizar).
Melhora performance limpando informações redundantes.

```bash
git gc
```

Verificar integridade do repositório.
Verifica se não há corrupção nos dados.

```bash
git fsck
```

---

## 11. Stashing (Guardar Mudanças Temporárias)

Guardar mudanças temporárias sem commitá-las.
Salva mudanças em uma pilha temporária.

```bash
git stash
```

Guardar mudanças com nome descritivo.
Salva mudanças com um nome para fácil identificação.

```bash
git stash save "nome-descritivo"
```

Listar todos os stashes.
Mostra todos os conjuntos de mudanças guardadas.

```bash
git stash list
```

Aplicar o último stash.
Recupera o conjunto de mudanças mais recente.

```bash
git stash apply
```

Aplicar um stash específico.
Recupera um conjunto de mudanças específico.

```bash
git stash apply stash@{0}
```

Aplicar e remover o stash.
Recupera o stash e o remove da lista.

```bash
git stash pop
```

Remover um stash sem aplicar.
Deleta um stash sem recuperar as mudanças.

```bash
git stash drop stash@{0}
```

Remover todos os stashes.
Deleta todos os stashes armazenados.

```bash
git stash clear
```

Ver o conteúdo de um stash.
Mostra quais mudanças estão naquele stash.

```bash
git stash show stash@{0}
```

---

## 12. Tags (Marcação de Versões)

Criar uma tag (marcação de versão).
Marca um ponto específico no histórico como versão importante.

```bash
git tag v1.0.0
```

Criar uma tag anotada (com mensagem).
Cria uma tag com descrição e informações adicionais.

```bash
git tag -a v1.0.0 -m "Versão 1.0.0"
```

Ver todas as tags.
Lista todas as tags existentes.

```bash
git tag
```

Ver informações sobre uma tag específica.
Mostra detalhes de uma tag em particular.

```bash
git show v1.0.0
```

Deletar uma tag local.
Remove uma tag do repositório local.

```bash
git tag -d v1.0.0
```

Deletar uma tag remota.
Remove uma tag do servidor remoto.

```bash
git push origin --delete v1.0.0
```

Fazer push de uma tag.
Envia uma tag para o servidor.

```bash
git push origin v1.0.0
```

Fazer push de todas as tags.
Envia todas as tags para o servidor.

```bash
git push origin --tags
```

Criar tag a partir de um commit anterior.
Marca um commit que não é o mais recente.

```bash
git tag v1.0.0 <hash-do-commit>
```

---

## 13. Rebase (Reorganizar Commits)

Fazer rebase da branch atual sobre outra branch.
Reorganiza commits colocando-os em cima de outra branch.

```bash
git rebase <nome-da-branch>
```

Fazer rebase interativo dos últimos N commits.
Permite editar, combinar ou reordenar commits.

```bash
git rebase -i HEAD~N
```

Continuar um rebase interrompido.
Continua o rebase após resolver conflitos.

```bash
git rebase --continue
```

Cancelar um rebase em progresso.
Desfaz o rebase se quiser começar de novo.

```bash
git rebase --abort
```

Pular um commit durante rebase.
Ignora um commit durante o rebase.

```bash
git rebase --skip
```

---

## 14. Criando e Gerenciando Arquivos

Criar um arquivo novo.
Cria um arquivo que será rastreado pelo git.

```bash
echo "conteúdo" > novo-arquivo.txt
```

Criar uma pasta.
Cria um diretório para organizar arquivos.

```bash
mkdir nome-da-pasta
```

Criar arquivo dentro da pasta.
Cria arquivo em um diretório específico.

```bash
echo "conteúdo" > nome-da-pasta/arquivo.txt
```

Renomear arquivo (e rastrear mudança).
Renuncia o arquivo e git detecta automaticamente.

```bash
git mv arquivo-antigo.txt arquivo-novo.txt
```

Mover arquivo para outra pasta.
Move arquivo mantendo rastreamento do git.

```bash
git mv arquivo.txt pasta/arquivo.txt
```

Deletar arquivo (e rastrear mudança).
Remove arquivo e git detecta a deleção.

```bash
git rm arquivo.txt
```

Deletar pasta com todos seus arquivos.
Remove pasta inteira do rastreamento.

```bash
git rm -r pasta-inteira/
```

Parar de rastrear arquivo sem deletar.
Remove do git mas mantém o arquivo no disco.

```bash
git rm --cached arquivo.txt
```

---

## 15. Arquivo .gitignore

O arquivo `.gitignore` especifica quais arquivos NÃO devem ser rastreados.

Criar arquivo .gitignore.
Lista padrões de arquivos a ignorar.

```bash
echo "node_modules/" >> .gitignore
```

### Exemplos de padrões para .gitignore:

Ignorar uma pasta específica:

```
node_modules/
```

Ignorar arquivos de um tipo específico:

```
*.log
*.tmp
*.obj
```

Ignorar arquivos de sistema:

```
.DS_Store
Thumbs.db
```

Ignorar arquivos de ambiente:

```
.env
.env.local
```

Ignorar pastas de build/compilação:

```
dist/
build/
out/
```

Ignorar arquivos de IDE:

```
.vscode/
.idea/
*.swp
```

Ignorar tudo em uma pasta EXCETO um arquivo:

```
pasta/*
!pasta/arquivo-importante.txt
```

Parar de ignorar um arquivo (negação):

```
!arquivo-importante.log
```

Forçar rastreamento de arquivo ignorado:

```bash
git add -f arquivo-ignorado.txt
```

---

## 16. Removendo Arquivo do Rastreamento

Remover do rastreamento tudo que está no .gitignore.
Limpa arquivos que deveriam estar ignorados.

```bash
git rm -r --cached .
```

Adicionar de novo conforme .gitignore.
Rerastreia arquivos respeitando .gitignore.

```bash
git add .
```

Fazer commit da limpeza.
Salva as mudanças de rastreamento.

```bash
git commit -m "Remove arquivos ignorados"
```

---

## 17. Workflow Básico - Resumo Executivo

### 1. Clonar ou Criar Repositório

```bash
git clone https://github.com/usuario/repo.git
# OU
git init
```

### 2. Criar Branch de Feature

```bash
git checkout -b feature/nova-funcionalidade
```

### 3. Fazer Mudanças e Commits

```bash
git add .
git commit -m "Implementa nova funcionalidade"
```

### 4. Fazer Push para Servidor

```bash
git push -u origin feature/nova-funcionalidade
```

### 5. Criar Pull Request no GitHub

- Vá ao GitHub
- Clique em "New Pull Request"
- Selecione branches para comparar
- Adicione descrição e clique "Create PR"

### 6. Após Aprovação, Merge no GitHub

- Clique em "Merge Pull Request"
- Delete a branch remota (opcional)

### 7. Atualizar Repositório Local

```bash
git checkout main
git pull origin main
git branch -d feature/nova-funcionalidade
```

---

## 18. Boas Práticas Git

### ✓ SEMPRE:

- Usar commits com mensagens descritivas
- Fazer commits pequenos e frequentes (não mega-commits)
- Sempre fazer pull antes de push
- Criar branches para novas features
- Usar nomes significativos para branches

### ✗ NUNCA:

- Fazer commit em main/master sem revisar
- Usar apenas "fix" ou "update" como mensagem
- Fazer força push em repositório compartilhado (`git push -f`)
- Commitar credenciais ou senhas
- Ignorar conflitos de merge

### Estrutura de Commits

```
[tipo]: descrição breve (até 50 caracteres)
```

**Tipos comuns:**

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Alterações em documentação
- `style`: Mudanças de formatação
- `refactor`: Refatoração de código
- `test`: Adição ou alteração de testes
- `chore`: Tarefas de manutenção

**Exemplos:**

```bash
git commit -m "feat: adiciona autenticação de dois fatores"
git commit -m "fix: corrige erro de validação de email"
git commit -m "docs: atualiza README com instruções"
```

---

## 19. Troubleshooting (Resolvendo Problemas)

### PROBLEMA: Esqueci o que mudei

**SOLUÇÃO:**

```bash
git diff
```

### PROBLEMA: Cometi erro no último commit

**SOLUÇÃO:**

```bash
git commit --amend -m "Nova mensagem"
```

### PROBLEMA: Fiz mudanças em branch errada

**SOLUÇÃO:**

```bash
git stash
git checkout branch-correta
git stash pop
```

### PROBLEMA: Deletei uma branch importante

**SOLUÇÃO:**

```bash
git reflog  # encontra commits órfãos
```

### PROBLEMA: Fiz push com erro na mensagem

**SOLUÇÃO:**

```bash
git push --force-with-lease  # reescreve com cuidado
```

### PROBLEMA: Tenho conflitos ao fazer pull

**SOLUÇÃO:**

```bash
git pull
# (resolver conflitos nos arquivos)
git add .
git commit -m "Resolve conflitos"
```

### PROBLEMA: Quero voltar para um commit anterior

**SOLUÇÃO:**

```bash
git revert <hash>  # cria novo commit desfazendo
```

---

## 20. Comandos Git Úteis e Avançados

Procurar em qual commit uma linha foi adicionada:

```bash
git blame arquivo.txt
```

Ver mudanças entre duas branches:

```bash
git diff branch1 branch2
```

Ver mudanças entre dois commits:

```bash
git diff <hash1> <hash2>
```

Procurar por padrão no histórico:

```bash
git log -S "padrão"
```

Procurar por mensagem de commit:

```bash
git log --grep="palavra-chave"
```

Procurar commit por autor:

```bash
git log --author="Nome Autor"
```

Ver commits em um período:

```bash
git log --since="2 weeks ago"
git log --until="2023-01-01"
```

Criar arquivo pátch para compartilhar mudanças:

```bash
git format-patch main..feature
```

Aplicar arquivo pátch:

```bash
git apply arquivo.patch
```

Buscar mudanças de branches remotas:

```bash
git fetch origin
```

Atualizar branch local com remoto (sem merge):

```bash
git pull --rebase
```

Combinar múltiplos commits em um:

```bash
git rebase -i HEAD~3
```

Listar todos os branches com último commit:

```bash
git branch -v
```

---

## Resumo Rápido

### Configuração

```bash
git config --global user.name "Nome"
git config --global user.email "email@example.com"
```

### Criar/Clonar

```bash
git init                  # Criar novo repositório
git clone <url>          # Clonar repositório existente
```

### Mudanças

```bash
git status               # Ver status
git add .                # Adicionar tudo
git commit -m "msg"      # Fazer commit
git push                 # Enviar para servidor
```

### Branches

```bash
git branch               # Listar branches
git checkout -b novo     # Criar e mudar para branch
git checkout nome        # Mudar de branch
git merge nome           # Fazer merge de branch
git branch -d nome       # Deletar branch
```

### Remoto

```bash
git pull                 # Atualizar com servidor
git push                 # Enviar para servidor
git fetch                # Baixar do servidor (sem merge)
```

### Histórico

```bash
git log                  # Ver histórico
git log --oneline        # Ver histórico resumido
git show <hash>          # Ver detalhes do commit
```

---

**Fim do Guia**