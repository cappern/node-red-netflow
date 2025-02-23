module.exports = function(RED) {
    "use strict";
    
    function NetFlowNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        // Load the node-netflowv9 module
        var NetFlowV9 = require('node-netflowv9');
        // Create an instance of NetFlowV9 with port set to 0 so it doesn't bind its own UDP socket.
        var decoder = new NetFlowV9({ port: 0 });
        
        node.on("input", function(msg) {
            if (!Buffer.isBuffer(msg.payload)) {
                node.error("Payload must be a Buffer. Ensure your UDP-in node outputs a buffer.");
                return;
            }
            
            try {
                // Decode the incoming NetFlow packet using the instance method.
                var decoded = decoder.nfPktDecode(msg.payload, msg.rinfo || {});
                // Output the entire decoded object, even if flows is empty.
                msg.payload = decoded;
                node.send(msg);
            } catch (err) {
                node.error("Error decoding NetFlow data: " + err.message);
            }
        });
    }
    
    RED.nodes.registerType("netflow", NetFlowNode);
};
