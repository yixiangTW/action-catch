import { EventTypeProps } from '../types/model';

export default class EventType {
  content?: string;

  isChecked?: boolean;

  xPath?: string;

  name?: string;

  type?: string;

  value?: string;

  id?: string;

  isEnter?: boolean;

  constructor(props: EventTypeProps) {
    this.isChecked = props.isChecked;
    this.xPath = props.xPath;
    this.name = props.name;
    this.type = props.type;
    this.content = props.content;
    this.isEnter = props.isEnter;
    this.id = props.id;
    this.value = props.value;
  }
}
