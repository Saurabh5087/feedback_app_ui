import { useContext } from "react";
import FeedbackItem from "./FeedbackItem"
import FeedbackContext from "../Context/FeedbackContext";


function FeedbackList({ handleDelete }) {
    const { feedback } = useContext(FeedbackContext)

    if (!feedback || feedback.length === 0) {
        return <p>No Feedback yet</p>
    }

    return (
    <div className="feedback-list">
        {feedback.map((item) => (
                <FeedbackItem 
                    key={item.id} 
                    item={item} 
                    handleDelete={handleDelete}
                />
        ))}
    </div>
    )
}


export default FeedbackList
