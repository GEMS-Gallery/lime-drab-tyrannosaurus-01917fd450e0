import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Document {
  'id' : string,
  'title' : string,
  'content' : string,
  'parentId' : [] | [string],
}
export interface _SERVICE {
  'createDocument' : ActorMethod<[string, string, [] | [string]], string>,
  'getChildDocuments' : ActorMethod<[string], Array<Document>>,
  'getDocument' : ActorMethod<[string], [] | [Document]>,
  'shareDocument' : ActorMethod<[string, string], boolean>,
  'updateDocument' : ActorMethod<[string, string, string], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
