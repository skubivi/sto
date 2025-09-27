import { FC, ReactNode, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

import styles from './style.module.scss'

interface IStyledModal {
    open: boolean
    onClose: () => void
    children?: ReactNode
}

const modalRoot = document.getElementById("modal-root") as HTMLElement

const StyledModal: FC<IStyledModal> = (props) => {
    const elRef = useRef<HTMLDivElement | null>(null);
    if (!elRef.current) {
        elRef.current = document.createElement("div");
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                props.onClose()
            }
        }

        if (props.open) {
            document.addEventListener("keydown", handleKeyDown)
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [props.open, props.onClose])

    useEffect(() => {
        const el = elRef.current!;
        modalRoot.appendChild(el);
        return () => {
            modalRoot.removeChild(el);
        };
    }, []);

    if (!props.open) return null

    return ReactDOM.createPortal(
        <div 
            className={styles.background}
            onMouseDown={props.onClose}
            onTouchStart={props.onClose}
        >
            <div 
                className={styles.modal}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
            >
                {props.children}
            </div>
        </div>,
        elRef.current
    )
}

export default StyledModal