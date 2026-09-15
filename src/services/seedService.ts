import { AdminUser, Benefit, Student } from '../types';
import { addDaysToStringDate, getTodayString } from '../utils/dateUtils';
import { storageService } from './storageService';

export const STORAGE_KEYS = {
  STUDENTS: 'clube_beneficios_membros',
  BENEFITS: 'clube_beneficios_beneficios',
  ADMINS: 'clube_beneficios_admins',
  SESSION: 'clube_beneficios_session',
  INITIALIZED: 'clube_beneficios_initialized_v3',
};

const today = getTodayString();

export const INITIAL_ADMINS: AdminUser[] = [
  {
    id: 'admin-1',
    nome: 'Administração Geral do Clube',
    email: 'admin@clube.com.br',
    senha: 'admin123',
    perfil: 'admin',
    status: 'Ativo',
  },
  {
    id: 'admin-2',
    nome: 'Administrador do Sistema',
    email: 'admin@demo.com',
    senha: 'admin123',
    perfil: 'admin',
    status: 'Ativo',
  },
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'student-1',
    nome: 'João da Silva',
    matricula: '2026001',
    email: 'joao.silva@membro.org',
    telefone: '(11) 98765-4321',
    senha: '123456',
    instituicao: 'Clube de Benefícios Metropolitano',
    curso: 'Plano Premium',
    dataInicio: addDaysToStringDate(today, -180),
    dataValidade: addDaysToStringDate(today, 120), // Futura (+120 dias)
    status: 'Ativo',
    fotoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=240&auto=format&fit=crop&q=80',
    dataCriacao: addDaysToStringDate(today, -180),
    dataAtualizacao: today,
  },
  {
    id: 'student-2',
    nome: 'Maria Oliveira',
    matricula: '2026002',
    email: 'maria.oliveira@membro.org',
    telefone: '(11) 97654-3210',
    senha: '123456',
    instituicao: 'Clube de Benefícios Metropolitano',
    curso: 'Plano Gold',
    dataInicio: addDaysToStringDate(today, -360),
    dataValidade: addDaysToStringDate(today, 5), // Próxima (+5 dias)
    status: 'Ativo',
    fotoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&auto=format&fit=crop&q=80',
    dataCriacao: addDaysToStringDate(today, -360),
    dataAtualizacao: today,
  },
  {
    id: 'student-3',
    nome: 'Carlos Souza',
    matricula: '2026003',
    email: 'carlos.souza@membro.org',
    telefone: '(11) 96543-2109',
    senha: '123456',
    instituicao: 'Clube de Benefícios Metropolitano',
    curso: 'Plano Standard',
    dataInicio: addDaysToStringDate(today, -500),
    dataValidade: addDaysToStringDate(today, -15), // Passada (-15 dias)
    status: 'Vencido',
    fotoUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=240&auto=format&fit=crop&q=80',
    dataCriacao: addDaysToStringDate(today, -500),
    dataAtualizacao: today,
  },
  {
    id: 'student-4',
    nome: 'Beatriz Lima',
    matricula: '2026004',
    email: 'beatriz.lima@membro.org',
    telefone: '(11) 95432-1098',
    senha: '123456',
    instituicao: 'Clube de Benefícios Metropolitano',
    curso: 'Plano Master',
    dataInicio: addDaysToStringDate(today, -100),
    dataValidade: addDaysToStringDate(today, 60),
    status: 'Inadimplente',
    fotoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&auto=format&fit=crop&q=80',
    dataCriacao: addDaysToStringDate(today, -100),
    dataAtualizacao: today,
  },
];

export const INITIAL_BENEFITS: Benefit[] = [
  {
    id: 'ben-1',
    categoria: 'Alimentação',
    local: 'Restaurante & Gastronomia Metropolitana',
    titulo: '15% de Desconto no Almoço e Refeições',
    descricao: 'Desconto aplicado em todos os pratos do buffet por quilo ou refeição executiva completa.',
    percentualDesconto: 15,
    valorOuCondicao: '15% OFF no valor final do prato',
    regrasDeUso:
      'Válido de segunda a sexta-feira, das 11h às 15h. Apresente sua Carteirinha Digital ativa no momento do pagamento no caixa. Não cumulativo com outras promoções.',
    comoUtilizar: 'Apresente a Carteirinha Digital no caixa antes da emissão da comanda.',
    destaque: true,
    dataInicio: addDaysToStringDate(today, -60),
    dataFim: addDaysToStringDate(today, 180),
    status: 'Ativo',
    dataCriacao: addDaysToStringDate(today, -60),
    dataAtualizacao: today,
  },
  {
    id: 'ben-2',
    categoria: 'Alimentação',
    local: 'Cafeteria Central',
    titulo: 'Café Expresso Cortesia à Tarde',
    descricao: 'Na compra de qualquer salgado ou fatia de bolo, ganhe 1 café expresso tradicional cortesia.',
    valorOuCondicao: 'Café expresso grátis com salgado/doce',
    regrasDeUso:
      'Válido das 15h às 19h de segunda a sexta. Válido 1 cortesia por dia por membro. Necessário exibir a Carteirinha Digital.',
    comoUtilizar: 'Mostre sua Carteirinha Digital ao atendente no balcão.',
    destaque: false,
    dataInicio: addDaysToStringDate(today, -60),
    dataFim: addDaysToStringDate(today, 180),
    status: 'Ativo',
    dataCriacao: addDaysToStringDate(today, -60),
    dataAtualizacao: today,
  },
  {
    id: 'ben-3',
    categoria: 'Esportes',
    local: 'Complexo Esportivo e Academia',
    titulo: '25% de Desconto no Plano de Musculação e Natação',
    descricao: 'Acesso total à musculação, esteiras, aulas de spinning e funcional em qualquer dia e horário.',
    percentualDesconto: 25,
    valorOuCondicao: '25% de desconto nas mensalidades',
    regrasDeUso:
      'Desconto garantido nas mensalidades enquanto o titular mantiver o status regular e ativo. Isenção total da taxa de adesão.',
    comoUtilizar: 'Apresente a Carteirinha Digital na recepção no ato da adesão ou renovação.',
    destaque: true,
    dataInicio: addDaysToStringDate(today, -50),
    dataFim: addDaysToStringDate(today, 240),
    status: 'Ativo',
    dataCriacao: addDaysToStringDate(today, -50),
    dataAtualizacao: today,
  },
  {
    id: 'ben-4',
    categoria: 'Tecnologia',
    local: 'Laboratório & Assistência Técnica',
    titulo: '20% OFF em Manutenção de Notebooks & Periféricos',
    descricao: 'Limpeza interna de notebooks, troca de pasta térmica, formatação e periféricos como teclados e mouses.',
    percentualDesconto: 20,
    valorOuCondicao: '20% em serviços e 10% em acessórios',
    regrasDeUso:
      'Desconto válido para mão de obra de reparo mediante apresentação da Carteirinha Digital na abertura da Ordem de Serviço.',
    comoUtilizar: 'Apresente a Carteirinha Digital na abertura da Ordem de Serviço.',
    codigoCupom: 'TECH20',
    destaque: false,
    dataInicio: addDaysToStringDate(today, -45),
    dataFim: addDaysToStringDate(today, 200),
    status: 'Ativo',
    dataCriacao: addDaysToStringDate(today, -45),
    dataAtualizacao: today,
  },
  {
    id: 'ben-5',
    categoria: 'Saúde & Farmácia',
    local: 'Rede Farmacêutica & Drogaria',
    titulo: 'Até 30% em Medicamentos Genéricos e Higiene',
    descricao: 'Descontos expressivos em medicamentos de referência, genéricos e produtos de cuidado diário.',
    percentualDesconto: 30,
    valorOuCondicao: '30% Genéricos | 15% Higiene',
    regrasDeUso:
      'Apresentar a Carteirinha Digital no caixa da farmácia. Sujeito à retenção de receita médica para medicamentos controlados.',
    comoUtilizar: 'Apresente a Carteirinha Digital no caixa antes de passar os produtos.',
    destaque: true,
    dataInicio: addDaysToStringDate(today, -40),
    dataFim: addDaysToStringDate(today, 300),
    status: 'Ativo',
    dataCriacao: addDaysToStringDate(today, -40),
    dataAtualizacao: today,
  },
  {
    id: 'ben-6',
    categoria: 'Educação',
    local: 'Livraria e Papelaria Central',
    titulo: '15% de Desconto em Livros e 20% em Impressões',
    descricao: 'Desconto em livros, papelaria, cadernos, blocos e serviços gráficos de impressão.',
    percentualDesconto: 15,
    valorOuCondicao: '15% Livros | 20% Cópias e Encadernações',
    regrasDeUso:
      'Apresente a Carteirinha Digital no momento do pedido. Desconto não cumulativo com outras promoções.',
    comoUtilizar: 'Apresente a Carteirinha Digital no caixa da livraria ou balcão de atendimento.',
    destaque: false,
    dataInicio: addDaysToStringDate(today, -35),
    dataFim: addDaysToStringDate(today, 180),
    status: 'Ativo',
    dataCriacao: addDaysToStringDate(today, -35),
    dataAtualizacao: today,
  },
  {
    id: 'ben-7',
    categoria: 'Serviços',
    local: 'Centro de Formação de Condutores',
    titulo: 'R$ 250,00 de Desconto no Pacote de Habilitação (CNH)',
    descricao: 'Condição facilitada para membros com parcelamento em até 10x sem juros.',
    valorOuCondicao: 'R$ 250 de desconto + simulador grátis',
    regrasDeUso:
      'Válido para novas adesões nos pacotes de CNH Cat A+B. Apresentar a Carteirinha Digital na recepção no ato da adesão.',
    comoUtilizar: 'Apresente a Carteirinha Digital na recepção no ato da adesão.',
    destaque: false,
    dataInicio: addDaysToStringDate(today, -30),
    dataFim: addDaysToStringDate(today, 180),
    status: 'Ativo',
    dataCriacao: addDaysToStringDate(today, -30),
    dataAtualizacao: today,
  },
];

export const seedService = {
  initializeIfNeeded(): void {
    const isInitialized = storageService.getItem<boolean>(STORAGE_KEYS.INITIALIZED, false);

    if (!isInitialized) {
      this.resetToDefaults();
      return;
    }

    // Garantir que os administradores padrão existam
    const admins = storageService.getItem<AdminUser[]>(STORAGE_KEYS.ADMINS, []);
    const hasAdmin = admins.some(
      (a) => a.email.toLowerCase() === 'admin@clube.com.br'
    );
    if (!hasAdmin) {
      admins.push({
        id: 'admin-1',
        nome: 'Administração Geral do Clube',
        email: 'admin@clube.com.br',
        senha: 'admin123',
        perfil: 'admin',
        status: 'Ativo',
      });
      storageService.setItem<AdminUser[]>(STORAGE_KEYS.ADMINS, admins);
    }
  },

  getFreshInitialStudents(): Student[] {
    const freshToday = getTodayString();
    return [
      {
        id: 'student-1',
        nome: 'João da Silva',
        matricula: '2026001',
        email: 'joao.silva@membro.org',
        telefone: '(11) 98765-4321',
        senha: '123456',
        instituicao: 'Clube de Benefícios Metropolitano',
        curso: 'Plano Premium',
        dataInicio: addDaysToStringDate(freshToday, -180),
        dataValidade: addDaysToStringDate(freshToday, 120), // Futura (+120 dias)
        status: 'Ativo',
        fotoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=240&auto=format&fit=crop&q=80',
        dataCriacao: addDaysToStringDate(freshToday, -180),
        dataAtualizacao: freshToday,
      },
      {
        id: 'student-2',
        nome: 'Maria Oliveira',
        matricula: '2026002',
        email: 'maria.oliveira@membro.org',
        telefone: '(11) 97654-3210',
        senha: '123456',
        instituicao: 'Clube de Benefícios Metropolitano',
        curso: 'Plano Gold',
        dataInicio: addDaysToStringDate(freshToday, -360),
        dataValidade: addDaysToStringDate(freshToday, 5), // Próxima (+5 dias)
        status: 'Ativo',
        fotoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&auto=format&fit=crop&q=80',
        dataCriacao: addDaysToStringDate(freshToday, -360),
        dataAtualizacao: freshToday,
      },
      {
        id: 'student-3',
        nome: 'Carlos Souza',
        matricula: '2026003',
        email: 'carlos.souza@membro.org',
        telefone: '(11) 96543-2109',
        senha: '123456',
        instituicao: 'Clube de Benefícios Metropolitano',
        curso: 'Plano Standard',
        dataInicio: addDaysToStringDate(freshToday, -500),
        dataValidade: addDaysToStringDate(freshToday, -15), // Passada (-15 dias)
        status: 'Vencido',
        fotoUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=240&auto=format&fit=crop&q=80',
        dataCriacao: addDaysToStringDate(freshToday, -500),
        dataAtualizacao: freshToday,
      },
      {
        id: 'student-4',
        nome: 'Beatriz Lima',
        matricula: '2026004',
        email: 'beatriz.lima@membro.org',
        telefone: '(11) 95432-1098',
        senha: '123456',
        instituicao: 'Clube de Benefícios Metropolitano',
        curso: 'Plano Master',
        dataInicio: addDaysToStringDate(freshToday, -100),
        dataValidade: addDaysToStringDate(freshToday, 60),
        status: 'Inadimplente',
        fotoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&auto=format&fit=crop&q=80',
        dataCriacao: addDaysToStringDate(freshToday, -100),
        dataAtualizacao: freshToday,
      },
    ];
  },

  resetToDefaults(): void {
    storageService.setItem<AdminUser[]>(STORAGE_KEYS.ADMINS, INITIAL_ADMINS);
    storageService.setItem<Student[]>(STORAGE_KEYS.STUDENTS, this.getFreshInitialStudents());
    storageService.setItem<Benefit[]>(STORAGE_KEYS.BENEFITS, INITIAL_BENEFITS);
    storageService.setItem<boolean>(STORAGE_KEYS.INITIALIZED, true);
  },

  isDemoDataNotice(): string {
    return 'Modo demonstração: os dados estão salvos localmente e sincronizados em nuvem.';
  },
};
