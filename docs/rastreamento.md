# Rastreamento Manguebras

Container padrão: `GTM-KRP4R7ZC` (sobrescrito somente por `NEXT_PUBLIC_GTM_ID`).
GA4, Meta e Google Ads devem ser publicados no GTM, não duplicados no código.
O envio direto anterior à Meta CAPI no formulário foi desativado.

## Links

Todos os CTAs usam a base Tintim fornecida. Produto tem a mensagem exata
"Olá. Gostaria de mais informações sobre um produto que vi no site."
Atendimento geral tem "Olá. Visitei seu site e gostaria de falar com um atendente."
Telefone e WhatsApp exibidos: (44) 3023-7100. Ligações continuam com `tel:`.
O formulário também usa o texto geral fixo: os campos preenchidos não são
incluídos na conversa, para preservar o padrão solicitado pelo rastreador.

## Eventos para o gestor de tráfego

| Evento personalizado | Quando | Variáveis |
| --- | --- | --- |
| `site_page_view` | Entrada e navegação interna | page_path, page_location, page_title |
| `whatsapp_click` | Clique ou encaminhamento pelo formulário | contact_type (product/general), click_location, button_label, product_code, product_name, montadora, event_id |
| `lead` | Formulário válido encaminhado ao WhatsApp | form_name, event_id |

Cliques são intenção de contato, não confirmação de envio de mensagem/venda.
Dados pessoais e o texto livre do formulário não são enviados ao dataLayer.
Produtos usam contexto no evento, sem modificar a mensagem fixa do Tintim.

No GTM, criar acionadores de Evento personalizado com esses nomes e variáveis
da camada de dados para as propriedades. Escolher uma única origem de pageviews
(site_page_view ou histórico automático), evitando duplicação no GA4.
Não marcar simultaneamente lead e whatsapp_click como a mesma conversão.

## Pixel Tintim

Não foi encontrado snippet de pixel Tintim no código versionado nesta revisão.
Links Tintim não substituem o pixel. O script oficial específico desta conta
deve ser fornecido pelo gestor ou confirmado no container GTM; não inferir um
pixel a partir do UUID do link. Publicá-lo pelo GTM conforme instruções Tintim.

Validar no Tag Assistant: container carregado, um evento por clique, contexto
do produto correto, navegação interna e ausência de dados pessoais. Confirmar
a atribuição final no painel Tintim com uma conversa de teste autorizada.
