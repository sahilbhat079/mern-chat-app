import { useState } from "react";
import toast from "react-hot-toast"; // Import toast for notifications
import { useAuthHook } from "../context/Authcontext";

// Custom hook for handling logout functionality
const useLogout = () => {
    const [loading, setLoading] = useState(false); // State for managing loading status
  const {setAuthuser}=useAuthHook();
    // Function to handle user logout
    const logout = async () => {
        setLoading(true); // Start the loading state

        try {
            // Send POST request to logout endpoint
            const res = await fetch('/api/auth/logout/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Check if response is successful
            if (res.ok) {
                // Clear user data from local storage
                localStorage.removeItem("chat-app");
                setAuthuser(null);
                
                // Parse the response JSON
                const data = await res.json();
                console.log("Logout successful:", data);

                // Show success toast
                toast.success("Logout successful!"); 
            } else {
                // Handle server errors
                const errorText = await res.text();
                console.error("Logout failed:", res.statusText);

                // Show error toast
                toast.error(`Logout failed: ${errorText}`);
            }

        } catch (error) {
            // Log any errors that occur during the fetch operation
            console.error("Error during logout:", error);

            // Show error toast
            toast.error("An error occurred during logout.");
        } finally {
            setLoading(false); // Stop the loading state
        }
    };

    return { loading, logout }; // Return loading state and logout function
};

export default useLogout;
