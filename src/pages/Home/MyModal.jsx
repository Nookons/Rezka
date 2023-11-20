import React from 'react';
import styles from './Home.module.css'

const MyModal = ({visible, setVisible, children}) => {
    const rootClasses = [styles.Modal]

    if (visible) {
        rootClasses.push(styles.Active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={styles.ModalWrapper} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;