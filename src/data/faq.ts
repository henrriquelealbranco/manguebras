export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Perguntas frequentes — contexto de CATÁLOGO VIRTUAL / distribuidor
 * (identificação de peça, como comprar via revenda, atendimento).
 */
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Não sei o código da mangueira. Como identificar a peça certa?",
    answer:
      "É a nossa especialidade! Envie uma foto da mangueira (mesmo adaptada ou danificada) pelo WhatsApp, junto com o modelo do caminhão. Nossa equipe identifica a peça original ou uma similar compatível no nosso catálogo com milhares de itens.",
  },
  {
    question: "O site vende online? Como faço para comprar?",
    answer:
      "O site é um catálogo virtual de apresentação — não vendemos diretamente pela internet. Para adquirir, fale com nossa equipe pelo WhatsApp ou telefone: indicamos preço, disponibilidade e a melhor forma de atendimento para o seu caso.",
  },
  {
    question: "Por que os preços não aparecem no site?",
    answer:
      "A Manguebras é distribuidora e trabalha com a rede de autopeças. Por isso o catálogo é de consulta: os valores e condições são passados diretamente pela nossa equipe, de acordo com o perfil de cada cliente.",
  },
  {
    question: "Sou lojista/autopeça. Como me torno cliente da Manguebras?",
    answer:
      "Atendemos oficinas, autopeças, transportadoras e frotas com condições de distribuidor. Fale com um representante pelo WhatsApp e apresente seu negócio — montamos o atendimento ideal para a sua demanda.",
  },
  {
    question: "Vocês atendem em todo o Brasil?",
    answer:
      "Sim. Fazemos distribuição para todos os estados. Prazos e logística são combinados com nossa equipe conforme a região e o volume.",
  },
  {
    question: "Trabalham com outras linhas além da diesel?",
    answer:
      "Sim. Além da linha de arrefecimento diesel — nossa especialidade — atendemos as linhas leve, pesada, agrícola e industrial, com mangueiras, abraçadeiras, juntas e acessórios.",
  },
];
