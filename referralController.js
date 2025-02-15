const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const sendReferralEmail = require("./utils/gmailService"); // ✅ Correct path




const createReferral = async (req, res) => {
    try {
        const { referrerName, referrerEmail, refereeName, refereeEmail, course } = req.body;

        console.log("📩 Incoming Data:", req.body); // ✅ Log incoming data for debugging

        // ✅ Validate required fields
        if (!referrerName || !referrerEmail || !refereeName || !refereeEmail || !course) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // ✅ Ensure `course` is a string
        if (typeof course !== "string") {
            return res.status(400).json({ message: "Invalid course format" });
        }

        // ✅ Insert into database
        const newReferral = await prisma.referral.create({
            data: {
                referrerName,
                referrerEmail,
                refereeName,
                refereeEmail,
                course
            }
        });

        console.log("✅ Referral Created:", newReferral);

        // ✅ Send Referral Email
        await sendReferralEmail(refereeEmail, referrerName);

        res.status(201).json({ message: "Referral submitted and email sent!", referral: newReferral });
    } catch (error) {
        console.error("❌ Database Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ Export function correctly
module.exports = { createReferral };
