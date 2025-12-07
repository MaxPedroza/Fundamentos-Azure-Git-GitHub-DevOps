# 🚀 Projeto de Portfólio: Automação e CI/CD com Azure, Git e GitHub

Este repositório documenta a aplicação prática dos fundamentos de **Azure, Git, GitHub e princípios de DevOps** no projeto do curso. O foco principal é demonstrar a capacidade de **versionar, autenticar e automatizar a publicação (deploy) de aplicações no Microsoft Azure utilizando o GitHub Actions para Integração e Entrega Contínua (CI/CD).**

---

## 💡 Habilidades Demonstrais

Os principais tópicos e habilidades técnicas aplicadas neste projeto incluem:

* **Controle de Versão:** Domínio do fluxo de trabalho Git (Branching, Commit, Merge, Pull Requests).
* **Gestão de Credenciais:** Criação segura de **Service Principal** (Azure AD SPN) para autenticação não interativa no Azure.
* **Infraestrutura como Código (IaC) e CLI:** Gestão de recursos Azure (SQL Server, Firewall) via **Azure CLI (`az`)**.
* **Integração Contínua/Entrega Contínua (CI/CD):** Configuração de Pipelines automatizadas utilizando **GitHub Actions**.
* **Segurança:** Implementação de regras de Firewall no Azure SQL Server.

---

## ☁️ Automação com Azure CLI

O projeto utilizou a **Azure CLI** para provisionamento e gestão de recursos. Abaixo estão os comandos-chave executados e seus respectivos propósitos no pipeline de automação:

### 1. Criação e Gestão de Credenciais (Service Principal)
Este comando é essencial para permitir que o GitHub Actions se autentique no Azure com a permissão necessária (`contributor`) em um grupo de recursos específico.

```bash
# Comando para gerar a Service Principal e as credenciais JSON (saída sdk-auth)
az ad sp create-for-rbac --name "2812demo-ci-cd-spn" --role contributor --scopes /subscriptions/<<SUBSCRIPTION>>/resourceGroups/blog --sdk-auth