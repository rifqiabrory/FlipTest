import { useCallback, useState, Dispatch, SetStateAction } from 'react'

export function useToggle(initialValue: boolean) : [boolean, () => void]{
    const [value, setToggle] = useState<boolean>(initialValue);
    const toggle = useCallback(() => setToggle(prev => !prev), []);

    return [ value, toggle ];
}