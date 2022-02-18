/* Emulating API 2 from https://github.com/discretegames/nextjs-ts-webworker-test/blob/main/workers/separateapi.ts
 * but in an NPM package. */
export class PackageWorkerAPI {
    constructor() {
        /* DO NOT USE { type: "module" } WHEN MAKING WORKER EVEN THOUGH THE WORKER IS TECHNICALLY A MODULE WORKER!
         * If you do the NextJS project has errors like "SyntaxError: Unexpected token 'export'" and doesn't work.
         * Apparently some NextJS/webpack magic is happening to allow module workers even when unspecified
         * or in browsers that aren't supposed to support them like FireFox and FireFox for Android. */
        // this.worker = new Worker(new URL("./worker", import.meta.url), { type: "module" }); // NO!!
        this.worker = new Worker(new URL("./worker", import.meta.url)); // Yes!
        console.log("PackageWorkerAPI constructed");
    }
    doWork(n) {
        return new Promise((resolve, reject) => {
            console.log("PackageWorkerAPI doing work");
            const onMessage = (event) => {
                console.log("PackageWorkerAPI done with " + event.data);
                resolve("Package Worker API: " + event.data);
            };
            // Following 2 lines are equivalent, right?
            this.worker.onmessage = onMessage;
            // this.worker.addEventListener("message", onMessage);
            this.worker.postMessage(n);
        });
    }
    end() {
        console.log("terminating PackageWorkerAPI");
        this.worker.terminate();
    }
}
