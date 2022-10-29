/* eslint-disable @typescript-eslint/no-empty-interface */
export interface NodeData {
    json:  JSON;
    links: Links;
}

export interface JSON {
    data:     JSONData;
    content:  JSONContent[];
    nodeType: string;
}

export interface JSONContent {
    data:     FluffyData;
    content:  PurpleContent[];
    nodeType: TentacledNodeType;
}

export interface PurpleContent {
    data:     PurpleData;
    marks?:   Mark[];
    value?:   string;
    nodeType: FluffyNodeType;
    content?: FluffyContent[];
}

export interface FluffyContent {
    data:     JSONData;
    marks?:   Mark[];
    value?:   string;
    nodeType: PurpleNodeType;
    content?: FluffyContent[];
}

export interface JSONData {
}

export enum PurpleNodeType {
    Paragraph = "paragraph",
    Text = "text",
}

export interface PurpleData {
    uri?: string;
}

export interface Mark {
    type: string;
}

export enum FluffyNodeType {
    Hyperlink = "hyperlink",
    ListItem = "list-item",
    Text = "text",
}

export interface FluffyData {
    target?: Target;
}

export interface Target {
    sys: TargetSys;
}

export interface TargetSys {
    id:       string;
    type:     string;
    linkType: string;
}

export enum TentacledNodeType {
    EmbeddedAssetBlock = "embedded-asset-block",
    EmbeddedEntryBlock = "embedded-entry-block",
    Heading2 = "heading-2",
    Heading3 = "heading-3",
    Paragraph = "paragraph",
    UnorderedList = "unordered-list",
}

export interface Links {
    assets:  Assets;
    entries: Entries;
}

export interface Assets {
    block: AssetsBlock[];
}

export interface AssetsBlock {
    sys:         BlockSys;
    title:       string;
    url:         string;
    description: string;
    contentType: string;
    width:       number;
    height:      number;
}

export interface BlockSys {
    id: string;
}

export interface Entries {
    block: EntriesBlock[];
}

export interface EntriesBlock {
    sys:      BlockSys;
    typename: string;
    title:    string;
    tweetID:  string;
}
