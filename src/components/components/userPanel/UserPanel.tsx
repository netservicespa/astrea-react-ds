import React from 'react';
import { UserPanelProps } from 'src/util/types';
import { Header } from '../../../components/patterns/navigation/Header';

/**
 * User Panel Component
 * @author vadim.chilinciuc
 *
 */

export function UserPanel({
  title,
  logo,
  userPanelMenuItems,
  router,
  configuration,
  onLogout,
}: UserPanelProps) {

  return (
    <Header
      title={title}
      logo={logo}
      userPanelMenuItems={userPanelMenuItems}
      router={router}
      onLogout={onLogout}
      configuration={configuration}
     type={'horizontal'}
    />
  );
}
