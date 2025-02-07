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
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserPersona, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserPersona>> & import("mongoose").FlatRecord<UserPersona> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
declare class OrgPersona {
    id: string;
    name: string;
}
export declare const OrgPersonaSchema: import("mongoose").Schema<OrgPersona, import("mongoose").Model<OrgPersona, any, any, any, import("mongoose").Document<unknown, any, OrgPersona> & OrgPersona & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OrgPersona, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<OrgPersona>> & import("mongoose").FlatRecord<OrgPersona> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
declare class Attachment {
    name: string;
    type: string;
    url: string;
}
export declare const AttachmentSchema: import("mongoose").Schema<Attachment, import("mongoose").Model<Attachment, any, any, any, import("mongoose").Document<unknown, any, Attachment> & Attachment & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Attachment, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Attachment>> & import("mongoose").FlatRecord<Attachment> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
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
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Meta, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Meta>> & import("mongoose").FlatRecord<Meta> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export {};
