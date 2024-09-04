const { Notification, User } = require("../models");

// Function to create notification
async function CreateNotification(userId, notificationContent) {
  try {
    // Create notification in the Notification table
    const notification = await Notification.create({
      userId: userId,
      readStatus: 0, // Assuming false is represented by 0
      notificationContent: notificationContent,
    });

    // Return the created notification
    return notification;
  } catch (error) {
    // Handle errors
    console.error("Error creating notification:", error);
    throw new Error("Failed to create notification");
  }
}

//get notifications
async function getNotification(req, res) {
  const userId = req.user.id;

  try {
    // Find all notifications for the given user
    const notifications = await Notification.findAll({
      where: {
        userId: userId,
      },
    });

    // Respond with the found notifications
    res.status(200).json(notifications);
  } catch (error) {
    // Handle errors
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
}

//get and update read status of notifications
async function getNotificationAndUpdate(req, res) {
  const userId = req.user.id;

  try {
    // Find all notifications for the given user
    const notifications = await Notification.findAll({
      where: {
        userId: userId,
      },
    });

    // Update the read status of the found notifications
    await Notification.update(
      { readStatus: 1 }, // Update readStatus to true (assuming true is represented by 1)
      {
        where: {
          userId: userId,
        },
      }
    );

    // Respond with the found notifications
    res.status(200).json(notifications);
  } catch (error) {
    // Handle errors
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
}

module.exports = {
  CreateNotification,
  getNotification,
  getNotificationAndUpdate,
};
