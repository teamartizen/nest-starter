import { Controller, Get } from '@nestjs/common';

@Controller()
export class RootController {
  constructor() {}

  @Get()
  root() {
    return {
      message: 'Nsjstarter Says: Hello World',
    };
  }
}
