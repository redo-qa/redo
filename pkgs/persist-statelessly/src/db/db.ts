import { transform, Unlisted } from "@re-do/utils"
import { FileStore, FileStoreOptions } from ".."
import {
    Model,
    Interactions,
    InteractionOptions,
    Relationships,
    FileDbContext,
    FindBy
} from "./common"
import { createDependentsMap } from "./relationships"
import { create, CreateOptions } from "./create"
import { remove, RemoveOptions } from "./remove"
import { find } from "./find"

export type FileDb<T extends Model, IdFieldName extends string = "id"> = {
    [K in keyof T]: Interactions<Unlisted<T[K]>, IdFieldName>
}

export type FileDbArgs<
    T extends Model,
    IdFieldName extends string = "id"
> = FileStoreOptions<T> & {
    relationships: Relationships<T>
    idFieldName?: IdFieldName
}

export const createFileDb = <
    T extends Model,
    IdFieldName extends string = "id"
>({
    relationships,
    idFieldName,
    ...fileStoreOptions
}: FileDbArgs<T, IdFieldName extends undefined ? "id" : IdFieldName>): FileDb<
    T,
    IdFieldName extends undefined ? "id" : IdFieldName
> => {
    const store = new FileStore<T>({}, fileStoreOptions)
    const context: FileDbContext<T> = {
        store,
        relationships,
        dependents: createDependentsMap(relationships),
        idFieldName: idFieldName ?? "id"
    }
    return transform(relationships, ([k, v]: [string, any]) => [
        k,
        {
            create: (o: any, options?: CreateOptions<any>) =>
                create(k, o, context, options),
            all: (options: InteractionOptions<any> = {}) =>
                find(k, (_) => true, context, {
                    unpack: options.unpack ?? true,
                    exactlyOne: false
                }),
            find: (by: FindBy<T>, options: InteractionOptions<any> = {}) =>
                find(k, by, context, { unpack: options.unpack ?? true }),
            filter: (by: FindBy<T>, options: InteractionOptions<any> = {}) =>
                find(k, by, context, {
                    unpack: options.unpack ?? true,
                    exactlyOne: false
                }),
            remove: (by: FindBy<T>, options: RemoveOptions = {}) =>
                remove(k, by, context, options)
        }
    ]) as any
}
