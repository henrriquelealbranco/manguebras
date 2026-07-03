import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = {
  title: "Minha Conta",
  description: "Acesse sua conta Manguebras.",
};

export default function ContaPage() {
  return (
    <PagePlaceholder
      title="Minha Conta"
      description="A área do cliente com login, cadastro e histórico de pedidos está sendo preparada."
    />
  );
}
