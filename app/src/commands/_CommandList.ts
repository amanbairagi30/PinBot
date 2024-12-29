import { CommandInt } from "../interfaces/commandInt";
import { bulkExport } from "./bulk-export";
import { chatWithPin } from "./chat-with-pin";
import { deleteExport } from "./delete-export";
import { ping } from "./ping";

export const CommandList: CommandInt[] = [
  ping,
  chatWithPin,
  bulkExport,
  deleteExport,
];
