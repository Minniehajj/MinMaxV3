import reactStringReplace from "react-string-replace";
import { CardToolTip } from "../CardToolTip";
import { Link } from "../Link";
import { BodyProps } from "./types";
const Body = ({ children = "", ...props }: BodyProps) => {
  return <div>Hello World</div>;
  // let parsedBody;
  // const p = /\[([\s\w\d-+_/,'’&]*)\]/g;
  // if (props.nodeType === "text") {
  //   const body = props.value.replace(/[\u2018\u2019]/g, "'");

  //   parsedBody = reactStringReplace(body, p, (match, i) => <CardToolTip key={`index-${i}`} name={match} />);
  // }
  // if (props.nodeType === "hyperlink") {
  //   return <Link href={props.data.uri}>{props?.content[0]?.value}</Link>;
  // }

  // return <>{parsedBody}</>;
};

export default Body;
