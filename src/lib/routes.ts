import { TestModule } from '../modules/test/test.module';

export const routes = [
  {
    path: 'api',
    children: [
      TestModule,
    ],
  },
];
