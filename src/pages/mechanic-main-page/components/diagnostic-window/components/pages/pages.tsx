import { FC } from 'react'
import styles from './style.module.scss'
import Typography from '../../../../../../components/ui/typography/typography'

interface IPages {
    current: number
    onChange: (n: number) => void
    length: number
}

const Pages: FC<IPages> = (props) => {
    const isNext = props.current < props.length
    const isPrev = props.current > 1
    const isPrePrev = props.current === 3
    const isNextNext = props.length - props.current === 2
    const showFirst = props.current > 3
    const showLast = props.length - props.current >= 3
    return (
        <div className={styles.pages}>
            <div>
                {showFirst && 
                    <div className={styles.page} onClick={() => props.onChange(1)}>
                        <Typography variant="body" color="white">1</Typography>
                    </div>
                }
            </div>
            <div className={styles.dots}>
                <div className={`${styles.dot} ${!showFirst && styles.hide}`} />
                <div className={`${styles.dot} ${!showFirst && styles.hide}`} />
                <div className={`${styles.dot} ${!showFirst && styles.hide}`} />
            </div>
            <div className={styles['main-pages']}>
                {isPrePrev && 
                    <div className={styles.page} onClick={() => props.onChange(props.current - 2)}>
                        <Typography variant="body" color="white">{props.current - 2}</Typography>
                    </div>
                }
                {isPrev && 
                    <div className={styles.page} onClick={() => props.onChange(props.current - 1)}>
                        <Typography variant="body" color="white">{props.current - 1}</Typography>
                    </div>
                }
                <div className={styles['current-page']}>
                    <Typography variant="body" color="black">{props.current}</Typography>
                </div>
                {isNext && 
                    <div className={styles.page} onClick={() => props.onChange(props.current + 1)}>
                        <Typography variant="body" color="white">{props.current + 1}</Typography>
                    </div>
                }
                {isNextNext && 
                    <div className={styles.page} onClick={() => props.onChange(props.current + 2)}>
                        <Typography variant="body" color="white">{props.current + 2}</Typography>
                    </div>
                }
            </div>
            <div className={styles.dots}>
                <div className={`${styles.dot} ${!showLast && styles.hide}`} />
                <div className={`${styles.dot} ${!showLast && styles.hide}`} />
                <div className={`${styles.dot} ${!showLast && styles.hide}`} />
            </div>
            <div>
                {showLast && 
                    <div className={styles.page} onClick={() => props.onChange(props.length)}>
                        <Typography variant="body" color="white">{props.length}</Typography>
                    </div>
                }
            </div>
        </div>
    )
}

export default Pages