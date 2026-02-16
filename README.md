# 🚀 FullStackHubLabs — Automated Tech Discovery Hub

> **"Projetos reais resolvem problemas reais."** Este não é apenas mais um site de vídeos; é um ecossistema autossustentável de curadoria para desenvolvedores, movido por automação inteligente e arquitetura de alto nível.

---

## 📌 Visão Geral

O **FullStackHubLabs** é uma plataforma viva projetada para auxiliar aprendizes e experts na jornada Full Stack. O projeto resolve o problema da curadoria de conteúdo manual através de um robô de **Discovery** que identifica, valida e categoriza conteúdos técnicos relevantes de forma 100% autônoma.

---

## 🛠️ Tech Stack & Infraestrutura

| Camada | Tecnologia |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router - Server First) |
| **Linguagem** | TypeScript (Strict Mode) |
| **ORM** | Prisma 7.0+ [cite: 2026-02-16] |
| **Database** | PostgreSQL (Neon.tech) |
| **Estilização** | Tailwind CSS + Shadcn-ui |
| **IA/LLM** | Google Gemini API (Curadoria de Conteúdo) |
| **Automação** | GitHub Actions (Scheduled Sync) |
| **Hosting** | Vercel (ISR & Edge Functions) |

---

## 🏗️ Engenharia e Arquitetura

O projeto foi construído sobre os pilares da **Clean Architecture** e princípios **SOLID**, garantindo que a regra de negócio seja independente de frameworks e fácil de testar.

### Principais Diferenciais Técnicos:
* **Server Components First:** Maximização do uso de componentes de servidor para performance bruta e SEO otimizado.
* **Discovery Bot (Agentic Workflow):** Pipeline automatizado que utiliza a API do Gemini para atuar como curador técnico, filtrando apenas o que é relevante para a stack Full Stack.
* **On-Demand Revalidation:** Integração via Webhook entre GitHub Actions e Vercel, permitindo que o cache seja limpo instantaneamente após cada descoberta do robô (ISR).
* **Escalabilidade:** Banco de dados serverless na Neon.tech com Connection Pooling configurado.

---

## 🤖 O Ciclo de Vida da Automação

1.  **Trigger:** O GitHub Actions dispara a cada 30 minutos.
2.  **Discovery:** O robô varre fontes externas e utiliza IA para extrair metadados e categorizar os vídeos.
3.  **Persistência:** O Prisma realiza um *upsert* inteligente para garantir dados únicos e íntegros.
4.  **Instant Update:** O pipeline envia um sinal para a Vercel revalidar as páginas, atualizando o frontend em tempo real.

---

## 🚀 Configuração Local

1.  **Clone e Instale:**
    ```bash
    git clone [https://github.com/danielriegoor/FullStackHubLabs.git](https://github.com/danielriegoor/FullStackHubLabs.git)
    pnpm install
    ```
2.  **Variáveis de Ambiente:**
    Configure o `.env` com `DATABASE_URL` e `API_KEY`. 
3.  **Banco de Dados:**
    ```bash
    npx prisma generate
    npx prisma migrate dev
    ``` 
4.  **Start:**
    ```bash
    pnpm dev
    ``` 

---

## 📊 Dashboard de Monitoramento
O sistema inclui uma área administrativa para acompanhar o volume de descobertas da IA e a saúde das sincronizações, demonstrando a robustez da infraestrutura. [cite: 2026-02-16]

---

**Desenvolvido com foco em excelência técnica por Daniel Riego.**
