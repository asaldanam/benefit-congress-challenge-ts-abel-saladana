import { Express } from 'express';
import * as http from 'http';

import { createServer } from '../../server';

export default class TestServer {
    readonly server: http.Server;
    readonly app: Express;

    constructor(
        private deps: {
            done: () => void;
        }
    ) {
        const { app, server } = createServer(this.deps.done);
        this.server = server;
        this.app = app;
    }

    request() {}
}
