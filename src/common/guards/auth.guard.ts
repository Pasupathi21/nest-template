import { CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log("<<<<<<<<<< AUTH_GUARD_LOG >>>>>>>>>>>>>")
        const request = context.switchToHttp().getRequest()
        return true
    }

}