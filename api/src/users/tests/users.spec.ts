import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  // describe('findAll', () => {
  //     it('should return an array of users', async () => {
  //         const result = ['test'];
  //         jest.spyOn(service, 'findAll').mockImplementation(() => result);

  //         expect(await controller.findAll()).toBe(result);
  //     });
  // });
});
