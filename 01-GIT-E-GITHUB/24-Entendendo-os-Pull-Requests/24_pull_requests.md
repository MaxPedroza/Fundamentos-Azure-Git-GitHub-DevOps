# Entendendo os Pull Requests (PRs)

O **Pull Request** é a forma de dizer: "Ei, terminei meu trabalho nessa branch. Vocês podem revisar e puxar (pull) minhas alterações para a branch principal?"

---

## 🔄 O Fluxo do PR

1.  Você cria uma branch (`feature/nova-tela`).
2.  Faz seus commits e envia para o GitHub (`git push origin feature/nova-tela`).
3.  No site do GitHub, aparecerá um botão **"Compare & pull request"**.
4.  Você clica, escreve uma descrição do que fez e cria o PR.

---

## 🛡️ Por que usar PRs?

- **Code Review:** Permite que colegas leiam seu código antes dele entrar no projeto oficial. Eles podem encontrar bugs ou sugerir melhorias.
- **Segurança:** Evita que código quebrado vá direto para a produção.
- **Documentação:** A discussão no PR fica salva para sempre, explicando _por que_ aquela mudança foi feita.
- **CI/CD:** Geralmente, testes automatizados rodam no PR para garantir que nada quebrou.
