import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ContextIdFactory } from "@nestjs/core";

// export const CurrentUser = createParamDecorator(_data: unknown, context: ExecutionContext) => {
//     return ContextIdFactory.switchToHttp().getRequest().user;
// }