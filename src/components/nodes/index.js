import InputNode from './InputNode';
import FunctionNode from './FunctionNode';
import LogicNode from './LogicNode';
import OutputNode from './OutputNode';
import MathNode from './MathNode';
import TextNode from './TextNode';
import DelayNode from './DelayNode';
import MergeNode from './MergeNode';
import RandomNode from './RandomNode';
import NoteNode from './NoteNode';
import DateNode from './DateNode';
import JSONNode from './JSONNode';
import ArrayNode from './ArrayNode';
import APINode from './APINode';
import RegexNode from './RegexNode';
import FetchNode from './FetchNode';
import LoopNode from './LoopNode';
import ConditionalNode from './ConditionalNode';
import StorageNode from './StorageNode';
import ConsoleNode from './ConsoleNode';
import TryCatchNode from './TryCatchNode';
import FileReadNode from './FileReadNode';
import FileWriteNode from './FileWriteNode';

export const nodeTypes = {
  input: InputNode,
  function: FunctionNode,
  logic: LogicNode,
  output: OutputNode,
  math: MathNode,
  text: TextNode,
  delay: DelayNode,
  merge: MergeNode,
  random: RandomNode,
  note: NoteNode,
  date: DateNode,
  json: JSONNode,
  array: ArrayNode,
  api: APINode,
  regex: RegexNode,
  fetch: FetchNode,
  loop: LoopNode,
  conditional: ConditionalNode,
  storage: StorageNode,
  console: ConsoleNode,
  tryCatch: TryCatchNode,
  fileRead: FileReadNode,
  fileWrite: FileWriteNode,
};

export { InputNode, FunctionNode, LogicNode, OutputNode, MathNode, TextNode, DelayNode, MergeNode, RandomNode, NoteNode, DateNode, JSONNode, ArrayNode, APINode, RegexNode, FetchNode, LoopNode, ConditionalNode, StorageNode, ConsoleNode, TryCatchNode, FileReadNode, FileWriteNode };
