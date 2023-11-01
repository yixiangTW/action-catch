type CheckEventProps = {
  isChecked: boolean;
  xPath: string;
  name: string;
  type: string;
};

export default class CheckEvent {
  isChecked: boolean;
  xPath: string;
  name: string;
  type: string;

  constructor(props: CheckEventProps) {
    this.isChecked = props.isChecked
    this.xPath = props.xPath
    this.name = props.name
    this.type = props.type
  }
}
