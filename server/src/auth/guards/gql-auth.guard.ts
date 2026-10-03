import { ExecutionContext, Injectable } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IS_PUBLIC_KEY } from '../public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }
    
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);


        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
    ]);

    if (isPublic) {
        return true;
    }

        return ctx.getContext().req;
    }    
}