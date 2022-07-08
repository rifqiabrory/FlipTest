import { useCallback, useState, Dispatch, SetStateAction } from 'react'

/**
 * useToggle Hook's
 * @param initialValue - boolean
 */
export function useToggle(initialValue: boolean): [boolean, () => void] {
    /**
     * Hook's
     */
    const [value, setToggle] = useState<boolean>(initialValue);

    /**
     * Toggle's Method
     */
    const toggle = useCallback(() => setToggle(prev => !prev), []);

    return [value, toggle];
}