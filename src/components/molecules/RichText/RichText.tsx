import { BLOCKS } from "@contentful/rich-text-types";
import {
  RenderAsset,
  RenderEntry,
  RenderBlock,
} from "components/atoms/RenderHelper";
import React from "react";
import { NodeData } from "./types";

const RichText = (post: NodeData) => {
  // create an asset map
  const assetMap = new Map();
  const entryMap = new Map();
  const blockMap = new Map();
  // loop through the block linked entries and add them to the map

  post.links.entries.block.map((entry) => {
    entryMap.set(entry?.sys?.id, entry);
  });
  // loop through the linked assets and add them to a map
  post.links.assets.block.map((asset) => {
    assetMap.set(asset?.sys?.id, asset);
  });

  post.json.content.map((block, index) => {
    blockMap.set(index, block);
  });

  return {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: RenderAsset(assetMap),
      [BLOCKS.EMBEDDED_ENTRY]: RenderEntry(entryMap),
      [BLOCKS.PARAGRAPH]: RenderBlock(),
      [BLOCKS.HEADING_1]: (children: React.ReactNode) => <h1>{children}</h1>,
      [BLOCKS.HEADING_2]: (node: NodeData, children: React.ReactNode) => (
        <h2>{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node: NodeData, children: React.ReactNode) => (
        <h3>{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node: NodeData, children: React.ReactNode) => (
        <h4>{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (node: NodeData, children: React.ReactNode) => (
        <h5>{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (node: NodeData, children: React.ReactNode) => (
        <h6>{children}</h6>
      ),
      [BLOCKS.LIST_ITEM]: (node: NodeData, children: React.ReactNode) => (
        <li>{children}</li>
      ),
      [BLOCKS.QUOTE]: (node: NodeData, children: React.ReactNode) => (
        <blockquote>{children}</blockquote>
      ),
      [BLOCKS.UL_LIST]: (node: NodeData, children: React.ReactNode) => (
        <ul>{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node: NodeData, children: React.ReactNode) => (
        <ol>{children}</ol>
      ),
      [BLOCKS.HR]: () => <hr />,
    },
  };
};

export default RichText;
