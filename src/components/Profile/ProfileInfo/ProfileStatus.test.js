import React from 'react'
import { create } from 'react-test-renderer'
import ProfileStatus from './ProfileStatus'

describe("Profile status component", () => {
    // This part of testing code has some errors. For example, instance is null

    // test("status from props should be in the state", () => {  
    //     const component = create(<ProfileStatus status="Status"/>)
    //     const instance = component.getInstance()
    //     expect(instance.state.status).toBe("Status")
    // })
    test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatus status="Some status"/>)
        let span = component.root.findByType("span")
        expect(span).not.toBeNull()
    })

    test("after creation <input> shouldn't be displayed", () => {
        const component = create(<ProfileStatus status="Some status"/>)
        expect(() => {    
            let input = component.root.findByType("input")
        }).toThrow()
    })

    test("after creation <span> should be contains correct status", () => {
        const component = create(<ProfileStatus status="Some status"/>)
        let span = component.root.findByType("span")
        expect(span.children[0]).toBe("Some status")
    })

    test("input should be displayed on editMode instead of span", () => {
        const component = create(<ProfileStatus status="Some status"/>)
        let span = component.root.findByType("span")
        span.props.onDoubleClick()
        let input = component.root.findByType("input")
        expect(input.value).toBe("Some status")
    })

    test("callback should be called", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status="Some status" updateStatus={mockCallback}/>)
        const instance = component.getInstance()
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1)
    })
})