import { Controller, Get, Query } from '@nestjs/common';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Auth } from '../../decorators/http.decorators';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  test() {
    return this.testService.test();
  }

  @Auth()
  @Get('auth')
  authenticatedTest(@AuthUser() user: { id: string; email: string }) {
    return user;
  }
}
