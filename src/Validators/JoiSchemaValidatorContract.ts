import { Schema } from "joi";
import { InvalidDataException } from "../Entities/Domain/Exceptions/InvalidDataException";

export class JoiSchemaValidatorContract {
  protected async validateBySchema<TBody>(body: TBody, schema: Schema) {
    try {
      await schema.validateAsync(body, { abortEarly: false });
    } catch (e) {
      throw new InvalidDataException(
        "Invalid data.",
        e.details.map((detail) => ({
          id: `${detail.path.length ? `${detail.path.join(".")}` : ""}${
            detail.type
          }`,
          message: detail.message,
        }))
      );
    }
  }
}
