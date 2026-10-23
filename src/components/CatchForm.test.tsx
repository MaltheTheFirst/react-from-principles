import { render, screen, fireEvent } from '@testing-library/react'
import { createRef } from 'react'
import CatchForm from './CatchForm'

test('calls onFishChange when fish input changes', () => {
    const onFishChange = vi.fn()

    render(
        <CatchForm
            fish=""
            length=""
            editingId={null}
            onFishChange={onFishChange}
            onLengthChange={() => {}}
            onSubmit={() => {}}
            onCancelEdit={() => {}}
            fishInputRef={createRef<HTMLInputElement>()}
        />
    )

    fireEvent.change(screen.getByPlaceholderText('Name of fish'), {
        target: { value: 'Sea Bass' },
    })

    expect(onFishChange).toHaveBeenCalledWith('Sea Bass')
})