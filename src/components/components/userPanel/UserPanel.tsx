import React from 'react';
import { UserPanelProps } from 'src/util/types';
import { Header } from '../../../components/patterns/navigation/Header';

export function UserPanel({
  title,
  user,
  logo,
  menuItems,
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
      menuItems={menuItems}
      router={router}
      user={user}
      onLogout={onLogout}
      configuration={configuration}
    />
  );
}
