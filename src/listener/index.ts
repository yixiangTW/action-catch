import event from '../events';
import createListener from './create';
import { StartListenType } from '../types/listener';

const startListen: StartListenType = () => createListener(event);
export default startListen;
