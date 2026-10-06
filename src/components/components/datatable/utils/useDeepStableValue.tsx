import React from 'react';
import areEqual from '@/util/areEqual';

export function useDeepStableValue<T>(value: T): T {
    const ref = React.useRef(value);
    if (!areEqual(ref.current, value)) {
        ref.current = value;
    }
    return ref.current;
}
