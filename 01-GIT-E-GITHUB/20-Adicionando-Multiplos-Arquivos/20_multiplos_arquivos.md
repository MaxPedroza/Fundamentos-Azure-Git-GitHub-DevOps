# Adicionando Múltiplos Arquivos

Em projetos reais, você raramente adiciona um arquivo por vez. Você geralmente trabalha em vários arquivos e quer salvar tudo junto.

---

## 📦 O "Ponto" Mágico

Para adicionar **todos** os arquivos modificados, deletados ou criados na pasta atual (e subpastas) para a Staging Area de uma vez só:

```bash
git add .
```

O ponto `.` representa "o diretório atual".

---

## ⚠️ Cuidados

O `git add .` é muito prático, mas perigoso se você não prestar atenção.

- Sempre rode `git status` **antes** para ver o que mudou.
- Sempre rode `git status` **depois** para confirmar o que foi adicionado.

Se você adicionar algo por engano (como uma senha ou arquivo de configuração local), você pode removê-lo da Staging Area com:

```bash
git restore --staged nome-do-arquivo
```
