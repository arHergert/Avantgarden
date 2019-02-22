import ip from "ip";

var thisClient = "192.168.43.26";

function clientIp() {
    return (ip.address() === "127.0.0.1") ? "http://"+thisClient+':5000' : "http://"+ip.address()+':5000';
}

export default {
    client: clientIp()
}