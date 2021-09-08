# react-chat-popup-ws_ratchet (php)
![](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)&nbsp;
![](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)&nbsp;
![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)&nbsp;
![](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)&nbsp;
![](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)&nbsp;
![](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)&nbsp;
#### In this project, use react and websocket cboden/ratchet
<img src="https://user-images.githubusercontent.com/63914959/132455974-b046f48f-2e8a-4de3-8778-c297e03dff7d.png" height="400px">

##### First, create project folder name chat-app
###### Under chat-app folder install react
````
npx create-react-app my-app
cd my-app
npm start
````
##### Second, create `bin\chat-server.php` and `src\MyApp\Connection.php`
![image](https://user-images.githubusercontent.com/63914959/132450120-ca3e9b38-29fb-4269-8ced-01491370a8f9.png)
##### Third, create composer.json and add content below
````json
{
    "autoload": {
        "psr-0": {
            "MyApp": "src"
        }
    },
    "require": {
        "cboden/ratchet": "0.3.*"
    }
}
````
#### And install this package `composer install`. (In this step you need to install composer before)->https://getcomposer.org/
#### Source code that use to create have a credits from ->https://www.thaicreate.com/php/php-websockets-real-time.html
##### In file chat-server.php add
````php
<?php

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use MyApp\Connection;

require dirname(__DIR__) . '/vendor/autoload.php';

$server = IoServer::factory(
                new HttpServer(
                new WsServer(
                new Connection()  ) ), 8089
);

$server->run();
?>
````
##### In file Connection.php add
````php
<?php

namespace MyApp;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Connection implements MessageComponentInterface {

    protected $clients;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        echo "Congratulations! the server is now running\n";
    }

    public function onOpen(ConnectionInterface $conn) {
        // Store the new connection to send messages to later
        $this->clients->attach($conn);

        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $numRecv = count($this->clients) - 1;
        echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
                , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');

        foreach ($this->clients as $client) {
            if ($from !== $client) {
                // The sender is not the receiver, send to each client connected
                $client->send($msg);
            }   
        }
    }

    public function onClose(ConnectionInterface $conn) {
        // The connection is closed, remove it, as we can no longer send it messages
        $this->clients->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }

}
?>
````
##### Run `php chat-server.php`
![image](https://user-images.githubusercontent.com/63914959/132454875-5948e597-628f-46f1-be09-569dbc67feb2.png)
##### 😎😎😎 Let's enjoy with hacking!!! 😁😁😁
