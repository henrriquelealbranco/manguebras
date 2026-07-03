import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * /busca — o formulário do header envia para cá;
 * redireciona para o catálogo preservando busca e categoria.
 */
export default async function BuscaPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = new URLSearchParams();

  const q = Array.isArray(params.q) ? params.q[0] : params.q;
  const categoria = Array.isArray(params.categoria)
    ? params.categoria[0]
    : params.categoria;

  if (q) query.set("q", q);
  if (categoria) query.set("categoria", categoria);

  const suffix = query.toString();
  redirect(suffix ? `/produtos?${suffix}` : "/produtos");
}
