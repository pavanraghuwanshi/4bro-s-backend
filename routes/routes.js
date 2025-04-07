import express from "express";
const router = express.Router();

router.use("/drivers", async (req,res) => {
     console.log("Driver route is working");
     return res.status(200).json("Driver route is working");
});

export default router;