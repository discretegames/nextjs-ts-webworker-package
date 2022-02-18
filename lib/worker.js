import { testZip } from "./util/lodasher";
import pi from "./util/pi";
const doesWork = (data) => {
    console.log("Package API doing work");
    return pi(data) + " and " + JSON.stringify(testZip());
};
const caller = (event) => {
    postMessage(doesWork(event.data));
};
// Following 2 lines are equivalent, right?
onmessage = caller;
// addEventListener("message", caller);
