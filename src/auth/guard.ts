import { CanActivate,ExecutionContext,Injectable,UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/users/enums/role.enum";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles',[
            context.getHandler(),
            context.getClass()
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => user.role === role);
    }
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if(!token){
            throw new UnauthorizedException()
        }
        try{
            const payload = await this.jwtService.verifyAsync(token);
            request['user'] = payload;
        }catch{
            throw new UnauthorizedException();
        }
        return true;
    }
    private extractTokenFromHeader(request: Request):string |undefined {
        const [type,token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined

    }
}