import { createContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'


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
        const response = await fetch("http://localhost:5000/feedback")
        const data = await response.json()

        setFeedback(data)
        setIsLoading(false)
    }

    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    const addFeedback = (newFeedback) => {
        newFeedback.id = +uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    // Update Feedback Item
    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) => item.id === id ? {...item, ...updItem} : item))
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