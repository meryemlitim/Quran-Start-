import { IsEnum } from "class-validator";
import { Step } from "src/common/enums/step.enum";

export class updateStepDto{
@IsEnum(Step)
step: Step
}