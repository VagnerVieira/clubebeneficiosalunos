import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { jsPDF } from 'jspdf';
import {
  drawScreenLogin,
  drawScreenHome,
  drawScreenCompanies,
  drawScreenCompanyModal,
  drawScreenStudentCard,
  drawScreenBlocked,
  drawScreenAdminDashboard,
  drawScreenAdminStudents,
  drawScreenAdminCompanies,
  drawScreenAdminBenefits,
  drawScreenAdminSettings,
} from './screen-mockups.js';

function createManualPDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 16;
  const contentWidth = pageWidth - marginX * 2;
  const totalPages = 15;

  // Paleta de Cores Institucional
  const primary = [26, 86, 219]; // Azul Institucional
  const primaryDark = [15, 23, 42]; // Slate 900
  const emeraldDark = [5, 150, 105];
  const amber = [217, 119, 6];
  const rose = [225, 29, 72];

  function addHeaderFooter(doc, pageNum, chapterTitle = '') {
    if (pageNum === 1) return;

    // Linha superior
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(marginX, 12, pageWidth - marginX, 12);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(26, 86, 219);
    doc.text('CLUBE DE BENEFÍCIOS DOS ALUNOS', marginX, 9);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    if (chapterTitle) {
      doc.text(chapterTitle.toUpperCase(), pageWidth - marginX, 9, { align: 'right' });
    }

    // Linha inferior
    doc.line(marginX, pageHeight - 12, pageWidth - marginX, pageHeight - 12);

    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text('Manual Oficial do Sistema & Especificação Visual de Telas | MVP Local', marginX, pageHeight - 8);
    doc.text(`Página ${pageNum} de ${totalPages}`, pageWidth - marginX, pageHeight - 8, { align: 'right' });
  }

  function renderScreenSpec(doc, startY, info) {
    let curY = startY;

    // Box Ficha Tecnica
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(marginX, curY, contentWidth, 23, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(26, 86, 219);
    doc.text('FICHA TÉCNICA DA INTERFACE', marginX + 4, curY + 5.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(51, 65, 85);
    doc.text('Componente:', marginX + 4, curY + 11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text(info.component, marginX + 24, curY + 11);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(51, 65, 85);
    doc.text('Perfil de Acesso:', marginX + 4, curY + 16);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text(info.access, marginX + 26, curY + 16);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(51, 65, 85);
    doc.text('Finalidade:', marginX + 4, curY + 20.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text(info.purpose, marginX + 20, curY + 20.5);

    curY += 27;

    // Duas Colunas: Elementos Interativos vs Regras de Negocio
    const colW = (contentWidth - 6) / 2;
    const colH = 72;

    // Coluna 1: Elementos & Controles Visuais
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(marginX, curY, colW, colH, 2, 2, 'FD');

    doc.setFillColor(238, 242, 255);
    doc.roundedRect(marginX + 1, curY + 1, colW - 2, 6.5, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(67, 56, 202);
    doc.text('ELEMENTOS E CONTROLES DE TELA', marginX + 4, curY + 5.5);

    let itemY = curY + 11;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.2);
    doc.setTextColor(51, 65, 85);
    info.elements.forEach((el) => {
      doc.setFillColor(79, 70, 229);
      doc.circle(marginX + 5, itemY - 0.9, 0.7, 'F');
      const lines = doc.splitTextToSize(el, colW - 14);
      doc.text(lines, marginX + 8, itemY);
      itemY += lines.length * 3.5 + 1.2;
    });

    // Coluna 2: Regras de Negocio e Fluxo de Validacao
    const col2X = marginX + colW + 6;
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(col2X, curY, colW, colH, 2, 2, 'FD');

    doc.setFillColor(236, 253, 245);
    doc.roundedRect(col2X + 1, curY + 1, colW - 2, 6.5, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(6, 95, 70);
    doc.text('REGRAS DE NEGÓCIO & VALIDAÇÃO', col2X + 4, curY + 5.5);

    let ruleY = curY + 11;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.2);
    doc.setTextColor(51, 65, 85);
    info.rules.forEach((rl) => {
      doc.setFillColor(5, 150, 105);
      doc.circle(col2X + 5, ruleY - 0.9, 0.7, 'F');
      const lines = doc.splitTextToSize(rl, colW - 14);
      doc.text(lines, col2X + 8, ruleY);
      ruleY += lines.length * 3.5 + 1.2;
    });
  }

  // ==========================================
  // PAGINA 1: CAPA OFICIAL
  // ==========================================
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setFillColor(26, 86, 219);
  doc.rect(0, 0, pageWidth, 6, 'F');

  // Card Central Escuro
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(24, 38, pageWidth - 48, 206, 8, 8, 'F');

  // Icone Logo CB
  doc.setFillColor(26, 86, 219);
  doc.roundedRect(pageWidth / 2 - 18, 54, 36, 36, 6, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text('CB', pageWidth / 2, 77, { align: 'center' });

  // Badge Manual
  doc.setFillColor(16, 185, 129);
  doc.roundedRect(pageWidth / 2 - 50, 102, 100, 7.5, 3.5, 3.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('MANUAL COMPLETO COM TODAS AS TELAS ILUSTRADAS', pageWidth / 2, 107.2, { align: 'center' });

  // Titulo Principal
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(255, 255, 255);
  doc.text('Clube de Benefícios', pageWidth / 2, 126, { align: 'center' });
  doc.text('dos Alunos', pageWidth / 2, 137, { align: 'center' });

  // Subtitulo
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(148, 163, 184);
  doc.text('Guia Operacional, Arquitetura e Catálogo Visual das 11 Telas do Sistema', pageWidth / 2, 149, { align: 'center' });

  // 3 Boxes Resumo
  const boxW = 44;
  const bY = 164;
  const bH = 50;

  // Box Aluno
  doc.setFillColor(26, 86, 219);
  doc.roundedRect(34, bY, boxW, bH, 4, 4, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('ÁREA DO ALUNO', 34 + boxW / 2, bY + 9, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(224, 231, 255);
  doc.text('- Catálogo de parceiros\n- Carteirinha digital QR\n- Validação de vigência\n- Modo tela cheia', 37, bY + 18);

  // Box Admin
  doc.setFillColor(13, 148, 136);
  doc.roundedRect(34 + boxW + 7, bY, boxW, bH, 4, 4, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('ÁREA ADMINISTRATIVA', 34 + boxW + 7 + boxW / 2, bY + 9, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(204, 251, 241);
  doc.text('- Painel com 6 indicadores\n- Gestão de vigência\n- Cadastro de parceiros\n- Controle de benefícios', 34 + boxW + 10, bY + 18);

  // Box Tecnologia
  doc.setFillColor(51, 65, 85);
  doc.roundedRect(34 + (boxW + 7) * 2, bY, boxW, bH, 4, 4, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('TECNOLOGIA LOCAL', 34 + (boxW + 7) * 2 + boxW / 2, bY + 9, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(226, 232, 240);
  doc.text('- 100% localStorage\n- Zero servidor externo\n- Backup/Restauro JSON\n- 15 páginas ilustradas', 34 + (boxW + 7) * 2 + 3, bY + 18);

  // Rodape Capa
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Versão: 1.0.0 (MVP) | Ano Letivo 2026', pageWidth / 2, 222, { align: 'center' });
  doc.text('Instituição de Ensino Superior & Técnico Conveniada', pageWidth / 2, 228, { align: 'center' });
  doc.text('Documento gerado para equipe pedagógica, administrativa e discente', pageWidth / 2, 234, { align: 'center' });

  // ==========================================
  // PAGINA 2: SUMARIO & ARQUITETURA GERAL
  // ==========================================
  doc.addPage();
  addHeaderFooter(doc, 2, 'Sumário & Arquitetura Geral');

  let curY = 22;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(15, 23, 42);
  doc.text('1. Sumário & Visão Geral da Arquitetura', marginX, curY);

  curY += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    'Este documento técnico e funcional detalha a operação completa do MVP do "Clube de Benefícios dos Alunos",\n' +
    'apresentando a especificação visual real de todas as 11 telas do aplicativo, suas regras de negócio em localStorage,\n' +
    'controle de validade estudantil e o roteiro oficial de testes homologados.',
    marginX,
    curY
  );

  curY += 16;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(marginX, curY, contentWidth, 48, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(26, 86, 219);
  doc.text('ÍNDICE COMPLETO DAS 15 PÁGINAS DESTE MANUAL', marginX + 6, curY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  doc.text('Página 1: Capa Oficial do Sistema', marginX + 6, curY + 14);
  doc.text('Página 2: Sumário e Diretrizes Arquiteturais (Armazenamento Local)', marginX + 6, curY + 19);
  doc.text('Página 3: Perfis de Acesso e Regras de Negócio de Validade Estudantil', marginX + 6, curY + 24);
  doc.text('Páginas 4 a 9: Catálogo Visual Ilustrado das Telas do Aluno (Telas 1 a 6 com Mockup + Ficha Técnica)', marginX + 6, curY + 29);
  doc.text('Páginas 10 a 14: Catálogo Visual Ilustrado das Telas do Administrador (Telas 7 a 11 com Mockup + Ficha Técnica)', marginX + 6, curY + 34);
  doc.text('Página 15: Roteiro Oficial de Homologação em 6 Passos e Casos de Teste', marginX + 6, curY + 39);

  curY += 56;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Diretrizes de Armazenamento Local (100% Client-Side)', marginX, curY);

  curY += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(
    'O sistema foi concebido sob uma estrita premissa de simplicidade, autonomia e total privacidade:\n' +
    'ele roda integralmente no navegador do usuário, sem necessidade de banco de dados externo ou APIs de terceiros.\n' +
    'Todos os dados são mantidos em chaves JSON padronizadas no localStorage.',
    marginX,
    curY
  );

  curY += 17;
  const tableData = [
    { key: 'clube_alunos_v1', entity: 'Alunos (Student)', desc: 'Matrícula (única), nome, curso, data de início, vigência, status, foto e senha.' },
    { key: 'clube_empresas_v1', entity: 'Empresas (Company)', desc: 'Razão social, categoria, contatos (WhatsApp/Telefone/Instagram), horários, status e destaque.' },
    { key: 'clube_beneficios_v1', entity: 'Benefícios (Benefit)', desc: 'Desconto %, regras de uso, vigência inicial/final e código promocional.' },
    { key: 'clube_admins_v1', entity: 'Admins (AdminUser)', desc: 'Credenciais de acesso institucional (admin@instituicao.edu.br).' },
    { key: 'clube_sessao_v1', entity: 'Sessão (AuthSession)', desc: 'Estado do usuário conectado, perfil (aluno/admin) e carimbo de autenticação.' },
  ];

  doc.setFillColor(30, 41, 59);
  doc.rect(marginX, curY, contentWidth, 6.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('CHAVE LOCALSTORAGE', marginX + 4, curY + 4.5);
  doc.text('ENTIDADE DE DADOS', marginX + 48, curY + 4.5);
  doc.text('FINALIDADE E CAMPOS ARMAZENADOS', marginX + 90, curY + 4.5);

  curY += 6.5;
  tableData.forEach((row, i) => {
    const descLines = doc.splitTextToSize(row.desc, 84);
    const rowH = Math.max(9, descLines.length * 3.5 + 3);

    doc.setFillColor(i % 2 === 0 ? 255 : 248, i % 2 === 0 ? 255 : 250, i % 2 === 0 ? 255 : 252);
    doc.rect(marginX, curY, contentWidth, rowH, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.line(marginX, curY + rowH, marginX + contentWidth, curY + rowH);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(26, 86, 219);
    doc.text(row.key, marginX + 4, curY + 5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(row.entity, marginX + 48, curY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.2);
    doc.setTextColor(71, 85, 105);
    doc.text(descLines, marginX + 90, curY + 5);

    curY += rowH;
  });

  // ==========================================
  // PAGINA 3: REGRAS DE VALIDADE
  // ==========================================
  doc.addPage();
  addHeaderFooter(doc, 3, 'Perfis de Acesso & Regras de Validade');

  curY = 22;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(15, 23, 42);
  doc.text('2. Perfis de Acesso & Controle Central de Validade', marginX, curY);

  curY += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    'O sistema segmenta suas operações em dois perfis distintos com níveis de privilégio e interfaces dedicadas.\n' +
    'O coração do sistema é a regra de negócio que valida a vigência do vínculo acadêmico do estudante em tempo real.',
    marginX,
    curY
  );

  curY += 15;
  // Boxes de Perfis (Aluno vs Secretaria)
  const pColW = (contentWidth - 6) / 2;
  doc.setFillColor(238, 242, 255);
  doc.setDrawColor(199, 210, 254);
  doc.roundedRect(marginX, curY, pColW, 40, 2.5, 2.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(26, 86, 219);
  doc.text('PERFIL ALUNO (ESTUDANTE)', marginX + 5, curY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(51, 65, 85);
  doc.text(
    '- Login por Matrícula Institucional + Senha/PIN.\n' +
    '- Acesso liberado enquanto a vigência estiver válida.\n' +
    '- Consulta a empresas parceiras e regras de desconto.\n' +
    '- Exibição da Carteirinha Digital com QR Code.\n' +
    '- Bloqueio automático e respeitoso em caso de expiração.',
    marginX + 5,
    curY + 14
  );

  doc.setFillColor(240, 253, 250);
  doc.setDrawColor(153, 246, 228);
  doc.roundedRect(marginX + pColW + 6, curY, pColW, 40, 2.5, 2.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(13, 148, 136);
  doc.text('PERFIL ADMINISTRADOR (SECRETARIA)', marginX + pColW + 11, curY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(51, 65, 85);
  doc.text(
    '- Login por E-mail Institucional + Senha Administrativa.\n' +
    '- Painel com 6 indicadores e fila de alunos vencendo.\n' +
    '- Gestão cadastral e renovação de vigência com 1 clique.\n' +
    '- Cadastro e gestão de Empresas Parceiras e Benefícios.\n' +
    '- Ferramentas de backup JSON, restauração e limpeza.',
    marginX + pColW + 11,
    curY + 14
  );

  curY += 48;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Tabela de Avaliação e Regras de Validade Estudantil', marginX, curY);

  curY += 8;
  const validityStates = [
    {
      status: 'Ativo (Vigente)',
      regra: 'Status cadastral "Ativo" e data de validade > 30 dias a partir de hoje.',
      acesso: 'LIBERADO',
      tagColor: emeraldDark,
      bgTag: [209, 250, 229],
      msg: 'Acesso total a parceiros, benefícios e carteirinha regular.',
    },
    {
      status: 'Ativo (Atenção)',
      regra: 'Status "Ativo", porém faltam entre 1 e 30 dias para expirar a vigência.',
      acesso: 'LIBERADO*',
      tagColor: amber,
      bgTag: [254, 243, 199],
      msg: 'Acesso liberado com banner âmbar de aviso para procurar a secretaria.',
    },
    {
      status: 'Vencido',
      regra: 'Data de validade expirou (menor que hoje) ou status marcado como "Vencido".',
      acesso: 'BLOQUEADO',
      tagColor: rose,
      bgTag: [255, 228, 230],
      msg: 'Tela de Bloqueio respeitosa com dados e canais da secretaria.',
    },
    {
      status: 'Inadimplente',
      regra: 'Status explicitamente alterado pela secretaria para "Inadimplente".',
      acesso: 'BLOQUEADO',
      tagColor: rose,
      bgTag: [255, 228, 230],
      msg: 'Acesso suspenso; orienta regularização junto ao setor financeiro.',
    },
    {
      status: 'Inativo / Trancado',
      regra: 'Aluno trancou matrícula, desistiu ou foi suspenso formalmente.',
      acesso: 'BLOQUEADO',
      tagColor: rose,
      bgTag: [255, 228, 230],
      msg: 'Acesso revogado até que a secretaria reative o cadastro.',
    },
  ];

  validityStates.forEach((v) => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(marginX, curY, contentWidth, 16.5, 2, 2, 'FD');

    doc.setFillColor(...v.bgTag);
    doc.roundedRect(marginX + 3, curY + 2.5, 34, 5.5, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(...v.tagColor);
    doc.text(v.status, marginX + 20, curY + 6.2, { align: 'center' });

    doc.setFillColor(...(v.acesso.includes('LIBERADO') ? [236, 253, 245] : [255, 241, 242]));
    doc.roundedRect(pageWidth - marginX - 25, curY + 2.5, 22, 5.5, 1.5, 1.5, 'F');
    doc.setFontSize(6.5);
    doc.setTextColor(...(v.acesso.includes('LIBERADO') ? emeraldDark : rose));
    doc.text(v.acesso, pageWidth - marginX - 14, curY + 6.2, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(30, 41, 59);
    doc.text(v.regra, marginX + 40, curY + 6.2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.2);
    doc.setTextColor(100, 116, 139);
    doc.text(`Efeito no App: ${v.msg}`, marginX + 4, curY + 13);

    curY += 19.5;
  });

  // ==========================================
  // PAGINAS 4 A 14: AS 11 TELAS ILUSTRADAS
  // ==========================================
  const screensConfig = [
    {
      num: 1,
      page: 4,
      title: 'TELA 1: LOGIN & AUTENTICAÇÃO',
      subtitle: 'Acesso Institucional de Estudantes e Secretaria',
      drawMockup: drawScreenLogin,
      spec: {
        component: 'src/components/auth/LoginScreen.tsx',
        access: 'Público (Estudantes e Administradores)',
        purpose: 'Validar credenciais, identificar o perfil do usuário e estabelecer a sessão local ativa.',
        elements: [
          'Alternador visual de abas ("Sou Aluno" vs "Administração").',
          'Campo de Matrícula Institucional com validação numérica.',
          'Campo de Senha/PIN com máscara segura e validação.',
          'Botão de ação principal "Entrar no Clube dos Alunos".',
          'Painel expansível de credenciais rápidas de demonstração (1 clique).',
          'Avisos de erro amigáveis em caso de dados incorretos.',
        ],
        rules: [
          'Matrícula deve coincidir estritamente com registro em "clube_alunos_v1".',
          'Após o login, o sistema avalia a data de validade do estudante.',
          'Se o aluno estiver ativo, direciona para a Tela Inicial.',
          'Se o aluno estiver vencido/inadimplente, direciona para a Tela de Bloqueio.',
          'O perfil administrativo direciona para o Painel de Indicadores.',
        ],
      },
    },
    {
      num: 2,
      page: 5,
      title: 'TELA 2: INÍCIO (HOME DO ALUNO)',
      subtitle: 'Painel Inicial do Estudante com Banner de Vigência',
      drawMockup: drawScreenHome,
      spec: {
        component: 'src/components/student/StudentHome.tsx',
        access: 'Estudante com status Ativo ou em Atenção',
        purpose: 'Apresentar o status da vigência acadêmica, atalhos do cartão e empresas em destaque.',
        elements: [
          'Cabeçalho com saudação personalizada e primeiro nome do aluno.',
          'Banner inteligente de vigência com contagem de dias restantes.',
          'Botão de atalho direto "Meu Cartão Digital" no topo.',
          'Carrossel / Grid de "Empresas Parceiras em Destaque".',
          'Cards de empresas com logo, categoria, desconto e botão de detalhes.',
          'Barra de navegação inferior fixa (Início, Empresas, Cartão).',
        ],
        rules: [
          'Se validade > 30 dias: banner verde com mensagem de regularidade.',
          'Se validade entre 1 e 30 dias: banner âmbar com alerta de renovação.',
          'Exibe somente empresas cadastradas com a flag "destaque: true".',
          'Permite abrir o modal de detalhes diretamente ao clicar no parceiro.',
          'Atualiza os dados reativamente caso o administrador altere a vigência.',
        ],
      },
    },
    {
      num: 3,
      page: 6,
      title: 'TELA 3: CATÁLOGO DE PARCEIROS & BUSCA',
      subtitle: 'Explorador Completo de Convênios e Filtros Temáticos',
      drawMockup: drawScreenCompanies,
      spec: {
        component: 'src/components/student/StudentCompanies.tsx',
        access: 'Estudante com vínculo regular ativo',
        purpose: 'Permitir pesquisa e filtragem instantânea de todos os estabelecimentos credenciados.',
        elements: [
          'Barra de busca textual com filtro em tempo real (nome/serviço).',
          'Filtros horizontais por categoria (Alimentação, Saúde, Tecnologia, etc.).',
          'Grid responsivo de cards de empresas conveniadas.',
          'Badge de destaque com percentual de desconto máximo oferecido.',
          'Endereço físico e horário de funcionamento resumidos no card.',
          'Botão "Ver Detalhes & Regras" para abrir o modal completo.',
        ],
        rules: [
          'Busca sem sensibilidade a maiúsculas e com consulta em benefícios.',
          'Filtro por categoria recalcula a contagem de parceiros disponíveis.',
          'Oculta automaticamente empresas marcadas com status "Inativo".',
          'Garante navegação fluida e rápida sem recarregar a página.',
          'Apresenta estado vazio ("Nenhum parceiro encontrado") com clareza.',
        ],
      },
    },
    {
      num: 4,
      page: 7,
      title: 'TELA 4: MODAL DE DETALHES DO CONVÊNIO',
      subtitle: 'Informações Completas da Empresa Parceira e Regras de Uso',
      drawMockup: drawScreenCompanyModal,
      spec: {
        component: 'src/components/student/CompanyDetailModal.tsx',
        access: 'Estudante navegando pelo catálogo de empresas',
        purpose: 'Exibir contatos diretos (WhatsApp/Telefone), endereço completo e regras de cada desconto.',
        elements: [
          'Janela modal sobreposta com efeito backdrop escuro.',
          'Cabeçalho com razão social, logo e botão de fechar (X).',
          'Quatro botões de contato rápido: WhatsApp, Telefone, Instagram, Site.',
          'Box de localização presencial com endereço completo e horários.',
          'Lista minuciosa de todos os benefícios oferecidos pela empresa.',
          'Instrução clara ao aluno: "Apresente sua carteirinha no atendimento".',
        ],
        rules: [
          'O link do WhatsApp gera mensagem padrão: "Olá, sou aluno conveniado".',
          'O botão de telefone aciona a discagem telefônica oficial (tel:).',
          'Exibe a data de validade individual de cada promoção cadastrada.',
          'Bloqueia fechamento acidental com tecla ESC ou clique externo.',
          'Adapta o layout perfeitamente para visualização em smartphones.',
        ],
      },
    },
    {
      num: 5,
      page: 8,
      title: 'TELA 5: CARTEIRINHA DIGITAL DO ALUNO',
      subtitle: 'Documento Estudantil Oficial com QR Code e Modo Tela Cheia',
      drawMockup: drawScreenStudentCard,
      spec: {
        component: 'src/components/student/StudentCard.tsx',
        access: 'Estudante logado (somente para alunos regulares)',
        purpose: 'Servir como documento digital para apresentação em caixas e recepções conveniadas.',
        elements: [
          'Cartão visual de alta fidelidade em azul marinho/índigo.',
          'Foto institucional do estudante com moldura protetora.',
          'Dados completos: Nome, Matrícula, Curso e Nível de graduação.',
          'Selo de vigência em tempo real com data de validade formatada.',
          'Simulação gráfica de QR Code para leitura rápida em scanners.',
          'Botão de ação "Modo Tela Cheia" e botão de impressão.',
        ],
        rules: [
          'A cor do selo de vigência segue a regra do negócio (verde para ativo).',
          'Gera código de autenticidade único combinando matrícula e ano.',
          'Modo Tela Cheia oculta a navegação e maximiza o contraste para leitura.',
          'Impossibilita geração de carteirinha para matrículas inativas.',
          'Garante nitidez em qualquer densidade de tela (Retina/OLED).',
        ],
      },
    },
    {
      num: 6,
      page: 9,
      title: 'TELA 6: TELA DE BLOQUEIO EDUCADA',
      subtitle: 'Acesso Suspenso por Vigência Expirada ou Inadimplência',
      drawMockup: drawScreenBlocked,
      spec: {
        component: 'src/components/student/BlockedAccess.tsx',
        access: 'Exibida exclusivamente para alunos com pendência ou expirados',
        purpose: 'Comunicar cordialmente o impedimento de acesso e direcionar para os canais da secretaria.',
        elements: [
          'Ícone institucional de advertência respeitosa (escudo rosé).',
          'Mensagem personalizada explicando o motivo exato do bloqueio.',
          'Card com os dados cadastrais do aluno para conferência.',
          'Canais oficiais de atendimento da secretaria (E-mail, WhatsApp, Horários).',
          'Botão "Ver Cartão para Conferência" (exibe status vencido).',
          'Botão para deslogar com segurança e permitir troca de usuário.',
        ],
        rules: [
          'Acionada automaticamente se evaluateStudentValidity() retornar "vencido".',
          'Não permite navegar pelo catálogo de empresas ou acessar descontos.',
          'Evita linguagem punitiva, adotando tom acolhedor e resolutivo.',
          'Orienta os passos necessários para regularização cadastral.',
          'Atualiza automaticamente caso a secretaria renove o vínculo.',
        ],
      },
    },
    {
      num: 7,
      page: 10,
      title: 'TELA 7: PAINEL DO ADMINISTRADOR',
      subtitle: 'Painel Geral de Indicadores (6 KPIs) e Fila Prioritária',
      drawMockup: drawScreenAdminDashboard,
      spec: {
        component: 'src/components/admin/AdminDashboard.tsx',
        access: 'Administradores da Secretaria Acadêmica',
        purpose: 'Oferecer visão estratégica consolidada e atalhos de renovação para alunos em risco.',
        elements: [
          'Barra de ações rápidas (+ Novo Aluno, + Nova Empresa, + Novo Benefício).',
          '6 Cards de KPIs: Total Alunos, Ativos, Vencidos, A Vencer <=30d, Empresas, Benefícios.',
          'Fila prioritária de estudantes com vigência próxima do vencimento.',
          'Botões rápidos para somar +90 dias de validade com um único clique.',
          'Resumo percentual de adesão e regularidade do corpo discente.',
          'Navegação por abas para todas as áreas administrativas.',
        ],
        rules: [
          'Todos os 6 indicadores são recalculados em tempo real do localStorage.',
          'Alunos a vencer em <=30 dias são ordenados pela data mais crítica.',
          'O botão de renovação +90d atualiza o banco local instantaneamente.',
          'Zero delay de requisição de rede (processamento 100% no cliente).',
          'Permite exportação de relatórios e backup a qualquer momento.',
        ],
      },
    },
    {
      num: 8,
      page: 11,
      title: 'TELA 8: GESTÃO DE ALUNOS & VIGÊNCIA',
      subtitle: 'Controle Cadastral, Matrículas e Renovação de Validade',
      drawMockup: drawScreenAdminStudents,
      spec: {
        component: 'src/components/admin/AdminStudents.tsx',
        access: 'Administradores da Secretaria Acadêmica',
        purpose: 'Cadastrar novos estudantes, editar dados e estender datas de vigência acadêmica.',
        elements: [
          'Barra de pesquisa textual por nome, matrícula ou curso.',
          'Filtro seletor por status (Todos, Ativos, Atenção, Vencidos, Inadimplentes).',
          'Botão "+ Cadastrar Novo Aluno" com modal completo.',
          'Tabela de dados com colunas: Aluno/Matrícula, Curso, Vigência, Status, Ações.',
          'Botões de renovação expressa (+30 dias e +90 dias).',
          'Botões de edição cadastral e exclusão segura.',
        ],
        rules: [
          'Validação estrita de Matrícula Única (impede cadastros duplicados).',
          'Data de validade aceita extensão manual ou via atalhos semestrais.',
          'Modificação de status reflete imediatamente no acesso do estudante.',
          'Exclusão exige modal de confirmação para evitar perdas acidentais.',
          'Paginação dinâmica com suporte a centenas de cadastros locais.',
        ],
      },
    },
    {
      num: 9,
      page: 12,
      title: 'TELA 9: CREDENCIAMENTO DE EMPRESAS',
      subtitle: 'Cadastro e Gestão de Estabelecimentos Conveniados',
      drawMockup: drawScreenAdminCompanies,
      spec: {
        component: 'src/components/admin/AdminCompanies.tsx',
        access: 'Administradores da Secretaria Acadêmica',
        purpose: 'Gerenciar o quadro de convênios, dados de contato e vitrine de destaques.',
        elements: [
          'Campo de filtro rápido por nome ou categoria da empresa.',
          'Botão principal "+ Cadastrar Nova Empresa Parceira".',
          'Tabela com colunas: Empresa, Categoria, Benefícios Ativos, Destaque, Status, Ações.',
          'Chave de destaque (SIM/NÃO) para definir vitrine na Home do Aluno.',
          'Toggle rápido para ativar ou inativar o parceiro temporariamente.',
          'Botões de edição completa e exclusão em cascata.',
        ],
        rules: [
          'Empresas inativas são ocultadas imediatamente do catálogo discente.',
          'A exclusão de uma empresa remove seus benefícios vinculados em cascata.',
          'Suporte a links diretos de WhatsApp, Instagram, Telefone e Web.',
          'Valida preenchimento obrigatório de Razão Social e Categoria.',
          'Permite associar múltiplos descontos a uma mesma empresa parceira.',
        ],
      },
    },
    {
      num: 10,
      page: 13,
      title: 'TELA 10: GESTÃO DE BENEFÍCIOS & DESCONTOS',
      subtitle: 'Controle de Regras de Uso, Percentuais e Validade das Ofertas',
      drawMockup: drawScreenAdminBenefits,
      spec: {
        component: 'src/components/admin/AdminBenefits.tsx',
        access: 'Administradores da Secretaria Acadêmica',
        purpose: 'Cadastrar campanhas de desconto, vigência das ofertas e condições de uso.',
        elements: [
          'Filtro seletor para isolar benefícios por empresa conveniada.',
          'Botão "+ Cadastrar Novo Benefício" com formulário modal.',
          'Tabela com colunas: Título/Empresa, Desconto %, Vigência, Regras de Uso, Status.',
          'Badge verde com o percentual de economia do estudante.',
          'Descrição clara das regras (dias da semana, horários, itens válidos).',
          'Interruptor de status para pausar promoções sazonais.',
        ],
        rules: [
          'Cada benefício deve estar estritamente vinculado a uma empresa ativa.',
          'Validação impede data final da promoção anterior à data inicial.',
          'O percentual de desconto deve ser um valor numérico positivo (1 a 100%).',
          'Regras de uso são exibidas integralmente no modal do aluno.',
          'Permite edição de texto sem perder o histórico da campanha.',
        ],
      },
    },
    {
      num: 11,
      page: 14,
      title: 'TELA 11: GERENCIAMENTO DO BANCO LOCAL & BACKUP',
      subtitle: 'Segurança de Dados, Exportação JSON e Restauração de Testes',
      drawMockup: drawScreenAdminSettings,
      spec: {
        component: 'src/components/admin/AdminSettings.tsx',
        access: 'Administradores da Secretaria Acadêmica',
        purpose: 'Prover ferramentas de contingência, backup de arquivos e restauração de testes.',
        elements: [
          'Card didático explicando a arquitetura 100% client-side em localStorage.',
          'Bloco de Ação 1: "Exportar Cópia de Segurança (Backup JSON)".',
          'Bloco de Ação 2: "Restaurar Base Demonstrativa Oficial".',
          'Bloco de Ação 3: "Limpeza de Armazenamento Local".',
          'Contadores de tabelas ativas e integridade do banco.',
          'Modais de confirmação em duas etapas para ações irreversíveis.',
        ],
        rules: [
          'O arquivo de backup contém Alunos, Empresas, Benefícios e Admins formatados.',
          'O download do JSON ocorre instantaneamente sem passar por servidores.',
          'A restauração de teste recarrega a massa padrão para homologação.',
          'A limpeza zera o armazenamento para testes limpos de primeiro acesso.',
          'Após qualquer alteração no banco, o app sincroniza o estado global.',
        ],
      },
    },
  ];

  screensConfig.forEach((cfg) => {
    doc.addPage();
    addHeaderFooter(doc, cfg.page, cfg.title);

    // Titulo da Tela e Subtitulo
    let topY = 21;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text(cfg.title, marginX, topY);

    topY += 5.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(cfg.subtitle, marginX, topY);

    // MOCKUP VISUAL REALISTA DA TELA (Largura: contentWidth, Altura: 112mm)
    const mockupY = topY + 4;
    const mockupH = 112;
    cfg.drawMockup(doc, marginX, mockupY, contentWidth, mockupH);

    // ESPECIFICACAO TECNICA ABAIXO DO MOCKUP
    const specStartY = mockupY + mockupH + 5;
    renderScreenSpec(doc, specStartY, cfg.spec);
  });

  // ==========================================
  // PAGINA 15: ROTEIRO PRATICO DE HOMOLOGACAO
  // ==========================================
  doc.addPage();
  addHeaderFooter(doc, 15, 'Roteiro de Homologação & Demonstração');

  curY = 22;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(15, 23, 42);
  doc.text('5. Roteiro Prático de Homologação dos 6 Fluxos', marginX, curY);

  curY += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    'Para testar e validar o sistema na íntegra em menos de 5 minutos, execute os seguintes passos demonstrativos:',
    marginX,
    curY
  );

  curY += 11;
  const testSteps = [
    {
      step: 'Passo 1: Login de Aluno Regular (João Silva)',
      action: 'Na tela de login, clique em "Ver credenciais de demonstração" e selecione "João Silva - Ativo".',
      expected: 'O sistema entra na tela inicial liberada, exibindo selo de vigência verde e catálogo completo.',
    },
    {
      step: 'Passo 2: Exploração de Parceiros & Cartão Digital',
      action: 'Navegue até "Empresas", filtre por "Alimentação", clique em um card e depois abra "Meu Cartão".',
      expected: 'O modal exibe contatos e regras. A carteirinha abre com dados reais e botão para Tela Cheia.',
    },
    {
      step: 'Passo 3: Teste de Acesso Expirado (Carlos Souza)',
      action: 'Saia do sistema e faça login selecionando "Carlos Souza - Vencido".',
      expected: 'A tela de bloqueio é exibida instantaneamente, impedindo acesso e orientando ir à secretaria.',
    },
    {
      step: 'Passo 4: Acesso Administrativo Institucional',
      action: 'Faça login selecionando "Administração" usando admin@instituicao.edu.br e senha admin123.',
      expected: 'O painel administrativo é aberto com 6 métricas, gráficos e atalhos rápidos.',
    },
    {
      step: 'Passo 5: Renovação de Validade em Tempo Real',
      action: 'Na aba "Alunos", localize Carlos Souza, clique em "Editar", adicione "+180 dias" e salve.',
      expected: 'Carlos passa para status Ativo. Ao logar novamente como Carlos, seu acesso estará 100% liberado.',
    },
    {
      step: 'Passo 6: Cadastro de Empresa e Benefício',
      action: 'Vá na aba "Empresas", clique em "+ Nova Empresa", preencha e vincule um benefício na aba seguinte.',
      expected: 'O novo parceiro aparece imediatamente para todos os alunos no catálogo de convênios.',
    },
  ];

  testSteps.forEach((t) => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(marginX, curY, contentWidth, 23, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(26, 86, 219);
    doc.text(t.step, marginX + 4, curY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    doc.text(`Ação: ${t.action}`, marginX + 4, curY + 11.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(5, 150, 105);
    doc.text(`Resultado Esperado: ${t.expected}`, marginX + 4, curY + 18);

    curY += 26;
  });

  curY += 4;
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(marginX, curY, contentWidth, 24, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('SISTEMA PRONTO PARA USO E APRESENTAÇÃO INSTITUCIONAL', marginX + 6, curY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(148, 163, 184);
  doc.text(
    'O MVP do Clube de Benefícios dos Alunos atende com excelência a todos os requisitos de funcionalidade,\n' +
    'controle de acesso por data, ergonomia de uso e estabilidade em ambiente web responsivo.\n' +
    'Desenvolvido com padrão de acessibilidade e arquitetura desacoplada para fácil migração futura a backend.',
    marginX + 6,
    curY + 14
  );

  // Escrever o arquivo final padronizado em public/manual-do-sistema.pdf
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.join(publicDir, 'manual-do-sistema.pdf');
  const tempRawPath = path.join(publicDir, 'manual-raw.pdf');
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(tempRawPath, pdfBuffer);

  try {
    // Normalizacao ISO com Ghostscript
    execSync(
      `gs -dPDFSTOPONERROR -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/prepress -o "${outputPath}" "${tempRawPath}"`,
      { stdio: 'pipe' }
    );
    if (fs.existsSync(tempRawPath)) {
      fs.unlinkSync(tempRawPath);
    }
    const finalSize = fs.statSync(outputPath).size;
    console.log(`PDF com todas as 11 telas gerado com sucesso: ${outputPath} (${finalSize} bytes)`);
  } catch (err) {
    console.warn('Ghostscript falhou, mantendo versao pura jsPDF:', err.message);
    if (fs.existsSync(tempRawPath)) {
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
      fs.renameSync(tempRawPath, outputPath);
    }
  }
}

createManualPDF();
