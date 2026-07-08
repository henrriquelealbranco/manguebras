import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Política de Troca",
  description:
    "Política de troca e devolução da Manguebras — prazos, condições e como solicitar.",
};

export default function PoliticaDeTrocaPage() {
  return (
    <>
      <PageHeader
        crumb="Política de Troca"
        pre="Política de"
        highlight="troca"
        description="Transparência do pedido à devolução."
      />
      <div className="container-page max-w-3xl space-y-8 py-12 text-sm leading-relaxed text-graphite-600">
        <section className="rounded-lg border border-graphite-200 bg-white p-7 shadow-soft">
          <h2 className="font-display text-base font-bold uppercase tracking-wide text-brand-900">
            1. Prazo para troca ou devolução
          </h2>
          <p className="mt-3">
            Você pode solicitar a troca ou devolução de qualquer produto em até{" "}
            <strong>7 (sete) dias corridos</strong> após o recebimento, conforme
            o Código de Defesa do Consumidor (art. 49). Para produtos com
            defeito de fabricação, o prazo é de <strong>90 dias</strong>.
          </p>
        </section>

        <section className="rounded-lg border border-graphite-200 bg-white p-7 shadow-soft">
          <h2 className="font-display text-base font-bold uppercase tracking-wide text-brand-900">
            2. Condições do produto
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Produto sem sinais de uso ou instalação;</li>
            <li>Embalagem original preservada;</li>
            <li>Acompanhado da nota fiscal de compra;</li>
            <li>
              Mangueiras e peças de vedação não podem ter sido montadas no
              veículo, por questões de segurança.
            </li>
          </ul>
        </section>

        <section className="rounded-lg border border-graphite-200 bg-white p-7 shadow-soft">
          <h2 className="font-display text-base font-bold uppercase tracking-wide text-brand-900">
            3. Como solicitar
          </h2>
          <p className="mt-3">
            Entre em contato pelo WhatsApp {SITE.whatsapp} ou pelo e-mail{" "}
            {SITE.email} informando o número do pedido, o item e o motivo. Nossa
            equipe orienta o envio e acompanha todo o processo.
          </p>
        </section>

        <section className="rounded-lg border border-graphite-200 bg-white p-7 shadow-soft">
          <h2 className="font-display text-base font-bold uppercase tracking-wide text-brand-900">
            4. Reembolso e frete
          </h2>
          <p className="mt-3">
            Em devoluções por arrependimento, o valor pago é integralmente
            reembolsado pelo mesmo meio de pagamento. Em casos de defeito ou
            divergência do pedido, o frete de retorno é por nossa conta. Peças
            enviadas incorretamente por erro nosso são substituídas sem custo.
          </p>
        </section>

        <section className="rounded-lg border border-graphite-200 bg-white p-7 shadow-soft">
          <h2 className="font-display text-base font-bold uppercase tracking-wide text-brand-900">
            5. Aplicação incorreta
          </h2>
          <p className="mt-3">
            Ficou na dúvida se a peça serve no seu veículo?{" "}
            <strong>Confirme a aplicação antes da compra</strong> — envie uma
            foto da amostra ou o modelo do caminhão no WhatsApp. Assim evitamos
            trocas e seu veículo volta a rodar mais rápido.
          </p>
        </section>
      </div>
    </>
  );
}
