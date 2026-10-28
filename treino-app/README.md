# Pulso — treinos no seu ritmo

WebApp responsivo para organizar fichas de musculação, acompanhar cargas e registrar feedback após cada sessão. O modo local funciona sem configuração; Firebase habilita contas e sincronização, e uma Cloud Function consulta o Gemini sem expor a chave da API no navegador.

## Rodar localmente

Requer Node.js 22 ou superior.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Sem credenciais, a aplicação usa dados demonstrativos salvos apenas neste navegador. Para ativar login e sincronização, preencha `.env.local` com as credenciais do app Web do Firebase.

## Configurar Firebase e Gemini

1. Crie um projeto no Firebase e registre um app Web.
2. Em **Authentication**, habilite os provedores E-mail/senha e Google.
3. Crie o banco Firestore em modo de produção.
4. Copie os valores da configuração Web para `.env.local`:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_APP_ID`
5. Instale e autentique a Firebase CLI, selecione o projeto e configure a chave do Gemini como Secret Manager:

   ```bash
   npm install --global firebase-tools
   firebase login
   firebase use --add
   firebase functions:secrets:set GEMINI_API_KEY
   ```

6. Instale as dependências da função e publique regras e função:

   ```bash
   cd functions
   npm install
   cd ..
   firebase deploy --only firestore:rules,functions
   ```

A função `generateWorkout` exige usuário autenticado, valida o tamanho e o tipo de imagem e chama o Gemini no servidor. A chave `GEMINI_API_KEY` fica no Secret Manager; nunca a coloque em variáveis `VITE_*`. A geração de ciclos usa a região `southamerica-east1`.

As regras em `firestore.rules` limitam cada usuário ao próprio documento em `users/{uid}`. Não use regras abertas em produção. A configuração de Auth, Firestore, Functions e Gemini pode gerar custos conforme o uso e os limites dos respectivos serviços.

## Comandos

- `npm run dev` — servidor local
- `npm run lint` — análise estática da aplicação
- `npm run build` — build de produção
- `cd functions && npm run lint` — análise estática da Cloud Function
