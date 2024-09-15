/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { HydratedDocument } from 'mongoose';
export type MetaDocument = HydratedDocument<Meta>;
declare class UserPersona {
    id: string;
    name: string;
    email: string;
    image: string;
}
export declare const UserPersonaSchema: import("mongoose").Schema<UserPersona, import("mongoose").Model<UserPersona, any, any, any, import("mongoose").Document<unknown, any, UserPersona> & UserPersona & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserPersona, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserPersona>> & import("mongoose").FlatRecord<UserPersona> & {
    _id: import("mongoose").Types.ObjectId;
}>;
declare class OrgPersona {
    id: string;
    name: string;
}
export declare const OrgPersonaSchema: import("mongoose").Schema<OrgPersona, import("mongoose").Model<OrgPersona, any, any, any, import("mongoose").Document<unknown, any, OrgPersona> & OrgPersona & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OrgPersona, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<OrgPersona>> & import("mongoose").FlatRecord<OrgPersona> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare class Meta {
    createdBy: UserPersona;
    updatedBy: UserPersona;
    createdDate: Date;
    updatedDate: Date;
    orgInfo: OrgPersona;
}
export declare const MetaSchema: import("mongoose").Schema<Meta, import("mongoose").Model<Meta, any, any, any, import("mongoose").Document<unknown, any, Meta> & Meta & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Meta, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Meta>> & import("mongoose").FlatRecord<Meta> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export {};
