import Notification from "./notification.model.js";

//Get my notifications
export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user._id,
    })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Notifications mark read
export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findById(id);

    if (!notification)
      return res.status(404).json({ message: "Notification not found" });

    if (notification.recipient.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    notification.isRead = true;
    await notification.save();

    res.json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

