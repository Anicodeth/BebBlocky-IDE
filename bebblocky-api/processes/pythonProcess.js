const pythonExecution = (data, socket) => {


const { spawn } = require('child_process');
const { code } = data;
// Create a Python process
const pythonProcess = spawn('python', ['-u', '-c', code]);




// Listen for stdout data from Python process
pythonProcess.stdout.on('data', (data) => {
  const output = data.toString().trim();
  console.log(`Python output: ${output}`);
  socket.emit('output', output);
});

// Listen for stderr data from Python process
pythonProcess.stderr.on('data', (data) => {
  const error = data.toString().trim();
  console.error(`Python error: ${error}`);
  socket.emit('output', error);
});

// Listen for input from the user
process.stdin.on('data', (data) => {
  pythonProcess.stdin.write(data);
});

socket.on('input', (data) => {
  console.log(data, "Here");
  console.log(pythonProcess.stdin.write(data.input + '\n'));
});
// Handle process exit
pythonProcess.on('exit', (code) => {
  console.log(`Python process exited with code ${code}`);
  socket.emit('output', `Python process exited with code ${code}`);
});

}
module.exports = pythonExecution;
