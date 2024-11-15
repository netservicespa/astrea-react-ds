import React from 'react';
import { NsHeader, UserPanelProps } from '../../patterns/navigation/NsHeader';

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
