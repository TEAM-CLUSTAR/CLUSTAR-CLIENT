import { Icon } from '@cds/icon';
import { ButtonV2 } from '@cds/ui';

interface FilterButtonProps {
  count: number;
  onClick: () => void;
}

const FilterButton = ({ count, onClick }: FilterButtonProps) => {
  return (
    <ButtonV2
      size="sm"
      variant="secondary"
      icon={<Icon name="ic_filter" size={16} color="grey800" />}
      onClick={onClick}
      aria-pressed={count > 0}
    >
      {count > 0 ? `필터링 ${count}` : '필터링'}
    </ButtonV2>
  );
};

export default FilterButton;
