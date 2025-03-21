const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequestSchema");
const User = require("../models/user");
const userRouter = express.Router();

// get all pending connection request for logged in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName age photoUrl skills"); // or pass like in array - ["firstName" "lastName"]
    res.json({
      message: `Request received to ${loggedInUser.firstName}`,
      data: connectionRequests,
    });
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", "firstName lastName age photoUrl skills")
      .populate("toUserId", "firstName lastName age photoUrl skills");

    // console.log(connections);
    const data = connections.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({
      data: data,
    });

    // if (!connections) res.status(404).json({ message: "Request not found!" });
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    /**
     * user should see all cards except :
     * self
     * connections
     * ignored people
     * already sent the connection request
     */
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("toUserId fromUserId status");
    // .populate("fromUserId", "firstName")
    // .populate("toUserId", "firstName");
    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });
    console.log(hideUsersFromFeed);
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select("firstName lastName age gender photoUrl skills")
      .skip(skip)
      .limit(limit);
    res.json({ users });
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});
module.exports = userRouter;
