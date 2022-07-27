import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { Body } from "components/atoms/Body";
import { Link } from "components/atoms/Link";
import { RenderAsset, RenderEntry, RenderBlock } from "components/atoms/RenderHelper";

const RichText = (post: any) => {
  // create an asset map
  const assetMap = new Map();
  const entryMap = new Map();
  const blockMap = new Map();
  // loop through the block linked entries and add them to the map

  post.links.entries.block.map((entry: any) => {
    entryMap.set(entry?.sys?.id, entry);
  });
  // loop through the linked assets and add them to a map
  post.links.assets.block.map((asset: any) => {
    assetMap.set(asset?.sys?.id, asset);
  });

  post.json.content.map((block: any, index: any) => {
    blockMap.set(index, block);
  });

  return {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: RenderAsset(assetMap),
      [BLOCKS.EMBEDDED_ENTRY]: RenderEntry(entryMap),
      [BLOCKS.PARAGRAPH]: RenderBlock(blockMap),
      [BLOCKS.HEADING_1]: (node: any, children: any) => <h1>{children}</h1>,
      [BLOCKS.HEADING_2]: (node: any, children: any) => <h2>{children}</h2>,
      [BLOCKS.HEADING_3]: (node: any, children: any) => <h3>{children}</h3>,
      [BLOCKS.HEADING_4]: (node: any, children: any) => <h4>{children}</h4>,
      [BLOCKS.HEADING_5]: (node: any, children: any) => <h5>{children}</h5>,
      [BLOCKS.HEADING_6]: (node: any, children: any) => <h6>{children}</h6>,
      [BLOCKS.LIST_ITEM]: (node: any, children: any) => <li>{children}</li>,
      [BLOCKS.QUOTE]: (node: any, children: any) => <blockquote>{children}</blockquote>,
      [BLOCKS.UL_LIST]: (node: any, children: any) => <ul>{children}</ul>,
      [BLOCKS.OL_LIST]: (node: any, children: any) => <ol>{children}</ol>,
      [BLOCKS.HR]: (node: any, children: any) => <hr />,
    },
  };
};

export default RichText;
