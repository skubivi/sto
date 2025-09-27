import CancelSvg from '../../../assets/components/multi-select/cancel.svg?react'
import { useEffect, useRef, useState } from 'react'
import Typography from '../typography/typography'
import ColStripe from '../col-stripe/col-stripe'

import styles from './style.module.scss'

function StyledMultiSelect<T>(
    {active, options, onAdd, onRemove}: {
        active: {id: T, title: string}[], 
        options: {id: T, title: string}[],
        onAdd: (id: T) => void
        onRemove: (id: T) => void
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

    const handleClickElement = (id: T) => {
        if (active.some(el => el.id === id)) onRemove(id)
        else onAdd(id)
    }

    return (
        <div className={styles['select']}>
            {active.map(element => (
                <div className={styles.chip} key={element.id as string}>
                    <Typography variant='caption' color='black'>{element.title}</Typography>
                    <ColStripe />
                    <div className={styles.cancel} onClick={() => onRemove(element.id)}>
                        <CancelSvg />
                    </div>
                </div>
            ))}
            <div className={styles.add} onClick={() => setOpen(prev => !prev)}>
                <Typography variant='h3' color='primary'>+</Typography>
            </div>
            {open && 
                <div className={styles['menu']} ref={menuRef}>
                    {options.map((el, index) => (
                        <div className={`${styles['element']}`} onClick={() => handleClickElement(el.id)} key={index}>
                            <div className={`${styles.checkbox} ${active.some(element => element.id === el.id) && styles.active}`}/>
                            <Typography variant='subtitle' color='secondary'>{el.title}</Typography>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default StyledMultiSelect