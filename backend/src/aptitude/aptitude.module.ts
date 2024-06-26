import { Module } from '@nestjs/common';
import { AptitudeService } from './aptitude.service';
import { AptitudeController } from './aptitude.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AptitudeController],
  providers: [AptitudeService],
})
export class AptitudeModule {}
