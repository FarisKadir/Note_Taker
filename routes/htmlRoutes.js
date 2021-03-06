// // DEPENDENCIES
// // We need to include the path package to get the correct file path for our html

const path = require('path');

// // ROUTING

module.exports = (app) => {
  // => HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content

    // Display notes.html when /notes is accessed
    app.get('/notes', function(req,res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
    
    // Display index.html when all other routes are accessed
    app.get('/', function(req,res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};
