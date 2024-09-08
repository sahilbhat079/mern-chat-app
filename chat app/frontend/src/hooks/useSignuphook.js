import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthHook } from "../context/Authcontext"; // Custom hook for accessing Auth context

const useSignup = () => {
  const [loading, setLoading] = useState(false); // State for managing loading status
  const { setAuthuser } = useAuthHook(); // Access the Auth context to set the authenticated user

  const signup = async ({ fullname, username, password, confirmpassword, gender }) => {
    const success = handleErrorInputs({ fullname, username, password, confirmpassword, gender });
    if (!success) return; // If input validation fails, exit early

    setLoading(true); // Start the loading state

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, username, password, confirmpassword, gender }),
      });

      if (!res.ok) {
        // If the response status is not OK, read the response as text
        const errorText = await res.text();
        throw new Error(errorText || "Something went wrong");
      }

      const contentType = res.headers.get("Content-Type");
      let data;
      
      if (contentType && contentType.includes("application/json")) {
        data = await res.json(); // Parse the response as JSON
      } else {
        throw new Error("Unexpected content type, expected JSON");
      }

      console.log(data);

      if (data.error) {
        toast.error(data.error); // Display error if the response contains an error message
      } else {
        localStorage.setItem("chat-app", JSON.stringify(data)); // Store user data in localStorage
        setAuthuser(data); // Set the user in the Auth context
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message); // Display error message if the request fails
    } finally {
      setLoading(false); // Stop the loading state
    }
  };

  return { loading, signup }; // Return loading state and signup function
};

export default useSignup;

// Utility function for input validation
const handleErrorInputs = ({ fullname, username, password, confirmpassword, gender }) => {
  if (!fullname || !username || !password || !confirmpassword || !gender) {
    toast.error("Please enter all fields");
    return false;
  }
  if (password !== confirmpassword) {
    toast.error("Passwords do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true; // Return true if all validations pass
};
