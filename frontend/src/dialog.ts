import {callServer} from './server';

const serverHello = '<?=getServerHello()?>';

document.querySelector('main')!.innerHTML = serverHello;

callServer('greetingsBack', `ok working in ${serverHello}`);
