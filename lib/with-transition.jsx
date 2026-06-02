import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Transition } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const OPEN_TIME = 500;
const CLOSE_TIME = 1000;

export default function withTransitions(Component) {
    function SemanticTransition({
        toastId,
        onClose,
        openAnimation,
        closeAnimation,
        time = 2000,
        ...props
    }) {
        const [visible, setVisible] = useState(false);
        const [animation, setAnimation] = useState(openAnimation);
        const [duration, setDuration] = useState(OPEN_TIME);
        const closingRef = useRef(false);
        const autoTimerRef = useRef(null);
        const closeTimerRef = useRef(null);

        const beginClose = useCallback(() => {
            if (closingRef.current) {
                return;
            }
            closingRef.current = true;
            clearTimeout(autoTimerRef.current);
            setAnimation(closeAnimation);
            setDuration(CLOSE_TIME);
            setVisible(false);
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = setTimeout(() => {
                onClose(toastId);
            }, CLOSE_TIME);
        }, [closeAnimation, onClose, toastId]);

        useEffect(() => {
            setVisible(true);

            if (time > 0) {
                autoTimerRef.current = setTimeout(beginClose, time);
            }

            return () => {
                clearTimeout(autoTimerRef.current);
                clearTimeout(closeTimerRef.current);
            };
        }, [time, beginClose]);

        const styles = {
            marginBottom: '1em'
        };

        return (
            <Transition animation={animation} duration={duration} visible={visible}>
                <div style={styles} role="presentation">
                    <Component {...props} onClose={beginClose} />
                </div>
            </Transition>
        );
    }

    SemanticTransition.propTypes = {
        toastId: PropTypes.number.isRequired,
        onClose: PropTypes.func.isRequired,
        openAnimation: PropTypes.string.isRequired,
        closeAnimation: PropTypes.string.isRequired,
        time: PropTypes.number
    };

    return SemanticTransition;
}
