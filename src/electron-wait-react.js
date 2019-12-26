const net = require('net');
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

const axios = require('axios');

let startedElectron = false;
let startedXmrig = false;

const tryConnection = () => client.connect({ port: port }, () => {
	client.end();
	
	if (!startedElectron) {
		console.log('starting electron');
		startedElectron = true;
		const exec = require('child_process').exec;
		exec('npm run electron');
	}

	if (!startedXmrig) {
		console.log('starting xmrig');
		startedXmrig = true;

		const { spawn } = require('child_process');
		//const ls = spawn('ls', ['-lh', '/usr']);
		const ls = spawn(process.cwd() + '/xmrig/xmrig');
		
		/*
				ls.stdout.on('data', (data) => {
					console.log(`stdout: ${data}`);
				});
		
				ls.stderr.on('data', (data) => {
					console.error(`stderr: ${data}`);
				});
		
				ls.on('close', (code) => {
					console.log(`child process exited with code ${code}`);
				});
		*/

		var sleep = require('sleep');
		sleep.sleep(10);

		axios.defaults.headers.common['Authorization'] = 'Bearer ey...';
		axios.get('http://localhost:9999/1/summary')
			.then(response => {
				console.log(response.data.worker_id);
				console.log(response.data.connection.pool);
				console.log(response.data.hashrate.total);
			})
			.catch(error => {
				console.log(`Request ERROR ${error}`);
			});
	}
}
);

tryConnection();

client.on('error', (error) => {
	setTimeout(tryConnection, 1000);
});

