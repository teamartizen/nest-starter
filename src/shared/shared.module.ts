import { PrismaService } from './services/prisma.service';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';

const providers = [PrismaService, ConfigService];

@Global()
@Module({
  providers,
  imports: [],
  exports: [...providers],
})
export class SharedModule {}
