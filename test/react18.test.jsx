import React, { StrictMode } from 'react';
import { render, screen, act } from '@testing-library/react';
import { SemanticToastContainer, toast } from '../lib/index';
import { resetStoreForTests } from '../lib/toast';

describe('react-semantic-toasts (React 18)', () => {
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

    it('renders a toast under StrictMode without duplicate store subscriptions', () => {
        render(
            <StrictMode>
                <SemanticToastContainer />
            </StrictMode>
        );

        act(() => {
            toast({ title: 'Hello', description: 'World' });
        });

        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.getByText('World')).toBeInTheDocument();
    });

    it('auto-closes once after the configured time in StrictMode', () => {
        const onClose = jest.fn();

        render(
            <StrictMode>
                <SemanticToastContainer />
            </StrictMode>
        );

        act(() => {
            toast({ title: 'Timed', description: 'Gone', time: 1000 }, onClose);
        });

        expect(screen.getByText('Timed')).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('enforces maxToasts by closing the oldest toast', () => {
        render(<SemanticToastContainer maxToasts={2} />);

        act(() => {
            toast({ title: 'First', description: '1' });
            toast({ title: 'Second', description: '2' });
            toast({ title: 'Third', description: '3' });
        });

        expect(screen.queryByText('First')).not.toBeInTheDocument();
        expect(screen.getByText('Second')).toBeInTheDocument();
        expect(screen.getByText('Third')).toBeInTheDocument();
    });

    it('returns an empty snapshot on the server', () => {
        const { container } = render(<SemanticToastContainer />);

        act(() => {
            toast({ title: 'SSR', description: 'safe' });
        });

        expect(container.querySelector('.ui-alerts')).toBeInTheDocument();
    });
});
