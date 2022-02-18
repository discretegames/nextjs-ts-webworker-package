import { testZip } from "./util/lodasher";
import pi from "./util/pi";

const doesWork = (data: number) => {
	console.log("Package API doing work");
	return pi(data) + " and " + JSON.stringify(testZip());
};

const caller = (event: MessageEvent) => {
	postMessage(doesWork(event.data));
};

// Following 2 lines are equivalent, right? Both work.
onmessage = caller;
// addEventListener("message", caller);
