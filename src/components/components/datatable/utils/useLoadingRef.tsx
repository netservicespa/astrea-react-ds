import React from 'react';

export function useLoadingRef<T>(value: T, isLoading: boolean): React.RefObject<T> {
    const ref = React.useRef(value);
    if (isLoading) {
        ref.current = value;
    }
    return ref;
}
