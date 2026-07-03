"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Loader2,
  MessageCircle,
  QrCode,
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/hooks/use-cart";
import { summarizeCart } from "@/lib/cart";
import {
  checkoutSchema,
  PAYMENT_LABELS,
  type CheckoutData,
} from "@/lib/checkout-schema";
import { maskCEP, maskCpfCnpj, maskPhone } from "@/lib/masks";
import { formatBRL, cn } from "@/lib/utils";
import { SITE, whatsappLink } from "@/constants/site";

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-graphite-700">
        {label}
      </span>
      {children}
      {error && (
        <span role="alert" className="mt-1 block text-xs text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}

const inputClass =
  "h-11 w-full rounded-lg border border-graphite-300 bg-white px-3 text-sm text-graphite-900 outline-none transition-colors placeholder:text-graphite-400 focus:border-accent-500";

/**
 * Formulário de checkout — fluxo enxuto em uma página.
 * Sem gateway ativo: o pedido é formalizado via WhatsApp com resumo
 * completo (Mercado Pago fica preparado em services/).
 */
export function CheckoutForm() {
  const { items, coupon, clear } = useCart();
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const summary = summarizeCart(items, coupon);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { pagamento: "pix" },
  });

  const pagamento = watch("pagamento");

  /** Auto-preenche endereço a partir do CEP (ViaCEP). */
  const fetchCep = async (cep: string) => {
    const clean = cep.replace(/\D/g, "");
    if (clean.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
      const data = await res.json();
      if (data.erro) return;
      if (data.logradouro) setValue("rua", data.logradouro);
      if (data.bairro) setValue("bairro", data.bairro);
      if (data.localidade) setValue("cidade", data.localidade);
      if (data.uf) setValue("uf", data.uf);
      toast.success("Endereço encontrado", { description: data.localidade });
    } catch {
      // sem rede/ViaCEP fora — o usuário preenche manualmente
    }
  };

  const onSubmit = (data: CheckoutData) => {
    const code = `MB-${String(Math.abs(hashOrder(data.email))).slice(0, 6)}`;
    const message = [
      `🛒 *Novo pedido pelo site — ${code}*`,
      "",
      "*Itens:*",
      ...summary.entries.map(
        (e) =>
          `• ${e.quantity}x ${e.product.name} (Cód. ${e.product.code}) — ${formatBRL(e.lineTotalCents)}`,
      ),
      "",
      `Subtotal: ${formatBRL(summary.subtotalCents)}`,
      ...(summary.discountCents > 0
        ? [`Desconto (${coupon}): −${formatBRL(summary.discountCents)}`]
        : []),
      `*Total: ${formatBRL(summary.totalCents)}* + frete`,
      "",
      `*Pagamento:* ${PAYMENT_LABELS[data.pagamento]}`,
      "",
      "*Dados do cliente:*",
      `Nome: ${data.nome}`,
      ...(data.empresa ? [`Empresa: ${data.empresa}`] : []),
      `E-mail: ${data.email}`,
      `Telefone: ${data.telefone}`,
      ...(data.documento ? [`CPF/CNPJ: ${data.documento}`] : []),
      "",
      "*Endereço de entrega:*",
      `${data.rua}, ${data.numero}${data.complemento ? ` — ${data.complemento}` : ""}`,
      `${data.bairro} — ${data.cidade}/${data.uf.toUpperCase()}`,
      `CEP: ${data.cep}`,
      ...(data.observacoes ? ["", `Obs.: ${data.observacoes}`] : []),
    ].join("\n");

    window.open(whatsappLink(message), "_blank", "noopener");
    setOrderCode(code);
    clear();
  };

  // ───────── Estados vazios / sucesso ─────────

  if (orderCode) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-5 rounded-3xl border border-accent-500/40 bg-accent-500/5 px-8 py-16 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-500 text-white">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <div>
          <h2 className="font-display text-2xl font-extrabold uppercase text-graphite-900">
            Pedido <span className="text-accent-500">{orderCode}</span> enviado!
          </h2>
          <p className="mt-2 text-sm text-graphite-600">
            Seu pedido foi encaminhado para nossa equipe no WhatsApp. Vamos
            confirmar o frete e o pagamento com você em instantes.
          </p>
        </div>
        <p className="text-xs text-graphite-500">
          Não abriu o WhatsApp?{" "}
          <a
            href={whatsappLink(
              `Olá! Acabei de fazer o pedido ${orderCode} pelo site.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-accent-600 underline"
          >
            Clique aqui
          </a>{" "}
          ou ligue {SITE.phone}.
        </p>
        <Link
          href="/produtos"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-brand-800"
        >
          Continuar comprando
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  if (summary.entries.length === 0) {
    return (
      <div className="mx-auto max-w-md rounded-3xl border border-dashed border-graphite-300 bg-graphite-50/60 px-8 py-16 text-center">
        <p className="text-sm text-graphite-500">
          Seu carrinho está vazio — adicione produtos antes de finalizar.
        </p>
        <Link
          href="/produtos"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-800"
        >
          Ver produtos
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  // ───────── Formulário ─────────

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-8 lg:grid-cols-[1fr_360px]"
    >
      <div className="space-y-6">
        {/* Contato */}
        <fieldset className="rounded-2xl border border-graphite-200 bg-white p-6 shadow-soft">
          <legend className="sr-only">Dados de contato</legend>
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-brand-900">
            1. Seus dados
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Nome completo *" error={errors.nome?.message}>
              <input
                {...register("nome")}
                autoComplete="name"
                placeholder="Seu nome"
                className={inputClass}
              />
            </Field>
            <Field label="Empresa (opcional)" error={errors.empresa?.message}>
              <input
                {...register("empresa")}
                autoComplete="organization"
                placeholder="Oficina, autopeça, transportadora…"
                className={inputClass}
              />
            </Field>
            <Field label="E-mail *" error={errors.email?.message}>
              <input
                {...register("email")}
                type="email"
                autoComplete="email"
                placeholder="voce@email.com"
                className={inputClass}
              />
            </Field>
            <Field label="Telefone / WhatsApp *" error={errors.telefone?.message}>
              <input
                {...register("telefone", {
                  onChange: (e) =>
                    setValue("telefone", maskPhone(e.target.value)),
                })}
                inputMode="tel"
                autoComplete="tel"
                placeholder="(44) 99999-9999"
                className={inputClass}
              />
            </Field>
            <Field
              label="CPF / CNPJ (opcional)"
              error={errors.documento?.message}
              className="sm:col-span-2"
            >
              <input
                {...register("documento", {
                  onChange: (e) =>
                    setValue("documento", maskCpfCnpj(e.target.value)),
                })}
                inputMode="numeric"
                placeholder="Para emissão de nota fiscal"
                className={inputClass}
              />
            </Field>
          </div>
        </fieldset>

        {/* Endereço */}
        <fieldset className="rounded-2xl border border-graphite-200 bg-white p-6 shadow-soft">
          <legend className="sr-only">Endereço de entrega</legend>
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-brand-900">
            2. Endereço de entrega
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-6">
            <Field
              label="CEP *"
              error={errors.cep?.message}
              className="sm:col-span-2"
            >
              <input
                {...register("cep", {
                  onChange: (e) => {
                    const masked = maskCEP(e.target.value);
                    setValue("cep", masked);
                    fetchCep(masked);
                  },
                })}
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="00000-000"
                className={inputClass}
              />
            </Field>
            <Field
              label="Rua *"
              error={errors.rua?.message}
              className="sm:col-span-4"
            >
              <input
                {...register("rua")}
                autoComplete="address-line1"
                placeholder="Rua / Avenida"
                className={inputClass}
              />
            </Field>
            <Field
              label="Número *"
              error={errors.numero?.message}
              className="sm:col-span-2"
            >
              <input
                {...register("numero")}
                inputMode="numeric"
                placeholder="123"
                className={inputClass}
              />
            </Field>
            <Field
              label="Complemento"
              error={errors.complemento?.message}
              className="sm:col-span-4"
            >
              <input
                {...register("complemento")}
                placeholder="Galpão, sala, bloco…"
                className={inputClass}
              />
            </Field>
            <Field
              label="Bairro *"
              error={errors.bairro?.message}
              className="sm:col-span-2"
            >
              <input {...register("bairro")} className={inputClass} />
            </Field>
            <Field
              label="Cidade *"
              error={errors.cidade?.message}
              className="sm:col-span-3"
            >
              <input
                {...register("cidade")}
                autoComplete="address-level2"
                className={inputClass}
              />
            </Field>
            <Field
              label="UF *"
              error={errors.uf?.message}
              className="sm:col-span-1"
            >
              <input
                {...register("uf")}
                maxLength={2}
                placeholder="PR"
                className={cn(inputClass, "uppercase")}
              />
            </Field>
          </div>
        </fieldset>

        {/* Pagamento */}
        <fieldset className="rounded-2xl border border-graphite-200 bg-white p-6 shadow-soft">
          <legend className="sr-only">Forma de pagamento</legend>
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-brand-900">
            3. Pagamento
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {(
              [
                { value: "pix", label: "Pix", icon: QrCode, hint: "Aprovação imediata" },
                { value: "cartao", label: "Cartão", icon: CreditCard, hint: "Até 6x sem juros" },
                { value: "whatsapp", label: "WhatsApp", icon: MessageCircle, hint: "Combinar com a equipe" },
              ] as const
            ).map((option) => (
              <label
                key={option.value}
                className={cn(
                  "flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border-2 p-4 text-center transition-all",
                  pagamento === option.value
                    ? "border-accent-500 bg-accent-500/5"
                    : "border-graphite-200 hover:border-graphite-300",
                )}
              >
                <input
                  type="radio"
                  value={option.value}
                  {...register("pagamento")}
                  className="sr-only"
                />
                <option.icon
                  className={cn(
                    "h-6 w-6",
                    pagamento === option.value
                      ? "text-accent-600"
                      : "text-graphite-400",
                  )}
                />
                <span className="text-sm font-bold text-graphite-900">
                  {option.label}
                </span>
                <span className="text-[11px] text-graphite-500">
                  {option.hint}
                </span>
              </label>
            ))}
          </div>
          {errors.pagamento && (
            <p role="alert" className="mt-2 text-xs text-red-600">
              {errors.pagamento.message}
            </p>
          )}

          <Field
            label="Observações (opcional)"
            error={errors.observacoes?.message}
            className="mt-4"
          >
            <textarea
              {...register("observacoes")}
              rows={3}
              placeholder="Modelo do caminhão, urgência, referência de entrega…"
              className={cn(inputClass, "h-auto py-2.5")}
            />
          </Field>
        </fieldset>
      </div>

      {/* Resumo lateral */}
      <aside className="h-fit lg:sticky lg:top-16">
        <div className="rounded-2xl border border-graphite-200 bg-white p-6 shadow-soft">
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-graphite-900">
            Resumo
          </h2>
          <ul className="mt-4 space-y-2 border-b border-graphite-200 pb-4 text-sm">
            {summary.entries.map((e) => (
              <li
                key={e.product.code}
                className="flex justify-between gap-3 text-graphite-600"
              >
                <span className="line-clamp-1">
                  {e.quantity}x {e.product.name}
                </span>
                <span className="shrink-0 font-semibold">
                  {formatBRL(e.lineTotalCents)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-graphite-600">
              <dt>Subtotal</dt>
              <dd className="font-semibold">
                {formatBRL(summary.subtotalCents)}
              </dd>
            </div>
            {summary.discountCents > 0 && (
              <div className="flex justify-between text-accent-600">
                <dt>Desconto ({coupon})</dt>
                <dd className="font-semibold">
                  −{formatBRL(summary.discountCents)}
                </dd>
              </div>
            )}
            <div className="flex justify-between border-t border-graphite-200 pt-3 text-base font-extrabold text-graphite-900">
              <dt>Total</dt>
              <dd className="text-accent-600">
                {formatBRL(summary.totalCents)}
              </dd>
            </div>
            <p className="text-[11px] text-graphite-400">
              Frete confirmado pela equipe junto com o pedido.
            </p>
          </dl>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-accent-500 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.01] hover:bg-accent-600 disabled:opacity-60"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Confirmar pedido
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-graphite-400">
            Ao confirmar, o resumo do pedido é enviado à nossa equipe no
            WhatsApp para combinar frete e pagamento. Seus dados não são
            armazenados no site.
          </p>
        </div>
      </aside>
    </form>
  );
}

/** Hash simples e estável para gerar código do pedido sem depender de Date. */
function hashOrder(seed: string): number {
  let h = 0;
  const input = `${seed}-${typeof window !== "undefined" ? window.performance.now() : 0}`;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return h;
}
