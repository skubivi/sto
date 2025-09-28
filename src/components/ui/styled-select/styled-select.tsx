import styles from './style.module.scss'

import DropdownSvg from '../../../assets/components/select/dropdown.svg?react'
import { useEffect, useRef, useState } from 'react'
import Typography from '../typography/typography'

function StyledSelect<T>(
    {active, options, onChange}: {
        active: T, 
        options: {id: T, title: string}[],
        onChange: (id: T) => void
    }
) {
    const [open, setOpen] = useState(false)
    const menuRef: React.Ref<HTMLDivElement> = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!menuRef.current?.contains(e.target as Node)) 
                setTimeout(() => {
                    setOpen(false)
                }, 100)
        }

        if (open) {
            document.addEventListener("pointerdown", handleClickOutside)
        } else {
            document.removeEventListener("pointerdown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("pointerdown", handleClickOutside)
        }
    }, [open])

    const activeElement = options.find(el => el.id === active)
    const activeTitle = activeElement?.title ?? ''

    if (options.length === 0) return null

    return (
        <div className={styles['select']} onClick={() => setOpen(prev => !prev)}>
            <Typography variant='subtitle' color='secondary'>{activeTitle}</Typography>
            <div className={`${styles['dropdown']} ${open && styles['open']}`}>
                <DropdownSvg />
            </div>
            {open && 
                <div className={styles['menu']} ref={menuRef}>
                    {options.map((el, index) => (
                        <div className={`${styles['element']} ${active === el.id && styles['active']}`} onClick={() => onChange(el.id)} key={index}>
                            <Typography variant='subtitle' color='secondary'>{el.title}</Typography>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default StyledSelect