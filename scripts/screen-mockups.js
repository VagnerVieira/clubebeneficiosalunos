// scripts/screen-mockups.js
// Renderizador vetorial de alta fidelidade das 11 telas do Clube de Beneficios dos Alunos

export function drawWindowFrame(doc, x, y, w, h, title, route) {
  // Sombra suave da janela
  doc.setFillColor(226, 232, 240);
  doc.roundedRect(x + 1, y + 1, w, h, 2.5, 2.5, 'F');

  // Corpo da janela
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.35);
  doc.roundedRect(x, y, w, h, 2.5, 2.5, 'FD');

  // Barra de titulo do navegador
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(x, y, w, 8.5, 2.5, 2.5, 'F');
  doc.rect(x, y + 5, w, 3.5, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.line(x, y + 8.5, x + w, y + 8.5);

  // 3 Botoes de controle (Mac/Browser style)
  doc.setFillColor(239, 68, 68);
  doc.circle(x + 4.5, y + 4.2, 1.4, 'F');
  doc.setFillColor(245, 158, 11);
  doc.circle(x + 8.5, y + 4.2, 1.4, 'F');
  doc.setFillColor(16, 185, 129);
  doc.circle(x + 12.5, y + 4.2, 1.4, 'F');

  // Barra de rota URL
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(x + 18, y + 1.8, 65, 5, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(100, 116, 139);
  doc.text(`https://app.clube-alunos.edu.br${route}`, x + 20, y + 5.2);

  // Titulo da tela no cabecalho
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(51, 65, 85);
  doc.text(title, x + w - 4, y + 5.5, { align: 'right' });
}

// -------------------------------------------------------------
// TELA 1: LOGIN E AUTENTICACAO
// -------------------------------------------------------------
export function drawScreenLogin(doc, x, y, w, h) {
  drawWindowFrame(doc, x, y, w, h, 'Login Institucional', '/login');

  const contentY = y + 10;
  // Fundo cinza suave
  doc.setFillColor(248, 250, 252);
  doc.rect(x + 0.5, contentY, w - 1, h - 10.5, 'F');

  // Card Central de Login
  const cardW = 90;
  const cardH = 88;
  const cardX = x + (w - cardW) / 2;
  const cardY = contentY + 6;

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(cardX, cardY, cardW, cardH, 3, 3, 'FD');

  // Logo CB
  doc.setFillColor(26, 86, 219);
  doc.roundedRect(cardX + cardW / 2 - 6, cardY + 5, 12, 12, 2.5, 2.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('CB', cardX + cardW / 2, cardY + 13, { align: 'center' });

  // Titulos
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Clube de Benefícios dos Alunos', cardX + cardW / 2, cardY + 22, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Acesse descontos e convênios com sua matrícula', cardX + cardW / 2, cardY + 26, { align: 'center' });

  // Abas Aluno vs Admin
  const tabW = (cardW - 12) / 2;
  doc.setFillColor(26, 86, 219);
  doc.roundedRect(cardX + 6, cardY + 30, tabW, 6.5, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(255, 255, 255);
  doc.text('Sou Aluno', cardX + 6 + tabW / 2, cardY + 34.5, { align: 'center' });

  doc.setFillColor(241, 245, 249);
  doc.roundedRect(cardX + 6 + tabW, cardY + 30, tabW, 6.5, 1.5, 1.5, 'F');
  doc.setTextColor(100, 116, 139);
  doc.text('Administração', cardX + 6 + tabW + tabW / 2, cardY + 34.5, { align: 'center' });

  // Campo 1: Matricula
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(51, 65, 85);
  doc.text('Matrícula Institucional', cardX + 6, cardY + 41);

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(cardX + 6, cardY + 42.5, cardW - 12, 6.5, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 41, 59);
  doc.text('20240101 (João Silva)', cardX + 9, cardY + 47);

  // Campo 2: Senha / PIN
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(51, 65, 85);
  doc.text('Senha ou PIN de Acesso', cardX + 6, cardY + 53);

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(cardX + 6, cardY + 54.5, cardW - 12, 6.5, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('************', cardX + 9, cardY + 59);

  // Botao Entrar
  doc.setFillColor(26, 86, 219);
  doc.roundedRect(cardX + 6, cardY + 64, cardW - 12, 7.5, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('Entrar no Clube dos Alunos ->', cardX + cardW / 2, cardY + 69, { align: 'center' });

  // Box Demonstrativo de 1 clique
  doc.setFillColor(238, 242, 255);
  doc.setDrawColor(199, 210, 254);
  doc.roundedRect(cardX + 6, cardY + 74, cardW - 12, 10, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(67, 56, 202);
  doc.text('Credenciais de Teste Rápido (1 Clique):', cardX + 8, cardY + 77.5);

  const pills = [
    { label: 'João (Ativo)', bg: [209, 250, 229], text: [6, 95, 70] },
    { label: 'Maria (15d)', bg: [254, 243, 199], text: [146, 64, 14] },
    { label: 'Carlos (Venc)', bg: [254, 226, 226], text: [153, 27, 27] },
  ];
  let px = cardX + 8;
  pills.forEach((p) => {
    doc.setFillColor(...p.bg);
    doc.roundedRect(px, cardY + 79, 22, 4, 1, 1, 'F');
    doc.setFontSize(5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...p.text);
    doc.text(p.label, px + 11, cardY + 82, { align: 'center' });
    px += 24;
  });
}

// -------------------------------------------------------------
// TELA 2: INICIO (HOME DO ALUNO)
// -------------------------------------------------------------
export function drawScreenHome(doc, x, y, w, h) {
  drawWindowFrame(doc, x, y, w, h, 'Área do Aluno - Início', '/aluno/inicio');

  const contentY = y + 9;
  doc.setFillColor(248, 250, 252);
  doc.rect(x + 0.5, contentY, w - 1, h - 9.5, 'F');

  // App Bar do Aluno
  doc.setFillColor(255, 255, 255);
  doc.rect(x + 1, contentY, w - 2, 10, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.line(x + 1, contentY + 10, x + w - 1, contentY + 10);

  // Logo e Nome
  doc.setFillColor(26, 86, 219);
  doc.roundedRect(x + 5, contentY + 2, 6, 6, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5);
  doc.setTextColor(255, 255, 255);
  doc.text('CB', x + 8, contentY + 6.2, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Olá, João Carlos Silva!', x + 13, contentY + 6.5);

  // Botoes App Bar Direita
  doc.setFillColor(238, 242, 255);
  doc.roundedRect(x + w - 38, contentY + 2.2, 22, 5.5, 1.5, 1.5, 'F');
  doc.setFontSize(5.5);
  doc.setTextColor(67, 56, 202);
  doc.text('Meu Cartão Digital', x + w - 27, contentY + 5.8, { align: 'center' });

  doc.setFillColor(241, 245, 249);
  doc.roundedRect(x + w - 14, contentY + 2.2, 10, 5.5, 1.5, 1.5, 'F');
  doc.setTextColor(100, 116, 139);
  doc.text('Sair', x + w - 9, contentY + 5.8, { align: 'center' });

  // Banner Inteligente de Vigencia Ativa (Verde)
  const bannerY = contentY + 13;
  doc.setFillColor(236, 253, 245);
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(x + 5, bannerY, w - 10, 17, 2.5, 2.5, 'FD');

  doc.setFillColor(5, 150, 105);
  doc.roundedRect(x + 8, bannerY + 3, 24, 4.5, 1, 1, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5);
  doc.setTextColor(255, 255, 255);
  doc.text('VIGÊNCIA REGULAR', x + 20, bannerY + 6.2, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(6, 95, 70);
  doc.text('Seu vínculo estudantil está ativo e regularizado', x + 35, bannerY + 6.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(4, 120, 87);
  doc.text('Validade confirmada até 20/12/2026 | 105 dias restantes. Apresente seu cartão para obter descontos.', x + 8, bannerY + 13);

  // Titulo Seccao: Empresas em Destaque
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('Empresas Parceiras em Destaque', x + 5, bannerY + 24);

  // Grid de 3 Cards de Empresas
  const cardY = bannerY + 27;
  const cWidth = (w - 18) / 3;
  const companies = [
    { name: 'Smart Fit Academia', cat: 'Saúde & Fitness', desc: '30% na mensalidade', tag: 'Destaque', color: [16, 185, 129] },
    { name: 'Restaurante Sabor', cat: 'Alimentação', desc: '20% no buffet livre', tag: 'Top Desconto', color: [245, 158, 11] },
    { name: 'Livraria & Copiadora', cat: 'Educação', desc: '15% em livros e cópias', tag: 'Campus', color: [59, 130, 246] },
  ];

  companies.forEach((c, idx) => {
    const cx = x + 5 + idx * (cWidth + 4);
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(cx, cardY, cWidth, 42, 2, 2, 'FD');

    // Tag Destaque
    doc.setFillColor(254, 243, 199);
    doc.roundedRect(cx + cWidth - 18, cardY + 3, 15, 4, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(4.5);
    doc.setTextColor(180, 83, 9);
    doc.text(c.tag, cx + cWidth - 10.5, cardY + 5.8, { align: 'center' });

    // Logo Placeholder
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(cx + 3, cardY + 3, 10, 10, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6);
    doc.setTextColor(100, 116, 139);
    doc.text(c.name.substring(0, 2), cx + 8, cardY + 9.5, { align: 'center' });

    // Info
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(15, 23, 42);
    doc.text(c.name, cx + 3, cardY + 18);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5);
    doc.setTextColor(100, 116, 139);
    doc.text(c.cat, cx + 3, cardY + 22);

    // Box Beneficio
    doc.setFillColor(238, 242, 255);
    doc.roundedRect(cx + 3, cardY + 25, cWidth - 6, 8, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5.5);
    doc.setTextColor(67, 56, 202);
    doc.text(c.desc, cx + cWidth / 2, cardY + 30.5, { align: 'center' });

    // Botao Ver Parceiro
    doc.setFillColor(26, 86, 219);
    doc.roundedRect(cx + 3, cardY + 35, cWidth - 6, 5, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5);
    doc.setTextColor(255, 255, 255);
    doc.text('Ver Detalhes & Regras', cx + cWidth / 2, cardY + 38.5, { align: 'center' });
  });

  // Barra de Navegacao Inferior (Estilo Mobile/Web App)
  const navY = y + h - 8;
  doc.setFillColor(255, 255, 255);
  doc.rect(x + 1, navY, w - 2, 7.5, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.line(x + 1, navY, x + w - 1, navY);

  const navItems = [
    { name: '[Início]', active: true },
    { name: 'Empresas Parceiras', active: false },
    { name: 'Meu Cartão Digital', active: false },
  ];
  navItems.forEach((n, idx) => {
    const nx = x + 15 + idx * ((w - 30) / 3);
    doc.setFont('helvetica', n.active ? 'bold' : 'normal');
    doc.setFontSize(5.5);
    doc.setTextColor(n.active ? 26 : 100, n.active ? 86 : 116, n.active ? 219 : 139);
    doc.text(n.name, nx, navY + 5);
  });
}

// -------------------------------------------------------------
// TELA 3: CATALOGO DE PARCEIROS & BUSCA
// -------------------------------------------------------------
export function drawScreenCompanies(doc, x, y, w, h) {
  drawWindowFrame(doc, x, y, w, h, 'Catálogo de Parceiros & Descontos', '/aluno/empresas');

  const contentY = y + 9;
  doc.setFillColor(248, 250, 252);
  doc.rect(x + 0.5, contentY, w - 1, h - 9.5, 'F');

  // Barra de Pesquisa e Filtros
  const searchY = contentY + 3;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(x + 5, searchY, w - 10, 7.5, 2, 2, 'FD');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(148, 163, 184);
  doc.text('Buscar: Pesquisar por nome da empresa, refeição, academia ou serviço...', x + 8, searchY + 5);

  // Pilulas de Categoria
  const catY = searchY + 10.5;
  const categories = [
    { name: 'Todas (8)', active: true },
    { name: 'Alimentação (3)', active: false },
    { name: 'Saúde & Esportes (2)', active: false },
    { name: 'Tecnologia (2)', active: false },
    { name: 'Educação (1)', active: false },
  ];
  let catX = x + 5;
  categories.forEach((cat) => {
    doc.setFont('helvetica', cat.active ? 'bold' : 'normal');
    doc.setFontSize(5);
    const textW = doc.getTextWidth(cat.name);
    const pw = textW + 6;
    doc.setFillColor(cat.active ? 26 : 255, cat.active ? 86 : 255, cat.active ? 219 : 255);
    doc.setDrawColor(cat.active ? 26 : 226, cat.active ? 86 : 232, cat.active ? 219 : 240);
    doc.roundedRect(catX, catY, pw, 5.5, 1.5, 1.5, 'FD');
    doc.setTextColor(cat.active ? 255 : 71, cat.active ? 255 : 85, cat.active ? 255 : 105);
    doc.text(cat.name, catX + pw / 2, catY + 3.8, { align: 'center' });
    catX += pw + 2.5;
  });

  // Grid 2x2 de Cards de Empresas
  const gridY = catY + 8.5;
  const cardW = (w - 14) / 2;
  const cardH = 34;
  const items = [
    { name: 'Smart Fit Academia', cat: 'Saúde', desc: 'Musculação e aulas coletivas com 30% OFF', end: 'Av. Universitária, 1500', disc: '30% OFF' },
    { name: 'Restaurante Sabor Univ.', cat: 'Alimentação', desc: 'Refeições balanceadas e marmitas fitness', end: 'Rua das Flores, 42', disc: '20% OFF' },
    { name: 'Tech Store Informática', cat: 'Tecnologia', desc: 'Acessórios, conserto de notebook e peças', end: 'Av. Central, 800', disc: '15% OFF' },
    { name: 'Drogaria São Paulo', cat: 'Saúde', desc: 'Medicamentos genéricos e itens de higiene', end: 'Rua do Comércio, 12', disc: '25% OFF' },
  ];

  items.forEach((it, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const cx = x + 5 + col * (cardW + 4);
    const cy = gridY + row * (cardH + 3);

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(cx, cy, cardW, cardH, 2, 2, 'FD');

    // Logo box
    doc.setFillColor(238, 242, 255);
    doc.roundedRect(cx + 3, cy + 3, 9, 9, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5);
    doc.setTextColor(67, 56, 202);
    doc.text(it.name.substring(0, 2), cx + 7.5, cy + 8.5, { align: 'center' });

    // Titulo e Categoria
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(15, 23, 42);
    doc.text(it.name, cx + 15, cy + 6.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(4.8);
    doc.setTextColor(100, 116, 139);
    doc.text(it.cat, cx + 15, cy + 10.5);

    // Badge Desconto
    doc.setFillColor(209, 250, 229);
    doc.roundedRect(cx + cardW - 20, cy + 3, 17, 4.5, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(4.8);
    doc.setTextColor(6, 95, 70);
    doc.text(it.disc, cx + cardW - 11.5, cy + 6.2, { align: 'center' });

    // Descricao e Endereco
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.2);
    doc.setTextColor(51, 65, 85);
    doc.text(it.desc, cx + 3, cy + 17);

    doc.setFontSize(4.5);
    doc.setTextColor(148, 163, 184);
    doc.text(`Local: ${it.end}`, cx + 3, cy + 22);

    // Botao de Acao
    doc.setFillColor(26, 86, 219);
    doc.roundedRect(cx + 3, cy + 25, cardW - 6, 6, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5);
    doc.setTextColor(255, 255, 255);
    doc.text('Abrir Modal de Detalhes e Regras ->', cx + cardW / 2, cy + 29, { align: 'center' });
  });
}

// -------------------------------------------------------------
// TELA 4: MODAL DE DETALHES DA EMPRESA
// -------------------------------------------------------------
export function drawScreenCompanyModal(doc, x, y, w, h) {
  drawWindowFrame(doc, x, y, w, h, 'Detalhes do Convênio & Regras', '/aluno/empresas/detalhes');

  const contentY = y + 9;
  // Fundo com backdrop escuro simulando modal aberto
  doc.setFillColor(15, 23, 42);
  doc.rect(x + 0.5, contentY, w - 1, h - 9.5, 'F');

  // Modal Centralizado
  const mW = 124;
  const mH = 88;
  const mX = x + (w - mW) / 2;
  const mY = contentY + 5;

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(mX, mY, mW, mH, 3, 3, 'F');

  // Topo do Modal
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(mX, mY, mW, 11, 3, 3, 'F');
  doc.rect(mX, mY + 7, mW, 4, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.line(mX, mY + 11, mX + mW, mY + 11);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('Smart Fit Academia - Unidade Campus', mX + 5, mY + 7.5);

  doc.setFillColor(241, 245, 249);
  doc.circle(mX + mW - 6, mY + 5.5, 3, 'F');
  doc.setFontSize(6);
  doc.setTextColor(100, 116, 139);
  doc.text('X', mX + mW - 6, mY + 7.5, { align: 'center' });

  // Botoes Rapidos de Contato (4 pilulas coloridas)
  const btnY = mY + 14;
  const contacts = [
    { label: 'WhatsApp', bg: [220, 252, 231], text: [22, 101, 52] },
    { label: 'Telefone', bg: [224, 242, 254], text: [7, 89, 133] },
    { label: 'Instagram', bg: [250, 232, 255], text: [134, 25, 143] },
    { label: 'Site Oficial', bg: [241, 245, 249], text: [51, 65, 85] },
  ];
  let cx = mX + 5;
  contacts.forEach((c) => {
    doc.setFillColor(...c.bg);
    doc.roundedRect(cx, btnY, 26, 5.5, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5);
    doc.setTextColor(...c.text);
    doc.text(c.label, cx + 13, btnY + 3.8, { align: 'center' });
    cx += 29;
  });

  // Endereco e Horarios
  const infoY = btnY + 8.5;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(mX + 5, infoY, mW - 10, 12, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(30, 41, 59);
  doc.text('Localização: Av. Universitária, 1500 - Bairro Universitário, São Paulo - SP', mX + 8, infoY + 5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Horário de Atendimento: Segunda a Sexta das 06h às 23h | Sábados e Domingos das 08h às 14h', mX + 8, infoY + 9.5);

  // Lista de Beneficios Ativos da Empresa
  const benY = infoY + 15;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Benefícios Disponíveis para Alunos Conveniados:', mX + 5, benY);

  const perks = [
    {
      title: '30% de Desconto na Mensalidade Regular',
      desc: 'Válido para qualquer plano (Smart ou Black). Apresentar carteirinha ativa na recepção.',
      val: 'Válido até 31/12/2026',
    },
    {
      title: 'Isenção Total da Taxa de Adesão e Matrícula',
      desc: 'Exclusivo para novas matrículas de alunos com vínculo acadêmico comprovado.',
      val: 'Campanha Anual 2026',
    },
  ];

  perks.forEach((p, idx) => {
    const py = benY + 3 + idx * 16;
    doc.setFillColor(238, 242, 255);
    doc.setDrawColor(199, 210, 254);
    doc.roundedRect(mX + 5, py, mW - 10, 13.5, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6);
    doc.setTextColor(67, 56, 202);
    doc.text(p.title, mX + 8, py + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5);
    doc.setTextColor(71, 85, 105);
    doc.text(p.desc, mX + 8, py + 8.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(4.5);
    doc.setTextColor(5, 150, 105);
    doc.text(`[V] ${p.val}`, mX + 8, py + 12);
  });

  // Instrucao Final e Botao Fechar
  const footY = mY + mH - 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5);
  doc.setTextColor(100, 116, 139);
  doc.text('Para aplicar o desconto, basta apresentar seu Cartão Digital no ato da compra.', mX + 5, footY);

  doc.setFillColor(15, 23, 42);
  doc.roundedRect(mX + mW - 28, footY - 3, 23, 6, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(255, 255, 255);
  doc.text('Fechar Janela', mX + mW - 16.5, footY + 1, { align: 'center' });
}

// -------------------------------------------------------------
// TELA 5: CARTEIRINHA DIGITAL DO ALUNO
// -------------------------------------------------------------
export function drawScreenStudentCard(doc, x, y, w, h) {
  drawWindowFrame(doc, x, y, w, h, 'Carteirinha Digital do Aluno', '/aluno/cartao');

  const contentY = y + 9;
  doc.setFillColor(248, 250, 252);
  doc.rect(x + 0.5, contentY, w - 1, h - 9.5, 'F');

  // Cabecalho com Botao Tela Cheia
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('Documento de Identificação Estudantil', x + 8, contentY + 7);

  doc.setFillColor(26, 86, 219);
  doc.roundedRect(x + w - 38, contentY + 3, 30, 6, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(255, 255, 255);
  doc.text('[+] Modo Tela Cheia', x + w - 23, contentY + 7, { align: 'center' });

  // A CARTEIRINHA DIGITAL VETORIAL (Estilo Card Oficial em Azul Marinho)
  const cardW = 126;
  const cardH = 74;
  const cardX = x + (w - cardW) / 2;
  const cardY = contentY + 12;

  // Sombra do cartao
  doc.setFillColor(199, 210, 254);
  doc.roundedRect(cardX + 1.5, cardY + 1.5, cardW, cardH, 4, 4, 'F');

  // Corpo do cartao em Azul Marinho Nobre
  doc.setFillColor(30, 58, 138); // #1e3a8a
  doc.roundedRect(cardX, cardY, cardW, cardH, 4, 4, 'F');

  // Faixa superior institucional
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(cardX, cardY, cardW, 11, 4, 4, 'F');
  doc.rect(cardX, cardY + 7, cardW, 4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(255, 255, 255);
  doc.text('INSTITUIÇÃO DE ENSINO SUPERIOR CONVENIADA', cardX + 8, cardY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5);
  doc.setTextColor(147, 197, 253);
  doc.text('CLUBE DE BENEFÍCIOS DOS ALUNOS | PROGRAMA OFICIAL', cardX + 8, cardY + 9);

  // Coluna Esquerda: Foto do Aluno
  const photoX = cardX + 8;
  const photoY = cardY + 15;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(photoX, photoY, 26, 32, 2, 2, 'F');
  doc.setDrawColor(96, 165, 250);
  doc.setLineWidth(0.5);
  doc.roundedRect(photoX, photoY, 26, 32, 2, 2, 'D');

  // Avatar icon simulado
  doc.setFillColor(224, 231, 255);
  doc.circle(photoX + 13, photoY + 11, 6, 'F');
  doc.roundedRect(photoX + 5, photoY + 19, 16, 10, 3, 3, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5);
  doc.setTextColor(67, 56, 202);
  doc.text('FOTO DO ALUNO', photoX + 13, photoY + 30, { align: 'center' });

  // Coluna Central: Dados do Aluno
  const dataX = photoX + 30;
  const dataY = cardY + 16;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5);
  doc.setTextColor(191, 219, 254);
  doc.text('NOME DO ESTUDANTE', dataX, dataY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('JOÃO CARLOS DA SILVA', dataX, dataY + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5);
  doc.setTextColor(191, 219, 254);
  doc.text('MATRÍCULA ACADÊMICA', dataX, dataY + 10);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text('20240101', dataX, dataY + 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5);
  doc.setTextColor(191, 219, 254);
  doc.text('CURSO / MODALIDADE', dataX, dataY + 19.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(255, 255, 255);
  doc.text('Análise e Desenvolvimento de Sistemas', dataX, dataY + 23.5);

  // Coluna Direita: QR Code e Vigencia
  const qrX = cardX + cardW - 28;
  const qrY = cardY + 16;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(qrX, qrY, 20, 20, 1.5, 1.5, 'F');

  // Matriz simulada do QR code
  doc.setFillColor(15, 23, 42);
  doc.rect(qrX + 2, qrY + 2, 5, 5, 'F');
  doc.rect(qrX + 13, qrY + 2, 5, 5, 'F');
  doc.rect(qrX + 2, qrY + 13, 5, 5, 'F');
  doc.rect(qrX + 9, qrY + 8, 3, 3, 'F');
  doc.rect(qrX + 13, qrY + 13, 4, 4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(4);
  doc.setTextColor(100, 116, 139);
  doc.text('VALIDAÇÃO QR', qrX + 10, qrY + 19, { align: 'center' });

  // Faixa Inferior de Vigencia e Status
  const footerCardY = cardY + cardH - 16;
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(cardX + 4, footerCardY, cardW - 8, 12, 2, 2, 'F');

  // Badge Status
  doc.setFillColor(16, 185, 129);
  doc.roundedRect(cardX + 8, footerCardY + 2.5, 30, 7, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(255, 255, 255);
  doc.text('VIGÊNCIA ATIVA', cardX + 23, footerCardY + 7.2, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  doc.setTextColor(241, 245, 249);
  doc.text('Validade: 20/12/2026', cardX + 43, footerCardY + 7.2);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5);
  doc.setTextColor(147, 197, 253);
  doc.text('CÓDIGO: CBA-2024-8A4F', cardX + cardW - 38, footerCardY + 7.2);
}

// -------------------------------------------------------------
// TELA 6: TELA DE BLOQUEIO EDUCADA
// -------------------------------------------------------------
export function drawScreenBlocked(doc, x, y, w, h) {
  drawWindowFrame(doc, x, y, w, h, 'Acesso Restrito / Vencido', '/aluno/bloqueado');

  const contentY = y + 9;
  doc.setFillColor(254, 242, 242);
  doc.rect(x + 0.5, contentY, w - 1, h - 9.5, 'F');

  // Card de Bloqueio Central
  const bW = 114;
  const bH = 88;
  const bX = x + (w - bW) / 2;
  const bY = contentY + 5;

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(bX, bY, bW, bH, 3, 3, 'FD');

  // Icone de Bloqueio / Escudo Alerta
  doc.setFillColor(254, 226, 226);
  doc.circle(bX + bW / 2, bY + 14, 9, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(225, 29, 72);
  doc.text('!', bX + bW / 2, bY + 17.5, { align: 'center' });

  // Titulo
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(159, 18, 57);
  doc.text('Acesso Temporariamente Restrito', bX + bW / 2, bY + 28, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(136, 19, 55);
  doc.text('Identificamos que o vínculo estudantil de Carlos Souza expirou em 15/01/2026.', bX + bW / 2, bY + 33, { align: 'center' });

  // Resumo Cadastral do Aluno Bloqueado
  doc.setFillColor(255, 241, 242);
  doc.setDrawColor(254, 205, 211);
  doc.roundedRect(bX + 8, bY + 37, bW - 16, 14, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(159, 18, 57);
  doc.text('Dados Cadastrais:', bX + 11, bY + 42);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  doc.setTextColor(136, 19, 55);
  doc.text('Matrícula: 20240103 | Curso: Direito Noturno | Status Atual: VENCIDO', bX + 11, bY + 47);

  // Informacoes de Contato da Secretaria
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(bX + 8, bY + 54, bW - 16, 19, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(30, 41, 59);
  doc.text('Como regularizar seu acesso?', bX + 11, bY + 59);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5);
  doc.setTextColor(71, 85, 105);
  doc.text('Entre em contato com a Secretaria Acadêmica para renovar seu vínculo e liberar o clube:', bX + 11, bY + 63);
  doc.text('Email: secretaria@instituicao.edu.br  |  WhatsApp: (11) 98765-4321', bX + 11, bY + 67);
  doc.text('Horário: Segunda a Sexta, das 08h às 21h', bX + 11, bY + 70.5);

  // Botoes Finais
  doc.setFillColor(225, 29, 72);
  doc.roundedRect(bX + 8, bY + 76, 45, 7, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(255, 255, 255);
  doc.text('Ver Cartão para Conferência', bX + 30.5, bY + 80.5, { align: 'center' });

  doc.setFillColor(241, 245, 249);
  doc.roundedRect(bX + bW - 53, bY + 76, 45, 7, 1.5, 1.5, 'F');
  doc.setTextColor(71, 85, 105);
  doc.text('Encerrar Sessão / Trocar Usuário', bX + bW - 30.5, bY + 80.5, { align: 'center' });
}

// -------------------------------------------------------------
// TELA 7: DASHBOARD DO ADMINISTRADOR
// -------------------------------------------------------------
export function drawScreenAdminDashboard(doc, x, y, w, h) {
  drawWindowFrame(doc, x, y, w, h, 'Painel Geral da Secretaria (Dashboard)', '/admin/dashboard');

  const contentY = y + 9;
  doc.setFillColor(248, 250, 252);
  doc.rect(x + 0.5, contentY, w - 1, h - 9.5, 'F');

  // Cabecalho Admin
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('Secretaria Acadêmica - Visão Geral do Clube', x + 6, contentY + 6.5);

  // Acoes Rapidas
  const actButtons = ['+ Novo Aluno', '+ Nova Empresa', '+ Novo Benefício'];
  let abX = x + w - 74;
  actButtons.forEach((btn, idx) => {
    doc.setFillColor(idx === 0 ? 26 : 241, idx === 0 ? 86 : 245, idx === 0 ? 219 : 249);
    doc.roundedRect(abX, contentY + 2.5, 22, 5.5, 1.2, 1.2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5);
    doc.setTextColor(idx === 0 ? 255 : 51, idx === 0 ? 255 : 65, idx === 0 ? 255 : 85);
    doc.text(btn, abX + 11, contentY + 6.2, { align: 'center' });
    abX += 24;
  });

  // 6 KPIs em Grid (3 colunas x 2 linhas)
  const kpis = [
    { title: 'Total de Alunos', val: '154', sub: 'Cadastrados no sistema', bg: [255, 255, 255], color: [15, 23, 42] },
    { title: 'Alunos Ativos', val: '138', sub: 'Vigência regular (89.6%)', bg: [236, 253, 245], color: [5, 150, 105] },
    { title: 'Alunos Vencidos', val: '12', sub: 'Acesso bloqueado', bg: [254, 242, 242], color: [225, 29, 72] },
    { title: 'A Vencer em <=30 Dias', val: '4', sub: 'Demanda renovação urgente', bg: [254, 243, 199], color: [217, 119, 6] },
    { title: 'Empresas Parceiras', val: '28', sub: 'Convênios ativos', bg: [255, 255, 255], color: [26, 86, 219] },
    { title: 'Benefícios Ativos', val: '42', sub: 'Descontos no catálogo', bg: [255, 255, 255], color: [79, 70, 229] },
  ];

  const kpiW = (w - 18) / 3;
  const kpiH = 17.5;
  const kpiStartY = contentY + 11;

  kpis.forEach((k, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const kx = x + 5 + col * (kpiW + 4);
    const ky = kpiStartY + row * (kpiH + 3);

    doc.setFillColor(...k.bg);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(kx, ky, kpiW, kpiH, 2, 2, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5);
    doc.setTextColor(100, 116, 139);
    doc.text(k.title, kx + 3.5, ky + 4.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...k.color);
    doc.text(k.val, kx + 3.5, ky + 11.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(4.5);
    doc.setTextColor(148, 163, 184);
    doc.text(k.sub, kx + 3.5, ky + 15.2);
  });

  // Fila Prioritaria de Renovacao (Alunos Vencendo)
  const listY = kpiStartY + 41;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Fila Prioritária de Renovação de Vigência (Próximos 30 Dias)', x + 5, listY);

  const urgentStudents = [
    { nome: 'Maria Santos', mat: '20240102', curso: 'Enfermagem', val: '21/09/2026', dias: 'Faltam 15 dias', status: 'Atenção' },
    { nome: 'Lucas Mendes', mat: '20240107', curso: 'Ciência da Computação', val: '28/09/2026', dias: 'Faltam 22 dias', status: 'Atenção' },
  ];

  urgentStudents.forEach((st, idx) => {
    const uy = listY + 3 + idx * 12.5;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(254, 243, 199);
    doc.roundedRect(x + 5, uy, w - 10, 10.5, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(15, 23, 42);
    doc.text(st.nome, x + 8, uy + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Matrícula: ${st.mat} | Curso: ${st.curso} | Validade: ${st.val}`, x + 8, uy + 8.5);

    // Badge Dias
    doc.setFillColor(254, 243, 199);
    doc.roundedRect(x + w - 60, uy + 3, 20, 5, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(4.5);
    doc.setTextColor(180, 83, 9);
    doc.text(st.dias, x + w - 50, uy + 6.5, { align: 'center' });

    // Botao Renovar +90d
    doc.setFillColor(5, 150, 105);
    doc.roundedRect(x + w - 37, uy + 3, 16, 5, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(4.8);
    doc.setTextColor(255, 255, 255);
    doc.text('+90 Dias', x + w - 29, uy + 6.5, { align: 'center' });

    // Botao Editar
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(x + w - 19, uy + 3, 14, 5, 1, 1, 'F');
    doc.setTextColor(71, 85, 105);
    doc.text('Editar', x + w - 12, uy + 6.5, { align: 'center' });
  });
}

// -------------------------------------------------------------
// TELA 8: GESTAO DE ALUNOS & VIGENCIA
// -------------------------------------------------------------
export function drawScreenAdminStudents(doc, x, y, w, h) {
  drawWindowFrame(doc, x, y, w, h, 'Administração de Alunos & Vigência', '/admin/alunos');

  const contentY = y + 9;
  doc.setFillColor(248, 250, 252);
  doc.rect(x + 0.5, contentY, w - 1, h - 9.5, 'F');

  // Filtros e Botao Novo Aluno
  const filterY = contentY + 3;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(x + 5, filterY, 80, 6.5, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Buscar por nome, matrícula ou curso...', x + 8, filterY + 4.5);

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(x + 88, filterY, 35, 6.5, 1.5, 1.5, 'FD');
  doc.setTextColor(71, 85, 105);
  doc.text('Filtro: Todos os Status [v]', x + 91, filterY + 4.5);

  doc.setFillColor(26, 86, 219);
  doc.roundedRect(x + w - 38, filterY, 33, 6.5, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(255, 255, 255);
  doc.text('+ Cadastrar Novo Aluno', x + w - 21.5, filterY + 4.5, { align: 'center' });

  // Tabela de Alunos
  const tableY = filterY + 9.5;
  const thH = 6;
  doc.setFillColor(30, 41, 59);
  doc.rect(x + 5, tableY, w - 10, thH, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(255, 255, 255);
  doc.text('ALUNO / MATRÍCULA', x + 8, tableY + 4.2);
  doc.text('CURSO', x + 55, tableY + 4.2);
  doc.text('VIGÊNCIA', x + 92, tableY + 4.2);
  doc.text('STATUS', x + 116, tableY + 4.2);
  doc.text('AÇÕES DE RENOVAÇÃO', x + 138, tableY + 4.2);

  const studentsList = [
    { nome: 'João Carlos Silva', mat: '20240101', curso: 'Análise e Desenv. Sistemas', val: '20/12/2026', st: 'Ativo', color: [5, 150, 105], bg: [209, 250, 229] },
    { nome: 'Maria Eduarda Santos', mat: '20240102', curso: 'Enfermagem Geral', val: '21/09/2026', st: 'Atenção (15d)', color: [217, 119, 6], bg: [254, 243, 199] },
    { nome: 'Carlos Souza Ribeiro', mat: '20240103', curso: 'Direito Noturno', val: '15/01/2026', st: 'Vencido', color: [225, 29, 72], bg: [254, 226, 226] },
    { nome: 'Beatriz Lima Rocha', mat: '20240104', curso: 'Administração', val: '30/11/2026', st: 'Inadimplente', color: [159, 18, 57], bg: [255, 228, 230] },
  ];

  studentsList.forEach((st, idx) => {
    const rowY = tableY + thH + idx * 14.5;
    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
    doc.rect(x + 5, rowY, w - 10, 14.5, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.line(x + 5, rowY + 14.5, x + w - 5, rowY + 14.5);

    // Nome e Matricula
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6);
    doc.setTextColor(15, 23, 42);
    doc.text(st.nome, x + 8, rowY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(4.8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Matrícula: ${st.mat}`, x + 8, rowY + 10);

    // Curso
    doc.setFontSize(5.2);
    doc.setTextColor(51, 65, 85);
    doc.text(st.curso, x + 55, rowY + 7.5);

    // Validade
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5.5);
    doc.setTextColor(30, 41, 59);
    doc.text(st.val, x + 92, rowY + 7.5);

    // Badge Status
    doc.setFillColor(...st.bg);
    doc.roundedRect(x + 112, rowY + 4, 22, 5.5, 1.2, 1.2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(4.6);
    doc.setTextColor(...st.color);
    doc.text(st.st, x + 123, rowY + 7.8, { align: 'center' });

    // Botoes de Acao
    doc.setFillColor(5, 150, 105);
    doc.roundedRect(x + 138, rowY + 4, 10, 5.5, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(4.5);
    doc.setTextColor(255, 255, 255);
    doc.text('+30d', x + 143, rowY + 7.8, { align: 'center' });

    doc.setFillColor(26, 86, 219);
    doc.roundedRect(x + 149.5, rowY + 4, 10, 5.5, 1, 1, 'F');
    doc.text('+90d', x + 154.5, rowY + 7.8, { align: 'center' });

    doc.setFillColor(241, 245, 249);
    doc.roundedRect(x + 161, rowY + 4, 9, 5.5, 1, 1, 'F');
    doc.setTextColor(71, 85, 105);
    doc.text('Edit', x + 165.5, rowY + 7.8, { align: 'center' });
  });

  // Paginacao
  const pagY = y + h - 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5);
  doc.setTextColor(148, 163, 184);
  doc.text('Exibindo 1 a 4 de 154 alunos cadastrados | Página 1 de 39', x + 8, pagY + 4);
}

// -------------------------------------------------------------
// TELA 9: GESTAO DE EMPRESAS PARCEIRAS
// -------------------------------------------------------------
export function drawScreenAdminCompanies(doc, x, y, w, h) {
  drawWindowFrame(doc, x, y, w, h, 'Credenciamento & Gestão de Parceiros', '/admin/empresas');

  const contentY = y + 9;
  doc.setFillColor(248, 250, 252);
  doc.rect(x + 0.5, contentY, w - 1, h - 9.5, 'F');

  // Topo Filtros
  const topY = contentY + 3;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(x + 5, topY, 80, 6.5, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Filtrar empresas conveniadas...', x + 8, topY + 4.5);

  doc.setFillColor(26, 86, 219);
  doc.roundedRect(x + w - 42, topY, 37, 6.5, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(255, 255, 255);
  doc.text('+ Cadastrar Nova Empresa', x + w - 23.5, topY + 4.5, { align: 'center' });

  // Tabela de Empresas
  const tableY = topY + 9.5;
  const thH = 6;
  doc.setFillColor(30, 41, 59);
  doc.rect(x + 5, tableY, w - 10, thH, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(255, 255, 255);
  doc.text('EMPRESA PARCEIRA', x + 8, tableY + 4.2);
  doc.text('CATEGORIA', x + 58, tableY + 4.2);
  doc.text('BENEFÍCIOS', x + 92, tableY + 4.2);
  doc.text('DESTAQUE', x + 115, tableY + 4.2);
  doc.text('STATUS', x + 136, tableY + 4.2);
  doc.text('AÇÕES', x + 156, tableY + 4.2);

  const companiesList = [
    { nome: 'Smart Fit Academia', cat: 'Saúde & Fitness', bens: '2 ativos', dest: true, st: 'Ativo' },
    { nome: 'Restaurante Sabor Univ.', cat: 'Alimentação', bens: '1 ativo', dest: false, st: 'Ativo' },
    { nome: 'Livraria & Copiadora Saber', cat: 'Educação', bens: '1 ativo', dest: true, st: 'Ativo' },
    { nome: 'Tech Store Informática', cat: 'Tecnologia', bens: '2 ativos', dest: false, st: 'Ativo' },
  ];

  companiesList.forEach((c, idx) => {
    const rowY = tableY + thH + idx * 14.5;
    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
    doc.rect(x + 5, rowY, w - 10, 14.5, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.line(x + 5, rowY + 14.5, x + w - 5, rowY + 14.5);

    // Empresa
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6);
    doc.setTextColor(15, 23, 42);
    doc.text(c.nome, x + 8, rowY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(4.8);
    doc.setTextColor(100, 116, 139);
    doc.text('Conveniada oficial', x + 8, rowY + 10.5);

    // Categoria
    doc.setFontSize(5.2);
    doc.setTextColor(51, 65, 85);
    doc.text(c.cat, x + 58, rowY + 8);

    // Beneficios
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5.2);
    doc.setTextColor(67, 56, 202);
    doc.text(c.bens, x + 92, rowY + 8);

    // Destaque (Badge elegante)
    if (c.dest) {
      doc.setFillColor(254, 243, 199);
      doc.roundedRect(x + 115, rowY + 4.5, 14, 5.5, 1, 1, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(4.8);
      doc.setTextColor(180, 83, 9);
      doc.text('SIM', x + 122, rowY + 8.2, { align: 'center' });
    } else {
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(x + 115, rowY + 4.5, 14, 5.5, 1, 1, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(4.8);
      doc.setTextColor(100, 116, 139);
      doc.text('NÃO', x + 122, rowY + 8.2, { align: 'center' });
    }

    // Status
    doc.setFillColor(209, 250, 229);
    doc.roundedRect(x + 134, rowY + 4.5, 15, 5.5, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(4.8);
    doc.setTextColor(6, 95, 70);
    doc.text(c.st, x + 141.5, rowY + 8.2, { align: 'center' });

    // Acoes
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(x + 153, rowY + 4.5, 8.5, 5.5, 1, 1, 'F');
    doc.setFontSize(4.5);
    doc.setTextColor(51, 65, 85);
    doc.text('Edit', x + 157.2, rowY + 8.2, { align: 'center' });

    doc.setFillColor(254, 226, 226);
    doc.roundedRect(x + 162.5, rowY + 4.5, 8.5, 5.5, 1, 1, 'F');
    doc.setTextColor(153, 27, 27);
    doc.text('Excl', x + 166.7, rowY + 8.2, { align: 'center' });
  });
}

// -------------------------------------------------------------
// TELA 10: GESTAO DE BENEFICIOS & DESCONTOS
// -------------------------------------------------------------
export function drawScreenAdminBenefits(doc, x, y, w, h) {
  drawWindowFrame(doc, x, y, w, h, 'Controle de Benefícios & Campanhas', '/admin/beneficios');

  const contentY = y + 9;
  doc.setFillColor(248, 250, 252);
  doc.rect(x + 0.5, contentY, w - 1, h - 9.5, 'F');

  // Topo Filtros
  const topY = contentY + 3;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(x + 5, topY, 80, 6.5, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Filtrar benefícios e promoções...', x + 8, topY + 4.5);

  doc.setFillColor(26, 86, 219);
  doc.roundedRect(x + w - 40, topY, 35, 6.5, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(255, 255, 255);
  doc.text('+ Cadastrar Novo Benefício', x + w - 22.5, topY + 4.5, { align: 'center' });

  // Tabela de Beneficios
  const tableY = topY + 9.5;
  const thH = 6;
  doc.setFillColor(30, 41, 59);
  doc.rect(x + 5, tableY, w - 10, thH, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(255, 255, 255);
  doc.text('EMPRESA / TÍTULO', x + 8, tableY + 4.2);
  doc.text('DESCONTO', x + 66, tableY + 4.2);
  doc.text('VIGÊNCIA', x + 88, tableY + 4.2);
  doc.text('REGRAS PRINCIPAIS', x + 112, tableY + 4.2);
  doc.text('STATUS', x + 154, tableY + 4.2);

  const benefitsList = [
    { emp: 'Smart Fit Academia', tit: 'Desconto de 30% na Mensalidade', desc: '30%', val: '31/12/2026', reg: 'Válido para planos regulares' },
    { emp: 'Smart Fit Academia', tit: 'Isenção da Taxa de Matrícula', desc: '100%', val: '31/12/2026', reg: 'Apenas novas matrículas' },
    { emp: 'Restaurante Sabor', tit: 'Almoço Executivo Completo', desc: '20%', val: '30/11/2026', reg: 'Segunda a Sexta' },
    { emp: 'Drogaria São Paulo', tit: 'Medicamentos Genéricos', desc: '25%', val: '31/12/2026', reg: 'Compras presenciais' },
  ];

  benefitsList.forEach((b, idx) => {
    const rowY = tableY + thH + idx * 14.5;
    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
    doc.rect(x + 5, rowY, w - 10, 14.5, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.line(x + 5, rowY + 14.5, x + w - 5, rowY + 14.5);

    // Titulo e Empresa
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6);
    doc.setTextColor(15, 23, 42);
    doc.text(b.tit, x + 8, rowY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(4.8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Empresa vinculada: ${b.emp}`, x + 8, rowY + 10);

    // Desconto
    doc.setFillColor(209, 250, 229);
    doc.roundedRect(x + 64, rowY + 4, 15, 5.5, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5.5);
    doc.setTextColor(6, 95, 70);
    doc.text(b.desc, x + 71.5, rowY + 8, { align: 'center' });

    // Vigencia
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5);
    doc.setTextColor(51, 65, 85);
    doc.text(b.val, x + 88, rowY + 8);

    // Regras
    doc.setFontSize(4.8);
    doc.setTextColor(71, 85, 105);
    doc.text(b.reg, x + 112, rowY + 8);

    // Status
    doc.setFillColor(236, 253, 245);
    doc.roundedRect(x + 152, rowY + 4, 18, 5.5, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5);
    doc.setTextColor(5, 150, 105);
    doc.text('Ativo', x + 161, rowY + 8, { align: 'center' });
  });
}

// -------------------------------------------------------------
// TELA 11: GERENCIAMENTO DO BANCO LOCAL & BACKUP
// -------------------------------------------------------------
export function drawScreenAdminSettings(doc, x, y, w, h) {
  drawWindowFrame(doc, x, y, w, h, 'Banco de Dados Local (localStorage) & Backup', '/admin/configuracoes');

  const contentY = y + 9;
  doc.setFillColor(248, 250, 252);
  doc.rect(x + 0.5, contentY, w - 1, h - 9.5, 'F');

  // Card Informativo sobre Arquitetura 100% Local
  doc.setFillColor(238, 242, 255);
  doc.setDrawColor(199, 210, 254);
  doc.roundedRect(x + 5, contentY + 3, w - 10, 15, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(67, 56, 202);
  doc.text('Arquitetura 100% Client-Side no Navegador (localStorage)', x + 8, contentY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.2);
  doc.setTextColor(79, 70, 229);
  doc.text('Todos os registros (Alunos, Empresas, Benefícios e Sessões) residem no armazenamento do navegador.', x + 8, contentY + 12);
  doc.text('Garantia de total privacidade acadêmica: zero tráfego para servidores externos ou serviços de terceiros.', x + 8, contentY + 15.5);

  // 3 Blocos de Acao do Banco
  const actions = [
    {
      title: 'Exportar Backup Completo (JSON)',
      desc: 'Baixa um arquivo .json seguro com todas as tabelas atuais para contingência ou migração futura.',
      btn: 'Baixar Backup (.json)',
      btnBg: [5, 150, 105],
    },
    {
      title: 'Restaurar Dados Oficiais de Teste',
      desc: 'Restaura a base demonstrativa padrão (4 alunos em diferentes status, empresas e convênios).',
      btn: 'Restaurar Base Padrão',
      btnBg: [26, 86, 219],
    },
    {
      title: 'Limpeza de Dados Locais',
      desc: 'Zera as chaves de dados do navegador para simular primeiro acesso (requer confirmação).',
      btn: 'Limpar Armazenamento Local',
      btnBg: [225, 29, 72],
    },
  ];

  const blockStartY = contentY + 21;
  actions.forEach((act, idx) => {
    const by = blockStartY + idx * 21;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(x + 5, by, w - 10, 18, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(15, 23, 42);
    doc.text(act.title, x + 8, by + 6.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5.2);
    doc.setTextColor(100, 116, 139);
    doc.text(act.desc, x + 8, by + 12);

    doc.setFillColor(...act.btnBg);
    doc.roundedRect(x + w - 52, by + 5, 44, 8, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5.5);
    doc.setTextColor(255, 255, 255);
    doc.text(act.btn, x + w - 30, by + 10.2, { align: 'center' });
  });
}
