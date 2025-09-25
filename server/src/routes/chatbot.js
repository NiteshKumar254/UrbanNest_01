
import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const msg = message.toLowerCase();

    // ✅ Budget Query
  // Budget Query (Single & Range)
const rangeMatch = msg.match(/(\d{3,6})\s*(?:-|to)\s*(\d{3,6})/i); // "5000-10000" or "5000 to 10000"
const singleMatch = msg.match(/(\d{3,6})/);

if (/budget|under|less|below|between|range|above|greater|more than|ke under/.test(msg) || /^\d+$/.test(msg)) {
  if (rangeMatch) {
    // 🟢 Range budget query
    const minAmount = parseInt(rangeMatch[1]);
    const maxAmount = parseInt(rangeMatch[2]);

    const pgList = await Post.find({
      price: { $gte: minAmount, $lte: maxAmount },
    })
      .select("title price city state hotelLocation nearArea gender facilities images slug")
      .limit(5);

    if (pgList.length) {
      return res.json({
        type: "pg-list",
        reply: `Yeh PGs ₹${minAmount} - ₹${maxAmount} ke range me available hain:`,
        data: pgList,
      });
    } else {
      return res.json({
        type: "text",
        reply: `Koi PG ₹${minAmount} - ₹${maxAmount} ke range me nahi mila.`,
      });
    }
  } else if (/above|greater|more than/.test(msg) && singleMatch) {
    // 🟢 Above budget query
    const amount = parseInt(singleMatch[0]);

    const pgList = await Post.find({ price: { $gte: amount } })
      .select("title price city state hotelLocation nearArea gender facilities images slug")
      .limit(5);

    if (pgList.length) {
      return res.json({
        type: "pg-list",
        reply: `Yeh PGs ₹${amount} ke upar available hain:`,
        data: pgList,
      });
    } else {
      return res.json({
        type: "text",
        reply: `Koi PG ₹${amount} ke upar nahi mila.`,
      });
    }
  } else if (singleMatch) {
    // 🟢 Single budget query
    const amount = parseInt(singleMatch[0]);

    const pgList = await Post.find({ price: { $lte: amount } })
      .select("title price city state hotelLocation nearArea gender facilities images slug")
      .limit(5);

    if (pgList.length) {
      return res.json({
        type: "pg-list",
        reply: `Yeh PGs ₹${amount} ke under/below available hain:`,
        data: pgList,
      });
    } else {
      return res.json({
        type: "text",
        reply: `Koi PG ₹${amount} ke under nahi mila.`,
      });
    }
  }
}



    // ✅ Metro / Area Query
    if (/metro|station|nearby|close to/.test(msg)) {
      const pgList = await Post.find({ nearArea: { $regex: /metro|station/i } })
        .select("title price city nearArea slug")
        .limit(5);

      if (pgList.length) {
        return res.json({
          type: "pg-list",
          reply: "Yeh PGs metro/station ke paas hain:",
          data: pgList,
        });
      } else {
        return res.json({ type: "text", reply: "Koi PG metro/station ke paas nahi mila." });
      }
    }
      // ✅ Gender Query
if (/male|female|unisex/.test(msg)) {
  let gender = null;

  if (msg.includes("male")) gender = "male";
  if (msg.includes("female")) gender = "female";
  if (msg.includes("unisex")) gender = "unisex";

  if (gender) {
    const pgList = await Post.find({ gender }).limit(5);

    if (pgList.length) {
      return res.json({
        type: "pg-list",
        reply: `Yeh ${gender} PGs available hain:`,
        data: pgList,
      });
    } else {
      return res.json({
        type: "text",
        reply: `Koi ${gender} PG nahi mila.`,
      });
    }
  }
}


    // ✅ City Query
    if (/delhi|noida|mumbai|bangalore|pune|kolkata|hyderabad|patna|kolkata|bhopal/.test(msg)) {
      const cityMatch = msg.match(/delhi|noida|mumbai|bangalore|pune|kolkata|hyderabad|patna|kolkata|bhopal/);
      const cityName = cityMatch[0].charAt(0).toUpperCase() + cityMatch[0].slice(1);

      const pgList = await Post.find({ city: new RegExp(cityName, "i") })
        .select("title price city nearArea slug")
        .limit(5);

      if (pgList.length) {
        return res.json({
          type: "pg-list",
          reply: `${cityName} ke PGs:`,
          data: pgList,
        });
      } else {
        return res.json({ type: "text", reply: `${cityName} me PG nahi mila.` });
      }
    }

    // ✅ Facilities Query
    if (/wifi|food|meal|ac|aircon|laundry|parking/.test(msg)) {
      const facMatch = msg.match(/wifi|food|meal|ac|aircon|laundry|parking/);
      const facility = facMatch[0];

      const pgList = await Post.find({
        facilities: { $regex: new RegExp(facility, "i") },
      })
        .select("title price city nearArea slug")
        .limit(5);

      if (pgList.length) {
        return res.json({
          type: "pg-list",
          reply: `Yeh PGs me ${facility} available hai:`,
          data: pgList,
        });
      } else {
        return res.json({ type: "text", reply: `Kisi PG me ${facility} nahi mila.` });
      }
    }
    
    // ✅ Default fallback
    res.json({
      type: "text",
      reply: "Sorry, samajh nahi aya. Please try again.",
    });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({
      type: "text",
      reply: "⚠️ Server error, try again later.",
    });
  }
});



export default router;
