import event from '../events';
import createListener from './create';

const startListen = () => createListener(event);
export default startListen;
