import { NsHeader, UserPanelProps } from '@/components/patterns/navigation/NsHeader';
import React from 'react';

/**
 * User Panel Component
 * @author vadim.chilinciuc
 *
 */

export function NsUserPanel({ logo, userPanelMenuItems, router, configuration, onLogout }: UserPanelProps) {
    return (
        <NsHeader
            logo={logo}
            userPanelMenuItems={userPanelMenuItems}
            router={router}
            onLogout={onLogout}
            configuration={configuration}
            type={'horizontal'}
        />
    );
}
