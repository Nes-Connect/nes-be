import { Module } from '@nestjs/common';

import { UserModule } from '@modules/user/user.module';
import { CommunityModule } from '@modules/community/community.module';
import { MessageModule } from '@modules/message/message.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';

let envFilePath = '.env.development';
if (process.env.ENVIRONMENT === 'PRODUCTION') envFilePath = '.env.production';

@Module({
  imports: [
    UserModule,
    CommunityModule,
    MessageModule,
    AuthModule,
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
  ],
  providers: [PrismaService],
})
export class AppModule {}
