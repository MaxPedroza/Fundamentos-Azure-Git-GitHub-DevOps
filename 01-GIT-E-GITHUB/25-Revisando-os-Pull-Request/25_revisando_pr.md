# Revisando os Pull Requests

A revisão de código (Code Review) é uma das práticas mais importantes para manter a qualidade de um software.

---

## 🧐 Como revisar um PR

Ao abrir um Pull Request no GitHub, vá para a aba **Files changed**.

1.  **Leia o código:** Veja o que foi adicionado (verde) e removido (vermelho).
2.  **Comente:** Se vir algo errado ou tiver uma dúvida, clique no número da linha e deixe um comentário.
3.  **Sugira mudanças:** Você pode sugerir uma correção de código direto no comentário. O autor pode aceitar com um clique.

---

## ✅ Aprovando ou Reprovando

No botão **Review changes** (canto superior direito):

- **Comment:** Apenas deixa comentários gerais, sem aprovar ou bloquear.
- **Approve:** Diz que o código está bom e pode ser mergeado.
- **Request changes:** Bloqueia o merge até que o autor corrija os problemas apontados.

---

## 🔀 Fazendo o Merge

Se o PR foi aprovado e os testes passaram, o botão **Merge pull request** ficará verde.
Ao clicar, o GitHub junta o código da branch na `main` e fecha o PR.
