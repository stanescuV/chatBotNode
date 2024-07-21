import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Ensure you have node-fetch installed

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const isResponseOk = async (response, res) => {
    if (response.ok) {
        let responseJson = await response.json()
         console.log(responseJson);
         res.json(responseJson);
     } else {
         res.status(500).send("Failed to forward data to server");
     }
}


app.post("/query", async (req, res) => {
    const data = req.body;

    // Modify the key to match what the Python server expects
    const modifiedData = {
        text: data.message // Change 'message' to 'text'
    };

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(modifiedData),
    };

    
    console.log("Data to be sent to Python server:", modifiedData);

    try {
        const response = await fetch("http://127.0.0.1:5000/query", fetchOptions);

        isResponseOk(response, res)
      
    } catch (error) {
        console.error("Error forwarding data:", error);
        res.status(500).send("Error forwarding data to Python server");
    }
});


app.listen(port, () => {
    console.log(`Node.js app listening on port ${port}`);
});
