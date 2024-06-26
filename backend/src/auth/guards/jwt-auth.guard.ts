import {ExecutionContext,Injectable,UnauthorizedException,} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import * as chalk from 'chalk';
import { IS_PUBLIC_KEY } from 'src/utils/decorators/public';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
      }
    
      canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
          context.getHandler(),
          context.getClass(),
        ]);
    
        if (isPublic) {
          return true;
        }
    
        return super.canActivate(context);
      }
    
      handleRequest(err, user, info) {
        if (err || !user) {
          console.log(chalk.red('[ERROR]'), info.message || info);
          throw err || new UnauthorizedException();
        }
    
        return user;
      }
}