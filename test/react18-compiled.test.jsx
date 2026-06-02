import React, { StrictMode } from 'react';
import { render, screen, act } from '@testing-library/react';
import { SemanticToastContainer, toast } from '../build/index';
import { resetStoreForTests } from '../build/toast';

describe('react-semantic-toasts (compiled build)', () => {
    beforeEach(() => {
        resetStoreForTests();
        jest.useFakeTimers();
    });

    afterEach(() => {
        act(() => {
            jest.runOnlyPendingTimers();
        });
        jest.useRealTimers();
    });

    it('renders and auto-closes a toast from the compiled output', () => {
        const onClose = jest.fn();

        render(
            <StrictMode>
                <SemanticToastContainer />
            </StrictMode>
        );

        act(() => {
            toast({ title: 'Compiled', description: 'Build', time: 1000 }, onClose);
        });

        expect(screen.getByText('Compiled')).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(onClose).toHaveBeenCalledTimes(1);
        expect(screen.queryByText('Compiled')).not.toBeInTheDocument();
    });
});
