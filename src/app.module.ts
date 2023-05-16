import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { routes } from './lib/routes';
import { SharedModule } from './shared/shared.module';
import { TestModule } from './modules/test/test.module';
import { RootModule } from './modules/root/root.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RootModule,
    RouterModule.register(routes),
    SharedModule,
    TestModule,
  ],
  providers: [],
  exports: [],
})
export class AppModule {}
