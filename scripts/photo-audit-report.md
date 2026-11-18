# Auditoria de fotos — 2026-11-18

Escopo: catálogo completo, arquivos de produtos e ferramentas de validação. Este relatório descreve o estado local validado; publicação deve ser confirmada separadamente na Vercel.

## Evidências antes/depois

| Medida | Antes | Depois |
| --- | ---: | ---: |
| Fichas | 3565 | 3565 |
| Referências de foto | 3555 | 3555 |
| Arquivos | 3555 | 3555 |
| Fotos decodificáveis | 3555 | 3555 |
| Extensão compatível com os bytes | 3516 | 3555 |
| WebP com extensão JPG incorreta | 39 | 0 |
| Fichas sem images | 10 | 10 |
| Caminhos ausentes no snapshot consistente | 0 | 0 |
| Arquivos corrompidos / falhas de decodificação | 0 | 0 |
| URLs remotas / divergências de caixa ou Unicode | 0 | 0 |
| Arquivos sem referência | 0 | 0 |

Auditoria integral repetida após as alterações: 3.565 produtos, 3.555 referências, 3.555 arquivos totalmente decodificados e dez pendências, todas por ausência de imagem cadastrada. Nenhum caminho referenciado ausente ou arquivo inválido.

Foram renomeados sem reencode e atualizados no JSON os códigos: 1005, 1085, 1087, 1088, 1089, 1090, 1198, 1199, 1202, 1203, 2099, 2189, 2216, 2217, 2218, 2219, 2220, 2221, 2222, 2223, 2224, 2225, 2226, 2227, 2228, 2461, 2465, 2466, 2777, 3155, 4414, 4437, 4527, 4528, 4676, 4833, 5059, 5144, 5303. SHA-256 dos 39 arquivos novos comparado aos JPG em HEAD: todos idênticos. Não houve substituição de peça nem perda de bytes; antigas URLs desses 39 JPG deixam de existir, portanto integrar renomes e JSON juntos.

2937: JPEG 800x800, 81869 bytes; dados e arquivo existentes. Original público respondeu HTTP200, mas o otimizador respondeu HTTP402 com OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED. Configuração alterada para exibição direta dos arquivos, sem depender desse otimizador. Os 39 endereços JPG antigos recebem redirecionamento para WebP para preservar compatibilidade.

## Pendências e fonte

Sem foto: 1069, 1070, 1071, 1072, 2557, 2716, 3392, 5363, 5364, 5591.

HEAD sequencial em https://www.manguebras.com.br/produtos/CODIGO.jpg retornou HTTP404 para cada um dos dez códigos em 2026-11-18, 12:44–12:45 UTC. API https://www.manguebras.com.br/wp-json/wc/store/v1/products?per_page=1 retornou HTTP403, X-Vercel-Mitigated: deny. Isso não prova que nunca houve fotos oficiais: apenas que não foram recuperáveis nessas fontes hoje.

Acervo _materiais/fotos/Fotos Produtos Manguebras/JPG não existe; antigo Backup_Google_Drive/Manguebras não existe. Busca dos dez códigos no restante de Backup_Google_Drive não encontrou candidatos. Nenhum novo download de imagem foi feito. Não se garante identidade visual/fotográfica de todas as peças apenas por decodificação: a auditoria comprova integridade e ligação de arquivos, não equivalência visual independente ao catálogo do fabricante.

## Ferramentas e validação

- scripts/audit-photos.mjs: offline, somente leitura, caminhos reais, caixa/Unicode, assinatura/formato e decodificação integral; stdout JSON com hashes. Exit 1 quando há pendências (esperado enquanto faltam dez fotos).
- scripts/download-missing-photos.mjs: dry run por padrão; --apply explícito, estimativa antes do download, limite para lote grande, pedidos sequenciais com intervalo mínimo 1s, timeout 15s, cache de catálogo completo, domínio oficial HTTPS, validação de imagem antes de aceitar, associação por código exato e recusa de duplicidade ambígua. Requer revisão adicional antes de uso real: só funções de identificação/decodificação foram testadas, não recuperação ponta a ponta contra a API bloqueada.
- tests/photo.test.mjs: 3 testes passam (código exato/conflitante, HTML/JPEG truncado, auditoria com casos de caixa/acentos, ausência, remoto, traversal e WebP rotulado JPG).
- Execução conjunta com tests/image-delivery.test.mjs: 4 testes passam; warning do Node sobre module type do next.config.ts pertencente ao pipeline do pai, sem falhas.

Relatórios completos das execuções estão no histórico de ferramentas deste chat; este arquivo é o checkpoint persistido. Para reproduzir depois da pausa: node scripts/audit-photos.mjs; node --test tests/photo.test.mjs. Não iniciados novamente durante o checkpoint.

Pendência para cobertura de 100%: receber as fotos oficiais dos dez códigos ou obter acesso a um acervo/endpoint legado que as contenha. Não foi usada foto genérica ou de produto semelhante. A primeira tentativa de deploy da exibição direta foi recusada pela Vercel; consulta dos logs exige autenticação na conta responsável.
