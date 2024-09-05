import React from 'react';
import { RelayEnvironmentProvider } from 'relay-hooks';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes';
import uniqueId from '../../../util/uniqueId';

function createEnvironment(records: RecordMap, configName?: string) {
    const recordSource = new RecordSource(records);
    // TODO  metterlo a 100 per testare lo store
    const store = new Store(recordSource, { gcReleaseBufferSize: 1 });
    return new Environment({
        configName,
        // @ts-ignore
        network: Network.create(() => Promise.resolve()),
        store,
    });
}

export interface NsFormProps {
    /** Identificativo del form. Al momento non serve a niente*/
    name?: string;
}

/**
 * Definisce un nuovo contesto form.
 * I componenti form funzionano correttamente solo all'interno di un environment relay. Se l'app ha già un ambiente relay configurato, questo wrapper è necessario solo in caso di form multipli o annidati all'interno della pagina, per evitare conflitti tra i campi appartenenti a form diversi.
 */
export const NsFormWrapper: React.FC<React.PropsWithChildren<NsFormProps>> = ({
    name,
    children,
}) => {
    const key = React.useMemo(() => name || uniqueId('form-'), [name]);
    const environment = React.useMemo(() => createEnvironment({}, key), [key]);

    return (
        <RelayEnvironmentProvider environment={environment}>
            {children}
        </RelayEnvironmentProvider>
    );
};
