export declare class PackageWorkerAPI {
    private worker;
    constructor();
    doWork(n: number): Promise<string>;
    end(): void;
}
