import { FastifyInstance } from 'fastify';
import { singleton, inject } from 'tsyringe';
import { BaseRouter } from '@/shared/base/BaseRouter';
import { ListUserResponse, ListUserSchema } from '@/shared/schemas/user/list-user.schema';
import { ListUserController } from '@/presentation/controllers/user/list-user.controller';
import { CreateUserBody, CreateUserSchema } from '@/shared/schemas/user/create-user.schema';
import { CreateUserController } from '@/presentation/controllers/user/create-user.controller';

@singleton()
export class UserRoute extends BaseRouter {
  constructor(
    @inject(ListUserController)
    private listUserHandler: ListUserController,

    @inject(CreateUserController)
    private createUserHandler: CreateUserController,
  ) {
    super();
  }

  public async setup(fastify: FastifyInstance) {
    fastify.route<{ Reply: ListUserResponse[] }>({
      method: 'GET',
      url: '/user',
      schema: ListUserSchema,
      handler: (_r, reply) => this.listUserHandler.index(reply),
    });

    fastify.route<{ Body: CreateUserBody }>({
      method: 'POST',
      url: '/user',
      schema: CreateUserSchema,
      handler: (req, reply) => this.createUserHandler.index(req, reply),
    });
  }
}
