import express from "express";
import fetch from "node-fetch";
const router = express.Router();

// get users
async function getUsers(id) {
  const getusersUrl = `https://jsonplaceholder.typicode.com/users/${id}`;
  try {
    const response = await fetch(getusersUrl);
    
    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // Try to parse the response as JSON
    try {
      const getUsersData = await response.json();
      return getUsersData;
    } catch (jsonError) {
      throw new Error('Failed to parse JSON response');
    }
  } catch (error) {
    console.log("Error fetching users data:", error.message);
    throw error;
  }
}

async function getAllUsers() {
  const getusersUrl = `https://jsonplaceholder.typicode.com/users`;
  try {
    const response = await fetch(getusersUrl);
    
    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // Try to parse the response as JSON
    try {
      const getUsersData = await response.json();
      return getUsersData;
    } catch (jsonError) {
      throw new Error('Failed to parse JSON response');
    }
  } catch (error) {
    console.log("Error fetching users data:", error.message);
    throw error;
  }
}

// Action
router.get("/users", async (req, res) => {
  try {
    const usersData = await getAllUsers();
    res.status(200).send(usersData);
  } catch (error) {
    console.error("Error in /users route:", error.message);
    res.status(500).send({ error: "Error fetching users data." });
  }
});

// getAll
router.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    console.log("crud api :", req.params);

    try {
      const usersData = await getUsers(id);
      res.status(200).send(usersData);
    } catch (error) {
      console.error("Error in /users/:id route:", error.message);
      res.status(500).send("Error fetching weather data.");
    }
  });

export default router;
