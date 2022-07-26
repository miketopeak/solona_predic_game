const { connectToDatabase } = require("../../lib/mongoose");
const Prediction = require("../../models/prediction.model");

module.exports = async (req, res) => {

    try {
        await connectToDatabase();
        
        const searchQuery  = req.body;
        const predictions = await Prediction.find(searchQuery);
        res.send(predictions);
    } catch (err) {
        console.error("Failed to get predictions, with error code: " + err.message);
        res.status(500).send(err);
    }
}