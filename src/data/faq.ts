export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Perguntas frequentes — baseadas nas dores reais do cliente
 * (identificação por amostra, prazo, pagamento, trocas).
 */
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Não sei o código da mangueira. Como identificar a peça certa?",
    answer:
      "É a nossa especialidade! Envie uma foto da mangueira (mesmo adaptada ou danificada) pelo WhatsApp, junto com o modelo do caminhão. Nossa equipe identifica a peça original ou uma similar compatível no nosso catálogo com milhares de itens.",
  },
  {
    question: "Vocês entregam em todo o Brasil?",
    answer:
      "Sim! Enviamos para todos os estados por transportadora ou Correios. O frete e o prazo são confirmados no fechamento do pedido, de acordo com o CEP e o volume da compra.",
  },
  {
    question: "Quais são as formas de pagamento?",
    answer:
      "Aceitamos Pix (aprovação imediata), cartão de crédito em até 6x sem juros e condições especiais para compras recorrentes de oficinas, autopeças e frotas. Fale com nossa equipe para abrir seu cadastro.",
  },
  {
    question: "Preciso ter CNPJ para comprar?",
    answer:
      "Não. Atendemos tanto pessoa física quanto jurídica. Para oficinas, autopeças, transportadoras e frotas, oferecemos condições e prazos diferenciados.",
  },
  {
    question: "A peça não serviu. Como funciona a troca?",
    answer:
      "Você tem até 7 dias após o recebimento para solicitar troca ou devolução de produtos sem uso, na embalagem original. Confira todos os detalhes na nossa Política de Troca ou fale direto com a equipe no WhatsApp.",
  },
  {
    question: "Vocês vendem mangueiras para outras aplicações além de caminhões?",
    answer:
      "Sim. Além da linha de arrefecimento diesel — nossa especialidade — atendemos as linhas leve, pesada, agrícola e industrial, com mangueiras, abraçadeiras, juntas e acessórios.",
  },
];
