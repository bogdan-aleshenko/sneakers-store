use Monolog\Logger;
use Monolog\Handler\StreamHandler;


$log = new Logger('sneakers_store');
$log->pushHandler(new StreamHandler(__DIR__.'/logs/app.log', Logger::DEBUG));