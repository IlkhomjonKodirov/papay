const http = require('http');
const mongodb = require('mongodb');

let db;
const connectionString = "mongodb+srv://Ilkhom:wNwaPSKQ3QxRRRA1@cluster0.t4c9kaq.mongodb.net/Papays";

 
mongodb.connect(connectionString, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}, (err, client) => {
  if(err) console.log("ERROR on connection MongoDB");
  else {
      console.log("MongoDB connection succed");
      module.exports = client; 

      const app = require("./app");
      const server = http.createServer(app);
      let PORT = process.env.PORT || 3003;
      server.listen(PORT, function() {
        console.log(`The server is running succesfully on port: ${PORT}, http://localhost:${PORT}`);
    });
  };
});
