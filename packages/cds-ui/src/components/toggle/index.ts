import Toggle from './toggle';
import ToggleItem from './toggle-item';

type ToggleComponent = typeof Toggle & {
  Item: typeof ToggleItem;
};

const ToggleWithItem = Toggle as ToggleComponent;
ToggleWithItem.Item = ToggleItem;

export default ToggleWithItem;
