import fastify, { FastifyInstance } from 'fastify';
import { container, inject, singleton } from 'tsyringe';
import { Config } from '@/config/Config';
import { Logger } from '@/shared/Logger';
import { BaseRouter } from '@/shared/base/BaseRouter';
import * as routers from '@/presentation/routes';

@singleton()
export class Application {
  private fastify: FastifyInstance;

  constructor(
    @inject(Logger)
    private logger: Logger,

    @inject(Config)
    private config: Config,
  ) {
    this.fastify = fastify();
  }

  private setupRoutes() {
    const routes = Object.values(routers);

    for (const route of routes) {
      const instance = container.resolve<BaseRouter>(route);
      this.fastify.register(instance.setup, { prefix: '/v1/' });
    }
  }

  private async setupServer() {
    this.fastify.listen({
      port: this.config.port,
    }, () => this.logger.info(`Server is running on: http://localhost:${this.config.port}`));

    await this.fastify.ready();
  }

  public initialize() {
    this.setupRoutes();
    this.setupServer();
  }
}