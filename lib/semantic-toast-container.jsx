import React, { useCallback, useEffect, useSyncExternalStore } from 'react';
import PropTypes from 'prop-types';

import SemanticToast from './semantic-toast';
import { store } from './toast';

/* eslint-disable no-useless-computed-key */
const closeAnimations = {
    ['top-right']: 'fly left',
    ['top-center']: 'fly down',
    ['top-left']: 'fly right',
    ['bottom-right']: 'fly left',
    ['bottom-center']: 'fly up',
    ['bottom-left']: 'fly right'
};

function SemanticToastContainer({
    position = 'top-right',
    animation = null,
    className = '',
    maxToasts = null
}) {
    const toasts = useSyncExternalStore(
        store.subscribe,
        store.getSnapshot,
        store.getServerSnapshot
    );

    const handleClose = useCallback(toastId => {
        const toastItem = store.getSnapshot().find(value => value.id === toastId);

        if (!toastItem) {
            return;
        }

        store.remove(toastItem);

        if (toastItem.onClose) {
            toastItem.onClose();
        }
    }, []);

    useEffect(() => {
        if (maxToasts && toasts.length > maxToasts) {
            handleClose(toasts[0].id);
        }
    }, [toasts, maxToasts, handleClose]);

    if (!toasts.length) {
        return null;
    }

    return (
        <div className={`ui-alerts ${position} ${className}`}>
            {toasts.map(toast => {
                const {
                    id,
                    type = 'info',
                    title = '',
                    description = '',
                    icon,
                    time,
                    size,
                    color,
                    list,
                    onClick,
                    onDismiss,
                    animation: toastAnimation
                } = toast;
                return (
                    <SemanticToast
                        key={id}
                        toastId={id}
                        type={type}
                        title={title}
                        description={description}
                        icon={icon}
                        size={size}
                        color={color}
                        list={list}
                        openAnimation={toastAnimation || animation || 'pulse'}
                        closeAnimation={closeAnimations[position]}
                        time={time}
                        onClick={onClick}
                        onClose={handleClose}
                        onDismiss={onDismiss}
                    />
                );
            })}
        </div>
    );
}

SemanticToastContainer.propTypes = {
    position: PropTypes.oneOf([
        'top-right',
        'top-center',
        'top-left',
        'bottom-right',
        'bottom-center',
        'bottom-left'
    ]),
    animation: PropTypes.string,
    className: PropTypes.string,
    maxToasts: PropTypes.number
};

export default SemanticToastContainer;
