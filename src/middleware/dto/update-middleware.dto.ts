import { PartialType } from '@nestjs/mapped-types';
import { CreateMiddlewareDto } from './create-middleware.dto';

export class UpdateMiddlewareDto extends PartialType(CreateMiddlewareDto) {}
