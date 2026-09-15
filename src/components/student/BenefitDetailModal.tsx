import React, { useState } from 'react';
import {
  Calendar,
  Check,
  CheckCircle,
  Copy,
  CreditCard,
  FileText,
  Info,
  MapPin,
  Percent,
  Sparkles,
  Tag,
  X,
} from 'lucide-react';
import { Benefit } from '../../types';
import { formatDateBR } from '../../utils/dateUtils';

interface BenefitDetailModalProps {
  benefit: Benefit | null;
  onClose: () => void;
  onOpenCard: () => void;
}

export const BenefitDetailModal: React.FC<BenefitDetailModalProps> = ({
  benefit,
  onClose,
  onOpenCard,
}) => {
  const [copied, setCopied] = useState(false);

  if (!benefit) return null;

  const handleCopyCoupon = () => {
    if (!benefit.codigoCupom) return;
    navigator.clipboard.writeText(benefit.codigoCupom);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="benefit-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Topo / Cabeçalho do Modal */}
        <div className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-5 sm:p-6 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white backdrop-blur-xs">
                {benefit.categoria || 'Benefício'}
              </span>
              {benefit.destaque && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Destaque
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{benefit.titulo}</h2>

            {benefit.local && (
              <p className="text-xs text-blue-100 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{benefit.local}</span>
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo rolável */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-700">
          {/* Desconto em Destaque */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">
                Condição do Benefício
              </span>
              <div className="text-base font-bold text-slate-900 mt-0.5">
                {benefit.percentualDesconto ? (
                  <span className="text-emerald-700 font-extrabold text-lg">
                    {benefit.percentualDesconto}% de Desconto
                  </span>
                ) : (
                  <span className="text-blue-900 font-bold">{benefit.valorOuCondicao || 'Condição Exclusiva'}</span>
                )}
              </div>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
              <Percent className="w-6 h-6" />
            </div>
          </div>

          {/* Descrição */}
          {benefit.descricao && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Sobre este Benefício
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                {benefit.descricao}
              </p>
            </div>
          )}

          {/* Cupom Promocional (se houver) */}
          {benefit.codigoCupom && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/70 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <Tag className="w-4 h-4 text-amber-700" />
                <span>Código Promocional / Cupom</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="px-3 py-1.5 bg-white border border-amber-300 rounded-xl font-mono text-sm font-bold text-amber-950 flex-1 tracking-wider">
                  {benefit.codigoCupom}
                </code>
                <button
                  type="button"
                  onClick={handleCopyCoupon}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Como Utilizar com Carteirinha Digital */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
              <CreditCard className="w-4 h-4 text-emerald-700" />
              <span>Como Usufruir com a Carteirinha Digital</span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              {benefit.comoUtilizar || 'Apresente sua Carteirinha Digital no momento do atendimento antes do fechamento da conta ou pagamento.'}
            </p>
          </div>

          {/* Regras de Utilização */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Regras e Condições
            </h4>
            <div className="text-xs text-slate-600 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 whitespace-pre-line leading-relaxed">
              {benefit.regrasDeUso}
            </div>
          </div>

          {/* Período de Vigência */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>
                Validade: {benefit.dataFim ? `Até ${formatDateBR(benefit.dataFim)}` : 'Indeterminada'}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              Status: Ativo
            </span>
          </div>
        </div>

        {/* Rodapé com botão para Carteirinha Digital */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 font-semibold text-xs cursor-pointer"
          >
            Fechar
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenCard();
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            <span>Abrir Minha Carteirinha Digital</span>
          </button>
        </div>
      </div>
    </div>
  );
};
