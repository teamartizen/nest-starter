import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  constructor() {}

  test() {
    return {
      message: 'hello world'
    }
  }
}
