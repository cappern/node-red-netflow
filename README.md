# node-red-netflow

A Node-RED node that decodes NetFlow data received as a Buffer from a UDP-in node using the node-netflowv9 library. The decoded output is a structured JavaScript object containing a header and an array of flow records.

## Overview

The node-red-netflow node processes NetFlow packets (commonly version 9) by converting the binary data into a JavaScript object. This object includes detailed metadata about the packet (under the "header" property) and an array of decoded flow records (under the "flows" property).

## Features

- Easy Integration: Simply connect a UDP-in node configured to output binary data as a Buffer.
- Structured Output: Decoded output includes a "header" object and a "flows" array.
- Detailed Flow Records: Each flow record contains source/destination IP addresses, ports, protocol information, packet and byte counts, and timing information.

## Installation

To install this node, either use the Node palette or run the following command in your Node-RED user directory:

```bash
    npm install @cappern/node-red-netflow
```

After installation, restart Node-RED to load the new node.

## Usage

1. Configure a UDP-in Node: Set up a UDP-in node in your flow to receive NetFlow data. Ensure it outputs data as a binary Buffer.
2. Connect the node-red-netflow Node: Wire the output of the UDP-in node to the node-red-netflow node.
3. Deploy Your Flow: Once deployed, the node will decode the incoming NetFlow packet and output a JavaScript object.

## Decoded Object Structure

The output object consists of the following properties:

### Header

An object containing metadata about the NetFlow packet:
- version: NetFlow version (e.g., 9)
- count: Number of flow records in the packet
- uptime: Uptime of the exporting device
- seconds: UNIX timestamp (seconds since 1970) when the packet was sent
- sequence: Sequence number of the packet
- sourceId: Source identifier (typically set by the exporting device)

### Flows

An array of decoded flow records. Each record includes properties such as:
- ipv4_src_addr: Source IPv4 address
- ipv4_dst_addr: Destination IPv4 address
- l4_src_port: Layer 4 source port
- l4_dst_port: Layer 4 destination port
- in_bytes: Number of bytes transferred
- in_pkts: Number of packets transferred
- protocol: IP protocol (e.g., 6 for TCP, 17 for UDP)
- input_snmp and output_snmp: SNMP interface indices
- first_switched: Timestamp when the flow started
- last_switched: Timestamp when the flow ended
- fsId: FlowSet ID

## Example Output

Here is an example of what the decoded object might look like:

```json
{
  "header": {
    "version": 9,
    "count": 28,
    "uptime": 1348093000,
    "seconds": 1740245416,
    "sequence": 2875,
    "sourceId": 0
  },
  "flows": [
    {
      "ipv4_src_addr": "192.168.1.2",
      "ipv4_dst_addr": "192.168.99.12",
      "l4_src_port": 46532,
      "l4_dst_port": 6053,
      "in_bytes": 200,
      "in_pkts": 5,
      "protocol": 6,
      "input_snmp": 10,
      "output_snmp": 10,
      "first_switched": 1347790812,
      "last_switched": 1347793632,
      "fsId": 5206
    }
  ]
}

```
## References

- Cisco NetFlow Documentation: https://www.cisco.com/c/en/us/products/ios-nx-os-software/ios-netflow/index.html
- node-netflowv9 GitHub Repository: https://github.com/davidguttman/node-netflowv9

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please submit any issues or pull requests via GitHub.
