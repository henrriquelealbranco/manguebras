"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { maskPhone } from "@/lib/masks";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/constants/site";

const contactSchema = z.object({
  nome: z.string().trim().min(3, "Informe seu nome"),
  telefone: z
    .string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone inválido"),
  assunto: z.string().trim().min(3, "Informe o assunto"),
  mensagem: z
    .string()
    .trim()
    .min(10, "Conte um pouco mais (mínimo 10 caracteres)")
    .max(1000),
});

type ContactData = z.infer<typeof contactSchema>;

const inputClass =
  "h-11 w-full rounded-lg border border-graphite-300 bg-white px-3 text-sm text-graphite-900 outline-none transition-colors placeholder:text-graphite-400 focus:border-accent-500";

/**
 * Formulário de contato — valida e encaminha a conversa para o WhatsApp,
 * canal principal de atendimento da Manguebras.
 */
export function ContactForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = (data: ContactData) => {
    const message = [
      `Olá! Vim pelo site (página de contato).`,
      `*Nome:* ${data.nome}`,
      `*Telefone:* ${data.telefone}`,
      `*Assunto:* ${data.assunto}`,
      "",
      data.mensagem,
    ].join("\n");
    window.open(whatsappLink(message), "_blank", "noopener");
    toast.success("Mensagem pronta!", {
      description: "Enviamos você para o WhatsApp para concluir o envio.",
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl border border-graphite-200 bg-white p-6 shadow-soft"
    >
      <h2 className="font-display text-sm font-bold uppercase tracking-widest text-brand-900">
        Envie sua mensagem
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-graphite-700">
            Nome *
          </span>
          <input
            {...register("nome")}
            placeholder="Seu nome"
            className={inputClass}
          />
          {errors.nome && (
            <span role="alert" className="mt-1 block text-xs text-red-600">
              {errors.nome.message}
            </span>
          )}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-graphite-700">
            Telefone / WhatsApp *
          </span>
          <input
            {...register("telefone", {
              onChange: (e) => setValue("telefone", maskPhone(e.target.value)),
            })}
            inputMode="tel"
            placeholder="(44) 99999-9999"
            className={inputClass}
          />
          {errors.telefone && (
            <span role="alert" className="mt-1 block text-xs text-red-600">
              {errors.telefone.message}
            </span>
          )}
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-graphite-700">
            Assunto *
          </span>
          <input
            {...register("assunto")}
            placeholder="Ex.: orçamento de mangueira de intercooler"
            className={inputClass}
          />
          {errors.assunto && (
            <span role="alert" className="mt-1 block text-xs text-red-600">
              {errors.assunto.message}
            </span>
          )}
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-graphite-700">
            Mensagem *
          </span>
          <textarea
            {...register("mensagem")}
            rows={5}
            placeholder="Descreva o que você precisa — modelo do veículo, medidas, urgência…"
            className={cn(inputClass, "h-auto py-2.5")}
          />
          {errors.mensagem && (
            <span role="alert" className="mt-1 block text-xs text-red-600">
              {errors.mensagem.message}
            </span>
          )}
        </label>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent-500 px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-[1.02] hover:bg-accent-600 disabled:opacity-60"
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        Enviar via WhatsApp
      </button>
    </form>
  );
}
