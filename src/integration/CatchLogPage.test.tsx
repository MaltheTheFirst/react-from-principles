import { render, screen, fireEvent, within } from '@testing-library/react'
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

test('deletes a catch from the catch log', () => {
    render(
        <MemoryRouter>
            <CatchProvider>
                <CatchLogPage />
            </CatchProvider>
        </MemoryRouter>
    )

    expect(screen.getByText('Horse Mackerel')).toBeInTheDocument()

    const horseMackerel = screen.getByText('Horse Mackerel')
    const catchItem = horseMackerel.closest('div')

    if (!catchItem) {
        throw new Error('Catch item not found')
    }

    fireEvent.click(
        within(catchItem).getByRole('button', { name: 'Delete' })
    )

    expect(screen.queryByText('Horse Mackerel')).not.toBeInTheDocument()
})