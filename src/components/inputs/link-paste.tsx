import { IconLink } from "@tabler/icons-react";
import { ChangeEvent } from "react";

const LinkPaste = ({
  handleLinkPaste,
}: {
  handleLinkPaste: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <label htmlFor="link-input" className="cursor-pointer">
    <IconLink size={21} />
    <input
      type="text"
      id="link-input"
      className="hidden"
      onChange={handleLinkPaste}
    />
  </label>
);

export default LinkPaste;
