# Manguebras — E-commerce Premium

E-commerce de mangueiras automotivas para linha diesel: radiador, intercooler, turbina, filtro de ar, abraçadeiras e acessórios. Atende oficinas, autopeças, transportadoras e frotas em todo o Brasil.

## Stack

- **Next.js 16** (App Router, Server Components, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (tokens via `@theme` em `src/app/globals.css`)
- **shadcn/ui** · **Framer Motion** · **Lucide Icons**
- **React Hook Form + Zod** (formulários) · **Zustand** (carrinho persistido)

## Design System

Design aprovado pelo cliente: estilo marketplace em verde escuro. Cores oficiais extraídas do logotipo:

| Token | Hex | Uso |
|---|---|---|
| `brand-950` | `#05221E` | fundos hero/header/footer |
| `brand-900` | `#0A3B34` | cor principal (logo) |
| `brand-600` | `#0D665D` | secundária (logo) |
| `accent-500` | `#16AD98` | CTAs e destaques vibrantes |

Tipografia: **Montserrat** (display — fonte da marca) + **Inter** (corpo/UI).
Padrão de títulos: uppercase com a palavra-chave em verde vibrante.

## Funcionalidades

- **Homepage**: hero carrossel (3 slides, fotos reais com recorte via `mix-blend-multiply`), linhas de produto, destaques, autoridade com contadores, depoimentos, FAQ, CTA final, trust bar
- **Catálogo** (`/produtos`): filtros por categoria/linha via URL, ordenação, busca com acentos normalizados, chips removíveis, estado vazio → WhatsApp
- **Produto** (`/produtos/[slug]`): galeria com zoom + modal, buy box híbrido, tabs (descrição/specs/compatibilidade), relacionados, JSON-LD Product
- **Busca**: autocomplete instantâneo no header (nome, código, aplicação)
- **Carrinho**: qty, remoção, cupom (`BEMVINDO10` = 10%), cross-sell, orçamento via WhatsApp
- **Checkout**: máscaras (CEP/telefone/CPF-CNPJ), autofill ViaCEP, validação Zod, pedido formalizado via WhatsApp com resumo completo
- **Institucional**: sobre, contato (form → WhatsApp), FAQ (JSON-LD FAQPage), políticas
- **SEO**: sitemap dinâmico, robots, JSON-LD AutoPartsStore, Open Graph, metadata por página

## Modelo de venda (híbrido)

- Produto **com preço** → carrinho + checkout
- Produto **sem preço** → "Solicitar orçamento" via WhatsApp (ex.: Kit de Juntas, cód. 4013)

## Integrações preparadas (ativar via `.env.local`)

Copie `.env.example` → `.env.local` e preencha:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — Google Analytics 4
- `NEXT_PUBLIC_GTM_ID` — Google Tag Manager
- `NEXT_PUBLIC_META_PIXEL_ID` — Meta Pixel
- `MERCADOPAGO_ACCESS_TOKEN` — ver instruções em `src/services/mercadopago.ts`

## Catálogo

`src/data/products.ts` tem **19 SKUs curados** com fotos reais do acervo (nomeados por análise visual). O acervo completo (3.883 fotos por código) está em `_materiais/` (fora do git). Quando a planilha do ERP chegar (código → nome/preço/aplicação), basta gerar novos registros no mesmo formato.

> Os depoimentos da homepage são exemplos representativos — substituir por depoimentos reais dos clientes.

## Importar catálogo do ERP

Quando a planilha chegar (CSV com `codigo;nome;preco;categoria;linhas;descricao;aplicacao;relacionados`):

```bash
node scripts/importar-catalogo.mjs planilha.csv
```

O script valida categorias/linhas, copia as fotos do acervo para `public/produtos/` e gera `src/data/products.gen.ts` pronto para ser plugado em `products.ts`.

## Deploy (Vercel — recomendado)

1. Suba o repositório para o GitHub (`git push`)
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório — o Next.js é detectado automaticamente
3. Configure as variáveis de ambiente do `.env.example` (analytics/Mercado Pago são opcionais no primeiro deploy)
4. Aponte o domínio `manguebras.com.br` nas configurações do projeto
5. Pronto — build, CDN, SSL e imagens otimizadas são automáticos

## Desenvolvimento

```bash
npm run dev     # servidor local em http://localhost:3000
npm run build   # build de produção
```

⚠️ **Não adicionar `loading.tsx` em `src/app/produtos/`** — bug do Next 16.2.10 (Turbopack) que impede a hidratação da página inteira silenciosamente. Usar `<Suspense>` inline se precisar de skeletons.
