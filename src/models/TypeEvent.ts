type TypeEventProps = {
  isChecked?: boolean;
  xPath?: string;
  name?: string;
  type?: string;
  content?: string
};

export default class TypeEvent {
  content?: string;

  isChecked?: boolean;

  xPath?: string;

  name?: string;

  type?: string;

  constructor(props: TypeEventProps) {
    this.isChecked = props.isChecked;
    this.xPath = props.xPath;
    this.name = props.name;
    this.type = props.type;
    this.content = props.content;
  }
}
