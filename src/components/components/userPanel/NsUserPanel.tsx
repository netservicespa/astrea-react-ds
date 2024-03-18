import React from 'react';
import { UserPanelProps } from 'src/util/types';
import { NsHeader } from '../../patterns/navigation/NsHeader';

/**
 * User Panel Component
 * @author vadim.chilinciuc
 *
 */

export function NsUserPanel({
  title,
  logo,
  userPanelMenuItems,
  router,
  configuration,
  onLogout,
}: UserPanelProps) {
  return (
    <NsHeader
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
