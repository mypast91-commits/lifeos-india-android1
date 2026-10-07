import { LocalNotifications } from "@capacitor/local-notifications";

const LifeOSNotifications = {

  async init() {
    try {
      const permission = await LocalNotifications.checkPermissions();

      if (permission.display !== "granted") {
        await LocalNotifications.requestPermissions();
      }

      return true;
    } catch (error) {
      console.error("Notification permission error:", error);
      return false;
    }
  },

  async schedule(id, title, body, date) {
    try {
      await this.init();

      const when = new Date(date);

      if (when.getTime() <= Date.now()) {
        return false;
      }

      await LocalNotifications.schedule({
        notifications: [
          {
            id: Number(id),
            title: title,
            body: body || "आपका LifeOS reminder है 🔔",
            schedule: {
              at: when,
              allowWhileIdle: true
            }
          }
        ]
      });

      return true;

    } catch (error) {
      console.error("Notification schedule error:", error);
      return false;
    }
  },

  async cancel(id) {
    try {
      await LocalNotifications.cancel({
        notifications: [
          {
            id: Number(id)
          }
        ]
      });

      return true;

    } catch (error) {
      console.error("Notification cancel error:", error);
      return false;
    }
  }
};

window.LifeOSNotifications = LifeOSNotifications;
