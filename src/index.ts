/* Emulating API 2 from https://github.com/discretegames/nextjs-ts-webworker-test/blob/main/workers/separateapi.ts
 * but in an NPM package. */

export class PackageWorkerAPI {
	private worker: Worker;

	constructor() {
		// this.worker = new Worker(new URL("./worker.worker", import.meta.url), { type: "module" });
		this.worker = new Worker(new URL("./worker", import.meta.url)); // type: module not needed?
		console.log("PackageWorkerAPI constructed");
	}

	doWork(n: number): Promise<string> {
		return new Promise((resolve, reject) => {
			console.log("PackageWorkerAPI doing work");

			const onMessage = (event: MessageEvent) => {
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
