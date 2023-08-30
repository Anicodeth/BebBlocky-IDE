const { spawn } = require('child_process');
const pythonPusher = require('../processes/pythonPusher');

exports.runPython = async (req, res) => {
  try {
    const { code } = req.body; // Assuming code is sent in the request body
    console.log(code);
    const pythonProcess = spawn('python', ['-u', '-c', code]);

    let output = '';

    // Listen for stdout data from Python process
    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
      console.log(output);
      res.status(200).json({ output: output.trim() });
    });

  //   pythonProcess.on('close', (code) => {
  //     if (code === 0) {
  //       console.log('Python process exited successfully');
  //       // Emit the output to a socket or handle it as needed
  //       //socket.emit('output', output.trim());
  //       res.status(200).json({ output: output.trim() });
  //     } else {
  //       console.error(`Python process exited with code ${code}`);
  //       // Handle error case here
  //       res.status(500).json({ error: 'Python process encountered an error' });
  //     }
  //   });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred while running Python code' });
  }
};
