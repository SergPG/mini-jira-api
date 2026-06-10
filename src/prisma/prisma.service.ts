import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private configService: ConfigService) {
    const dbUrl = configService.get<string>('DATABASE_URL');

    if (!dbUrl) {
      throw new Error('DATABASE_URL is not defined');
    }

    const adapter = new PrismaPg({
      connectionString: dbUrl,
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
