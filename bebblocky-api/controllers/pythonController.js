const pythonPusher = require("../processes/pythonPusher");

exports.runPython = async (req, res) => {
  pusher.trigger("my-channel", "execute", {
    message: "connected",
  });
  const { code } = req.body;
  const channel = pusher.subscribe("my-channel");
  channel.bind("execute", async function (data) {
   await pythonPusher(data, channel);
  });
  res.status(500).json({ message: 'Internal server error' });
  };