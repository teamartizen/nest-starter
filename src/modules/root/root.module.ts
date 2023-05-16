import { Module } from '@nestjs/common';
import { RootService } from './root.service';
import { RootController } from './root.controller';

@Module({
  providers: [RootService],
  controllers: [RootController],
})
export class RootModule {}
