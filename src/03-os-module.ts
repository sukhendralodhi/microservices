import * as os from 'node:os';

function runOsDemo(): void {
    console.log("Platform:", os.platform());
    console.log("Architecture:", os.arch());
    console.log("OS type:", os.type());
    console.log("OS Release:", os.release());
    console.log("Home Directory", os.homedir());
    console.log("Temp Directory", os.tmpdir());
}

// runOsDemo();

function getCPUSInfo(): void {
    const cpus = os.cpus();
    // console.log(cpus.length);

    // console.log(cpus);


    if (cpus.length > 0) {
        console.log("First CPU Model:", cpus[0].model);
        console.log("CPU speed: ", cpus[0].speed);
        console.log("CPU Time: ", cpus[0].times);
    }
}

// getCPUSInfo();

function specification(): void {
    const totalMemoryGB = os.totalmem() / 1024 ** 3;
    const freeMemoryGB = os.freemem() / 1024 ** 3;

    console.log(`Total Memory: ${totalMemoryGB.toFixed(2)} GB`);
    console.log(`Free Memory: ${freeMemoryGB.toFixed(2)} GB`);
}

specification();