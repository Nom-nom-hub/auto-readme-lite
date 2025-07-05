/**
 * Server management module.
 */

let serverInstance = null;

/**
 * Starts the server on the specified port.
 * @param {number} port - Port number to start the server on
 * @returns {Promise<Object>} Server start result
 */
async function startServer(port = 3000) {
  try {
    // Simulate server startup
    serverInstance = {
      port,
      status: 'running',
      startTime: new Date()
    };
    
    console.log(`Server started on port ${port}`);
    
    return {
      success: true,
      port,
      message: `Server running on port ${port}`
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Stops the running server.
 * @returns {Promise<Object>} Server stop result
 */
async function stopServer() {
  try {
    if (!serverInstance) {
      return {
        success: false,
        error: 'No server running'
      };
    }
    
    // Simulate server shutdown
    const uptime = Date.now() - serverInstance.startTime.getTime();
    serverInstance = null;
    
    console.log('Server stopped');
    
    return {
      success: true,
      uptime,
      message: 'Server stopped successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Gets the current server status.
 * @returns {Object|null} Server status or null if not running
 */
function getServerStatus() {
  return serverInstance;
}

/**
 * Restarts the server.
 * @param {number} port - Port to restart on
 * @returns {Promise<Object>} Restart result
 */
async function restartServer(port = 3000) {
  await stopServer();
  return await startServer(port);
}

// Export functions
module.exports = {
  startServer,
  stopServer,
  getServerStatus,
  restartServer
}; 