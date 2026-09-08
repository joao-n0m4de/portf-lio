# Portfólio — João Victor

Portfólio pessoal estático construído com HTML, CSS e JavaScript, sem etapa de build e sem dependências locais.

**Site publicado:** [joao-n0m4de.github.io/portf-lio](https://joao-n0m4de.github.io/portf-lio/)

## Abrir localmente

Você pode abrir `index.html` diretamente no navegador ou iniciar um servidor local:

```powershell
py -m http.server 4173
```

Depois, acesse `http://localhost:4173`.

## Estrutura

```text
index.html   Conteúdo, SEO e componentes da página
styles.css   Identidade visual e responsividade
script.js    Menu, navegação ativa, animações e cópia de e-mail
```

## Publicação

Como o site é totalmente estático, ele pode ser publicado no GitHub Pages, Netlify, Vercel ou qualquer hospedagem de arquivos HTML.

No GitHub Pages:

1. Crie um repositório para o portfólio e envie estes arquivos.
2. Acesse **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a branch `main` e a pasta `/ (root)`.

## Conteúdo

Apresentação voltada a sites sob encomenda, consultoria e vagas remotas, com disponibilidade total informada pelo autor. Trajetória conferida no currículo fornecido. O PDF em `assets/curriculo-joao-victor.pdf` é o documento original fornecido para download e contém os contatos do autor. O avatar ilustrado foi obtido do perfil público do GitHub; não é uma fotografia profissional.

## Estudos de caso e demonstrações

`projetos/` contém quatro estudos de caso e demos em JavaScript, com registros fictícios, busca, ações e download CSV. São simulações simplificadas, identificadas na interface, sem banco ou API. Não representam sessões dos sistemas originais. As alterações são reiniciadas ao recarregar a página. Não há credenciais ou dados de clientes.

Os dois primeiros projetos aparecem em destaque. A captura de Cancelamentos mostra a interface original executada localmente sem consultar a API. As outras prévias mostram as simulações do portfólio. Os casos descrevem resultados funcionais; não atribuem ganhos de produtividade não medidos.

## Imagem de compartilhamento

`assets/social.png` é a capa Open Graph de 1200 × 630 pixels. Seu layout editável está em `assets/social.html` e pode ser capturado em um navegador nessa resolução.

## Atualizações

O GitHub Pages publica automaticamente a raiz da branch `main`. Envie um commit e acompanhe o deploy em Actions/Pages. Não há etapa de build. Para conferir: abra o site em desktop e celular, navegue pelos quatro casos, teste busca/ação/reinício/exportação e baixe o currículo.
