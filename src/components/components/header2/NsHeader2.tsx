import React, { useEffect, useMemo, useState } from 'react';
import { Box, BoxProps } from '@mui/material';
import { SxProps, useTheme, Theme } from '@mui/material/styles';
import { NsHeaderBox } from './components/NsHeaderBox';

export enum NsHeaderLevel {
    NONE = -1,
    MAIN_BAR = 1,
    SUB_BAR = 2,
}

export type NsHeaderPosition = 'left' | 'center' | 'right';

export interface INsHeaderOrder {
    level: NsHeaderLevel | number; // level<=0 === no render; level=1 === MainBar, level>=2 === SubBar
    position: NsHeaderPosition;
}

export interface INsHeaderPosition {
    desktop: INsHeaderOrder;
    mobile: INsHeaderOrder;
}

export interface NsHeaderMainBarProps extends BoxProps {
    NsBorderBottom?: boolean;
    NsHeaderMainBarSx?: SxProps<Theme>;
}

export interface NsHeaderSubBarProps extends BoxProps {
    NsHeaderSubBarSx?: SxProps<Theme>;
}

export interface NsHeader2Props extends BoxProps {
    isMobile?: boolean;
    mobileBreakpoint?: number;
    NsHeaderMainBarSx?: SxProps<Theme>;
    NsHeaderSubBarSx?: SxProps<Theme>;
}

// reorder children function
const reorderChildren = (children: React.ReactNode, mode: 'desktop' | 'mobile') => {
    const positionOrder: Record<NsHeaderPosition, number> = { left: 1, center: 2, right: 3 };
    const childArray = React.Children.toArray(children);

    // Step 1: Raggruppa i children per livello
    let groupedByLevel: { level: number; children: React.ReactNode[] }[] = [];
    childArray.forEach((child: any) => {
        const level = child.props.nsPosition?.[mode]?.level || 1;
        if (level > 0) {
            let group = groupedByLevel.find((g) => g.level === level);
            if (!group) {
                group = { level, children: [] };
                groupedByLevel.push(group);
            }
            group.children.push(child);
        }
    });
    // Step 1/2: aggiunge elementi nelle posizioni rimaste vuote per un corretto allineamento
    const completeAlignment = (childrenArray: typeof groupedByLevel, mode: string) => {
        const positions = ['left', 'center', 'right'];

        return childrenArray.map((group) => {
            let children = [...group.children];
            positions.forEach((position) => {
                children = children.flatMap((child: React.ReactNode): React.ReactNode[] => {
                    if (!React.isValidElement(child)) {
                        return [child];
                    }
                    const lvl = child.props.nsPosition?.[mode]?.level || 0;
                    const pos = child.props.nsPosition?.[mode]?.position;
                    const newElement = (lvl: number, pos: string) => (
                        <NsHeaderBox
                            key={`${lvl}-${pos}`}
                            nsPosition={{
                                desktop: { level: lvl, position: pos as NsHeaderPosition },
                                mobile: { level: lvl, position: pos as NsHeaderPosition },
                            }}
                        />
                    );

                    // Controlla se l'elemento corrente corrisponde alla posizione analizzata
                    if (pos === position) {
                        return [child]; // Mantieni l'elemento esistente
                    }
                    // Se non esiste un elemento con la posizione giusta lo aggiungo
                    if (
                        !children.some(
                            (c) => React.isValidElement(c) && c.props.nsPosition?.[mode]?.position === position,
                        )
                    ) {
                        return [newElement(lvl, position), child];
                    }

                    return [child];
                });
            });

            return { ...group, children };
        });
    };
    groupedByLevel = completeAlignment(groupedByLevel, mode) as typeof groupedByLevel;

    // Step 2: Ordina i children all'interno di ogni livello
    groupedByLevel.forEach((group) => {
        group.children.sort((a: any, b: any) => {
            const positionA = (a.props.nsPosition?.[mode]?.position as NsHeaderPosition) || 'right';
            const positionB = (b.props.nsPosition?.[mode]?.position as NsHeaderPosition) || 'right';
            return positionOrder[positionA] - positionOrder[positionB];
        });
    });

    // Step 3: controlla che non ci siano doppioni quindi al massimo 3 elementi per livello
    const removeDuplicate = groupedByLevel.map((group, i) => ({
        ...group,
        children: group.children.filter((child, j) => {
            if (!React.isValidElement(child)) {
                return true;
            }
            const prevChild = group.children[j - 1];
            if (React.isValidElement(prevChild)) {
                if (
                    React.isValidElement(prevChild) &&
                    hasSameMode(prevChild.props.nsPosition?.[mode], child.props.nsPosition?.[mode])
                ) {
                    return false;
                }
            }
            return true;
        }),
    }));

    return removeDuplicate;
};

function hasSameMode(pos1?: INsHeaderOrder, pos2?: INsHeaderOrder): boolean {
    if (!pos1 || !pos2) return false;
    return pos1.level === pos2.level && pos1.position === pos2.position;
}

export const NsHeaderMainBar: React.FC<NsHeaderMainBarProps> = ({
    children,
    NsBorderBottom = true,
    NsHeaderMainBarSx,
    ...props
}) => {
    const theme = useTheme();

    if (!children) return null;
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: 0,
                padding: '10px',
                minHeight: '80px',
                borderBottom: `${NsBorderBottom ? '10px solid ' : '0px'}`,
                borderColor: `${NsBorderBottom ? 'black' : 'transparent'}`, //theme?.header?.borderColor non va????
                backgroundColor: theme.palette.primary.main,
                ...NsHeaderMainBarSx,
            }}
            {...props}
        >
            {children}
        </Box>
    );
};

export const NsHeaderSubBar: React.FC<NsHeaderSubBarProps> = ({ children, NsHeaderSubBarSx, ...props }) => {
    const theme = useTheme();
    if (!children) return null;
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 0,
                padding: 0,
                height: '40px',
                backgroundColor: theme.palette.secondary.main,
                ...NsHeaderSubBarSx,
            }}
            {...props}
        >
            {children}
        </Box>
    );
};

export const NsHeader2: React.FC<NsHeader2Props> = ({
    children,
    sx,
    isMobile,
    mobileBreakpoint = 768, // Impostare il breakpoint piu adatto
    NsHeaderMainBarSx,
    NsHeaderSubBarSx,
    ...props
}) => {
    const [mobile, setMobile] = useState(isMobile);

    // Verifico dimensione schermo
    useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth <= mobileBreakpoint);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const orderedChildren = useMemo(() => reorderChildren(children, mobile ? 'mobile' : 'desktop'), [mobile, children]);

    if (!children) return null;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                margin: 0,
                padding: 0,
                ...sx,
            }}
            {...props}
        >
            {orderedChildren.map((group, i) =>
                group.level === 1 ? (
                    <NsHeaderMainBar key={i} NsHeaderMainBarSx={NsHeaderMainBarSx}>
                        {group.children.map((child) =>
                            React.isValidElement(child)
                                ? React.cloneElement(child as React.ReactElement<{ isMobile?: boolean }>, {
                                      isMobile: mobile,
                                  })
                                : child,
                        )}
                    </NsHeaderMainBar>
                ) : (
                    <NsHeaderSubBar key={i} NsHeaderSubBarSx={NsHeaderSubBarSx}>
                        {group.children.map((child) =>
                            React.isValidElement(child)
                                ? React.cloneElement(child as React.ReactElement<{ isMobile?: boolean }>, {
                                      isMobile: mobile,
                                  })
                                : child,
                        )}
                    </NsHeaderSubBar>
                ),
            )}
        </Box>
    );
};
