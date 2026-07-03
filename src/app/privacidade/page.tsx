import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Manguebras coleta, usa e protege seus dados pessoais (LGPD).",
};

export default function PrivacidadePage() {
  return (
    <>
      <PageHeader
        crumb="Privacidade"
        pre="Política de"
        highlight="privacidade"
        description="Seus dados tratados com respeito, conforme a LGPD."
      />
      <div className="container-page max-w-3xl space-y-8 py-12 text-sm leading-relaxed text-graphite-600">
        <section className="rounded-2xl border border-graphite-200 bg-white p-7 shadow-soft">
          <h2 className="font-display text-base font-bold uppercase tracking-wide text-brand-900">
            1. Dados que coletamos
          </h2>
          <p className="mt-3">
            Coletamos apenas os dados necessários para atender seu pedido: nome,
            e-mail, telefone, CPF/CNPJ (para nota fiscal) e endereço de entrega.
            Os itens do carrinho ficam armazenados apenas no seu navegador
            (localStorage) — não em nossos servidores.
          </p>
        </section>

        <section className="rounded-2xl border border-graphite-200 bg-white p-7 shadow-soft">
          <h2 className="font-display text-base font-bold uppercase tracking-wide text-brand-900">
            2. Como usamos
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Processar pedidos, entregas e emissão de notas fiscais;</li>
            <li>Responder solicitações de orçamento e atendimento;</li>
            <li>
              Melhorar a experiência do site por meio de métricas de navegação
              (quando ferramentas de análise estiverem ativas, sempre de forma
              agregada);
            </li>
            <li>
              Comunicações sobre pedidos — não enviamos marketing sem seu
              consentimento.
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-graphite-200 bg-white p-7 shadow-soft">
          <h2 className="font-display text-base font-bold uppercase tracking-wide text-brand-900">
            3. Compartilhamento
          </h2>
          <p className="mt-3">
            Compartilhamos dados apenas com quem precisa deles para concluir seu
            pedido: transportadoras (entrega), instituições de pagamento
            (processamento) e órgãos fiscais (nota fiscal). Nunca vendemos seus
            dados.
          </p>
        </section>

        <section className="rounded-2xl border border-graphite-200 bg-white p-7 shadow-soft">
          <h2 className="font-display text-base font-bold uppercase tracking-wide text-brand-900">
            4. Seus direitos (LGPD)
          </h2>
          <p className="mt-3">
            Você pode solicitar a qualquer momento o acesso, a correção ou a
            exclusão dos seus dados, pelo e-mail {SITE.email}. Respondemos em
            até 15 dias úteis.
          </p>
        </section>

        <section className="rounded-2xl border border-graphite-200 bg-white p-7 shadow-soft">
          <h2 className="font-display text-base font-bold uppercase tracking-wide text-brand-900">
            5. Contato do responsável
          </h2>
          <p className="mt-3">
            Dúvidas sobre esta política? Fale com a equipe Manguebras:{" "}
            {SITE.email} · {SITE.phone}.
          </p>
        </section>
      </div>
    </>
  );
}
