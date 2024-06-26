import { Module } from '@nestjs/common';
import { PalService } from './pal.service';
import { PalController } from './pal.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PalController],
  providers: [PalService],
})
export class PalModule {}
