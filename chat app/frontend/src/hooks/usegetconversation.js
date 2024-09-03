import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useGetConversation = () => {
    const [loading, setLoading] = useState(false);
    const [conversation, setcoversation] = useState([]);

    useEffect(() => {
        const getConversation = async () => {
            setLoading(true); // Start loading state
            toast.loading("Loading conversations..."); // Display a loading toast
            try {
                const res = await fetch('/api/users'); // Fetch the conversation data

                if (!res.ok) {
                    throw new Error('Failed to fetch conversations'); // Handle HTTP errors
                }

                const data = await res.json(); // Parse JSON response
                setcoversation(data); // Set the fetched messages
                toast.success("Conversations loaded successfully!"); // Display success toast
            } catch (error) {
                toast.error(error.message || "Failed to load conversations"); // Display error toast
                console.error("Error loading conversations:", error);
            } finally {
                setLoading(false); // End loading state
                toast.dismiss(); // Dismiss loading toast
            }
        };

        getConversation(); // Call the function inside useEffect
    }, []); // Empty dependency array ensures this runs once when the component mounts

    return { loading, conversation }; // Return loading state and fetched messages
};

export default useGetConversation;
