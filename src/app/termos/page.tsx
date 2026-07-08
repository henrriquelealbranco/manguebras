import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos e condições de uso do site da Manguebras.",
};

export default function TermosPage() {
  return (
    <>
      <PageHeader
        crumb="Termos de Uso"
        pre="Termos de"
        highlight="uso"
        description="Condições para navegação e compra no site."
      />
      <div className="container-page max-w-3xl space-y-8 py-12 text-sm leading-relaxed text-graphite-600">
        <section className="rounded-lg border border-graphite-200 bg-white p-7 shadow-soft">
          <h2 className="font-display text-base font-bold uppercase tracking-wide text-brand-900">
            1. Sobre o site
          </h2>
          <p className="mt-3">
            Este site é operado pela {SITE.legalName} ({SITE.address.city}/
            {SITE.address.state}) e destina-se à divulgação e venda de
            mangueiras automotivas, abraçadeiras, juntas e acessórios. Ao
            navegar, você concorda com estes termos.
          </p>
        </section>

        <section className="rounded-lg border border-graphite-200 bg-white p-7 shadow-soft">
          <h2 className="font-display text-base font-bold uppercase tracking-wide text-brand-900">
            2. Catálogo, imagens e disponibilidade
          </h2>
          <p className="mt-3">
            Este site é um <strong>catálogo virtual de apresentação</strong> e
            não realiza vendas nem pagamentos online. As imagens dos produtos são
            reais, mas podem variar em tonalidade conforme o monitor.
            Disponibilidade e informações comerciais podem ser alteradas sem
            aviso prévio e são confirmadas diretamente pela nossa equipe.
          </p>
        </section>

        <section className="rounded-lg border border-graphite-200 bg-white p-7 shadow-soft">
          <h2 className="font-display text-base font-bold uppercase tracking-wide text-brand-900">
            3. Como adquirir
          </h2>
          <p className="mt-3">
            A Manguebras é distribuidora e atende oficinas, autopeças,
            transportadoras e frotas. Para adquirir uma peça, entre em contato
            com nossa equipe pelo WhatsApp ou telefone — informamos preço,
            disponibilidade e as condições de atendimento.
          </p>
        </section>

        <section className="rounded-lg border border-graphite-200 bg-white p-7 shadow-soft">
          <h2 className="font-display text-base font-bold uppercase tracking-wide text-brand-900">
            4. Responsabilidade sobre aplicação
          </h2>
          <p className="mt-3">
            A compatibilidade informada no site é referencial. Em caso de
            dúvida, consulte nossa equipe antes da compra — a instalação de
            peças incompatíveis é de responsabilidade do comprador/instalador.
          </p>
        </section>

        <section className="rounded-lg border border-graphite-200 bg-white p-7 shadow-soft">
          <h2 className="font-display text-base font-bold uppercase tracking-wide text-brand-900">
            5. Propriedade intelectual
          </h2>
          <p className="mt-3">
            A marca Manguebras®, o logotipo e o conteúdo deste site são
            protegidos. É proibida a reprodução sem autorização. Marcas de
            veículos citadas (Scania, Volvo, Mercedes-Benz, Iveco, VW etc.)
            pertencem aos seus respectivos fabricantes e são usadas apenas como
            referência de aplicação.
          </p>
        </section>
      </div>
    </>
  );
}
