import { createContext, useState, useEffect } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])

    const [feedbackEditState, setFeedbackEditState] = useState({
        item: {},
        edit: false
    })

    useEffect(() => {
        fetchFeedback()
    }, [])

    // Fetch Feedback Data from json server
    const fetchFeedback = async () => {
        const response = await fetch("/feedback")
        const data = await response.json()

        setFeedback(data)
        setIsLoading(false)
    }

    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
            await fetch(`/feedback/${id}`, {method: 'DELETE'})

            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    const addFeedback = async (newFeedback) => 
    {
        const response = await fetch('/feedback', 
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        })
        const data = await response.json()
        setFeedback([data, ...feedback])
    }

    // Update Feedback Item
    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updItem)
        })

        const data = await response.json()

        setFeedback(feedback.map((item) => item.id === id ? {...item, ...data} : item))
    }

    // Set item to be updated
    const editFeedbackFn = (item) => {
        setFeedbackEditState({
            item,
            edit: true
        })
    }

    return (
        <FeedbackContext.Provider value={{
            feedback,
            feedbackEditState,
            isLoading,
            deleteFeedback,
            addFeedback,
            editFeedbackFn,
            updateFeedback
        }}>
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext