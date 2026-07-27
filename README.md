# 🏗️ Castilho - Controle de Estoque & Almoxarifado

Aplicação Web completa e moderna para controle de estoque, ferramentas e almoxarifado da **Castilho**, com controle de permissões por usuário, gestão de assinaturas via Mercado Pago, geração de relatórios e suporte PWA offline.

---

## 🔗 Links Oficiais

- **GitHub Repositório:** [castilho-controle-de-estoque-](https://github.com/eullon1234-creator/castilho-controle-de-estoque-)
- **Link do App (GitHub Pages):** [Abrir Castilho Estoque](https://eullon1234-creator.github.io/castilho-controle-de-estoque-/)
- **Hospedagem Netlify:** Configurado via `netlify.toml` e `_redirects`

---

## 🎯 O que o Sistema Faz

O **Castilho - Controle de Estoque** foi projetado para gestão rápida de canteiros de obras e almoxarifados centrais:

- 📦 **Cadastro & Gestão de Itens:** Produtos, categorias, unidades de medida e localização.
- 📥 **Entradas com Nota Fiscal:** Registro completo de compras, fornecedores e custo unitário.
- 📤 **Saídas & Aplicação:** Baixa de material por responsável, obra/local e departamento.
- 📋 **Requisições de Material:** Fluxo completo de solicitações e aprovação de materiais.
- 🛡️ **Painel do Administrador (Diego):** Aprovação de funcionários, edição de permissões individuais (`Dar Entrada`, `Editar`, `Excluir`, `Requisições`) e gestão de contas.
- 💳 **Planos & Assinatura Mercado Pago (PIX):** Sistema integrado de assinatura (R$ 45,00/mês, R$ 115,00/trimestral, R$ 210,00/semestral, R$ 380,00/anual) com ativação automática instantânea.
- 📲 **Suporte PWA Offline:** Funciona no celular e computador como aplicativo instalável.

---

## 🛠️ Tecnologias Utilizadas

- **Front-end:** HTML5, Tailwind CSS, Vanilla JS (ES Modules)
- **Banco de Dados:** Firebase Firestore (Cloud Database)
- **Pagamentos:** Mercado Pago REST API v1 (PIX & Checkout)
- **Exportação:** PDF (`jspdf`, `html2pdf`) e Excel (`xlsx-js-style`)
- **PWA:** Service Worker v2.2, Web App Manifest

---

## 🚀 Como Executar Localmente

1. Clone este repositório:
```bash
git clone https://github.com/eullon1234-creator/castilho-controle-de-estoque-.git
```

2. Abra a pasta no seu editor (ex.: VS Code).

3. Inicie um servidor local HTTP simples:
```bash
python -m http.server 8080
```
Ou use a extensão **Live Server** no VS Code.

4. Acesse no seu navegador: `http://localhost:8080/index.html`

---

## 🌐 Configuração do GitHub Pages

1. Acesse o seu repositório no GitHub: `https://github.com/eullon1234-creator/castilho-controle-de-estoque-`
2. Vá em **Settings** > **Pages**.
3. Em **Build and deployment** > **Source**, selecione `Deploy from a branch` (ou `GitHub Actions`).
4. Selecione a branch `main` e a pasta `/(root)`.
5. Clique em **Save**. O link público será gerado em:  
   `https://eullon1234-creator.github.io/castilho-controle-de-estoque-/`

---

© Castilho - Todos os direitos reservados.
