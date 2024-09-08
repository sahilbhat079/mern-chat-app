import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthHook } from "../context/Authcontext"; // Import your custom authentication hook

const useLogin = () => {
    const [loading, setLoading] = useState(false); // State for managing loading status
    const { setAuthuser } = useAuthHook(); // Access the Auth context to set the authenticated user

    // Function to handle user login
    const login = async (username,password) => {
        setLoading(true); // Start the loading state

        try {
            // Send POST request to login endpoint with credentials
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username,password}),
            });

            // Check if response is successful
            if (res.ok) {
                const data = await res.json();
                console.log("Login successful:", data);

                // Save user data in local storage
                localStorage.setItem("chat-app", JSON.stringify(data));
                
                // Set the authenticated user in the context
                setAuthuser(data);

                // Show success toast
                toast.success("Login successful!");

                // Redirect or additional handling can be done here
            } else {
                // Handle server errors
                const errorText = await res.text();
                console.error("Login failed:", res.statusText);

                // Show error toast
                toast.error(`Login failed \n Eneter valid Password and Username`);
            }

        } catch (error) {
            // Log any errors that occur during the fetch operation
            console.error("Error during login:", error.message);

            // Show error toast
            toast.error("An error occurred during login.");
        } finally {
            setLoading(false); // Stop the loading state
        }
    };

    return { loading, login }; // Return loading state and login function
};

export default useLogin;
