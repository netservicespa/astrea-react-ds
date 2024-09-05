import React from 'react';
import { UserPanelProps } from '../../../util/types';
import { NsHeader } from '../../patterns/navigation/NsHeader';

/**
 * User Panel Component
 * @author vadim.chilinciuc
 *
 */

export function NsUserPanel({
    logo,
    userPanelMenuItems,
    router,
    configuration,
    onLogout,
}: UserPanelProps) {
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
