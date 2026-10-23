import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import CatchLogPage from '../pages/CatchLogPage'
import { CatchProvider } from '../context/CatchContext'

test('adds a catch through the catch log', () => {
    render(
        <MemoryRouter>
            <CatchProvider>
                <CatchLogPage />
            </CatchProvider>
        </MemoryRouter>
    )

    fireEvent.change(
        screen.getByPlaceholderText('Name of fish'),
        { target: { value: 'Sea Bass' } }
    )

    fireEvent.change(
        screen.getByPlaceholderText('Length'),
        { target: { value: '42' } }
    )

    fireEvent.click(
        screen.getByRole('button', { name: 'Add Catch' })
    )

    expect(screen.getByText('Sea Bass')).toBeInTheDocument()
})