import React, { useState } from 'react';
import { AdminUser } from '../../types';
import { AdminBenefits } from './AdminBenefits';
import { AdminCardsView } from './AdminCardsView';

export type AdminTab = 'beneficios' | 'carteirinhas';

interface AdminViewProps {
  user: AdminUser;
  activeTab: AdminTab;
  onNavigateTab: (tab: AdminTab) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ user, activeTab, onNavigateTab }) => {
  const [openBenefitModal, setOpenBenefitModal] = useState(false);

  return (
    <div className="w-full">
      {activeTab === 'beneficios' && (
        <AdminBenefits
          isModalOpenExternal={openBenefitModal}
          onCloseExternalModal={() => setOpenBenefitModal(false)}
        />
      )}

      {activeTab === 'carteirinhas' && <AdminCardsView />}
    </div>
  );
};
